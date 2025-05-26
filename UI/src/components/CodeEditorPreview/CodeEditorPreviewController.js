/**
 * 代码编辑预览器控制模块
 * 简化版本，直接使用 CodeDisplay 和 CodePreview 的 API
 */

class CodeEditorPreviewController {
    constructor(options = {}) {
        this.options = {
            displayContainer: options.displayContainer || '#codeEditor',
            previewContainer: options.previewContainer || '#codePreview',
            displayOptions: {
                theme: 'prism',
                showLineNumbers: false,
                editable: true,
                maxHeight: '500px',
                ...options.displayOptions
            },
            previewOptions: {
                width: '100%',
                height: '400px',
                ...options.previewOptions
            },
            debounceDelay: 300,
            defaultLanguage: 'html',
            autoPreview: true,
            ...options
        };

        this.codeDisplay = null;
        this.codePreview = null;
        this.fileManager = new FileManager();
        this.updateTimeout = null;
        this.isInitialized = false;
        
        this.callbacks = {
            onCodeChange: options.onCodeChange || null,
            onPreviewUpdate: options.onPreviewUpdate || null,
            onError: options.onError || null,
            onConfigChange: options.onConfigChange || null
        };
    }

    // 初始化
    async initialize() {
        await this.initializeComponents();
        this.isInitialized = true;
        
        if (this.options.defaultCode) {
            await this.setCode(this.options.defaultCode, this.options.defaultLanguage);
        }
        
        return true;
    }

    async initializeComponents() {
        // 初始化代码展示组件
        this.codeDisplay = new CodeDisplay(this.options.displayContainer, {
            ...this.options.displayOptions,
            onChange: (code, language) => this.handleCodeChange(code, language)
        });
        
        // 初始化预览组件
        this.codePreview = new CodePreview(this.options.previewContainer, {
            ...this.options.previewOptions,
            onLoad: () => this.handlePreviewLoad()
        });
        
        // 渲染初始内容
        if (this.options.defaultCode) {
            await this.codeDisplay.render(this.options.defaultCode, this.options.defaultLanguage);
        }
    }

    // 核心功能方法
    async setCode(code, language) {
        if (!this.codeDisplay) return false;
        
        await this.codeDisplay.setCode(code, language);
        if (this.options.autoPreview) {
            this.updatePreviewDebounced();
        }
        return true;
    }

    getCode() {
        return this.codeDisplay ? this.codeDisplay.getCode() : '';
    }

    getLanguage() {
        return this.codeDisplay ? this.codeDisplay.getLanguage() : this.options.defaultLanguage;
    }

    async setLanguage(language) {
        if (!this.codeDisplay) return false;
        
        this.codeDisplay.setLanguage(language);
        if (this.options.autoPreview) {
            this.updatePreviewDebounced();
        }
        return true;
    }

    // 预览控制
    updatePreviewDebounced() {
        clearTimeout(this.updateTimeout);
        this.updateTimeout = setTimeout(() => {
            this.updatePreview();
        }, this.options.debounceDelay);
    }

    async updatePreview() {
        if (!this.codePreview) return;

        const code = this.getCode();
        if (!code.trim()) {
            this.codePreview.render('');
            return;
        }

        const processedCode = this.fileManager.processCode(code);
        await this.codePreview.render(processedCode);
        
        if (this.callbacks.onPreviewUpdate) {
            this.callbacks.onPreviewUpdate(processedCode);
        }
    }

    async refreshPreview() {
        return this.updatePreview();
    }

    // 配置管理 - 直接使用组件API
    updateDisplayConfig(config) {
        if (!this.codeDisplay) return false;

        if (config.theme !== undefined) {
            this.codeDisplay.changeTheme(config.theme);
        }
        if (config.showLineNumbers !== undefined) {
            this.codeDisplay.toggleLineNumbers(config.showLineNumbers);
        }
        if (config.editable !== undefined) {
            this.codeDisplay.setEditable(config.editable);
        }
        
        if (this.callbacks.onConfigChange) {
            this.callbacks.onConfigChange(config);
        }
        return true;
    }

    updatePreviewConfig(config) {
        if (!this.codePreview) return false;

        if (config.width !== undefined || config.height !== undefined) {
            this.codePreview.setSize(config.width, config.height);
        }
        
        if (this.callbacks.onConfigChange) {
            this.callbacks.onConfigChange(config);
        }
        return true;
    }

    // 文件管理 - 保持原有逻辑不变
    async addExternalFile(filePath) {
        const success = await this.fileManager.addFile(filePath);
        if (success && this.options.autoPreview) {
            this.updatePreviewDebounced();
        }
        return success;
    }

    removeExternalFile(filePath) {
        const success = this.fileManager.removeFile(filePath);
        if (success && this.options.autoPreview) {
            this.updatePreviewDebounced();
        }
        return success;
    }

    getExternalFiles() {
        return this.fileManager.getFiles();
    }

