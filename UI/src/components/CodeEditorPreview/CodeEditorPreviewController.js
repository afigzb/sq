/**
 * 代码编辑预览器控制模块
 * 负责数据处理和核心功能实现，遵循数据驱动原则
 */

class CodeEditorPreviewController {
    constructor(options = {}) {
        // 提取回调函数
        this.callbacks = {
            onCodeChange: options.callbacks?.onCodeChange || options.onCodeChange || null,
            onPreviewUpdate: options.callbacks?.onPreviewUpdate || options.onPreviewUpdate || null,
            onError: options.callbacks?.onError || options.onError || null,
            onConfigChange: options.callbacks?.onConfigChange || options.onConfigChange || null,
            onStateChange: options.callbacks?.onStateChange || options.onStateChange || null
        };

        // 初始配置
        this.options = {
            displayContainer: options.displayContainer || '#codeEditor',
            previewContainer: options.previewContainer || '#codePreview',
            displayOptions: {
                theme: 'prism',
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

        // UI元素引用
        this.uiElements = options.uiElements || {};
        this.componentRef = options.componentRef || null;
        
        // 状态管理
        this.state = {
            currentCode: '',
            currentLanguage: this.options.defaultLanguage,
            theme: this.options.displayOptions.theme,
            editable: this.options.displayOptions.editable,
            showToolbar: true,
            showFullscreen: true,
            externalFiles: []
        };

        // 核心组件
        this.codeDisplay = null;
        this.codePreview = null;
        this.fileManager = new FileManager();
        this.updateTimeout = null;
        this.isInitialized = false;
    }

    // 初始化
    async initialize() {
        await this.initializeComponents();
        this.isInitialized = true;
        
        if (this.options.defaultCode) {
            await this.setCode(this.options.defaultCode, this.options.defaultLanguage);
        }
        
        // 如果有预设的外部文件，导入它们
        if (this.options.initialConfig?.externalFiles && this.options.initialConfig.externalFiles.length > 0) {
            await this.setExternalFiles(this.options.initialConfig.externalFiles);
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
            this.state.currentCode = this.options.defaultCode;
        }
    }

    // 状态管理
    updateState(newState) {
        const oldState = {...this.state};
        this.state = {...this.state, ...newState};
        
        // 触发状态变更回调
        if (this.callbacks.onStateChange) {
            this.callbacks.onStateChange(this.state, oldState);
        }
        
        return this.state;
    }

    getState() {
        return {...this.state};
    }

    // 核心功能方法
    async setCode(code, language) {
        if (!this.codeDisplay) return false;
        
        await this.codeDisplay.setCode(code, language || this.state.currentLanguage);
        this.updateState({
            currentCode: code,
            currentLanguage: language || this.state.currentLanguage
        });

        if (this.options.autoPreview) {
            this.updatePreviewDebounced();
        }
        return true;
    }

    getCode() {
        return this.state.currentCode;
    }

    getLanguage() {
        return this.state.currentLanguage;
    }

    async setLanguage(language) {
        if (!this.codeDisplay) return false;
        
        this.codeDisplay.setLanguage(language);
        this.updateState({ currentLanguage: language });
        
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

    // 配置管理 - 更新状态并反映到组件
    updateDisplayConfig(config) {
        if (!this.codeDisplay) return false;

        const newState = {};
        
        if (config.theme !== undefined) {
            this.codeDisplay.changeTheme(config.theme);
            newState.theme = config.theme;
        }
        
        if (config.editable !== undefined) {
            this.codeDisplay.setEditable(config.editable);
            newState.editable = config.editable;
        }
        
        this.updateState(newState);
        
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

    // UI 配置
    setShowToolbar(show) {
        this.updateState({ showToolbar: show });
        return true;
    }

    setShowFullscreen(show) {
        this.updateState({ showFullscreen: show });
        return true;
    }

    // 文件管理 - 保持原有逻辑不变，但更新状态
    async addExternalFile(filePath) {
        if (!filePath || !filePath.trim()) return false;
        
        const success = await this.fileManager.addFile(filePath);
        if (success) {
            const files = this.fileManager.getFiles();
            this.updateState({ externalFiles: files });
            
            if (this.options.autoPreview) {
                this.updatePreviewDebounced();
            }
        }
        return success;
    }

    removeExternalFile(filePath) {
        const success = this.fileManager.removeFile(filePath);
        if (success) {
            const files = this.fileManager.getFiles();
            this.updateState({ externalFiles: files });
            
            if (this.options.autoPreview) {
                this.updatePreviewDebounced();
            }
        }
        return success;
    }

    getExternalFiles() {
        return this.fileManager.getFiles();
    }

    async setExternalFiles(files) {
        // 清除现有文件
        const currentFiles = this.getExternalFiles();
        for (const file of currentFiles) {
            this.fileManager.removeFile(file);
        }
        
        // 添加新文件
        let allSucceeded = true;
        for (const file of files) {
            const success = await this.fileManager.addFile(file);
            if (!success) {
                allSucceeded = false;
            }
        }
        
        this.updateState({ externalFiles: this.fileManager.getFiles() });
        
        if (this.options.autoPreview) {
            this.updatePreviewDebounced();
        }
        
        return allSucceeded;
    }

    // 事件处理 - 简化
    handleCodeChange(code, language) {
        this.updateState({
            currentCode: code,
            currentLanguage: language
        });
        
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

    // 新增: 处理来自组件的用户操作
    handleAction(action, params = {}) {
        // 根据用户操作分发不同的处理逻辑
        switch (action) {
            case 'copy':
                return this.copyCode();
            case 'clear':
                return this.clearCode();
            case 'refresh':
                return this.refreshPreview();
            case 'fullscreen':
                return this.openFullscreen();
            case 'close-fullscreen':
                return this.closeFullscreen();
            case 'add-file':
                if (this.uiElements.filePathInput) {
                    const filePath = this.uiElements.filePathInput.value.trim();
                    if (filePath) {
                        this.addExternalFile(filePath);
                        this.uiElements.filePathInput.value = '';
                    }
                }
                return true;
            case 'remove-file':
                if (params.filePath) {
                    return this.removeExternalFile(params.filePath);
                }
                return false;
            default:
                return false;
        }
    }

    // 新增: 处理组件属性变更
    handleAttributeChange(key, newValue, oldValue) {
        // 根据不同的属性类型进行处理
        const displayConfigAttrs = ['theme', 'editable'];
        const controllerConfigAttrs = ['language', 'autoPreview', 'debounceDelay'];
        const uiConfigAttrs = ['showToolbar', 'showFullscreen'];
        
        if (displayConfigAttrs.includes(key)) {
            // 处理显示配置相关的属性
            const parsedValue = key === 'editable' ? (newValue === 'true' || newValue === '') : newValue;
            this.updateDisplayConfig({ [key]: parsedValue });
        } 
        else if (key === 'language') {
            // 处理语言变更
            this.setLanguage(newValue);
        }
        else if (key === 'autoPreview') {
            // 处理自动预览
            const autoPreview = newValue === 'true' || newValue === '';
            this.options.autoPreview = autoPreview;
            if (autoPreview) {
                this.updatePreviewDebounced();
            }
        }
        else if (uiConfigAttrs.includes(key)) {
            // 处理UI显示相关的属性
            const show = newValue === 'true' || newValue === '';
            if (key === 'showToolbar') this.setShowToolbar(show);
            else if (key === 'showFullscreen') this.setShowFullscreen(show);
            
            // 这些变更可能需要重新渲染UI
            if (this.componentRef && typeof this.componentRef.render === 'function') {
                const config = {
                    ...this.state,
                    width: this.componentRef.getAttribute('width') || '100%',
                    height: this.componentRef.getAttribute('height') || 'auto'
                };
                this.componentRef.render(config);
            }
        }
        else if (key === 'externalFiles') {
            // 处理外部文件列表
            if (newValue) {
                try {
                    const files = typeof newValue === 'string' ? 
                        (newValue.startsWith('[') ? JSON.parse(newValue) : newValue.split(',').map(f => f.trim()).filter(f => f)) : 
                        newValue;
                    this.setExternalFiles(files);
                } catch (e) {
                    console.error('Failed to parse external files:', e);
                }
            } else {
                this.setExternalFiles([]);
            }
        }
        else if (key === 'debounceDelay') {
            // 处理防抖延迟时间
            const delay = parseInt(newValue) || 300;
            this.options.debounceDelay = delay;
        }
    }

    // 全屏预览功能
    openFullscreen() {
        if (!this.uiElements.fullscreenOverlay) return false;
        
        this.uiElements.fullscreenOverlay.style.display = 'flex';
        
        const fullscreenContainer = this.uiElements.fullscreenOverlay.querySelector('.fullscreen-preview-container');
        if (fullscreenContainer) {
            const fullscreenPreview = new CodePreview(fullscreenContainer, {
                width: '100%',
                height: '100%'
            });
            fullscreenPreview.render(this.getCode());
        }
        return true;
    }

    closeFullscreen() {
        if (!this.uiElements.fullscreenOverlay) return false;
        
        this.uiElements.fullscreenOverlay.style.display = 'none';
        return true;
    }

    // 工具方法
    async copyCode() {
        const code = this.getCode();
        try {
            await navigator.clipboard.writeText(code);
            return true;
        } catch (error) {
            if (this.callbacks.onError) {
                this.callbacks.onError('复制失败', error);
            }
            return false;
        }
    }

    clearCode() {
        return this.setCode('', this.getLanguage());
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