import { EXAMPLE_CODES, INSTRUCTIONS } from './data.js';

export class AudioPlayerTutorial {
    constructor() {
        this.codeEditors = {};
        this.init();
    }

    init() {
        // 等待DOM完全加载后再加载示例
        setTimeout(() => {
            this.loadExample('autoPlay');
            this.loadExample('customPlaylist');
        }, 100);
    }

    loadExample(exampleId) {
        const code = EXAMPLE_CODES[exampleId];
        const instructions = INSTRUCTIONS[exampleId];

        if (!code) {
            console.error(`找不到示例代码: ${exampleId}`);
            return;
        }

        // 更新代码编辑器
        const editor = document.querySelector(`#editor-${exampleId}`);
        if (editor) {
            // 等待编辑器完全初始化
            const waitForEditor = () => {
                if (editor.getController && editor.getController()) {
                    // 设置代码内容
                    editor.setCode(code, 'html');
                    // 设置使用说明
                    editor.setInstructions(instructions);
                    // 缓存编辑器引用
                    this.codeEditors[exampleId] = editor;
                } else {
                    // 如果编辑器还没初始化，等待一下再试
                    setTimeout(waitForEditor, 100);
                }
            };
            waitForEditor();
        }
    }

    // 获取所有可用示例列表
    getAvailableExamples() {
        return Object.keys(EXAMPLE_CODES);
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    // 等待所有组件完全加载
    setTimeout(() => {
        window.audioPlayerTutorial = new AudioPlayerTutorial();
    }, 500);
});

// 导出供外部使用
export { EXAMPLE_CODES, INSTRUCTIONS };
