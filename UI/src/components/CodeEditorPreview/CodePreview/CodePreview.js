/**
 * CodePreview - 代码预览组件
 * 遵循单一职责原则，只负责代码内容的预览渲染
 * 不包含刷新、全屏、清空、复制等操作功能
 * 
 * 使用方法:
 * const codePreview = new CodePreview(container, options);
 * codePreview.render(code);
 */

export class CodePreview {
    constructor(container, options = {}) {
        this.container = typeof container === 'string' ? document.querySelector(container) : container;
        this.options = {
            width: '100%',
            height: '400px',
            sandbox: 'allow-scripts allow-same-origin allow-forms allow-modals',
            onLoad: null,
            ...options
        };
        
        this.currentCode = '';
        this.iframe = null;
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
            
            if (this.options.onLoad && typeof this.options.onLoad === 'function') {
                this.options.onLoad();
            }
        });
    }

    // 渲染代码预览
    render(code) {
        if (typeof code !== 'string') {
            code = '';
        }

        this.currentCode = code;
        this.isLoading = true;
        this.iframe.classList.add('code-preview-loading');

        // 注入滚动条样式到代码中
        const processedCode = this.injectScrollbarStyles(code || this.getEmptyPageHtml());
        this.iframe.srcdoc = processedCode;
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

        const webSocketScript = `
            <script>
                // 防止WebSocket连接错误
                window.WebSocket = function(url) {
                    console.log('WebSocket连接已被沙箱环境拦截:', url);
                    return {
                        send: function() {},
                        close: function() {},
                        addEventListener: function() {},
                        removeEventListener: function() {}
                    };
                };
            </script>
        `;

        return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    ${scrollbarStyles}
    ${webSocketScript}
</head>
<body>
    ${code}
</body>
</html>`;
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