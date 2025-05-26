/**
 * CodeDisplay - 代码展示组件
 * 基于 Prism.js 的代码高亮展示工具
 * 遵循单一职责原则，只负责代码的展示、高亮和编辑
 * 
 * 使用方法:
 * const codeDisplay = new CodeDisplay(container, options);
 * codeDisplay.render(code, language);
 */

export class CodeDisplay {
    constructor(container, options = {}) {
        this.container = typeof container === 'string' ? document.querySelector(container) : container;
        this.options = {
            theme: 'prism',
            autoHighlight: true,
            editable: false,
            maxHeight: '500px',
            maxWidth: '100%',
            wordWrap: true,
            onChange: null,
            ...options
        };
        
        this.currentCode = '';
        this.currentLanguage = 'javascript';
        this.isEditing = false;
        this.editElement = null;
        this.displayElement = null;
        
        this.init();
    }

    // 初始化组件
    init() {
        this.loadPrismResources();
        this.createStyles();
    }

    // 加载 Prism.js 资源
    loadPrismResources() {
        const resources = {
            css: [
                { id: 'prism-theme-css', href: `https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/${this.options.theme}.min.css` },
                { href: 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/line-numbers/prism-line-numbers.min.css' }
            ],
            js: [
                'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-core.min.js',
                'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/autoloader/prism-autoloader.min.js',
                'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/line-numbers/prism-line-numbers.min.js'
            ]
        };

        // 加载 CSS
        resources.css.forEach(({ id, href }) => {
            const selector = id ? `#${id}` : `link[href="${href}"]`;
            if (!document.querySelector(selector)) {
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = href;
                if (id) link.id = id;
                document.head.appendChild(link);
            }
        });

        // 加载 JS
        if (!window.Prism) {
            this.loadScriptsSequentially(resources.js).then(() => {
                if (window.Prism?.plugins?.autoloader) {
                    window.Prism.plugins.autoloader.languages_path = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/';
                }
            });
        }
    }

    // 按顺序加载脚本
    loadScriptsSequentially(scripts) {
        return scripts.reduce((promise, src) => {
            return promise.then(() => {
                if (document.querySelector(`script[src="${src}"]`)) {
                    return Promise.resolve();
                }
                return new Promise((resolve) => {
                    const script = document.createElement('script');
                    script.src = src;
                    script.onload = resolve;
                    document.head.appendChild(script);
                });
            });
        }, Promise.resolve());
    }

    // 检查 Prism 是否可用
    isPrismReady() {
        return window.Prism && window.Prism.highlightElement;
    }

    // 等待 Prism 加载完成
    waitForPrism(timeout = 3000) {
        return new Promise((resolve) => {
            if (this.isPrismReady()) {
                resolve();
                return;
            }

            const startTime = Date.now();
            const checkInterval = setInterval(() => {
                if (this.isPrismReady()) {
                    clearInterval(checkInterval);
                    resolve();
                } else if (Date.now() - startTime > timeout) {
                    clearInterval(checkInterval);
                    resolve();
                }
            }, 100);
        });
    }

    // 创建自定义样式
    createStyles() {
        if (document.querySelector('#code-display-styles')) return;

        const style = document.createElement('style');
        style.id = 'code-display-styles';
        style.textContent = `
            .code-display-container {
                margin: 0;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                background: white;
                max-height: ${this.options.maxHeight};
                max-width: ${this.options.maxWidth};
                position: relative;
                width: 100%;
            }

            .code-display-container pre,
            .code-display-editor {
                margin: 0 !important;
                border: none !important;
                border-radius: 8px !important;
                overflow: auto;
                max-height: ${this.options.maxHeight};
                width: 100%;
                box-sizing: border-box;
                font-size: 14px !important;
                line-height: 1.6 !important;
                font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
                padding: 16px;
                scrollbar-width: thin;
                scrollbar-color: #c1c1c1 #f1f1f1;
                height: auto;
            }

            .code-display-container pre::-webkit-scrollbar,
            .code-display-editor::-webkit-scrollbar {
                width: 12px;
                height: 12px;
            }

            .code-display-container pre::-webkit-scrollbar-track,
            .code-display-editor::-webkit-scrollbar-track {
                background: #f1f1f1;
                border-radius: 6px;
            }

            .code-display-container pre::-webkit-scrollbar-thumb,
            .code-display-editor::-webkit-scrollbar-thumb {
                background: #c1c1c1;
                border-radius: 6px;
                transition: background 0.3s ease;
            }

            .code-display-container pre::-webkit-scrollbar-thumb:hover,
            .code-display-editor::-webkit-scrollbar-thumb:hover {
                background: #a8a8a8;
            }

            .code-display-container pre code {
                display: block;
                white-space: ${this.options.wordWrap ? 'pre-wrap' : 'pre'};
                word-wrap: ${this.options.wordWrap ? 'break-word' : 'normal'};
                overflow: visible;
                outline: none;
                width: 100%;
                max-width: 100%;
                box-sizing: border-box;
                padding: 0;
            }

            .code-display-editor {
                resize: none;
                outline: none;
                background: #f8f8f8;
                color: #333;
                white-space: ${this.options.wordWrap ? 'pre-wrap' : 'pre'};
                word-wrap: ${this.options.wordWrap ? 'break-word' : 'normal'};
                max-width: 100%;
            }

            .code-display-container.editable {
                border: 2px solid transparent;
                transition: border-color 0.3s ease;
                cursor: pointer;
            }

            .code-display-container.editable:hover {
                border-color: #007acc;
                box-shadow: 0 2px 10px rgba(0, 122, 204, 0.2);
            }

            .code-display-container.editing {
                border-color: #007acc;
                box-shadow: 0 2px 10px rgba(0, 122, 204, 0.2);
            }

            .code-display-container.editable::after {
                content: '双击编辑';
                position: absolute;
                top: 8px;
                right: 8px;
                background: rgba(0, 122, 204, 0.8);
                color: white;
                padding: 2px 8px;
                border-radius: 4px;
                font-size: 11px;
                font-weight: 500;
                opacity: 0;
                transition: opacity 0.3s ease;
                pointer-events: none;
                z-index: 10;
            }

            .code-display-container.editable:hover::after {
                opacity: 1;
            }

            .code-display-container.editing::after {
                content: 'ESC退出编辑';
                opacity: 1;
            }

            .code-display-container.line-numbers pre {
                padding-left: 3.8em;
            }

            .code-display-hidden {
                display: none !important;
            }
        `;
        document.head.appendChild(style);
    }

    // 渲染代码
    async render(code, language = 'javascript') {
        if (!code) {
            code = '';
        }

        this.currentCode = code;
        this.currentLanguage = language;

        // 等待 Prism 加载完成
        await this.waitForPrism();

        // 创建容器
        const container = document.createElement('div');
        container.className = `code-display-container line-numbers${this.options.editable ? ' editable' : ''}`;
        
        // 创建展示元素
        this.displayElement = this.createDisplayElement(code, language);
        container.appendChild(this.displayElement);

        // 如果可编辑，创建编辑元素
        if (this.options.editable) {
            this.editElement = this.createEditElement(code);
            container.appendChild(this.editElement);
            this.setupEditableEvents(container);
        }

        // 清空容器并添加新内容
        this.container.innerHTML = '';
        this.container.appendChild(container);

        return container;
    }

    // 创建展示元素
    createDisplayElement(code, language) {
        const pre = document.createElement('pre');
        const codeElement = document.createElement('code');
        codeElement.className = `language-${language}`;
        codeElement.textContent = code;

        pre.appendChild(codeElement);

        // 高亮代码
        if (this.options.autoHighlight && window.Prism) {
            window.Prism.highlightElement(codeElement);
        }

        return pre;
    }

    // 创建编辑元素
    createEditElement(code) {
        const textarea = document.createElement('textarea');
        textarea.className = 'code-display-editor code-display-hidden';
        textarea.value = code;
        textarea.spellcheck = false;

        // 动态调整高度的函数
        const adjustHeight = () => {
            textarea.style.height = 'auto';
            textarea.style.height = Math.max(textarea.scrollHeight, 100) + 'px';
        };

        // 设置编辑器事件
        textarea.addEventListener('input', () => {
            this.currentCode = textarea.value;
            adjustHeight(); // 动态调整高度
            if (this.options.onChange && typeof this.options.onChange === 'function') {
                this.options.onChange(this.currentCode, this.currentLanguage);
            }
        });

        // 键盘事件
        textarea.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                e.preventDefault();
                this.exitEditMode();
            } else if (e.key === 'Tab') {
                e.preventDefault();
                const start = textarea.selectionStart;
                const end = textarea.selectionEnd;
                const value = textarea.value;
                
                textarea.value = value.substring(0, start) + '    ' + value.substring(end);
                textarea.selectionStart = textarea.selectionEnd = start + 4;
                textarea.dispatchEvent(new Event('input'));
            }
        });

        // 初始化高度
        setTimeout(() => adjustHeight(), 0);

        return textarea;
    }

    // 设置可编辑事件
    setupEditableEvents(container) {
        this.displayElement.addEventListener('dblclick', () => {
            if (!this.isEditing) {
                this.enterEditMode();
            }
        });

        document.addEventListener('click', (e) => {
            if (this.isEditing && !container.contains(e.target)) {
                this.exitEditMode();
            }
        });
    }

    // 进入编辑模式
    enterEditMode() {
        if (!this.options.editable || this.isEditing) return;

        this.isEditing = true;
        const container = this.container.querySelector('.code-display-container');
        
        container.classList.add('editing');
        this.displayElement.classList.add('code-display-hidden');
        this.editElement.classList.remove('code-display-hidden');
        this.editElement.value = this.currentCode;
        
        // 同步高度 - 获取展示元素的高度并应用到编辑器
        setTimeout(() => {
            const displayHeight = this.displayElement.offsetHeight;
            if (displayHeight > 0) {
                this.editElement.style.height = displayHeight + 'px';
            } else {
                // 如果无法获取展示元素高度，则使用动态调整
                this.editElement.style.height = 'auto';
                this.editElement.style.height = Math.max(this.editElement.scrollHeight, 100) + 'px';
            }
            this.editElement.focus();
        }, 0);
    }

    // 退出编辑模式
    exitEditMode() {
        if (!this.isEditing) return;

        this.isEditing = false;
        const container = this.container.querySelector('.code-display-container');
        
        this.currentCode = this.editElement.value;
        
        // 只更新代码内容，不重新创建整个元素
        const codeElement = this.displayElement.querySelector('code');
        if (codeElement) {
            codeElement.textContent = this.currentCode;
            
            // 重新高亮代码
            if (this.options.autoHighlight && window.Prism) {
                window.Prism.highlightElement(codeElement);
            }
        }
        
        container.classList.remove('editing');
        this.displayElement.classList.remove('code-display-hidden');
        this.editElement.classList.add('code-display-hidden');
    }

    // 获取当前显示的代码
    getCode() {
        return this.currentCode;
    }

    // 获取当前语言
    getLanguage() {
        return this.currentLanguage;
    }

    // 设置代码内容
    setCode(code, language) {
        const oldLanguage = this.currentLanguage;
        const oldCode = this.currentCode;
        
        if (language && language !== oldLanguage) {
            this.currentLanguage = language;
        }
        
        if (code !== oldCode) {
            this.currentCode = code;
            
            // 更新代码内容
            const codeElement = this.displayElement?.querySelector('code');
            if (codeElement) {
                codeElement.textContent = code;
                
                // 如果语言也改变了，更新语言类名
                if (language && language !== oldLanguage) {
                    codeElement.className = codeElement.className.replace(/language-\w+/g, '');
                    codeElement.className += ` language-${language}`;
                }
                
                // 重新高亮代码
                if (this.options.autoHighlight && window.Prism) {
                    window.Prism.highlightElement(codeElement);
                }
            }
            
            // 如果在编辑模式，同步更新编辑器内容
            if (this.isEditing && this.editElement) {
                this.editElement.value = code;
            }
        } else if (language && language !== oldLanguage) {
            // 只是语言改变，使用 setLanguage 方法
            this.setLanguage(language);
        }
    }

    // 设置语言（不重新创建组件）
    setLanguage(language) {
        if (language && language !== this.currentLanguage) {
            this.currentLanguage = language;
            
            // 只更新代码元素的语言类名和重新高亮
            const codeElement = this.displayElement?.querySelector('code');
            if (codeElement) {
                // 移除旧的语言类名
                codeElement.className = codeElement.className.replace(/language-\w+/g, '');
                // 添加新的语言类名
                codeElement.className += ` language-${language}`;
                
                // 重新高亮代码
                if (this.options.autoHighlight && window.Prism) {
                    window.Prism.highlightElement(codeElement);
                }
            }
        }
    }

    // 切换编辑模式
    setEditable(editable) {
        this.options.editable = editable;
        
        if (this.isEditing && !editable) {
            this.exitEditMode();
        }
        
        // 更新容器的可编辑状态，而不是重新渲染整个组件
        const container = this.container.querySelector('.code-display-container');
        if (container) {
            if (editable) {
                container.classList.add('editable');
                // 如果还没有编辑元素，创建一个
                if (!this.editElement) {
                    this.editElement = this.createEditElement(this.currentCode);
                    container.appendChild(this.editElement);
                    this.setupEditableEvents(container);
                }
            } else {
                container.classList.remove('editable');
                // 移除编辑元素
                if (this.editElement) {
                    this.editElement.remove();
                    this.editElement = null;
                }
            }
        } else {
            // 如果容器不存在，则重新渲染
            this.render(this.currentCode, this.currentLanguage);
        }
    }

    // 切换主题
    changeTheme(theme) {
        this.options.theme = theme;
        const themeLink = document.querySelector('#prism-theme-css');
        if (themeLink) {
            themeLink.href = `https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/${theme}.min.css`;
            setTimeout(() => {
                this.rehighlightCode();
            }, 200);
        } else {
            this.loadPrismResources();
            setTimeout(() => {
                this.rehighlightCode();
            }, 300);
        }
    }

    // 重新高亮代码
    rehighlightCode() {
        if (!this.displayElement) return;
        
        const codeElement = this.displayElement.querySelector('code');
        if (codeElement && this.options.autoHighlight && window.Prism) {
            // 清除之前的高亮类
            codeElement.className = codeElement.className.replace(/language-\w+/g, '');
            codeElement.className += ` language-${this.currentLanguage}`;
            
            // 重新高亮
            window.Prism.highlightElement(codeElement);
        }
    }

    // 销毁组件
    destroy() {
        if (this.isEditing) {
            this.exitEditMode();
        }
        
        if (this.container) {
            this.container.innerHTML = '';
        }
        
        this.displayElement = null;
        this.editElement = null;
    }

    // 静态方法：快速创建代码展示
    static async create(container, code, language = 'javascript', options = {}) {
        const display = new CodeDisplay(container, options);
        await display.render(code, language);
        return display;
    }
} 