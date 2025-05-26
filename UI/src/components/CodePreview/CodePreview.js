/**
 * CodePreview - 代码预览组件
 * 遵循单一职责原则，只负责代码内容的预览渲染
 * 不包含刷新、全屏、清空、复制等操作功能
 * 
 * 使用方法:
 * const codePreview = new CodePreview(container, options);
 * codePreview.render(code);
 */

class CodePreview {
    constructor(container, options = {}) {
        this.container = typeof container === 'string' ? document.querySelector(container) : container;
        this.options = {
            width: '100%',
            height: '400px',
            sandbox: 'allow-scripts allow-same-origin allow-forms',
            errorDisplay: true, // 默认信任模式，不显示错误
            onError: null,
            onLoad: null,
            ...options
        };
        
        this.currentCode = '';
        this.iframe = null;
        this.errorElement = null;
        this.isLoading = true;
        
        this.init();
    }

    // 初始化组件
    init() {
        this.createStyles();
        this.createPreviewContainer();
    }

    // 创建自定义样式
    createStyles() {
        if (document.querySelector('#code-preview-styles')) return;

        const style = document.createElement('style');
        style.id = 'code-preview-styles';
        style.textContent = `
            .code-preview-container {
                position: relative;
                width: 100%;
                background: #f8f9fa;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            }

            .code-preview-iframe {
                width: 100%;
                border: none;
                background: white;
                display: block;
                transition: opacity 0.3s ease;
            }

            .code-preview-loading {
                opacity: 0.6;
                pointer-events: none;
            }

            .code-preview-error {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                background: #f8d7da;
                color: #721c24;
                padding: 15px 20px;
                border-bottom: 1px solid #f5c6cb;
                display: none;
                z-index: 10;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                font-size: 14px;
                line-height: 1.4;
            }

            .code-preview-error.show {
                display: block;
            }

            .code-preview-error-title {
                font-weight: 600;
                margin-bottom: 5px;
            }

            .code-preview-error-message {
                font-family: monospace;
                font-size: 12px;
                background: rgba(0, 0, 0, 0.1);
                padding: 8px;
                border-radius: 4px;
                margin-top: 8px;
                word-break: break-all;
            }

            .code-preview-iframe-container {
                position: relative;
                overflow: hidden;
            }
        `;
        document.head.appendChild(style);
    }

    // 创建预览容器
    createPreviewContainer() {
        // 创建主容器
        const container = document.createElement('div');
        container.className = 'code-preview-container';
        container.style.width = this.options.width;
        container.style.height = this.options.height;

        // 创建错误显示元素
        if (this.options.errorDisplay) {
            this.errorElement = document.createElement('div');
            this.errorElement.className = 'code-preview-error';
            container.appendChild(this.errorElement);
        }

        // 创建iframe容器
        const iframeContainer = document.createElement('div');
        iframeContainer.className = 'code-preview-iframe-container';
        iframeContainer.style.height = '100%';

        // 创建iframe
        this.iframe = document.createElement('iframe');
        this.iframe.className = 'code-preview-iframe';
        this.iframe.style.height = '100%';
        this.iframe.sandbox = this.options.sandbox;

        // 设置iframe事件
        this.setupIframeEvents();

        iframeContainer.appendChild(this.iframe);
        container.appendChild(iframeContainer);

        // 清空容器并添加新内容
        this.container.innerHTML = '';
        this.container.appendChild(container);

        return container;
    }

    // 设置iframe事件
    setupIframeEvents() {
        // iframe加载完成事件
        this.iframe.addEventListener('load', () => {
            this.isLoading = false;
            this.iframe.classList.remove('code-preview-loading');
            this.hideError();
            
            if (this.options.onLoad && typeof this.options.onLoad === 'function') {
                this.options.onLoad();
            }

            // 监听iframe内部的错误
            this.setupIframeErrorHandling();
        });

        // iframe加载错误事件
        this.iframe.addEventListener('error', (e) => {
            this.isLoading = false;
            this.iframe.classList.remove('code-preview-loading');
            this.showError('预览加载失败', '无法加载预览内容，请检查代码是否正确');
        });
    }

    // 设置iframe内部错误处理
    setupIframeErrorHandling() {
        try {
            const iframeWindow = this.iframe.contentWindow;
            const iframeDocument = this.iframe.contentDocument;

            if (iframeWindow && iframeDocument) {
                // 监听JavaScript错误
                iframeWindow.addEventListener('error', (e) => {
                    this.showError('JavaScript 执行错误', `${e.message}\n在第 ${e.lineno} 行`);
                    
                    if (this.options.onError && typeof this.options.onError === 'function') {
                        this.options.onError(e);
                    }
                });

                // 监听Promise rejection
                iframeWindow.addEventListener('unhandledrejection', (e) => {
                    this.showError('Promise 执行错误', e.reason.toString());
                    
                    if (this.options.onError && typeof this.options.onError === 'function') {
                        this.options.onError(e);
                    }
                });
            }
        } catch (error) {
            // 跨域限制，无法监听iframe内部错误
            console.warn('CodePreview: 无法监听iframe内部错误（可能由于跨域限制）');
        }
    }

