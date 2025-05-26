    // 全局变量
    let codeDisplay = null;
    const preview = document.getElementById('preview');
    const fullscreenPreview = document.getElementById('fullscreenPreview');
    const statusIndicator = document.getElementById('statusIndicator');
    const errorMessage = document.getElementById('errorMessage');
    
    let updateTimeout;
    let isUpdating = false;

    // 外部JavaScript文件管理
    let externalJSFiles = [];
    let jsFileContents = new Map(); // 存储文件路径和内容的映射

    // 默认代码
    const defaultCode = `<!DOCTYPE html>
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
    
    // 初始化 CodeDisplay
    async function initCodeDisplay() {
      const options = {
        theme: document.getElementById('themeSelect').value,
        showLineNumbers: document.getElementById('showLineNumbers').checked,
        editable: document.getElementById('enableEditing').checked,
        maxHeight: '500px',
        onChange: function(code, language) {
          console.log('代码已更改');
          updatePreviewDebounced();
        }
      };

      codeDisplay = new CodeDisplay('#codeEditor', options);
      await codeDisplay.render(defaultCode, document.getElementById('languageSelect').value);
      
      // 初始预览
      updatePreviewDebounced();
    }

    // 防抖更新预览
    function updatePreviewDebounced() {
      if (isUpdating) return;
      
      clearTimeout(updateTimeout);
      updateTimeout = setTimeout(() => {
        updatePreview();
      }, 300);
    }

    // 更新预览
    function updatePreview() {
      if (isUpdating) return;
      
      try {
        isUpdating = true;
        const code = codeDisplay ? codeDisplay.getCode() : '';
        
        if (code.trim() === '') {
          showError('代码不能为空');
          return;
        }
        
        // 处理外部文件导入
        const processedCode = processCodeWithExternalFiles(code);
        
        // 更新预览
        preview.srcdoc = processedCode;
        fullscreenPreview.srcdoc = processedCode;
        
        // 更新状态
        statusIndicator.className = 'status-indicator';
        hideError();
        
        console.log('✅ 预览更新成功');
        
      } catch (error) {
        showError('预览更新失败: ' + error.message);
        statusIndicator.className = 'status-indicator error';
      } finally {
        isUpdating = false;
      }
    }

    // 显示错误信息
    function showError(message) {
      errorMessage.textContent = message;
      errorMessage.style.display = 'block';
      statusIndicator.className = 'status-indicator error';
    }

    // 隐藏错误信息
    function hideError() {
      errorMessage.style.display = 'none';
    }

    // 清空编辑器
    function clearEditor() {
      if (confirm('确定要清空编辑器吗？')) {
        if (codeDisplay) {
          codeDisplay.setCode('', codeDisplay.getLanguage());
          updatePreview();
        }
      }
    }

    // 复制代码
    async function copyCode() {
      if (!codeDisplay) return;
      
      try {
        const code = codeDisplay.getCode();
        await navigator.clipboard.writeText(code);
        
        // 显示成功提示
        const btn = event.target;
        const originalText = btn.innerHTML;
        btn.innerHTML = '✅ 已复制';
        setTimeout(() => {
          btn.innerHTML = originalText;
        }, 2000);
        
      } catch (error) {
        alert('复制失败: ' + error.message);
      }
    }

    // 刷新预览
    function refreshPreview() {
      updatePreview();
      
      // 显示刷新动画
      const btn = event.target;
      const originalText = btn.innerHTML;
      btn.innerHTML = '🔄 刷新中...';
      btn.disabled = true;
      
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.disabled = false;
      }, 1000);
    }

    // 打开全屏预览
    function openFullscreen() {
        document.getElementById('fullscreenOverlay').style.display = 'flex';
        if (codeDisplay) {
            const code = codeDisplay.getCode();
            const processedCode = processCodeWithExternalFiles(code);
            fullscreenPreview.srcdoc = processedCode;
        }
    }

    // 关闭全屏预览
    function closeFullscreen() {
      document.getElementById('fullscreenOverlay').style.display = 'none';
    }

    // 切换语言
    function changeLanguage() {
      if (codeDisplay) {
        const language = document.getElementById('languageSelect').value;
        codeDisplay.setLanguage(language);
      }
    }

    // 控制面板事件监听
    document.getElementById('languageSelect').addEventListener('change', changeLanguage);

    document.getElementById('themeSelect').addEventListener('change', function() {
      if (codeDisplay) {
        codeDisplay.changeTheme(this.value);
      }
    });

    document.getElementById('showLineNumbers').addEventListener('change', function() {
      if (codeDisplay) {
        codeDisplay.toggleLineNumbers(this.checked);
      }
    });

    document.getElementById('enableEditing').addEventListener('change', function() {
      if (codeDisplay) {
        codeDisplay.setEditable(this.checked);
      }
    });

    // 键盘快捷键
    document.addEventListener('keydown', function(e) {
      // Ctrl+S 或 Cmd+S: 刷新预览
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        refreshPreview();
      }
      
      // F11: 全屏预览
      if (e.key === 'F11') {
        e.preventDefault();
        openFullscreen();
      }
      
      // Esc: 关闭全屏
      if (e.key === 'Escape') {
        closeFullscreen();
      }
      
      // 回车键：在文件输入框中添加文件
      if (e.key === 'Enter' && e.target.id === 'jsFileInput') {
        e.preventDefault();
        addJSFile();
      }
    });

    // 页面加载完成后初始化
    document.addEventListener('DOMContentLoaded', function() {
      // 等待 CodeDisplay 加载完成
      setTimeout(async function() {
        await initCodeDisplay();
        // 初始化外部文件显示
        updateImportedFilesDisplay();
        console.log('🚀 即时代码预览组件已加载完成！');
        console.log('💡 快捷键提示:');
        console.log('   Ctrl+S: 刷新预览');
        console.log('   F11: 全屏预览');
        console.log('   Esc: 关闭全屏');
        console.log('📁 外部文件导入功能已启用');
      }, 500);
    });

    // 错误处理
    window.addEventListener('error', function(e) {
      console.error('页面错误:', e.error);
      showError('页面执行错误: ' + e.message);
    });

    // 预览框架错误处理
    preview.addEventListener('load', function() {
      try {
        preview.contentWindow.addEventListener('error', function(e) {
          showError('预览页面错误: ' + e.message);
        });
      } catch (error) {
        // 跨域限制，忽略
      }
    });

    // ==================== 外部JavaScript文件管理功能 ====================

    // 添加JavaScript文件
    async function addJSFile() {
      const fileInput = document.getElementById('jsFileInput');
      const filePath = fileInput.value.trim();
      
      if (!filePath) {
        alert('请输入文件路径');
        return;
      }
      
      if (externalJSFiles.includes(filePath)) {
        alert('该文件已经添加过了');
        return;
      }
      
      try {
        // 添加到列表
        externalJSFiles.push(filePath);
        
        // 尝试读取文件内容
        await loadJSFileContent(filePath);
        
        // 更新UI显示
        updateImportedFilesDisplay();
        
        // 清空输入框
        fileInput.value = '';
        
        // 更新预览
        updatePreviewDebounced();
        
      } catch (error) {
        // 从列表中移除失败的文件
        externalJSFiles = externalJSFiles.filter(path => path !== filePath);
        showError(`加载文件失败: ${filePath} - ${error.message}`);
      }
    }

    // 读取JavaScript文件内容
    async function loadJSFileContent(filePath) {
      try {
        // 构建相对于当前页面的完整路径
        const fullPath = getFullPath(filePath);
        
        const response = await fetch(fullPath);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const content = await response.text();
        jsFileContents.set(filePath, {
          content: content,
          status: 'loaded',
          error: null
        });
        
        console.log(`✅ 成功加载文件: ${filePath}`);
        
      } catch (error) {
        jsFileContents.set(filePath, {
          content: '',
          status: 'error',
          error: error.message
        });
        
        console.error(`❌ 加载文件失败: ${filePath}`, error);
        throw error;
      }
    }

    // 获取文件的完整路径
    function getFullPath(relativePath) {
      // 如果已经是绝对路径，直接返回
      if (relativePath.startsWith('http://') || relativePath.startsWith('https://') || relativePath.startsWith('/')) {
        return relativePath;
      }
      
      // 处理相对路径
      const currentPath = window.location.pathname;
      const currentDir = currentPath.substring(0, currentPath.lastIndexOf('/'));
      
      // 处理 ../ 和 ./
      let path = relativePath;
      let baseDir = currentDir;
      
      while (path.startsWith('../')) {
        path = path.substring(3);
        baseDir = baseDir.substring(0, baseDir.lastIndexOf('/'));
      }
      
      if (path.startsWith('./')) {
        path = path.substring(2);
      }
      
      return `${baseDir}/${path}`;
    }

    // 移除JavaScript文件
    function removeJSFile(filePath) {
      externalJSFiles = externalJSFiles.filter(path => path !== filePath);
      jsFileContents.delete(filePath);
      updateImportedFilesDisplay();
      updatePreviewDebounced();
    }

    // 更新导入文件显示
    function updateImportedFilesDisplay() {
      const container = document.getElementById('importedFiles');
      
      if (externalJSFiles.length === 0) {
        container.innerHTML = '<p style="color: #6c757d; font-style: italic;">暂无导入的文件</p>';
        return;
      }
      
      container.innerHTML = externalJSFiles.map(filePath => {
        const fileInfo = jsFileContents.get(filePath);
        const status = fileInfo ? fileInfo.status : 'loading';
        const error = fileInfo ? fileInfo.error : null;
        
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
            <button class="btn-remove" onclick="removeJSFile('${filePath}')">🗑️ 移除</button>
          </div>
        `;
      }).join('');
    }

    // 处理代码中的import语句并嵌入外部文件
    function processCodeWithExternalFiles(code) {
      if (!code || externalJSFiles.length === 0) {
        return code;
      }
      
      let processedCode = code;
      
      // 收集所有成功加载的文件内容
      const loadedScripts = [];
      
      externalJSFiles.forEach(filePath => {
        const fileInfo = jsFileContents.get(filePath);
        if (fileInfo && fileInfo.status === 'loaded') {
          // 处理文件内容，移除export语句并转换为普通JavaScript
          let fileContent = fileInfo.content;
          
          // 移除export default语句并创建全局变量
          fileContent = fileContent.replace(
            /export\s+default\s+(\w+)/g, 
            'window.$1 = $1'
          );
          
          // 移除其他export语句
          fileContent = fileContent.replace(
            /export\s+\{[^}]+\}/g, 
            ''
          );
          
          // 移除export const/let/var语句
          fileContent = fileContent.replace(
            /export\s+(const|let|var)\s+/g, 
            '$1 '
          );
          
          loadedScripts.push(`
// ==================== ${filePath} ====================
${fileContent}
// ==================== End of ${filePath} ====================
          `);
        }
      });
      
      // 在代码中查找并替换import语句
      const importRegex = /import\s+(\w+|\{[^}]+\})\s+from\s+['"`]([^'"`]+)['"`];?\s*\n?/g;
      
      processedCode = processedCode.replace(importRegex, (match, importName, path) => {
        // 检查是否是我们已经加载的文件之一
        const matchedFile = externalJSFiles.find(filePath => 
          path.includes(filePath.split('/').pop()) || filePath.includes(path)
        );
        
        if (matchedFile) {
          console.log(`🔄 替换import语句: ${match}`);
          return `// 已通过外部文件导入: ${path}\n`;
        }
        
        return match; // 保持未匹配的import语句不变
      });
      
      // 如果是HTML文件，将脚本内容嵌入到HTML中
      if (processedCode.includes('<html') || processedCode.includes('<!DOCTYPE html')) {
        // 查找是否已经有script标签
        const scriptTagRegex = /<script[^>]*type\s*=\s*["']module["'][^>]*>/i;
        const bodyEndRegex = /<\/body>/i;
        const headEndRegex = /<\/head>/i;
        
        if (loadedScripts.length > 0) {
          const scriptContent = `
<script>
// ==================== 外部导入的JavaScript文件 ====================
${loadedScripts.join('\n')}
// ==================== 外部文件导入结束 ====================
</script>`;
          
          // 将脚本插入到</head>之前
          if (headEndRegex.test(processedCode)) {
            processedCode = processedCode.replace(headEndRegex, `${scriptContent}\n</head>`);
          } else if (bodyEndRegex.test(processedCode)) {
            processedCode = processedCode.replace(bodyEndRegex, `${scriptContent}\n</body>`);
          } else {
            processedCode += scriptContent;
          }
        }
      }
      
      return processedCode;
    }