/**
 * 优化后的代码展示与预览集成脚本
 * 利用 CodeDisplay 和 CodePreview 组件的内置功能，减少重复逻辑
 */

// ==================== 核心控制器类 ====================
class CodeEditorController {
    constructor() {
        this.codeDisplay = null;
        this.codePreview = null;
        this.fullscreenCodePreview = null;
        this.externalFileManager = new ExternalFileManager();
        this.uiManager = new UIManager();
        
        // 防抖定时器
        this.updateTimeout = null;
        this.DEBOUNCE_DELAY = 300;
        
        this.init();
    }

    async init() {
        await this.initializeComponents();
        this.setupEventListeners();
        this.setupKeyboardShortcuts();
        this.externalFileManager.updateDisplay();
    }

    async initializeComponents() {
        // 获取配置
        const displayOptions = this.getDisplayOptions();
        const previewOptions = this.getPreviewOptions();

        // 初始化 CodeDisplay
        this.codeDisplay = new CodeDisplay('#codeEditor', displayOptions);
        await this.codeDisplay.render(this.getDefaultCode(), this.getSelectedLanguage());

        // 初始化主预览 - 找到现有的iframe并替换为CodePreview容器
        this.setupPreviewContainer('#preview', 'codePreviewContainer');
        this.codePreview = new CodePreview('#codePreviewContainer', previewOptions);

        // 初始化全屏预览 - 找到现有的iframe并替换为CodePreview容器
        this.setupPreviewContainer('#fullscreenPreview', 'fullscreenCodePreview');
        this.fullscreenCodePreview = new CodePreview('#fullscreenCodePreview', {
            ...previewOptions,
            onError: (error) => console.error('全屏预览错误:', error)
        });

        // 初始预览更新
        this.updatePreviewDebounced();
    }

    getDisplayOptions() {
        return {
            theme: document.getElementById('themeSelect').value,
            showLineNumbers: document.getElementById('showLineNumbers').checked,
            editable: document.getElementById('enableEditing').checked,
            maxHeight: '500px',
            onChange: (code, language) => {
                this.updatePreviewDebounced();
            }
        };
    }

    getPreviewOptions() {
        return {
            width: '100%',
            height: '100%',
            onError: (error) => {
                console.error('预览错误:', error);
                this.uiManager.setStatus('error');
            },
            onLoad: () => {
                this.uiManager.setStatus('loaded');
            }
        };
    }

    setupPreviewContainer(existingSelector, newContainerId) {
        const existingElement = document.querySelector(existingSelector);
        if (!existingElement) {
            console.error(`找不到元素: ${existingSelector}`);
            return;
        }
        
        // 创建新的容器div
        const newContainer = document.createElement('div');
        newContainer.id = newContainerId;
        newContainer.style.width = '100%';
        newContainer.style.height = '100%';
        
        // 只替换iframe元素本身，而不是整个父容器
        existingElement.parentElement.replaceChild(newContainer, existingElement);
    }

    // ==================== 预览更新逻辑 ====================
    updatePreviewDebounced() {
        clearTimeout(this.updateTimeout);
        this.updateTimeout = setTimeout(() => {
            this.updatePreview();
        }, this.DEBOUNCE_DELAY);
    }

    updatePreview() {
        if (!this.codePreview || !this.codeDisplay) return;

        try {
            const code = this.codeDisplay.getCode();
            
            // 处理空代码
            if (!code.trim()) {
                this.codePreview.render('');
                this.fullscreenCodePreview?.render('');
                return;
            }

            // 处理外部文件导入并渲染
            const processedCode = this.externalFileManager.processCode(code);
            this.codePreview.render(processedCode);
            this.fullscreenCodePreview?.render(processedCode);
        } catch (error) {
            console.error('预览更新失败:', error);
        }
    }

    // ==================== 用户操作方法 ====================
    clearEditor() {
        if (confirm('确定要清空编辑器吗？')) {
            this.codeDisplay?.setCode('', this.codeDisplay.getLanguage());
        }
    }

    async copyCode() {
        if (!this.codeDisplay) return;
        
        try {
            const code = this.codeDisplay.getCode();
            await navigator.clipboard.writeText(code);
            this.uiManager.showButtonSuccess(event.target, '✅ 已复制');
        } catch (error) {
            alert('复制失败: ' + error.message);
        }
    }

    refreshPreview() {
        this.updatePreview();
        this.uiManager.showButtonLoading(event.target, '🔄 刷新中...');
    }

    openFullscreen() {
        document.getElementById('fullscreenOverlay').style.display = 'flex';
        if (this.codeDisplay && this.fullscreenCodePreview) {
            const code = this.codeDisplay.getCode();
            const processedCode = this.externalFileManager.processCode(code);
            this.fullscreenCodePreview.render(processedCode);
        }
    }

    closeFullscreen() {
        document.getElementById('fullscreenOverlay').style.display = 'none';
    }