    // 渲染代码预览
    render(code) {
        if (typeof code !== 'string') {
            this.showError('无效的代码内容', '传入的代码必须是字符串类型');
            return;
        }

        this.currentCode = code;
        this.isLoading = true;
        this.iframe.classList.add('code-preview-loading');
        this.hideError();

        try {
            // 注入滚动条样式到代码中
            const processedCode = this.injectScrollbarStyles(code || this.getEmptyPageHtml());
            this.iframe.srcdoc = processedCode;
            
        } catch (error) {
            this.isLoading = false;
            this.iframe.classList.remove('code-preview-loading');
            this.showError('代码处理错误', error.message);
            
            if (this.options.onError && typeof this.options.onError === 'function') {
                this.options.onError(error);
            }
        }
    }

    // 获取空页面HTML
    getEmptyPageHtml() {
        return '<div style="padding:20px;color:#666;text-align:center;">暂无预览内容</div>';
    }

    // 注入滚动条样式到代码中
    injectScrollbarStyles(code) {
        const scrollbarStyles = `
            <style>
                /* 滚动条样式 - 与CodeDisplay.js保持一致 */
                * {
                    scrollbar-width: thin;
                    scrollbar-color: #c1c1c1 #f1f1f1;
                }

                *::-webkit-scrollbar {
                    width: 12px;
                    height: 12px;
                }

                *::-webkit-scrollbar-track {
                    background: #f1f1f1;
                    border-radius: 6px;
                }

                *::-webkit-scrollbar-thumb {
                    background: #c1c1c1;
                    border-radius: 6px;
                    transition: background 0.3s ease;
                }

                *::-webkit-scrollbar-thumb:hover {
                    background: #a8a8a8;
                }
            </style>
        `;

        // 检查代码是否已经包含完整的HTML结构
        if (code.toLowerCase().includes('<!doctype') || code.toLowerCase().includes('<html')) {
            // 完整的HTML文档，在head中注入样式
            if (code.toLowerCase().includes('<head>')) {
                return code.replace(/<head>/i, `<head>${scrollbarStyles}`);
            } else if (code.toLowerCase().includes('<html>')) {
                return code.replace(/<html>/i, `<html><head>${scrollbarStyles}</head>`);
            } else {
                return code.replace(/<!doctype[^>]*>/i, `$&<head>${scrollbarStyles}</head>`);
            }
        } else if (code.toLowerCase().includes('<body>')) {
            // 包含body标签但不是完整HTML，在body前添加样式
            return code.replace(/<body>/i, `${scrollbarStyles}<body>`);
        } else {
            // 代码片段，包装在完整的HTML结构中
            return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    ${scrollbarStyles}
</head>
<body>
    ${code}
</body>
</html>`;
        }
    }

    // HTML转义
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // 显示错误信息
    showError(title, message) {
        if (!this.errorElement) return;

        this.errorElement.innerHTML = `
            <div class="code-preview-error-title">${title}</div>
            ${message ? `<div class="code-preview-error-message">${this.escapeHtml(message)}</div>` : ''}
        `;
        this.errorElement.classList.add('show');
    }

    // 隐藏错误信息
    hideError() {
        if (this.errorElement) {
            this.errorElement.classList.remove('show');
        }
    }

    // 获取当前代码
    getCode() {
        return this.currentCode;
    }

    // 检查是否正在加载
    isLoadingState() {
        return this.isLoading;
    }

    // 设置预览尺寸
    setSize(width, height) {
        if (width) {
            this.options.width = width;
            const container = this.container.querySelector('.code-preview-container');
            if (container) {
                container.style.width = width;
            }
        }
        
        if (height) {
            this.options.height = height;
            const container = this.container.querySelector('.code-preview-container');
            if (container) {
                container.style.height = height;
            }
            if (this.iframe) {
                this.iframe.style.height = height;
            }
        }
    }

    // 销毁组件
    destroy() {
        if (this.iframe) {
            this.iframe.src = 'about:blank';
        }
        
        if (this.container) {
            this.container.innerHTML = '';
        }
        
        this.iframe = null;
        this.errorElement = null;
    }

    // 静态方法：快速创建预览组件
    static async create(container, code = '', options = {}) {
        const preview = new CodePreview(container, options);
        if (code) {
            preview.render(code);
        }
        return preview;
    }
}

// 模块化支持
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CodePreview;
}

if (typeof define === 'function' && define.amd) {
    define([], () => CodePreview);
}

if (typeof window !== 'undefined') {
    window.CodePreview = CodePreview;
} 