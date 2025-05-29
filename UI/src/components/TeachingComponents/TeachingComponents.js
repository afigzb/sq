/**
 * 通用教学Web组件
 * 数据驱动的可复用教学组件，支持章节纵向展示多示例
 * 注意代码中传入的是路径，这个通用教学组件会完全根据路径去加载数据，不做任何而外处理
 * 所以请确保路径是正确的，如果路径错误，将无法加载到数据
 */
import { CodeEditorPreview } from '../CodeEditorPreview/CodeEditorPreview.js';

export class TutorialComponent extends HTMLElement {
    constructor() {
        super();
        this.currentChapterId = null;
        this.config = null;
        this.tutorialData = null;
    }

    connectedCallback() {
        this.loadConfig();
        this.render();
        setTimeout(() => {
            this.init();
        }, 100);
    }

    disconnectedCallback() {
        this.destroy();
    }

    loadConfig() {
        const defaultConfig = {
            title: '📚 教学平台',
            description: '交互式学习体验',
            theme: 'prism',
            language: 'html'
        };

        this.config = {
            ...defaultConfig,
            title: this.getAttribute('title') || defaultConfig.title,
            description: this.getAttribute('description') || defaultConfig.description,
            theme: this.getAttribute('theme') || defaultConfig.theme,
            language: this.getAttribute('language') || defaultConfig.language,
            dataSource: this.getAttribute('data-source'),
            initialChapter: this.getAttribute('initial-chapter')
        };
    }

    setTutorialData(data) {
        this.tutorialData = data;
        
        if (data.title) this.config.title = data.title;
        if (data.description) this.config.description = data.description;
        if (data.config) Object.assign(this.config, data.config);
        
        if (data.chapters?.length > 0) {
            this.currentChapterId = this.config.initialChapter || data.chapters[0].id;
        }
        
        this.render();
        this.setupNavigation();
        this.loadCurrentChapter();

    }

    async loadDataFromSource() {
        if (!this.config.dataSource) return;
        
        try {
            const module = await import(this.config.dataSource);
            const data = module.getTutorialData?.() || 
                        module.canvasTutorialData || 
                        module.pathTutorialData || 
                        module.tutorialData ||
                        module.default;
            
            if (data) {
                this.setTutorialData(data);
            }
        } catch (error) {
            console.error('加载数据源失败:', error);
        }
    }

    render() {
        this.innerHTML = `
            <div class="container">
                <div class="header">
                    <h1>${this.config.title}</h1>
                    <p>${this.config.description}</p>
                </div>
                <div class="nav-tabs"></div>
                <div class="content">
                    <div class="chapter-content"></div>
                </div>
            </div>
        `;
    }

    async init() {
        if (this.config.dataSource && !this.tutorialData) {
            await this.loadDataFromSource();
        } else {
                this.setupNavigation();
                if (this.currentChapterId) this.loadCurrentChapter();
        }
    }

    setupNavigation() {
        if (!this.tutorialData?.chapters) return;
        
        const navTabs = this.querySelector('.nav-tabs');
        navTabs.innerHTML = '';

        this.tutorialData.chapters.forEach((chapter) => {
            const button = document.createElement('button');
            button.className = 'nav-tab';
            button.dataset.chapterId = chapter.id;
            button.textContent = chapter.title;
            button.onclick = () => this.switchToChapter(chapter.id);
            navTabs.appendChild(button);
        });
        
        this.updateNavigation();
    }

    updateNavigation() {
        this.querySelectorAll('.nav-tab').forEach(button => {
            button.classList.toggle('active', button.dataset.chapterId === this.currentChapterId);
        });
    }

    loadCurrentChapter() {
        const chapter = this.getChapter(this.currentChapterId);
        if (!chapter) return;
        
        const chapterContent = this.querySelector('.chapter-content');
        
        let html = `
            <div class="chapter">
                <div class="chapter-header">
                    <h2>${chapter.title}</h2>
                    <p>${chapter.subtitle || ''}</p>
                </div>
        `;

        chapter.examples.forEach(example => {
            html += `
                <div class="example">
                    <div class="example-header">
                        <h3>${example.title}</h3>
                        <p>${example.description || ''}</p>
                    </div>
                    <div class="code-editor-container">
                        <div class="editor-wrapper" data-example-id="${example.id}"></div>
                    </div>
                </div>
            `;
        });

        html += '</div>';
        chapterContent.innerHTML = html;

            customElements.whenDefined('code-editor-preview').then(() => {
                this.initializeCodeEditors(chapter);
            });
        
        this.dispatchEvent(new CustomEvent('chapter-changed', {
            detail: { chapterId: this.currentChapterId, chapter },
            bubbles: true
        }));
    }

    initializeCodeEditors(chapter) {
        chapter.examples.forEach(example => {
            const wrapper = this.querySelector(`[data-example-id="${example.id}"]`);
            if (!wrapper) return;

            const editor = document.createElement('code-editor-preview');
            editor.setAttribute('width', '100%');
            editor.setAttribute('theme', this.config.theme);
            editor.setAttribute('language', this.config.language);
            editor.setAttribute('editable', 'true');
            editor.setAttribute('auto-preview', 'true');
            editor.setAttribute('show-toolbar', 'true');
            editor.setAttribute('show-fullscreen', 'true');
            editor.setAttribute('debounce-delay', '300');

            wrapper.appendChild(editor);

            setTimeout(() => {
                requestAnimationFrame(() => {
                    setTimeout(() => {
                        if (example.code) editor.setCode(example.code, this.config.language);
                        if (example.instructions) editor.setInstructions(example.instructions);
                    }, 150);
                });
            }, 100);
        });
    }