    // ==================== 配置更新方法 ====================
    changeLanguage() {
        const language = document.getElementById('languageSelect').value;
        this.codeDisplay?.setLanguage(language);
    }

    changeTheme() {
        const theme = document.getElementById('themeSelect').value;
        this.codeDisplay?.changeTheme(theme);
    }

    toggleLineNumbers() {
        const show = document.getElementById('showLineNumbers').checked;
        this.codeDisplay?.toggleLineNumbers(show);
    }

    toggleEditing() {
        const editable = document.getElementById('enableEditing').checked;
        this.codeDisplay?.setEditable(editable);
    }

    // ==================== 事件监听设置 ====================
    setupEventListeners() {
        // 配置变更监听
        document.getElementById('languageSelect').addEventListener('change', () => this.changeLanguage());
        document.getElementById('themeSelect').addEventListener('change', () => this.changeTheme());
        document.getElementById('showLineNumbers').addEventListener('change', () => this.toggleLineNumbers());
        document.getElementById('enableEditing').addEventListener('change', () => this.toggleEditing());

        // 全局错误处理
        window.addEventListener('error', (e) => {
            console.error('页面错误:', e.error);
        });
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault();
                this.refreshPreview();
            } else if (e.key === 'F11') {
                e.preventDefault();
                this.openFullscreen();
            } else if (e.key === 'Escape') {
                this.closeFullscreen();
            } else if (e.key === 'Enter' && e.target.id === 'jsFileInput') {
                e.preventDefault();
                this.externalFileManager.addFile();
            }
        });
    }

    // ==================== 工具方法 ====================
    getDefaultCode() {
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Display React Code String</title>
    <style>
        body {
            font-family: monospace;
            background-color: #f5f5f5;
            padding: 20px;
        }
        pre {
            background-color: #272822;
            color: #f8f8f2;
            padding: 15px;
            border-radius: 8px;
            overflow-x: auto;
        }
    </style>
</head>
<body>
    <h2>React Hook 示例代码</h2>
    <pre id="codeBlock"></pre>

    <script>
        const defaultCode = '// React Hook 示例\\nfunction Counter() {\\n    const [count, setCount] = useState(0);\\n    \\n    return (\\n        <div>\\n            <p>Count: {count}</p>\\n            <button onClick={() => setCount(count + 1)}>\\n                Increment\\n            </button>\\n        </div>\\n    );\\n}';

        // 将代码插入页面
        document.getElementById('codeBlock').textContent = defaultCode;
    </script>
</body>
</html>`;
    }

    getSelectedLanguage() {
        return document.getElementById('languageSelect').value;
    }
}

// ==================== 外部文件管理器类 ====================
class ExternalFileManager {
    constructor() {
        this.files = [];
        this.fileContents = new Map();
        this.fileIds = new Map();
    }

    async addFile() {
        const fileInput = document.getElementById('jsFileInput');
        const filePath = fileInput.value.trim();
        
        if (!filePath) {
            alert('请输入文件路径');
            return;
        }
        
        // 检查文件是否已存在
        if (this.files.includes(filePath)) {
            alert('该文件已经添加过了');
            return;
        }
        
        try {
            this.files.push(filePath);
            await this.loadFileContent(filePath);
            this.updateDisplay();
            fileInput.value = '';
            
            // 触发预览更新
            if (window.codeController) {
                window.codeController.updatePreviewDebounced();
            }
        } catch (error) {
            this.files = this.files.filter(path => path !== filePath);
            console.error(`加载文件失败: ${filePath}`, error);
            alert(`加载文件失败: ${filePath} - ${error.message}`);
        }
    }

    async loadFileContent(filePath) {
        try {
            const fullPath = this.getFullPath(filePath);
            const response = await fetch(fullPath);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const content = await response.text();
            this.fileContents.set(filePath, {
                content: content,
                status: 'loaded',
                error: null
            });
        } catch (error) {
            this.fileContents.set(filePath, {
                content: '',
                status: 'error',
                error: error.message
            });
            throw error;
        }
    }

    removeFile(fileId) {
        const filePath = this.fileIds.get(fileId);
        if (!filePath) return;

        this.files = this.files.filter(path => path !== filePath);
        this.fileContents.delete(filePath);
        this.fileIds.delete(fileId);
        this.updateDisplay();
        
        if (window.codeController) {
            window.codeController.updatePreviewDebounced();
        }
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

        // 优先插入到</head>之前，其次是</body>之前
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

    updateDisplay() {
        const container = document.getElementById('importedFiles');
        
        if (this.files.length === 0) {
            container.innerHTML = '<p style="color: #6c757d; font-style: italic;">暂无导入的文件</p>';
            return;
        }
        
        container.innerHTML = this.files.map(filePath => {
            const fileInfo = this.fileContents.get(filePath);
            const status = fileInfo ? fileInfo.status : 'loading';
            const error = fileInfo ? fileInfo.error : null;
            
            // 为每个文件生成唯一ID
            const fileId = `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            this.fileIds.set(fileId, filePath);
            
            return `
                <div class="imported-file-item">
                    <div class="file-info">
                        <div class="file-path">📄 ${filePath}</div>
                        <div class="file-status ${status}">
                            ${status === 'loaded' ? '✅ 已加载' : 
                              status === 'error' ? `❌ 加载失败: ${error}` : 
                              '⏳ 加载中...'}
                        </div>
                    </div>
                    <button class="btn-remove" onclick="window.codeController.externalFileManager.removeFile('${fileId}')">🗑️ 移除</button>
                </div>
            `;
        }).join('');
    }
}

