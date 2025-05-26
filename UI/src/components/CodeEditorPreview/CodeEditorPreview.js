/**
 * CodeEditorPreview Web Component
 * 简化版本，更好地利用 Controller 和基础组件的 API
 */

class CodeEditorPreview extends HTMLElement {
    constructor() {
        super();
        this.controller = null;
        this.isInitialized = false;
        this.elements = {};
        this.config = this.getDefaultConfig();
    }

    // Web Component 生命周期
    connectedCallback() {
        this.parseAttributes();
        this.render();
        this.initializeController();
    }

    disconnectedCallback() {
        if (this.controller) {
            this.controller.destroy();
            this.controller = null;
        }
        this.isInitialized = false;
    }

    static get observedAttributes() {
        return [
            'width', 'height', 'theme', 'language', 
            'show-line-numbers', 'editable', 'auto-preview',
            'show-toolbar', 'show-external-files', 'show-fullscreen',
            'debounce-delay', 'default-code', 'trust-mode'
        ];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue && this.isInitialized) {
            this.handleAttributeChange(name, newValue);
        }
    }

    // 配置方法
    getDefaultConfig() {
        return {
            width: '100%',
            height: 'auto',
            theme: 'prism',
            language: 'html',
            showLineNumbers: false,
            editable: true,
            autoPreview: true,
            showToolbar: true,
            showExternalFiles: true,
            showFullscreen: true,
            debounceDelay: 300,
            trustMode: true
        };
    }

    parseAttributes() {
        const parseBooleanAttr = (value) => value === 'true' || value === '';
        
        if (this.hasAttribute('width')) this.config.width = this.getAttribute('width');
        if (this.hasAttribute('height')) this.config.height = this.getAttribute('height');
        if (this.hasAttribute('theme')) this.config.theme = this.getAttribute('theme');
        if (this.hasAttribute('language')) this.config.language = this.getAttribute('language');
        if (this.hasAttribute('show-line-numbers')) this.config.showLineNumbers = parseBooleanAttr(this.getAttribute('show-line-numbers'));
        if (this.hasAttribute('editable')) this.config.editable = parseBooleanAttr(this.getAttribute('editable'));
        if (this.hasAttribute('auto-preview')) this.config.autoPreview = parseBooleanAttr(this.getAttribute('auto-preview'));
        if (this.hasAttribute('show-toolbar')) this.config.showToolbar = parseBooleanAttr(this.getAttribute('show-toolbar'));
        if (this.hasAttribute('show-external-files')) this.config.showExternalFiles = parseBooleanAttr(this.getAttribute('show-external-files'));
        if (this.hasAttribute('show-fullscreen')) this.config.showFullscreen = parseBooleanAttr(this.getAttribute('show-fullscreen'));
        if (this.hasAttribute('trust-mode')) this.config.trustMode = parseBooleanAttr(this.getAttribute('trust-mode'));
        if (this.hasAttribute('debounce-delay')) this.config.debounceDelay = parseInt(this.getAttribute('debounce-delay')) || 300;
    }

    // 渲染方法 - 简化版
    render() {
        this.innerHTML = `
            <div class="code-editor-preview-wrapper" style="width: ${this.config.width}; height: ${this.config.height};">
                ${this.getStyles()}
                ${this.config.showToolbar ? this.renderToolbar() : ''}
                <div class="code-editor-preview-main">
                    ${this.renderEditorSection()}
                    ${this.renderPreviewSection()}
                </div>
                ${this.config.showExternalFiles ? this.renderExternalFiles() : ''}
                ${this.config.showFullscreen ? this.renderFullscreenOverlay() : ''}
            </div>
        `;
        
        this.cacheElements();
        this.setupEventListeners();
    }

    renderToolbar() {
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
                    <label><input type="checkbox" class="show-line-numbers" ${this.config.showLineNumbers ? 'checked' : ''}> 显示行号</label>
                </div>
                <div class="toolbar-group">
                    <label><input type="checkbox" class="enable-editing" ${this.config.editable ? 'checked' : ''}> 允许编辑</label>
                </div>
                <div class="toolbar-actions">
                    <button class="btn" data-action="copy">📋 复制代码</button>
                    <button class="btn" data-action="clear">🗑️ 清空</button>
                </div>
            </div>
        `;
    }

    renderEditorSection() {
        return `
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
        `;
    }

    renderPreviewSection() {
        return `
            <div class="code-preview-section">
                <div class="section-header">
                    <h3>实时预览</h3>
                    <div class="preview-controls">
                        <button class="btn-icon" data-action="refresh" title="刷新预览">🔄</button>
                        ${this.config.showFullscreen ? '<button class="btn-icon" data-action="fullscreen" title="全屏预览">🔍</button>' : ''}
                    </div>
                </div>
                <div class="code-preview-container" id="codePreview"></div>
            </div>
        `;
    }

    renderExternalFiles() {
        return `
            <div class="external-files-section">
                <div class="section-header">
                    <h3>外部文件导入</h3>
                </div>
                <div class="file-input-group">
                    <input type="text" class="file-path-input" placeholder="输入文件路径">
                    <button class="btn" data-action="add-file">添加文件</button>
                </div>
                <div class="imported-files-list"></div>
            </div>
        `;
    }

    renderFullscreenOverlay() {
        return `
            <div class="fullscreen-overlay" style="display: none;">
                <div class="fullscreen-header">
                    <h3>全屏预览</h3>
                    <button class="btn-close" data-action="close-fullscreen">✕</button>
                </div>
                <div class="fullscreen-preview-container"></div>
            </div>
        `;
    }

    cacheElements() {
        this.elements = {
            wrapper: this.querySelector('.code-editor-preview-wrapper'),
            languageSelect: this.querySelector('.language-select'),
            themeSelect: this.querySelector('.theme-select'),
            showLineNumbers: this.querySelector('.show-line-numbers'),
            enableEditing: this.querySelector('.enable-editing'),
            filePathInput: this.querySelector('.file-path-input'),
            importedFilesList: this.querySelector('.imported-files-list'),
            fullscreenOverlay: this.querySelector('.fullscreen-overlay'),
            codeEditorContainer: this.querySelector('#codeEditor'),
            codePreviewContainer: this.querySelector('#codePreview')
        };
    }

    async initializeController() {
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
                maxHeight: '400px',
                maxWidth: '100%',
                wordWrap: true
            },
            previewOptions: {
                width: '100%',
                height: '400px'
            },
            onCodeChange: (code, language) => {
                this.dispatchEvent(new CustomEvent('code-change', {
                    detail: { code, language }
                }));
            },
            onPreviewUpdate: (code) => {
                this.dispatchEvent(new CustomEvent('preview-update', {
                    detail: { code }
                }));
            },
            onConfigChange: (config) => {
                this.dispatchEvent(new CustomEvent('config-change', {
                    detail: { config }
                }));
            }
        };

        this.controller = await CodeEditorPreviewController.create(controllerOptions);
        this.syncUIWithController();
        this.isInitialized = true;
        
        this.dispatchEvent(new CustomEvent('initialized', {
            detail: { controller: this.controller }
        }));
    }

    // 事件处理 - 简化版
    setupEventListeners() {
        this.addEventListener('click', this.handleClick.bind(this));
        this.addEventListener('change', this.handleChange.bind(this));
        this.addEventListener('keydown', this.handleKeydown.bind(this));
    }

    handleClick(event) {
        const action = event.target.dataset.action;
        if (!action || !this.controller) return;

        const actions = {
            'copy': () => this.controller.copyCode(),
            'clear': () => this.controller.clearCode(),
            'refresh': () => this.controller.refreshPreview(),
            'fullscreen': () => this.openFullscreen(),
            'close-fullscreen': () => this.closeFullscreen(),
            'add-file': () => this.addExternalFile(),
            'remove-file': () => {
                const filePath = event.target.dataset.filePath;
                if (filePath) {
                    this.controller.removeExternalFile(filePath);
                    this.updateExternalFilesList();
                }
            }
        };

        if (actions[action]) {
            actions[action]();
        }
    }

    handleChange(event) {
        if (!this.controller) return;

        const target = event.target;
        const changeHandlers = {
            'language-select': () => this.controller.setLanguage(target.value),
            'theme-select': () => this.controller.updateDisplayConfig({ theme: target.value }),
            'show-line-numbers': () => this.controller.updateDisplayConfig({ showLineNumbers: target.checked }),
            'enable-editing': () => this.controller.updateDisplayConfig({ editable: target.checked })
        };

        for (const [className, handler] of Object.entries(changeHandlers)) {
            if (target.classList.contains(className)) {
                handler();
                break;
            }
        }
    }

    handleKeydown(event) {
        if (event.key === 'Enter' && event.target.classList.contains('file-path-input')) {
            event.preventDefault();
            this.addExternalFile();
        }
    }

    handleAttributeChange(name, newValue) {
        const configKey = name.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
        
        const booleanAttrs = ['show-line-numbers', 'editable', 'auto-preview', 'show-toolbar', 'show-external-files', 'show-fullscreen', 'trust-mode'];
        if (booleanAttrs.includes(name)) {
            this.config[configKey] = newValue === 'true' || newValue === '';
        } else if (name === 'debounce-delay') {
            this.config[configKey] = parseInt(newValue) || 300;
        } else {
            this.config[configKey] = newValue;
        }

        if (this.controller) {
            const displayConfigKeys = ['theme', 'show-line-numbers', 'editable'];
            if (displayConfigKeys.includes(name)) {
                this.controller.updateDisplayConfig({ [configKey]: this.config[configKey] });
            } else if (name === 'language') {
                this.controller.setLanguage(this.config.language);
            } else if (['width', 'height'].includes(name) && this.elements.wrapper) {
                this.elements.wrapper.style[configKey] = this.config[configKey];
            }
        }
    }

    // 功能方法
    syncUIWithController() {
        if (!this.controller) return;
        
        if (this.elements.languageSelect) {
            this.elements.languageSelect.value = this.controller.getLanguage();
        }
        
        if (this.elements.themeSelect) {
            this.elements.themeSelect.value = this.config.theme;
        }
    }

    async addExternalFile() {
        if (!this.controller || !this.elements.filePathInput) return;
        
        const filePath = this.elements.filePathInput.value.trim();
        if (!filePath) return;

        const success = await this.controller.addExternalFile(filePath);
        if (success) {
            this.elements.filePathInput.value = '';
            this.updateExternalFilesList();
        }
    }

    updateExternalFilesList() {
        if (!this.controller || !this.elements.importedFilesList) return;

        const files = this.controller.getExternalFiles();
        
        if (files.length === 0) {
            this.elements.importedFilesList.innerHTML = '<p class="no-files-message">暂无导入的文件</p>';
        } else {
            this.elements.importedFilesList.innerHTML = files.map(filePath => `
                <div class="imported-file-item">
                    <span class="file-icon">📄</span>
                    <span class="file-path">${filePath}</span>
                    <button class="btn-remove" data-action="remove-file" data-file-path="${filePath}">移除</button>
                </div>
            `).join('');
        }
    }

    openFullscreen() {
        if (!this.elements.fullscreenOverlay) return;
        
        this.elements.fullscreenOverlay.style.display = 'flex';
        
        const fullscreenContainer = this.elements.fullscreenOverlay.querySelector('.fullscreen-preview-container');
        if (fullscreenContainer && this.controller) {
            const fullscreenPreview = new CodePreview(fullscreenContainer, {
                width: '100%',
                height: '100%'
            });
            fullscreenPreview.render(this.controller.getCode());
        }
    }

    closeFullscreen() {
        if (this.elements.fullscreenOverlay) {
            this.elements.fullscreenOverlay.style.display = 'none';
        }
    }

    // 公共 API
    async setCode(code, language) {
        return this.controller ? await this.controller.setCode(code, language) : false;
    }

    getCode() {
        return this.controller ? this.controller.getCode() : '';
    }

    async setLanguage(language) {
        return this.controller ? await this.controller.setLanguage(language) : false;
    }

    getLanguage() {
        return this.controller ? this.controller.getLanguage() : this.config.language;
    }

    getController() {
        return this.controller;
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
        }
        h1 { text-align: center; color: #333; }
        .demo { padding: 20px; background: #f5f5f5; border-radius: 8px; margin: 20px 0; }
    </style>
</head>
<body>
    <h1>代码编辑预览器</h1>
    <div class="demo">
        <p>这是一个示例页面，你可以编辑代码并实时预览效果。</p>
    </div>
</body>
</html>`;
    }

    // 样式定义 - 重构版，解决遮挡问题
    getStyles() {
        return `<style>
            /* 主容器 - 移除高度限制，允许自然扩展 */
            .code-editor-preview-wrapper {
                display: flex;
                flex-direction: column;
                border: 1px solid #ddd;
                border-radius: 8px;
                background: #fff;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            }
            
            /* 工具栏 */
            .code-editor-toolbar {
                display: flex;
                align-items: center;
                gap: 15px;
                padding: 8px 12px;
                background: #f8f9fa;
                border-bottom: 1px solid #ddd;
                flex-wrap: wrap;
            }
            
            .toolbar-group {
                display: flex;
                align-items: center;
                gap: 6px;
            }
            
            .toolbar-actions {
                margin-left: auto;
                display: flex;
                gap: 6px;
            }
            
            /* 主内容区域 - 允许自然扩展 */
            .code-editor-preview-main {
                display: flex;
                flex: 1;
                min-width: 0;
                overflow: hidden;
            }
            
            /* 编辑器和预览区域 - 允许自然扩展 */
            .code-editor-section,
            .code-preview-section {
                flex: 1;
                display: flex;
                flex-direction: column;
                min-width: 0;
            }
            
            .code-editor-section {
                border-right: 1px solid #ddd;
            }
            
            /* 区域标题 */
            .section-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 8px 12px;
                background: #f1f3f4;
                border-bottom: 1px solid #ddd;
            }
            
            .section-header h3 {
                margin: 0;
                font-size: 13px;
                font-weight: 600;
                color: #333;
            }
            
            .editor-controls,
            .preview-controls {
                display: flex;
                gap: 6px;
                align-items: center;
            }
            
            /* 内容容器 - 允许内部滚动 */
            .code-editor-container,
            .code-preview-container {
                flex: 1;
                overflow: auto;
            }
            
            /* 外部文件区域 */
            .external-files-section {
                border-top: 1px solid #ddd;
                background: #f8f9fa;
            }
            
            .file-input-group {
                display: flex;
                gap: 8px;
                padding: 8px 12px;
            }
            
            .file-path-input {
                flex: 1;
                padding: 6px 10px;
                border: 1px solid #ddd;
                border-radius: 4px;
                font-size: 13px;
            }
            
            .imported-files-list {
                max-height: 150px;
                overflow-y: auto;
                padding: 0 12px 12px;
            }
            
            .imported-file-item {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 6px 10px;
                background: white;
                border: 1px solid #ddd;
                border-radius: 4px;
                margin-bottom: 6px;
                font-size: 12px;
            }
            
            .file-path {
                font-family: monospace;
                color: #666;
                flex: 1;
                margin-right: 8px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            
            .no-files-message {
                text-align: center;
                color: #999;
                font-style: italic;
                margin: 15px 0;
                font-size: 12px;
            }
            
            /* 全屏覆盖层 */
            .fullscreen-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.9);
                z-index: 9999;
                display: flex;
                flex-direction: column;
            }
            
            .fullscreen-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 12px 16px;
                background: #333;
                color: white;
            }
            
            .fullscreen-preview-container {
                flex: 1;
                background: white;
                overflow: auto;
            }
            
            /* 按钮样式 */
            .btn {
                padding: 4px 10px;
                border: 1px solid #ddd;
                border-radius: 3px;
                background: white;
                cursor: pointer;
                font-size: 12px;
                transition: background 0.2s;
            }
            
            .btn:hover {
                background: #f5f5f5;
            }
            
            .btn-icon {
                padding: 3px 6px;
                border: none;
                background: transparent;
                cursor: pointer;
                font-size: 14px;
                border-radius: 3px;
                transition: background 0.2s;
            }
            
            .btn-icon:hover {
                background: rgba(0, 0, 0, 0.1);
            }
            
            .btn-close, .btn-remove {
                padding: 3px 6px;
                border: none;
                background: #dc3545;
                color: white;
                border-radius: 3px;
                cursor: pointer;
                font-size: 11px;
            }
            
            .btn-close:hover, .btn-remove:hover {
                background: #c82333;
            }
            
            /* 表单元素 */
            select, input[type="checkbox"] {
                margin: 0 2px;
                font-size: 12px;
            }
            
            label {
                display: flex;
                align-items: center;
                gap: 4px;
                font-size: 12px;
                cursor: pointer;
            }
            
            /* 响应式 */
            @media (max-width: 768px) {
                .code-editor-preview-main {
                    flex-direction: column;
                }
                .code-editor-section {
                    border-right: none;
                    border-bottom: 1px solid #ddd;
                }
                
                .toolbar-group {
                    gap: 4px;
                }
                
                .toolbar-actions {
                    margin-left: 0;
                    width: 100%;
                    justify-content: flex-start;
                }
            }
        </style>`;
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