/**
 * CodeEditorPreview Web Component
 * 完整的代码编辑预览器组件
 * 不使用 Shadow DOM，避免样式问题
 */

class CodeEditorPreview extends HTMLElement {
    constructor() {
        super();
        
        // 不使用 Shadow DOM
        this.attachShadow = null;
        
        // 控制器实例
        this.controller = null;
        
        // 组件状态
        this.isInitialized = false;
        this.config = {
            // 默认配置
            width: '100%',
            height: '600px',
            theme: 'prism',
            language: 'html',
            showLineNumbers: false,
            editable: true,
            autoPreview: true,
            showToolbar: true,
            showExternalFiles: true,
            showFullscreen: true,
            debounceDelay: 300
        };

        // UI 元素引用
        this.elements = {};
        
        // 事件监听器存储
        this.eventListeners = new Map();
    }

    // ==================== Web Component 生命周期 ====================
    connectedCallback() {
        this.parseAttributes();
        this.createTemplate();
        this.setupEventListeners();
        this.initializeController();
    }

    disconnectedCallback() {
        this.cleanup();
    }

    static get observedAttributes() {
        return [
            'width', 'height', 'theme', 'language', 
            'show-line-numbers', 'editable', 'auto-preview',
            'show-toolbar', 'show-external-files', 'show-fullscreen',
            'debounce-delay', 'default-code'
        ];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.handleAttributeChange(name, newValue);
        }
    }

    // ==================== 初始化方法 ====================
    parseAttributes() {
        // 解析所有属性并更新配置
        const attrs = this.constructor.observedAttributes;
        attrs.forEach(attr => {
            if (this.hasAttribute(attr)) {
                const value = this.getAttribute(attr);
                const configKey = attr.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
                
                // 类型转换
                if (['show-line-numbers', 'editable', 'auto-preview', 'show-toolbar', 'show-external-files', 'show-fullscreen'].includes(attr)) {
                    this.config[configKey] = value === 'true' || value === '';
                } else if (attr === 'debounce-delay') {
                    this.config[configKey] = parseInt(value) || 300;
                } else {
                    this.config[configKey] = value;
                }
            }
        });
    }

    createTemplate() {
        this.innerHTML = `
            <div class="code-editor-preview-wrapper" style="width: ${this.config.width}; height: ${this.config.height};">
                <!-- 样式 -->
                ${this.getComponentStyles()}
                
                <!-- 工具栏 -->
                ${this.config.showToolbar ? this.createToolbar() : ''}
                
                <!-- 主要内容区域 -->
                <div class="code-editor-preview-main">
                    <!-- 代码编辑区域 -->
                    <div class="code-editor-section">
                        <div class="section-header">
                            <h3>代码编辑器</h3>
                            <div class="editor-controls">
                                <select class="language-select">
                                    <option value="html">HTML</option>
                                    <option value="css">CSS</option>
                                    <option value="javascript">JavaScript</option>
                                    <option value="json">JSON</option>
                                    <option value="xml">XML</option>
                                </select>
                            </div>
                        </div>
                        <div class="code-editor-container" id="codeEditor"></div>
                    </div>
                    
                    <!-- 预览区域 -->
                    <div class="code-preview-section">
                        <div class="section-header">
                            <h3>实时预览</h3>
                            <div class="preview-controls">
                                <button class="btn-icon" data-action="refresh" title="刷新预览">
                                    🔄
                                </button>
                                ${this.config.showFullscreen ? `
                                <button class="btn-icon" data-action="fullscreen" title="全屏预览">
                                    🔍
                                </button>
                                ` : ''}
                            </div>
                        </div>
                        <div class="code-preview-container" id="codePreview"></div>
                    </div>
                </div>
                
                <!-- 外部文件管理 -->
                ${this.config.showExternalFiles ? this.createExternalFilesSection() : ''}
                
                <!-- 全屏预览覆盖层 -->
                ${this.config.showFullscreen ? this.createFullscreenOverlay() : ''}
            </div>
        `;
        
        // 缓存重要元素引用
        this.cacheElementReferences();
    }

    createToolbar() {
        return `
            <div class="code-editor-toolbar">
                <div class="toolbar-group">
                    <label>主题：</label>
                    <select class="theme-select">
                        <option value="prism">默认</option>
                        <option value="prism-dark">深色</option>
                        <option value="prism-tomorrow">Tomorrow</option>
                        <option value="prism-okaidia">Okaidia</option>
                    </select>
                </div>
                
                <div class="toolbar-group">
                    <label>
                        <input type="checkbox" class="show-line-numbers" ${this.config.showLineNumbers ? 'checked' : ''}>
                        显示行号
                    </label>
                </div>
                
                <div class="toolbar-group">
                    <label>
                        <input type="checkbox" class="enable-editing" ${this.config.editable ? 'checked' : ''}>
                        允许编辑
                    </label>
                </div>
                
                <div class="toolbar-actions">
                    <button class="btn" data-action="copy">📋 复制代码</button>
                    <button class="btn" data-action="clear">🗑️ 清空</button>
                </div>
            </div>
        `;
    }

    createExternalFilesSection() {
        return `
            <div class="external-files-section">
                <div class="section-header">
                    <h3>外部文件导入</h3>
                </div>
                <div class="file-input-group">
                    <input type="text" class="file-path-input" placeholder="输入文件路径，如: ./utils.js 或 https://example.com/lib.js">
                    <button class="btn" data-action="add-file">添加文件</button>
                </div>
                <div class="imported-files-list">
                    <p class="no-files-message">暂无导入的文件</p>
                </div>
            </div>
        `;
    }

    createFullscreenOverlay() {
        return `
            <div class="fullscreen-overlay" style="display: none;">
                <div class="fullscreen-header">
                    <h3>全屏预览</h3>
                    <button class="btn-close" data-action="close-fullscreen">✕</button>
                </div>
                <div class="fullscreen-preview-container" id="fullscreenPreview"></div>
            </div>
        `;
    }

    cacheElementReferences() {
        this.elements = {
            wrapper: this.querySelector('.code-editor-preview-wrapper'),
            toolbar: this.querySelector('.code-editor-toolbar'),
            languageSelect: this.querySelector('.language-select'),
            themeSelect: this.querySelector('.theme-select'),
            showLineNumbers: this.querySelector('.show-line-numbers'),
            enableEditing: this.querySelector('.enable-editing'),
            filePathInput: this.querySelector('.file-path-input'),
            importedFilesList: this.querySelector('.imported-files-list'),
            fullscreenOverlay: this.querySelector('.fullscreen-overlay'),
            codeEditorContainer: this.querySelector('#codeEditor'),
            codePreviewContainer: this.querySelector('#codePreview'),
            fullscreenPreviewContainer: this.querySelector('#fullscreenPreview')
        };
    }

    async initializeController() {
        if (this.isInitialized) return;

        try {
            // 准备控制器选项
            const controllerOptions = {
                displayContainer: this.elements.codeEditorContainer,
                previewContainer: this.elements.codePreviewContainer,
                defaultCode: this.getAttribute('default-code') || this.getDefaultCode(),
                defaultLanguage: this.config.language,
                autoPreview: this.config.autoPreview,
                debounceDelay: this.config.debounceDelay,
                displayOptions: {
                    theme: this.config.theme,
                    showLineNumbers: this.config.showLineNumbers,
                    editable: this.config.editable,
                    maxHeight: '400px'
                },
                previewOptions: {
                    width: '100%',
                    height: '400px'
                },
                onCodeChange: (code, language) => this.handleCodeChange(code, language),
                onPreviewUpdate: (code) => this.handlePreviewUpdate(code),
                onError: (title, error) => this.handleError(title, error),
                onConfigChange: (config) => this.handleConfigChange(config)
            };

            // 创建控制器
            this.controller = await CodeEditorPreviewController.create(controllerOptions);
            
            // 更新UI状态
            this.updateUIFromConfig();
            
            this.isInitialized = true;
            
            // 触发初始化完成事件
            this.dispatchEvent(new CustomEvent('initialized', {
                detail: { controller: this.controller }
            }));
            
        } catch (error) {
            console.error('CodeEditorPreview 初始化失败:', error);
            this.handleError('初始化失败', error);
        }
    }

    // ==================== 事件处理 ====================
    setupEventListeners() {
        // 委托事件监听
        this.addEventListener('click', this.handleClick.bind(this));
        this.addEventListener('change', this.handleChange.bind(this));
        this.addEventListener('keydown', this.handleKeydown.bind(this));
    }

    handleClick(event) {
        const action = event.target.dataset.action;
        if (!action) return;

        event.preventDefault();
        
        switch (action) {
            case 'copy':
                this.copyCode();
                break;
            case 'clear':
                this.clearCode();
                break;
            case 'refresh':
                this.refreshPreview();
                break;
            case 'fullscreen':
                this.openFullscreen();
                break;
            case 'close-fullscreen':
                this.closeFullscreen();
                break;
            case 'add-file':
                this.addExternalFile();
                break;
            case 'remove-file':
                this.removeExternalFile(event.target.dataset.filePath);
                break;
        }
    }

    handleChange(event) {
        if (!this.controller) return;

        const target = event.target;
        
        if (target.classList.contains('language-select')) {
            this.controller.setLanguage(target.value);
        } else if (target.classList.contains('theme-select')) {
            this.controller.updateDisplayConfig({ theme: target.value });
        } else if (target.classList.contains('show-line-numbers')) {
            this.controller.updateDisplayConfig({ showLineNumbers: target.checked });
        } else if (target.classList.contains('enable-editing')) {
            this.controller.updateDisplayConfig({ editable: target.checked });
        }
    }

    handleKeydown(event) {
        // 处理键盘快捷键
        if ((event.ctrlKey || event.metaKey) && event.key === 's') {
            event.preventDefault();
            this.refreshPreview();
        } else if (event.key === 'F11') {
            event.preventDefault();
            this.openFullscreen();
        } else if (event.key === 'Escape') {
            if (this.elements.fullscreenOverlay && this.elements.fullscreenOverlay.style.display !== 'none') {
                this.closeFullscreen();
            }
        } else if (event.key === 'Enter' && event.target.classList.contains('file-path-input')) {
            event.preventDefault();
            this.addExternalFile();
        }
    }

    handleAttributeChange(name, newValue) {
        if (!this.isInitialized) return;

        const configKey = name.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
        
        // 更新配置
        if (['show-line-numbers', 'editable', 'auto-preview', 'show-toolbar', 'show-external-files', 'show-fullscreen'].includes(name)) {
            this.config[configKey] = newValue === 'true' || newValue === '';
        } else if (name === 'debounce-delay') {
            this.config[configKey] = parseInt(newValue) || 300;
        } else {
            this.config[configKey] = newValue;
        }

        // 应用配置变更
        this.applyConfigChange(name, newValue);
    }

    // ==================== 公共 API 方法 ====================
    async setCode(code, language) {
        if (this.controller) {
            return await this.controller.setCode(code, language);
        }
        return false;
    }

    getCode() {
        return this.controller ? this.controller.getCode() : '';
    }

    async setLanguage(language) {
        if (this.controller) {
            return await this.controller.setLanguage(language);
        }
        return false;
    }

    getLanguage() {
        return this.controller ? this.controller.getLanguage() : this.config.language;
    }

    async copyCode() {
        if (this.controller) {
            const success = await this.controller.copyCode();
            if (success) {
                this.showTemporaryMessage('代码已复制到剪贴板');
            }
            return success;
        }
        return false;
    }

    clearCode() {
        if (this.controller && confirm('确定要清空编辑器吗？')) {
            return this.controller.clearCode();
        }
        return false;
    }

    async refreshPreview() {
        if (this.controller) {
            await this.controller.refreshPreview();
            this.showTemporaryMessage('预览已刷新');
        }
    }

    openFullscreen() {
        if (this.elements.fullscreenOverlay) {
            this.elements.fullscreenOverlay.style.display = 'flex';
            
            // 创建全屏预览控制器
            if (this.controller && this.elements.fullscreenPreviewContainer) {
                const fullscreenPreview = new CodePreview(this.elements.fullscreenPreviewContainer, {
                    width: '100%',
                    height: '100%'
                });
                
                const code = this.controller.getCode();
                if (code) {
                    fullscreenPreview.render(code);
                }
            }
        }
    }

    closeFullscreen() {
        if (this.elements.fullscreenOverlay) {
            this.elements.fullscreenOverlay.style.display = 'none';
        }
    }

    async addExternalFile() {
        const input = this.elements.filePathInput;
        const filePath = input.value.trim();
        
        if (!filePath) {
            this.showTemporaryMessage('请输入文件路径', 'error');
            return;
        }

        if (this.controller) {
            const success = await this.controller.addExternalFile(filePath);
            if (success) {
                input.value = '';
                this.updateExternalFilesList();
                this.showTemporaryMessage('文件添加成功');
            }
        }
    }

    removeExternalFile(filePath) {
        if (this.controller && filePath) {
            const success = this.controller.removeExternalFile(filePath);
            if (success) {
                this.updateExternalFilesList();
                this.showTemporaryMessage('文件已移除');
            }
        }
    }

    // ==================== 内部辅助方法 ====================
    updateUIFromConfig() {
        if (this.elements.languageSelect) {
            this.elements.languageSelect.value = this.config.language;
        }
        if (this.elements.themeSelect) {
            this.elements.themeSelect.value = this.config.theme;
        }
        if (this.elements.showLineNumbers) {
            this.elements.showLineNumbers.checked = this.config.showLineNumbers;
        }
        if (this.elements.enableEditing) {
            this.elements.enableEditing.checked = this.config.editable;
        }
    }

    updateExternalFilesList() {
        if (!this.controller || !this.elements.importedFilesList) return;

        const files = this.controller.getExternalFiles();
        
        if (files.length === 0) {
            this.elements.importedFilesList.innerHTML = '<p class="no-files-message">暂无导入的文件</p>';
            return;
        }

        this.elements.importedFilesList.innerHTML = files.map(filePath => `
            <div class="imported-file-item">
                <div class="file-info">
                    <span class="file-icon">📄</span>
                    <span class="file-path">${filePath}</span>
                    <span class="file-status">✅ 已加载</span>
                </div>
                <button class="btn-remove" data-action="remove-file" data-file-path="${filePath}">
                    🗑️ 移除
                </button>
            </div>
        `).join('');
    }

    applyConfigChange(attributeName, newValue) {
        // 根据属性变更应用相应的配置
        switch (attributeName) {
            case 'width':
            case 'height':
                if (this.elements.wrapper) {
                    this.elements.wrapper.style[attributeName] = newValue;
                }
                break;
            case 'theme':
                if (this.controller) {
                    this.controller.updateDisplayConfig({ theme: newValue });
                }
                break;
            case 'language':
                if (this.controller) {
                    this.controller.setLanguage(newValue);
                }
                break;
            // 其他配置...
        }
    }

    showTemporaryMessage(message, type = 'success') {
        // 显示临时消息的方法
        const messageEl = document.createElement('div');
        messageEl.className = `temp-message temp-message-${type}`;
        messageEl.textContent = message;
        messageEl.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'error' ? '#ff4444' : '#44ff44'};
            color: white;
            padding: 10px 15px;
            border-radius: 4px;
            z-index: 9999;
            animation: fadeInOut 3s ease-in-out;
        `;
        
        document.body.appendChild(messageEl);
        
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.parentNode.removeChild(messageEl);
            }
        }, 3000);
    }

    getDefaultCode() {
        return `<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>代码预览示例</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }
        .container {
            background: rgba(255, 255, 255, 0.1);
            padding: 30px;
            border-radius: 10px;
            backdrop-filter: blur(10px);
        }
        h1 { text-align: center; margin-bottom: 30px; }
        .feature { margin: 20px 0; padding: 15px; background: rgba(255, 255, 255, 0.1); border-radius: 5px; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 代码编辑预览器</h1>
        <div class="feature">
            <h3>✨ 实时预览</h3>
            <p>编辑代码时可以实时看到运行效果</p>
        </div>
        <div class="feature">
            <h3>🎨 语法高亮</h3>
            <p>支持多种编程语言的语法高亮显示</p>
        </div>
        <div class="feature">
            <h3>📁 外部文件</h3>
            <p>可以导入外部 JavaScript 文件</p>
        </div>
        <div class="feature">
            <h3>🔧 可配置</h3>
            <p>主题、行号、编辑模式等都可以自定义</p>
        </div>
    </div>
    
    <script>
        console.log('代码编辑预览器已加载完成！');
        
        // 添加一些交互效果
        document.querySelectorAll('.feature').forEach(feature => {
            feature.addEventListener('click', () => {
                feature.style.transform = feature.style.transform === 'scale(1.05)' ? 'scale(1)' : 'scale(1.05)';
            });
        });
    </script>
</body>
</html>`;
    }

    // ==================== 事件回调处理 ====================
    handleCodeChange(code, language) {
        this.dispatchEvent(new CustomEvent('code-change', {
            detail: { code, language }
        }));
    }

    handlePreviewUpdate(code) {
        this.dispatchEvent(new CustomEvent('preview-update', {
            detail: { code }
        }));
    }

    handleError(title, error) {
        this.dispatchEvent(new CustomEvent('error', {
            detail: { title, error }
        }));
        
        this.showTemporaryMessage(`${title}: ${error.message}`, 'error');
    }

    handleConfigChange(config) {
        this.dispatchEvent(new CustomEvent('config-change', {
            detail: { config }
        }));
    }

    // ==================== 清理方法 ====================
    cleanup() {
        if (this.controller) {
            this.controller.destroy();
            this.controller = null;
        }
        
        this.eventListeners.forEach((listener, element) => {
            element.removeEventListener(...listener);
        });
        this.eventListeners.clear();
        
        this.isInitialized = false;
    }

    // ==================== 样式定义 ====================
    getComponentStyles() {
        return `
            <style>
                .code-editor-preview-wrapper {
                    display: flex;
                    flex-direction: column;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    overflow: hidden;
                    background: #fff;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                }
                
                .code-editor-toolbar {
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    padding: 10px 15px;
                    background: #f8f9fa;
                    border-bottom: 1px solid #ddd;
                    flex-wrap: wrap;
                }
                
                .toolbar-group {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                
                .toolbar-actions {
                    margin-left: auto;
                    display: flex;
                    gap: 8px;
                }
                
                .code-editor-preview-main {
                    display: flex;
                    flex: 1;
                    min-height: 400px;
                }
                
                .code-editor-section,
                .code-preview-section {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    border-right: 1px solid #ddd;
                }
                
                .code-preview-section {
                    border-right: none;
                }
                
                .section-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 10px 15px;
                    background: #f1f3f4;
                    border-bottom: 1px solid #ddd;
                }
                
                .section-header h3 {
                    margin: 0;
                    font-size: 14px;
                    font-weight: 600;
                    color: #333;
                }
                
                .editor-controls,
                .preview-controls {
                    display: flex;
                    gap: 8px;
                }
                
                .code-editor-container,
                .code-preview-container {
                    flex: 1;
                    overflow: hidden;
                }
                
                .external-files-section {
                    border-top: 1px solid #ddd;
                    background: #f8f9fa;
                }
                
                .file-input-group {
                    display: flex;
                    gap: 8px;
                    padding: 10px 15px;
                }
                
                .file-path-input {
                    flex: 1;
                    padding: 8px 12px;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    font-size: 14px;
                }
                
                .imported-files-list {
                    max-height: 200px;
                    overflow-y: auto;
                    padding: 0 15px 15px;
                }
                
                .imported-file-item {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 8px 12px;
                    background: white;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    margin-bottom: 8px;
                }
                
                .file-info {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    flex: 1;
                }
                
                .file-path {
                    font-family: monospace;
                    font-size: 13px;
                }
                
                .file-status {
                    font-size: 12px;
                    color: #28a745;
                }
                
                .no-files-message {
                    text-align: center;
                    color: #6c757d;
                    font-style: italic;
                    margin: 20px 0;
                }
                
                .fullscreen-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.9);
                    z-index: 9999;
                    flex-direction: column;
                }
                
                .fullscreen-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 15px 20px;
                    background: #333;
                    color: white;
                }
                
                .fullscreen-preview-container {
                    flex: 1;
                    background: white;
                }
                
                .btn {
                    padding: 6px 12px;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    background: white;
                    cursor: pointer;
                    font-size: 13px;
                    transition: all 0.2s;
                }
                
                .btn:hover {
                    background: #f8f9fa;
                    border-color: #adb5bd;
                }
                
                .btn-icon {
                    padding: 4px 8px;
                    border: none;
                    background: transparent;
                    cursor: pointer;
                    font-size: 16px;
                    border-radius: 4px;
                    transition: background 0.2s;
                }
                
                .btn-icon:hover {
                    background: rgba(0, 0, 0, 0.1);
                }
                
                .btn-close {
                    padding: 4px 8px;
                    border: none;
                    background: #dc3545;
                    color: white;
                    border-radius: 4px;
                    cursor: pointer;
                }
                
                .btn-remove {
                    padding: 4px 8px;
                    border: none;
                    background: #dc3545;
                    color: white;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 12px;
                }
                
                select, input[type="checkbox"] {
                    margin: 0 4px;
                }
                
                label {
                    display: flex;
                    align-items: center;
                    gap: 4px;
                    font-size: 14px;
                    cursor: pointer;
                }
                
                @keyframes fadeInOut {
                    0%, 100% { opacity: 0; transform: translateY(-10px); }
                    10%, 90% { opacity: 1; transform: translateY(0); }
                }
                
                @media (max-width: 768px) {
                    .code-editor-preview-main {
                        flex-direction: column;
                    }
                    
                    .code-editor-section {
                        border-right: none;
                        border-bottom: 1px solid #ddd;
                    }
                    
                    .code-editor-toolbar {
                        gap: 10px;
                    }
                    
                    .toolbar-actions {
                        margin-left: 0;
                        width: 100%;
                        justify-content: flex-start;
                    }
                }
            </style>
        `;
    }
}

// 注册 Web Component
if (!customElements.get('code-editor-preview')) {
    customElements.define('code-editor-preview', CodeEditorPreview);
}

// 模块化支持
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CodeEditorPreview;
}

if (typeof define === 'function' && define.amd) {
    define([], () => CodeEditorPreview);
}

if (typeof window !== 'undefined') {
    window.CodeEditorPreview = CodeEditorPreview;
} 