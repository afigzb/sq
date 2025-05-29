/**
 * CodeEditorPreview教学数据模块
 * 支持章节和多个示例的数据结构
 */

// 教学数据
export const codeEditorTutorialData = {
    title: "📚 CodeEditorPreview 组件教程",
    description: "专业级代码编辑预览组件 - 完整教学文档",
    
    // 教学章节
    chapters: [
        {
            id: 'overview',
            title: '组件概述',
            subtitle: '了解CodeEditorPreview组件的整体设计理念和核心功能',
            examples: [
                {
                    id: 'basic-features',
                    title: '核心功能展示',
                    description: '展示代码高亮、实时预览、主题切换等基本功能',
                    code: `<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CodeEditorPreview 基本功能</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }
        
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            border-radius: 15px;
            padding: 30px;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
        }
        
        h1 {
            color: #2d3748;
            text-align: center;
            margin-bottom: 30px;
        }
        
        .feature-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin: 30px 0;
        }
        
        .feature-card {
            background: #f7fafc;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            padding: 20px;
            text-align: center;
            transition: transform 0.3s;
        }
        
        .feature-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }
        
        .feature-icon {
            font-size: 2rem;
            margin-bottom: 10px;
        }
        
        .feature-title {
            font-size: 1.1rem;
            font-weight: 600;
            color: #2d3748;
            margin-bottom: 8px;
        }
        
        .feature-desc {
            color: #4a5568;
            font-size: 0.9rem;
            line-height: 1.5;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 CodeEditorPreview 核心功能</h1>
        
        <div class="feature-grid">
            <div class="feature-card">
                <div class="feature-icon">🎨</div>
                <div class="feature-title">代码高亮</div>
                <div class="feature-desc">基于Prism.js的专业代码高亮，支持多种编程语言</div>
            </div>
            
            <div class="feature-card">
                <div class="feature-icon">👁️</div>
                <div class="feature-title">实时预览</div>
                <div class="feature-desc">即时渲染HTML/CSS/JS代码，沙箱环境确保安全</div>
            </div>
            
            <div class="feature-card">
                <div class="feature-icon">✏️</div>
                <div class="feature-title">可编辑</div>
                <div class="feature-desc">双击编辑模式，支持Tab缩进和自动调整</div>
            </div>
            
            <div class="feature-card">
                <div class="feature-icon">🎭</div>
                <div class="feature-title">主题系统</div>
                <div class="feature-desc">内置多种主题，支持动态切换</div>
            </div>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding: 20px; background: #e6fffa; border-radius: 10px;">
            <h3 style="color: #2d3748; margin-bottom: 15px;">🔧 模块化设计</h3>
            <p style="color: #4a5568; line-height: 1.6;">
                CodeEditorPreview采用模块化设计，将代码展示、编辑和预览功能分离，
                提供了灵活的配置选项和简洁的API接口，便于集成到各种项目中。
            </p>
        </div>
    </div>
</body>
</html>`,
                    instructions: `# 📚 CodeEditorPreview 组件概述

## 核心特性
- **代码高亮**: 基于Prism.js的专业语法高亮
- **实时预览**: iframe沙箱安全执行代码  
- **可编辑**: 双击进入编辑模式
- **主题系统**: 支持多种Prism主题切换

## 设计理念
- **模块化**: 独立的代码展示和预览组件
- **安全性**: iframe沙箱隔离执行环境
- **灵活性**: 丰富的配置选项和API
- **易用性**: 简洁的使用方式和文档

## 主要组件
1. **CodeDisplay**: 代码高亮和编辑
2. **CodePreview**: 安全代码预览  
3. **CodeEditorPreview**: 主控制器组件`
                }
            ]
        },
        
        {
            id: 'code-display',
            title: 'CodeDisplay组件',
            subtitle: '基于Prism.js的代码高亮展示组件，支持多语言和编辑功能',
            examples: [
                {
                    id: 'syntax-highlight',
                    title: '语法高亮演示',
                    description: '展示不同编程语言的语法高亮效果',
                    code: `<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>语法高亮演示</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 20px;
            background: #f5f7fa;
            color: #2d3748;
        }
        
        .container {
            max-width: 1000px;
            margin: 0 auto;
        }
        
        h1 {
            text-align: center;
            color: #2d3748;
            margin-bottom: 30px;
        }
        
        .demo-section {
            background: white;
            border-radius: 12px;
            padding: 25px;
            margin-bottom: 25px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.08);
        }
        
        .demo-title {
            font-size: 1.3rem;
            font-weight: 600;
            color: #2d3748;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .language-badge {
            background: #4299e1;
            color: white;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 500;
        }
        
        pre {
            background: #f7fafc;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 20px;
            overflow-x: auto;
            margin: 15px 0;
            font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
            font-size: 14px;
            line-height: 1.5;
        }
        
        .feature-highlight {
            background: #f0fff4;
            border-left: 4px solid #48bb78;
            padding: 15px 20px;
            margin: 20px 0;
            border-radius: 0 8px 8px 0;
        }
        
        .feature-highlight h4 {
            color: #2f855a;
            margin-bottom: 8px;
        }
        
        .feature-highlight p {
            color: #2d3748;
            margin: 0;
            line-height: 1.6;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎨 CodeDisplay 语法高亮演示</h1>
        
        <div class="demo-section">
            <div class="demo-title">
                <span>JavaScript 代码高亮</span>
                <span class="language-badge">JavaScript</span>
            </div>
            <pre><code class="language-javascript">// ES6+ 现代JavaScript示例
const CodeDisplay = {
    // 初始化方法
    init(element, options = {}) {
        this.element = element;
        this.options = {
            theme: 'prism',
            language: 'javascript',
            editable: false,
            ...options
        };
        
        this.setupPrism();
        this.bindEvents();
    },
    
    // 设置代码内容
    setCode(code, language = this.options.language) {
        this.options.language = language;
        this.element.innerHTML = \`<code class="language-\${language}">\${this.escapeHtml(code)}</code>\`;
        Prism.highlightElement(this.element.querySelector('code'));
    },
    
    // HTML转义
    escapeHtml: (text) => text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;')
};</code></pre>
        </div>
        
        <div class="demo-section">
            <div class="demo-title">
                <span>CSS 样式高亮</span>
                <span class="language-badge">CSS</span>
            </div>
            <pre><code class="language-css">/* 现代CSS特性演示 */
.code-display {
    --primary-color: #4299e1;
    --border-radius: 8px;
    --transition-duration: 0.3s;
    
    position: relative;
    background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
    border: 1px solid var(--primary-color);
    border-radius: var(--border-radius);
    padding: 1.5rem;
    font-family: 'Consolas', monospace;
    transition: all var(--transition-duration) ease;
}

.code-display:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
    .code-display {
        padding: 1rem;
        font-size: 0.9rem;
    }
}</code></pre>
        </div>
        
        <div class="demo-section">
            <div class="demo-title">
                <span>HTML 结构高亮</span>
                <span class="language-badge">HTML</span>
            </div>
            <pre><code class="language-html">&lt;!-- 语义化HTML5结构 --&gt;
&lt;article class="code-example"&gt;
    &lt;header class="example-header"&gt;
        &lt;h2&gt;代码示例标题&lt;/h2&gt;
        &lt;div class="meta-info"&gt;
            &lt;span class="language"&gt;JavaScript&lt;/span&gt;
            &lt;span class="difficulty"&gt;中级&lt;/span&gt;
        &lt;/div&gt;
    &lt;/header&gt;
    
    &lt;section class="code-content"&gt;
        &lt;pre&gt;&lt;code class="language-javascript"&gt;
            // 代码内容将在这里显示
        &lt;/code&gt;&lt;/pre&gt;
    &lt;/section&gt;
    
    &lt;footer class="example-footer"&gt;
        &lt;button class="copy-btn" data-copy-target="code-content"&gt;
            复制代码
        &lt;/button&gt;
        &lt;button class="edit-btn" data-edit-target="code-content"&gt;
            编辑代码
        &lt;/button&gt;
    &lt;/footer&gt;
&lt;/article&gt;</code></pre>
        </div>
        
        <div class="feature-highlight">
            <h4>🔧 CodeDisplay 核心特性</h4>
            <p>
                • <strong>多语言支持:</strong> JavaScript, CSS, HTML, Python, JSON等<br>
                • <strong>自动资源加载:</strong> 智能加载Prism.js相关CSS和JS资源<br>
                • <strong>双击编辑:</strong> 支持双击进入编辑模式，提供Tab缩进<br>
                • <strong>主题切换:</strong> 动态切换Prism主题，无需重新渲染<br>
                • <strong>实时更新:</strong> 支持动态更新代码内容和语言类型
            </p>
        </div>
    </div>
</body>
</html>`,
                    instructions: `# 🎨 CodeDisplay 语法高亮详解

## Prism.js 集成
- **自动加载**: 智能检测并加载必要的Prism资源
- **语言支持**: 支持100+编程语言的语法高亮
- **主题系统**: 内置多种配色主题可供选择

## 编辑功能
- **双击编辑**: 双击代码块进入编辑模式
- **Tab支持**: 保留Tab缩进，支持代码格式化
- **自动高度**: 根据内容自动调整编辑器高度

## API方法
- \`setCode(code, language)\`: 设置代码内容
- \`setTheme(themeName)\`: 切换高亮主题
- \`setEditable(boolean)\`: 启用/禁用编辑模式

## 使用场景
- 技术文档中的代码展示
- 在线代码教程
- 代码片段分享平台`
                }
            ]
        },
        
        {
            id: 'code-preview',
            title: 'CodePreview组件',
            subtitle: '基于iframe沙箱的安全代码预览引擎，实现代码的隔离执行',
            examples: [
                {
                    id: 'iframe-sandbox',
                    title: 'iframe沙箱技术',
                    description: '展示iframe沙箱如何安全执行用户代码',
                    code: `<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>iframe沙箱技术演示</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0;
            padding: 20px;
            background: #f8fafc;
            color: #2d3748;
            line-height: 1.6;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
        
        h1 {
            text-align: center;
            color: #2d3748;
            margin-bottom: 30px;
        }
        
        .demo-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 25px;
            margin: 30px 0;
        }
        
        .demo-card {
            background: white;
            border-radius: 12px;
            padding: 25px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.08);
            border: 1px solid #e2e8f0;
        }
        
        .demo-title {
            font-size: 1.3rem;
            font-weight: 600;
            color: #2d3748;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .security-level {
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 500;
        }
        
        .safe { background: #c6f6d5; color: #22543d; }
        .warning { background: #fed7d7; color: #742a2a; }
        
        .iframe-demo {
            border: 2px solid #e2e8f0;
            border-radius: 8px;
            margin: 15px 0;
            overflow: hidden;
        }
        
        .iframe-demo iframe {
            width: 100%;
            height: 200px;
            border: none;
            display: block;
        }
        
        .code-snippet {
            background: #f7fafc;
            border: 1px solid #e2e8f0;
            border-radius: 6px;
            padding: 15px;
            font-family: 'Consolas', monospace;
            font-size: 13px;
            margin: 15px 0;
            overflow-x: auto;
        }
        
        .feature-list {
            list-style: none;
            padding: 0;
            margin: 15px 0;
        }
        
        .feature-list li {
            padding: 8px 0;
            border-bottom: 1px solid #e2e8f0;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .feature-list li:last-child {
            border-bottom: none;
        }
        
        .check-icon { color: #48bb78; }
        .x-icon { color: #f56565; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🛡️ iframe沙箱技术演示</h1>
        
        <div class="demo-grid">
            <div class="demo-card">
                <div class="demo-title">
                    <span>🏖️ 沙箱模式</span>
                    <span class="security-level safe">安全</span>
                </div>
                
                <div class="iframe-demo">
                    <iframe 
                        sandbox="allow-scripts allow-same-origin"
                        srcdoc='
                        <!DOCTYPE html>
                        <html>
                        <head>
                            <style>
                                body { 
                                    font-family: Arial; 
                                    padding: 20px; 
                                    background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
                                    color: white;
                                    text-align: center;
                                }
                                .demo-box {
                                    background: rgba(255,255,255,0.2);
                                    padding: 15px;
                                    border-radius: 10px;
                                    margin: 10px 0;
                                }
                            </style>
                        </head>
                        <body>
                            <div class="demo-box">
                                <h3>🔒 沙箱环境</h3>
                                <p>这段代码运行在安全的沙箱中</p>
                                <button onclick="showMessage()">点击测试</button>
                            </div>
                            
                            <script>
                                function showMessage() {
                                    const box = document.querySelector(".demo-box");
                                    box.innerHTML += "<p>✅ JavaScript正常执行！</p>";
                                }
                                
                                // 尝试访问父页面（会被阻止）
                                try {
                                    parent.document.title = "尝试修改父页面";
                                } catch(e) {
                                    console.log("沙箱阻止了跨域访问:", e.message);
                                }
                            </script>
                        </body>
                        </html>'>
                    </iframe>
                </div>
                
                <div class="code-snippet">
sandbox="allow-scripts allow-same-origin"
srcdoc="&lt;html&gt;...安全的HTML内容...&lt;/html&gt;"
                </div>
                
                <ul class="feature-list">
                    <li><span class="check-icon">✅</span> JavaScript可以执行</li>
                    <li><span class="x-icon">❌</span> 无法访问父页面DOM</li>
                    <li><span class="x-icon">❌</span> 无法修改父页面</li>
                    <li><span class="check-icon">✅</span> 内部交互正常</li>
                </ul>
            </div>
            
            <div class="demo-card">
                <div class="demo-title">
                    <span>⚠️ 无沙箱模式</span>
                    <span class="security-level warning">危险</span>
                </div>
                
                <div class="iframe-demo">
                    <iframe 
                        srcdoc='
                        <!DOCTYPE html>
                        <html>
                        <head>
                            <style>
                                body { 
                                    font-family: Arial; 
                                    padding: 20px; 
                                    background: linear-gradient(45deg, #ff9a9e, #fad0c4);
                                    color: #333;
                                    text-align: center;
                                }
                                .warning-box {
                                    background: rgba(255,255,255,0.9);
                                    padding: 15px;
                                    border-radius: 10px;
                                    border: 2px solid #f56565;
                                    margin: 10px 0;
                                }
                            </style>
                        </head>
                        <body>
                            <div class="warning-box">
                                <h3>⚠️ 无保护环境</h3>
                                <p>这段代码没有沙箱保护</p>
                                <button onclick="dangerousAction()">危险操作</button>
                            </div>
                            
                            <script>
                                function dangerousAction() {
                                    // 在真实环境中，这些操作可能很危险
                                    try {
                                        // 尝试访问父页面
                                        if (parent !== window) {
                                            parent.document.body.style.background = "red";
                                        }
                                        alert("⚠️ 危险：可以影响父页面！");
                                    } catch(e) {
                                        alert("🛡️ 被同源策略保护");
                                    }
                                }
                            </script>
                        </body>
                        </html>'>
                    </iframe>
                </div>
                
                <div class="code-snippet">
// 无sandbox属性，潜在安全风险
&lt;iframe srcdoc="..."&gt;&lt;/iframe&gt;
                </div>
                
                <ul class="feature-list">
                    <li><span class="x-icon">❌</span> 可能访问父页面</li>
                    <li><span class="x-icon">❌</span> 可能执行恶意代码</li>
                    <li><span class="x-icon">❌</span> 安全风险较高</li>
                    <li><span class="check-icon">✅</span> 功能不受限制</li>
                </ul>
            </div>
        </div>
        
        <div style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.08); margin-top: 30px;">
            <h3 style="color: #2d3748; margin-bottom: 20px;">🔧 CodePreview的iframe实现</h3>
            <div class="code-snippet">
const iframe = document.createElement('iframe');
iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-forms');
iframe.srcdoc = \`
&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;style&gt;/* 自动注入的样式 */&lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
    \${userCode}
&lt;/body&gt;
&lt;/html&gt;
\`;
            </div>
            <p style="color: #4a5568; margin-top: 15px;">
                <strong>关键特性：</strong> 
                通过sandbox属性创建隔离环境，使用srcdoc直接渲染HTML内容，
                自动注入必要的样式，确保安全性的同时提供良好的用户体验。
            </p>
        </div>
    </div>
</body>
</html>`,
                    instructions: `# 🛡️ CodePreview iframe沙箱技术

## iframe基础概念
- **内联框架**: 在当前页面中嵌入独立的HTML文档
- **隔离环境**: 创建完全独立的浏览上下文
- **安全边界**: 防止恶意代码影响主页面

## sandbox属性详解
- \`allow-scripts\`: 允许执行JavaScript代码
- \`allow-same-origin\`: 允许访问同源资源  
- \`allow-forms\`: 允许表单提交
- \`allow-modals\`: 允许弹出模态对话框

## CodePreview的安全机制
1. **沙箱隔离**: 防止恶意代码影响主页面
2. **srcdoc渲染**: 避免跨域问题，直接渲染HTML
3. **样式注入**: 自动注入安全的CSS样式
4. **错误隔离**: 预览代码错误不影响主应用

## 实际应用优势
- 安全执行用户代码
- 实时预览HTML/CSS/JS
- 完全的DOM隔离
- 良好的性能表现`
                }
            ]
        },
        
        {
            id: 'integration',
            title: '组件整合应用',
            subtitle: '展示CodeEditorPreview的完整使用场景和最佳实践',
            examples: [
                {
                    id: 'theme-demo',
                    title: '主题切换完整示例',
                    description: '展示组件的主题切换功能和完整的用户交互',
    code: `<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>主题切换示例</title>
    <style>
        :root {
            --primary-color: #667eea;
            --secondary-color: #764ba2;
            --text-color: #333;
            --bg-color: #f5f5f5;
        }
        
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background: var(--bg-color);
            color: var(--text-color);
            transition: all 0.3s ease;
        }
        
        .theme-switcher {
            text-align: center;
            margin-bottom: 30px;
        }
        
        .theme-btn {
            padding: 10px 20px;
            margin: 5px;
            border: none;
            border-radius: 20px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: bold;
        }
        
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
        }
        
        /* 默认主题 */
        .theme-default {
            --primary-color: #667eea;
            --secondary-color: #764ba2;
            --text-color: #333;
            --bg-color: #f5f5f5;
        }
        
        /* 暗黑主题 */
        .theme-dark {
            --primary-color: #ff6b6b;
            --secondary-color: #4ecdc4;
            --text-color: #f0f0f0;
            --bg-color: #1a1a2e;
        }
        
        .theme-dark .container {
            background: #2a2a3e;
            color: var(--text-color);
        }
        
        /* 清新主题 */
        .theme-fresh {
            --primary-color: #4ecdc4;
            --secondary-color: #44a08d;
            --text-color: #2c3e50;
            --bg-color: #ecf0f1;
        }
        
        .highlight {
            background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            font-weight: bold;
        }
    </style>
</head>
<body class="theme-default">
    <div class="theme-switcher">
        <button class="theme-btn" onclick="setTheme('default')" style="background: #667eea; color: white;">默认主题</button>
        <button class="theme-btn" onclick="setTheme('dark')" style="background: #1a1a2e; color: white;">暗黑主题</button>
        <button class="theme-btn" onclick="setTheme('fresh')" style="background: #4ecdc4; color: white;">清新主题</button>
    </div>
    
    <div class="container">
        <h1>🎨 <span class="highlight">主题切换</span> 演示</h1>
        <p>点击上面的按钮来切换不同的主题风格！</p>
        <p>这个示例展示了如何使用CSS变量来实现主题切换功能。</p>
        
        <h3>主要特点：</h3>
        <ul>
            <li>使用CSS自定义属性（变量）</li>
            <li>平滑的主题切换动画</li>
            <li>响应式设计</li>
            <li>易于扩展新主题</li>
        </ul>
    </div>

    <script>
        function setTheme(themeName) {
            // 移除所有主题类
            document.body.className = document.body.className.replace(/theme-\\w+/g, '');
            // 添加新主题类
            document.body.classList.add('theme-' + themeName);
            
            // 保存到本地存储
            localStorage.setItem('selected-theme', themeName);
        }
        
        // 页面加载时恢复主题
        window.addEventListener('load', function() {
            const savedTheme = localStorage.getItem('selected-theme') || 'default';
            setTheme(savedTheme);
        });
    </script>
</body>
</html>`,
                    instructions: `# 🎨 主题切换完整实现

## CSS变量系统
- **:root定义**: 全局CSS变量定义
- **主题类切换**: JavaScript动态切换CSS类
- **本地存储**: 记住用户的主题偏好
- **平滑过渡**: transition实现切换动画

## CodeEditorPreview集成
- **Prism主题**: 支持prism、prism-dark、prism-tomorrow等
- **工具栏控制**: 通过工具栏实现主题切换
- **API调用**: \`setTheme(themeName)\`方法

## 扩展建议
- 添加更多颜色变量
- 创建季节性主题
- 支持用户自定义主题
- 与系统深色模式联动

## 最佳实践
- 使用语义化的变量名
- 保持主题间的一致性
- 考虑可访问性和对比度
- 提供主题预览功能`
                }
            ]
        }
    ],
    
    // 配置信息
    config: {
        theme: 'prism',
        language: 'html',
        editorConfig: {
            editable: true,
            autoPreview: true,
            showToolbar: true,
            showFullscreen: true,
            debounceDelay: 300
        }
    }
};

// 兼容性导出 - 保持向后兼容
export function getTutorialData() {
    return codeEditorTutorialData;
}

export default codeEditorTutorialData;