    getChapter(chapterId) {
        return this.tutorialData?.chapters?.find(chapter => chapter.id === chapterId);
    }

    switchToChapter(chapterId) {
        const chapter = this.getChapter(chapterId);
        if (!chapter) return false;
        
        this.currentChapterId = chapterId;
        this.updateNavigation();
        this.loadCurrentChapter();
        return true;
    }

    getAllChapters() {
        return this.tutorialData?.chapters || [];
    }

    destroy() {
        // 事件监听器通过onclick设置，会自动清理
    }

    static getStyles() {
        return `
        tutorial-component {
            display: block;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background: #f5f7fa;
            min-height: 100vh;
            padding: 20px;
        }

        tutorial-component .container {
            max-width: 1400px;
            margin: 0 auto;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.05);
            overflow: hidden;
            min-height: calc(100vh - 40px);
            display: flex;
            flex-direction: column;
        }

        tutorial-component .header {
            background: #4a6fd8;
            color: white;
            padding: 30px;
            text-align: center;
            flex-shrink: 0;
        }

        tutorial-component .header h1 {
            font-size: 2.2em;
            margin-bottom: 10px;
        }

        tutorial-component .header p {
            font-size: 1.1em;
        }

        tutorial-component .nav-tabs {
            background: #f8f9fa;
            border-bottom: 1px solid #dee2e6;
            padding: 0;
            display: flex;
            overflow-x: auto;
            flex-shrink: 0;
        }

        tutorial-component .nav-tab {
            background: none;
            border: none;
            padding: 15px 25px;
            cursor: pointer;
            border-bottom: 2px solid transparent;
            font-size: 16px;
            font-weight: 500;
            color: #6c757d;
            transition: all 0.3s ease;
            white-space: nowrap;
            flex-shrink: 0;
            min-width: 120px;
            text-align: center;
        }

        tutorial-component .nav-tab.active {
            color: #4a6fd8;
            border-bottom-color: #4a6fd8;
            background: white;
        }

        tutorial-component .nav-tab:hover {
            color: #4a6fd8;
            background: rgba(74, 111, 216, 0.05);
        }

        tutorial-component .content {
            padding: 30px;
            flex: 1;
            overflow-y: auto;
        }

        tutorial-component .chapter {
            margin-bottom: 40px;
        }

        tutorial-component .chapter-header {
            margin-bottom: 25px;
            padding: 20px;
            background: #f2f6ff;
            color: #2c3e50;
            border-radius: 6px;
        }

        tutorial-component .chapter-header h2 {
            font-size: 1.7em;
            margin-bottom: 8px;
        }

        tutorial-component .chapter-header p {
            font-size: 1.1em;
            color: #5a6a7e;
        }

        tutorial-component .example {
            margin-bottom: 30px;
            padding: 25px;
            background: #fbfbfd;
            border-radius: 6px;
        }

        tutorial-component .example-header {
            margin-bottom: 20px;
        }

        tutorial-component .example-header h3 {
            color: #2c3e50;
            font-size: 1.3em;
            margin-bottom: 8px;
        }

        tutorial-component .example-header p {
            color: #6c757d;
            font-size: 1.05em;
        }

        tutorial-component .code-editor-container {
            width: 100%;
            border-radius: 6px;
            overflow: hidden;
            box-shadow: 0 2px 5px rgba(0,0,0,0.05);
        }

        tutorial-component code-editor-preview {
            display: block;
            width: 100%;
            min-height: 500px;
            border-radius: 6px;
            overflow: hidden;
        }

        @media (max-width: 768px) {
            tutorial-component {
                padding: 10px;
            }

            tutorial-component .container {
                min-height: calc(100vh - 20px);
            }

            tutorial-component .header {
                padding: 20px;
            }

            tutorial-component .header h1 {
                font-size: 1.8em;
            }

            tutorial-component .nav-tab {
                padding: 12px 15px;
                font-size: 14px;
                min-width: 100px;
            }

            tutorial-component .content {
                padding: 20px;
            }

            tutorial-component .chapter-header {
                padding: 15px;
            }

            tutorial-component .chapter-header h2 {
                font-size: 1.5em;
            }

            tutorial-component .example {
                padding: 20px;
                margin-bottom: 25px;
            }

            tutorial-component code-editor-preview {
                min-height: 400px;
            }
        }
        `;
    }

    static injectStyles() {
        const styleId = 'tutorial-component-styles';
        if (document.getElementById(styleId)) return;

        const styleElement = document.createElement('style');
        styleElement.id = styleId;
        styleElement.textContent = TutorialComponent.getStyles();
        document.head.appendChild(styleElement);
    }
}

customElements.define('tutorial-component', TutorialComponent);
TutorialComponent.injectStyles();

export default TutorialComponent; 