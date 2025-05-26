/**
 * 代码编辑预览器控制模块
 * 提供完整的代码编辑和预览功能的核心控制逻辑
 * 整合 CodeDisplay 和 CodePreview 组件
 */

class CodeEditorPreviewController {
    constructor(options = {}) {
        this.options = {
            // 容器选择器
            displayContainer: options.displayContainer || '#codeEditor',
            previewContainer: options.previewContainer || '#codePreview',
            
            // 组件配置
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
            
            // 控制器配置
            debounceDelay: 300,
            defaultLanguage: 'html',
            autoPreview: true,
            trustMode: true, // 默认开启信任模式
            ...options
        };

        // 组件实例
        this.codeDisplay = null;
        this.codePreview = null;
        
        // 管理器实例
        this.fileManager = new FileManager();
        this.configManager = new ConfigManager(this.options);
        this.eventManager = new EventManager();
        
        // 状态
        this.updateTimeout = null;
        this.isInitialized = false;
        
        // 事件回调
        this.callbacks = {
            onCodeChange: options.onCodeChange || null,
            onPreviewUpdate: options.onPreviewUpdate || null,
            onError: options.onError || null,
            onConfigChange: options.onConfigChange || null
        };
    }

    // ==================== 初始化方法 ====================
    async initialize() {
        if (this.isInitialized) return;

        try {
            await this.initializeComponents();
            this.setupEventListeners();
            this.isInitialized = true;
            
            // 设置默认代码
            if (this.options.defaultCode) {
                await this.setCode(this.options.defaultCode, this.options.defaultLanguage);
            }
            
            return true;
        } catch (error) {
            this.handleError('初始化失败', error);
            return false;
        }
    }

    async initializeComponents() {
        // 初始化代码展示组件
        const displayOptions = {
            ...this.options.displayOptions,
            onChange: (code, language) => {
                this.handleCodeChange(code, language);
            }
        };
        
        this.codeDisplay = new CodeDisplay(this.options.displayContainer, displayOptions);
        
        // 初始化预览组件
        const previewOptions = {
            ...this.options.previewOptions,
            onError: this.options.trustMode ? null : (error) => this.handleError('预览错误', error),
            onLoad: () => this.handlePreviewLoad()
        };
        
        this.codePreview = new CodePreview(this.options.previewContainer, previewOptions);
        
        // 渲染初始内容
        if (this.options.defaultCode) {
            await this.codeDisplay.render(this.options.defaultCode, this.options.defaultLanguage);
        }
    }

    setupEventListeners() {
        // 文件管理器事件
        this.eventManager.on('fileAdded', () => this.updatePreviewDebounced());
        this.eventManager.on('fileRemoved', () => this.updatePreviewDebounced());
        this.eventManager.on('configChanged', (config) => this.handleConfigChange(config));
    }

    // ==================== 核心功能方法 ====================
    async setCode(code, language) {
        if (!this.isInitialized) {
            return false; // 未初始化，静默失败
        }
        
        try {
            await this.codeDisplay.setCode(code, language);
            if (this.options.autoPreview) {
                this.updatePreviewDebounced();
            }
            return true;
        } catch (error) {
            this.handleError('设置代码失败', error);
            return false;
        }
    }

    getCode() {
        return this.codeDisplay ? this.codeDisplay.getCode() : '';
    }

    getLanguage() {
        return this.codeDisplay ? this.codeDisplay.getLanguage() : this.options.defaultLanguage;
    }

    async setLanguage(language) {
        if (!this.isInitialized) return false;
        
        try {
            this.codeDisplay.setLanguage(language);
            this.configManager.updateConfig({ language });
            if (this.options.autoPreview) {
                this.updatePreviewDebounced();
            }
            return true;
        } catch (error) {
            this.handleError('设置语言失败', error);
            return false;
        }
    }

    // ==================== 预览控制方法 ====================
    updatePreviewDebounced() {
        clearTimeout(this.updateTimeout);
        this.updateTimeout = setTimeout(() => {
            this.updatePreview();
        }, this.options.debounceDelay);
    }

    async updatePreview() {
        if (!this.isInitialized || !this.codePreview) return;

        try {
            const code = this.getCode();
            if (!code.trim()) {
                this.codePreview.render('');
                return;
            }

            // 处理外部文件导入
            const processedCode = this.fileManager.processCode(code);
            await this.codePreview.render(processedCode);
            
            if (this.callbacks.onPreviewUpdate) {
                this.callbacks.onPreviewUpdate(processedCode);
            }
        } catch (error) {
            this.handleError('预览更新失败', error);
        }
    }

    async refreshPreview() {
        return this.updatePreview();
    }

    // ==================== 配置管理方法 ====================
    updateDisplayConfig(config) {
        if (!this.codeDisplay) return false;

        try {
            if (config.theme !== undefined) {
                this.codeDisplay.changeTheme(config.theme);
            }
            if (config.showLineNumbers !== undefined) {
                this.codeDisplay.toggleLineNumbers(config.showLineNumbers);
            }
            if (config.editable !== undefined) {
                this.codeDisplay.setEditable(config.editable);
            }
            
            this.configManager.updateConfig(config);
            return true;
        } catch (error) {
            this.handleError('更新显示配置失败', error);
            return false;
        }
    }

    updatePreviewConfig(config) {
        if (!this.codePreview) return false;

        try {
            if (config.width !== undefined || config.height !== undefined) {
                this.codePreview.setSize(config.width, config.height);
            }
            
            this.configManager.updateConfig(config);
            return true;
        } catch (error) {
            this.handleError('更新预览配置失败', error);
            return false;
        }
    }

