/**
 * CodeEditorPreview 教学页面示例数据
 * 包含主题切换示例
 */

// 主题切换示例
export const themeDemo = {
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
    language: 'html',
    instructions: `主题切换配置示例：

🎨 **主题系统特点：**
1. **CSS变量** - 使用:root定义全局变量
2. **类切换** - JavaScript动态切换主题类
3. **本地存储** - 记住用户的主题选择
4. **平滑过渡** - transition实现切换动画

⚙️ **配置要点：**
- 通过工具栏的主题选择器切换主题
- 代码编辑器支持prism、prism-dark等主题
- 可以自定义主题配置

🔧 **可以扩展：**
- 添加更多主题变量
- 创建新的主题风格
- 集成到其他项目中`
};