// ==================== UI管理器类 ====================
class UIManager {
    constructor() {
        this.statusIndicator = document.getElementById('statusIndicator');
    }

    setStatus(status) {
        if (this.statusIndicator) {
            this.statusIndicator.className = status === 'error' ? 'status-indicator error' : 'status-indicator';
        }
    }

    showButtonSuccess(button, text, duration = 2000) {
        const originalText = button.innerHTML;
        button.innerHTML = text;
        setTimeout(() => {
            button.innerHTML = originalText;
        }, duration);
    }

    showButtonLoading(button, text, duration = 1000) {
        const originalText = button.innerHTML;
        button.innerHTML = text;
        button.disabled = true;
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
        }, duration);
    }
}

// ==================== 测试管理器类 ====================
class TestManager {
    constructor(codeController) {
        this.codeController = codeController;
        this.initTestFunctions();
    }
    
    initTestFunctions() {
        // 暴露测试函数到全局
        window.testExternalFileImport = () => this.runExternalFileImportTest();
        
        // 添加开发调试信息
        if (this.isDevelopmentMode()) {
            console.log('🚀 即时代码预览组件已加载完成！');
            console.log('💡 快捷键: Ctrl+S(刷新), F11(全屏), Esc(退出全屏)');
            console.log('📁 外部文件导入功能已启用');
            console.log('🧪 测试功能已启用 - 调用 testExternalFileImport() 进行测试');
        }
    }
    
    isDevelopmentMode() {
        // 判断是否为开发模式
        return window.location.hostname === 'localhost' || 
               window.location.hostname === '127.0.0.1' ||
               window.location.search.includes('debug=true');
    }

    runExternalFileImportTest() {
        console.log('🧪 开始测试外部文件导入功能...');
        
        const testFilePath = '../test/mock-utils.js';
        const externalFileManager = this.codeController.externalFileManager;
        
        // 检查文件是否已存在
        if (externalFileManager.files.includes(testFilePath)) {
            console.log('测试文件已存在，跳过添加');
            return;
        }
        
        externalFileManager.files.push(testFilePath);
        
        externalFileManager.fileContents.set(testFilePath, {
            content: `
                // 模拟的工具函数
                function formatDate(date) {
                    return date.toLocaleDateString();
                }
                
                function capitalize(str) {
                    return str.charAt(0).toUpperCase() + str.slice(1);
                }
                
                export { formatDate, capitalize };
            `,
            status: 'loaded',
            error: null
        });
        
        externalFileManager.updateDisplay();
        
        const testCode = `<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <title>外部文件导入测试</title>
</head>
<body>
    <h2>外部文件导入功能测试</h2>
    <div id="output"></div>
    
    <script>
        const today = new Date();
        const output = document.getElementById('output');
        
        output.innerHTML = 
          '<p>今天是: ' + formatDate(today) + '</p>' +
          '<p>测试文本: ' + capitalize('hello world') + '</p>';
    </script>
</body>
</html>`;
        
        if (this.codeController.codeDisplay) {
            this.codeController.codeDisplay.setCode(testCode, 'html');
            this.codeController.updatePreviewDebounced();
        }
        
        console.log('✅ 外部文件导入功能测试完成');
    }
    
    // 其他测试方法可以在这里添加
    runPerformanceTest() {
        console.log('🧪 开始性能测试...');
        // 性能测试逻辑
    }
    
    runUITest() {
        console.log('🧪 开始UI测试...');
        // UI测试逻辑
    }
}

// ==================== 全局函数（保持兼容性） ====================
function clearEditor() {
    window.codeController?.clearEditor();
}

function copyCode() {
    window.codeController?.copyCode();
}

function refreshPreview() {
    window.codeController?.refreshPreview();
}

function openFullscreen() {
    window.codeController?.openFullscreen();
}

function closeFullscreen() {
    window.codeController?.closeFullscreen();
}

function addJSFile() {
    window.codeController?.externalFileManager.addFile();
}

function updatePreview() {
    window.codeController?.updatePreview();
}

// ==================== 初始化 ====================
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(async function() {
        window.codeController = new CodeEditorController();
        window.testManager = new TestManager(window.codeController);
    }, 500);
});