    // ==================== 文件管理方法 ====================
    async addExternalFile(filePath) {
        try {
            await this.fileManager.addFile(filePath);
            this.eventManager.emit('fileAdded', filePath);
            return true;
        } catch (error) {
            this.handleError('添加外部文件失败', error);
            return false;
        }
    }

    removeExternalFile(filePath) {
        try {
            this.fileManager.removeFile(filePath);
            this.eventManager.emit('fileRemoved', filePath);
            return true;
        } catch (error) {
            this.handleError('移除外部文件失败', error);
            return false;
        }
    }

    getExternalFiles() {
        return this.fileManager.getFiles();
    }

    // ==================== 事件处理方法 ====================
    handleCodeChange(code, language) {
        if (this.options.autoPreview) {
            this.updatePreviewDebounced();
        }
        
        if (this.callbacks.onCodeChange) {
            this.callbacks.onCodeChange(code, language);
        }
    }

    handlePreviewLoad() {
        // 预览加载完成的处理逻辑
    }

    handleConfigChange(config) {
        if (this.callbacks.onConfigChange) {
            this.callbacks.onConfigChange(config);
        }
    }

    handleError(title, error) {
        // 信任模式下只记录到控制台
        if (this.options.trustMode) {
            console.error(`${title}:`, error);
        } else {
            console.error(`${title}:`, error);
            if (this.callbacks.onError) {
                this.callbacks.onError(title, error);
            }
        }
    }

    // ==================== 工具方法 ====================
    async copyCode() {
        try {
            const code = this.getCode();
            await navigator.clipboard.writeText(code);
            return true;
        } catch (error) {
            this.handleError('复制代码失败', error);
            return false;
        }
    }

    clearCode() {
        try {
            this.setCode('', this.getLanguage());
            return true;
        } catch (error) {
            this.handleError('清空代码失败', error);
            return false;
        }
    }

    // ==================== 生命周期方法 ====================
    destroy() {
        // 清理定时器
        if (this.updateTimeout) {
            clearTimeout(this.updateTimeout);
        }
        
        // 销毁组件
        if (this.codeDisplay) {
            this.codeDisplay.destroy();
        }
        if (this.codePreview) {
            this.codePreview.destroy();
        }
        
        // 清理事件
        this.eventManager.removeAllListeners();
        
        // 重置状态
        this.isInitialized = false;
    }

    // ==================== 静态工厂方法 ====================
    static async create(options) {
        const controller = new CodeEditorPreviewController(options);
        await controller.initialize(); // 信任模式下，总是返回控制器实例
        return controller;
    }
}

// ==================== 配置管理器类 ====================
class ConfigManager {
    constructor(initialConfig = {}) {
        this.config = { ...initialConfig };
        this.listeners = [];
    }

    updateConfig(newConfig) {
        const oldConfig = { ...this.config };
        this.config = { ...this.config, ...newConfig };
        
        this.listeners.forEach(listener => {
            listener(this.config, oldConfig);
        });
    }

    getConfig() {
        return { ...this.config };
    }

    onConfigChange(listener) {
        this.listeners.push(listener);
        return () => {
            const index = this.listeners.indexOf(listener);
            if (index > -1) {
                this.listeners.splice(index, 1);
            }
        };
    }
}

// ==================== 文件管理器类 ====================
class FileManager {
    constructor() {
        this.files = [];
        this.fileContents = new Map();
    }

    async addFile(filePath) {
        if (this.files.includes(filePath)) {
            return false; // 文件已存在，静默返回
        }

        try {
            const content = await this.loadFileContent(filePath);
            this.files.push(filePath);
            this.fileContents.set(filePath, {
                content,
                status: 'loaded',
                error: null
            });
            return true;
        } catch (error) {
            console.error(`加载文件失败: ${filePath}`, error);
            return false;
        }
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

        // 收集所有成功加载的文件内容
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

        // 处理import语句
        processedCode = this.processImportStatements(processedCode);

        // 嵌入到HTML中
        if (loadedScripts.length > 0 && this.isHtmlCode(processedCode)) {
            processedCode = this.embedScriptsInHtml(processedCode, loadedScripts);
        }

        return processedCode;
    }

    async loadFileContent(filePath) {
        const fullPath = this.getFullPath(filePath);
        const response = await fetch(fullPath);
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        return await response.text();
    }

    processFileContent(content) {
        // 简化导出语句处理
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

// ==================== 事件管理器类 ====================
class EventManager {
    constructor() {
        this.listeners = new Map();
    }

    on(event, listener) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }
        this.listeners.get(event).push(listener);
    }

    off(event, listener) {
        if (this.listeners.has(event)) {
            const listeners = this.listeners.get(event);
            const index = listeners.indexOf(listener);
            if (index > -1) {
                listeners.splice(index, 1);
            }
        }
    }

    emit(event, ...args) {
        if (this.listeners.has(event)) {
            this.listeners.get(event).forEach(listener => {
                try {
                    listener(...args);
                } catch (error) {
                    console.error(`事件监听器执行错误: ${event}`, error);
                }
            });
        }
    }

    removeAllListeners() {
        this.listeners.clear();
    }
}

// 模块化支持
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        CodeEditorPreviewController, 
        ConfigManager, 
        FileManager, 
        EventManager 
    };
}

if (typeof define === 'function' && define.amd) {
    define([], () => ({ 
        CodeEditorPreviewController, 
        ConfigManager, 
        FileManager, 
        EventManager 
    }));
}

if (typeof window !== 'undefined') {
    window.CodeEditorPreviewController = CodeEditorPreviewController;
    window.ConfigManager = ConfigManager;
    window.FileManager = FileManager;
    window.EventManager = EventManager;
} 