    // 事件处理 - 简化
    handleCodeChange(code, language) {
        if (this.options.autoPreview) {
            this.updatePreviewDebounced();
        }
        
        if (this.callbacks.onCodeChange) {
            this.callbacks.onCodeChange(code, language);
        }
    }

    handlePreviewLoad() {
        // 预览加载完成
    }

    // 工具方法
    async copyCode() {
        const code = this.getCode();
        await navigator.clipboard.writeText(code);
        return true;
    }

    clearCode() {
        this.setCode('', this.getLanguage());
        return true;
    }

    // 生命周期
    destroy() {
        if (this.updateTimeout) {
            clearTimeout(this.updateTimeout);
        }
        
        if (this.codeDisplay) {
            this.codeDisplay.destroy();
        }
        if (this.codePreview) {
            this.codePreview.destroy();
        }
        
        this.isInitialized = false;
    }

    // 静态工厂方法
    static async create(options) {
        const controller = new CodeEditorPreviewController(options);
        await controller.initialize();
        return controller;
    }
}

// 文件管理器
class FileManager {
    constructor() {
        this.files = [];
        this.fileContents = new Map();
    }

    async addFile(filePath) {
        if (this.files.includes(filePath)) {
            return false;
        }

        const content = await this.loadFileContent(filePath);
        this.files.push(filePath);
        this.fileContents.set(filePath, {
            content,
            status: 'loaded',
            error: null
        });
        return true;
    }

    removeFile(filePath) {
        const index = this.files.indexOf(filePath);
        if (index > -1) {
            this.files.splice(index, 1);
            this.fileContents.delete(filePath);
            return true;
        }
        return false;
    }

    getFiles() {
        return [...this.files];
    }

    processCode(code) {
        if (!code || this.files.length === 0) {
            return code;
        }

        let processedCode = code;
        const loadedScripts = [];

        this.files.forEach(filePath => {
            const fileInfo = this.fileContents.get(filePath);
            if (fileInfo && fileInfo.status === 'loaded') {
                let fileContent = this.processFileContent(fileInfo.content);
                loadedScripts.push(`
// ==================== ${filePath} ====================
${fileContent}
// ==================== End of ${filePath} ====================
                `);
            }
        });

        processedCode = this.processImportStatements(processedCode);

        if (loadedScripts.length > 0 && this.isHtmlCode(processedCode)) {
            processedCode = this.embedScriptsInHtml(processedCode, loadedScripts);
        }

        return processedCode;
    }

    async loadFileContent(filePath) {
        const fullPath = this.getFullPath(filePath);
        const response = await fetch(fullPath);
        return await response.text();
    }

    processFileContent(content) {
        return content
            .replace(/export\s+default\s+(\w+)/g, 'window.$1 = $1')
            .replace(/export\s+\{[^}]+\}/g, '')
            .replace(/export\s+(const|let|var)\s+/g, '$1 ');
    }

    processImportStatements(code) {
        const importRegex = /import\s+(\w+|\{[^}]+\})\s+from\s+['"`]([^'"`]+)['"`];?\s*\n?/g;
        
        return code.replace(importRegex, (match, importName, path) => {
            const matchedFile = this.files.find(filePath => 
                path.includes(filePath.split('/').pop()) || filePath.includes(path)
            );
            
            if (matchedFile) {
                return `// 已通过外部文件导入: ${path}\n`;
            }
            
            return match;
        });
    }

    isHtmlCode(code) {
        return code.includes('<html') || code.includes('<!DOCTYPE html');
    }

    embedScriptsInHtml(code, scripts) {
        const scriptContent = `
<script>
// ==================== 外部导入的JavaScript文件 ====================
${scripts.join('\n')}
// ==================== 外部文件导入结束 ====================
</script>`;

        if (/<\/head>/i.test(code)) {
            return code.replace(/<\/head>/i, `${scriptContent}\n</head>`);
        } else if (/<\/body>/i.test(code)) {
            return code.replace(/<\/body>/i, `${scriptContent}\n</body>`);
        } else {
            return code + scriptContent;
        }
    }

    getFullPath(relativePath) {
        if (relativePath.startsWith('http://') || relativePath.startsWith('https://') || relativePath.startsWith('/')) {
            return relativePath;
        }
        
        const currentPath = window.location.pathname;
        let currentDir = currentPath.substring(0, currentPath.lastIndexOf('/'));
        let path = relativePath;
        
        while (path.startsWith('../')) {
            path = path.substring(3);
            currentDir = currentDir.substring(0, currentDir.lastIndexOf('/'));
        }
        
        if (path.startsWith('./')) {
            path = path.substring(2);
        }
        
        return `${currentDir}/${path}`;
    }
}

// 模块化支持
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        CodeEditorPreviewController, 
        FileManager 
    };
}

if (typeof define === 'function' && define.amd) {
    define([], () => ({ 
        CodeEditorPreviewController, 
        FileManager 
    }));
}

if (typeof window !== 'undefined') {
    window.CodeEditorPreviewController = CodeEditorPreviewController;
    window.FileManager = FileManager;
} 