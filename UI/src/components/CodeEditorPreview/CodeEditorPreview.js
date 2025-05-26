/**
 * CodeEditorPreview Web Component
 * 遵循数据驱动原则，只负责UI渲染和事件转发，所有计算逻辑由Controller处理
 */

import { CodeEditorPreviewController } from './CodeEditorPreviewController.js';

class CodeEditorPreview extends HTMLElement {
    constructor() {
        super();
        this.controller = null;
        this.isInitialized = false;
        this.elements = {};
        
        // 添加样式表
        if (!document.querySelector('link[href*="CodeEditorPreview.css"]')) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            // 使用相对于当前脚本的路径
            const scriptPath = document.currentScript?.src || '';
            const basePath = scriptPath.substring(0, scriptPath.lastIndexOf('/') + 1);
            link.href = basePath + 'CodeEditorPreview.css';
            document.head.appendChild(link);
        }
    }

    // Web Component 生命周期
    connectedCallback() {
        const config = this.parseAttributes();
        this.render(config);
        this.initializeController(config);
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
            'width', 'theme', 'language', 
            'editable', 'auto-preview',
            'show-toolbar', 'show-fullscreen',
            'debounce-delay', 'default-code', 'external-files',
            'instructions'
        ];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue && this.isInitialized && this.controller) {
            const key = name.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
            this.controller.handleAttributeChange(key, newValue, oldValue);
        }
    }

    // 配置解析 - 仅获取属性值
    parseAttributes() {
        const parseBooleanAttr = (value) => value === 'true' || value === '';
        let externalFiles = [];
        
        if (this.hasAttribute('external-files')) {
            const filesAttr = this.getAttribute('external-files');
            if (filesAttr) {
                externalFiles = JSON.parse(filesAttr) || filesAttr.split(',').map(f => f.trim()).filter(f => f);
            }
        }
        
        return {
            width: this.getAttribute('width') || '100%',
            theme: this.getAttribute('theme') || 'prism',
            language: this.getAttribute('language') || 'html',
            editable: this.hasAttribute('editable') ? parseBooleanAttr(this.getAttribute('editable')) : true,
            autoPreview: this.hasAttribute('auto-preview') ? parseBooleanAttr(this.getAttribute('auto-preview')) : true,
            showToolbar: this.hasAttribute('show-toolbar') ? parseBooleanAttr(this.getAttribute('show-toolbar')) : true,
            showFullscreen: this.hasAttribute('show-fullscreen') ? parseBooleanAttr(this.getAttribute('show-fullscreen')) : true,
            debounceDelay: this.hasAttribute('debounce-delay') ? parseInt(this.getAttribute('debounce-delay')) : 300,
            defaultCode: this.getAttribute('default-code') || this.getDefaultCode(),
            externalFiles,
            instructions: this.getAttribute('instructions') || ''
        };
    }

    // 初始渲染 - 纯UI结构
    render(config) {
        this.innerHTML = `
            <div class="code-editor-preview-wrapper" style="width: ${config.width};">
                ${config.showToolbar ? `
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
                            <label><input type="checkbox" class="enable-editing" ${config.editable ? 'checked' : ''}> 允许编辑</label>
                        </div>
                        <div class="toolbar-group">
                            <button class="btn view-switch-btn active" data-action="switch-to-editor">代码编辑器</button>
                            <button class="btn view-switch-btn" data-action="switch-to-instructions">使用说明</button>
                        </div>
                        <div class="toolbar-actions">
                            <button class="btn" data-action="copy">📋 复制代码</button>
                            <button class="btn" data-action="reset">🔄 重置</button>
                            <button class="btn" data-action="clear">🗑️ 清空</button>
                        </div>
                    </div>
                ` : ''}
                
                <div class="code-editor-preview-main">
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
                        
                        <!-- 使用说明覆盖层 -->
                        <div class="instructions-overlay" style="display: none;">
                            <div class="instructions-content">
                                <div class="instructions-text">${config.instructions || '开发者还没有写使用说明哦'}</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="code-preview-section">
                        <div class="section-header">
                            <h3>实时预览</h3>
                            <div class="preview-controls">
                                <button class="btn-icon" data-action="refresh" title="刷新预览">🔄</button>
                                ${config.showFullscreen ? '<button class="btn-icon" data-action="fullscreen" title="全屏预览">🔍</button>' : ''}
                            </div>
                        </div>
                        <div class="code-preview-container" id="codePreview"></div>
                    </div>
                </div>

                <div class="external-files-section">
                    <div class="section-header">
                        <h3>外部文件导入</h3>
                        <div class="file-input-group">
                            <input type="text" class="file-path-input" placeholder="输入文件路径或 URL">
                            <button class="btn-add" data-action="add-file">
                                <span class="icon">+</span>
                                添加
                            </button>
                        </div>
                    </div>
                    <div class="imported-files-container">
                        <div class="imported-files-list">
                            <p class="no-files-message">暂无导入的文件</p>
                        </div>
                    </div>
                </div>
                
                ${config.showFullscreen ? `
                    <div class="fullscreen-overlay" style="display: none;">
                        <button class="fullscreen-close-btn" data-action="close-fullscreen">✕</button>
                        <div class="fullscreen-preview-container"></div>
                    </div>
                ` : ''}
            </div>
        `;
        
        this.cacheElements();
        this.setupEventListeners();
    }

    cacheElements() {
        this.elements = {
            wrapper: this.querySelector('.code-editor-preview-wrapper'),
            languageSelect: this.querySelector('.language-select'),
            themeSelect: this.querySelector('.theme-select'),
            enableEditing: this.querySelector('.enable-editing'),
            filePathInput: this.querySelector('.file-path-input'),
            importedFilesList: this.querySelector('.imported-files-list'),
            fullscreenOverlay: this.querySelector('.fullscreen-overlay'),
            codeEditorContainer: this.querySelector('#codeEditor'),
            codePreviewContainer: this.querySelector('#codePreview'),
            instructionsOverlay: this.querySelector('.instructions-overlay'),
            instructionsText: this.querySelector('.instructions-text'),
            viewSwitchBtns: this.querySelectorAll('.view-switch-btn')
        };
    }

    // 事件处理 - 纯事件转发
    setupEventListeners() {
        this.addEventListener('click', this.handleClick.bind(this));
        this.addEventListener('change', this.handleChange.bind(this));
        this.addEventListener('keydown', this.handleKeydown.bind(this));
    }

    handleClick(event) {
        if (!this.controller) return;
        const action = event.target.dataset.action;
        if (!action) return;

        const filePath = event.target.dataset.filePath;
        // 使用异步处理来支持全屏预览等异步操作
        this.controller.handleAction(action, { filePath }).catch(error => {
            console.error('处理操作时出错:', error);
        });
    }

    handleChange(event) {
        if (!this.controller) return;
        const target = event.target;
        
        if (target.classList.contains('language-select')) {
            this.controller.setLanguage(target.value);
        } else if (target.classList.contains('theme-select')) {
            this.controller.updateDisplayConfig({ theme: target.value });
        } else if (target.classList.contains('enable-editing')) {
            this.controller.updateDisplayConfig({ editable: target.checked });
        }
    }

    handleKeydown(event) {
        if (event.key === 'Enter' && event.target.classList.contains('file-path-input')) {
            event.preventDefault();
            this.controller.addExternalFile(this.elements.filePathInput.value.trim());
            this.elements.filePathInput.value = '';
        }
    }

    // 初始化控制器
    async initializeController(config) {
        const controllerOptions = {
            displayContainer: this.elements.codeEditorContainer,
            previewContainer: this.elements.codePreviewContainer,
            defaultCode: config.defaultCode,
            defaultLanguage: config.language,
            autoPreview: config.autoPreview,
            debounceDelay: config.debounceDelay,
            initialConfig: config,
            instructions: config.instructions,
            displayOptions: {
                theme: config.theme,
                editable: config.editable,
                maxHeight: '400px',
                wordWrap: true
            },
            previewOptions: {
                width: '100%',
                height: '400px'
            },
            uiElements: this.elements,
            componentRef: this,
            callbacks: {
                onCodeChange: (code, language) => {
                    this.dispatchEvent(new CustomEvent('code-change', { detail: { code, language } }));
                },
                onStateChange: (newState, oldState) => {
                    this.updateUI(newState, oldState);
                }
            }
        };

        this.controller = await CodeEditorPreviewController.create(controllerOptions);
        this.isInitialized = true;
    }

    // UI更新 - 响应状态变化
    updateUI(newState, oldState = {}) {
        // 只在必要时更新UI元素
        if (!newState) return;
        
        // 视图切换更新
        if (newState.currentView !== oldState.currentView) {
            this.updateViewDisplay(newState.currentView);
        }
        
        // 使用说明内容更新
        if (newState.instructions !== oldState.instructions && this.elements.instructionsText) {
            this.elements.instructionsText.textContent = newState.instructions || '开发者还没有写使用说明哦';
        }
        
        // 外部文件列表更新
        if (newState.externalFiles !== oldState.externalFiles && this.elements.importedFilesList) {
            this.updateFilesList(newState.externalFiles);
        }
        
        // 语言选择器更新
        if (newState.currentLanguage !== oldState.currentLanguage && this.elements.languageSelect) {
            this.elements.languageSelect.value = newState.currentLanguage;
        }
        
        // 主题选择器更新
        if (newState.theme !== oldState.theme && this.elements.themeSelect) {
            this.elements.themeSelect.value = newState.theme;
        }
        
        // 可编辑状态更新
        if (newState.editable !== oldState.editable && this.elements.enableEditing) {
            this.elements.enableEditing.checked = newState.editable;
        }
    }

    // 文件列表UI更新
    updateFilesList(files = []) {
        if (!this.elements.importedFilesList) return;
        
        if (!files.length) {
            this.elements.importedFilesList.innerHTML = '<p class="no-files-message">暂无导入的文件</p>';
            return;
        }
        
        this.elements.importedFilesList.innerHTML = files.map(filePath => `
            <div class="imported-file-item">
                <span class="file-icon">📄</span>
                <span class="file-path">${filePath}</span>
                <button class="btn-remove" data-action="remove-file" data-file-path="${filePath}">移除</button>
            </div>
        `).join('');
    }

    // 视图切换显示更新
    updateViewDisplay(currentView) {
        if (!this.elements.instructionsOverlay) return;
        
        // 更新按钮状态
        this.elements.viewSwitchBtns.forEach(btn => {
            btn.classList.remove('active');
            if ((currentView === 'editor' && btn.dataset.action === 'switch-to-editor') ||
                (currentView === 'instructions' && btn.dataset.action === 'switch-to-instructions')) {
                btn.classList.add('active');
            }
        });
        
        // 切换显示：显示或隐藏使用说明覆盖层
        this.elements.instructionsOverlay.style.display = currentView === 'instructions' ? 'block' : 'none';
    }

    // 简化的公共API - 直接代理到控制器
    getCode() { return this.controller?.getCode() || ''; }
    setCode(code, language) { return this.controller?.setCode(code, language) || false; }
    getLanguage() { return this.controller?.getLanguage() || 'html'; }
    setLanguage(language) { return this.controller?.setLanguage(language) || false; }
    getExternalFiles() { return this.controller?.getExternalFiles() || []; }
    getInstructions() { return this.controller?.getInstructions() || ''; }
    setInstructions(instructions) { return this.controller?.setInstructions(instructions) || false; }
    switchToEditor() { return this.controller?.switchToEditor() || false; }
    switchToInstructions() { return this.controller?.switchToInstructions() || false; }
    getController() { return this.controller; }

    // 默认示例代码
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