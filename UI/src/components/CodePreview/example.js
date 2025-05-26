// CodePreview 组件使用示例

// 初始化预览组件
const basicPreview = new CodePreview('#basicPreview', {
    width: '100%',
    height: '400px',
    onError: (error) => {
        console.log('Basic Preview Error:', error);
    },
    onLoad: () => {
        console.log('Basic Preview Loaded');
    }
});

const errorPreview = new CodePreview('#errorPreview', {
    width: '100%',
    height: '300px',
    onError: (error) => {
        console.log('Error Preview Error:', error);
    }
});

// HTML 示例
function renderHtmlExample() {
    const htmlCode = `<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <title>HTML示例</title>
    <style>
        body { 
            font-family: Arial, sans-serif; 
            padding: 20px; 
            background: #f0f0f0; 
        }
        .card { 
            background: white; 
            padding: 20px; 
            border-radius: 8px; 
            box-shadow: 0 2px 10px rgba(0,0,0,0.1); 
        }
        button {
            background: #007acc;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 4px;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <div class="card">
        <h2>Hello CodePreview!</h2>
        <p>这是一个HTML代码示例</p>
        <button onclick="alert('Hello World!')">点击我</button>
    </div>
</body>
</html>`;
    basicPreview.render(htmlCode);
}

// JavaScript 示例
function renderJSExample() {
    const jsCode = `<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <title>JavaScript示例</title>
    <style>
        body { 
            font-family: Arial, sans-serif; 
            padding: 20px; 
            background: #f5f5f5; 
        }
        .output {
            background: white;
            padding: 15px;
            border-radius: 8px;
            margin: 10px 0;
        }
    </style>
</head>
<body>
    <h3>JavaScript 执行结果</h3>
    <div id="output" class="output"></div>
    
    <script>
        const numbers = [1, 2, 3, 4, 5];
        const output = document.getElementById('output');
        
        function log(message) {
            const div = document.createElement('div');
            div.textContent = message;
            div.style.marginBottom = '8px';
            output.appendChild(div);
        }
        
        log('原始数组: ' + numbers.join(', '));
        
        const doubled = numbers.map(n => n * 2);
        log('乘以2后: ' + doubled.join(', '));
        
        const sum = numbers.reduce((a, b) => a + b, 0);
        log('数组总和: ' + sum);
        
        let count = 0;
        const timer = setInterval(() => {
            count++;
            log('计数器: ' + count);
            if (count >= 3) {
                clearInterval(timer);
                log('计数器结束!');
            }
        }, 1000);
    </script>
</body>
</html>`;
    basicPreview.render(jsCode);
}

// CSS 示例
function renderCSSExample() {
    const cssCode = `<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <title>CSS示例</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background: #f0f0f0;
        }
        
        .demo-container {
            background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
            color: white;
            padding: 30px;
            border-radius: 15px;
            text-align: center;
            animation: float 3s ease-in-out infinite;
        }
        
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }
        
        .demo-button {
            background: rgba(255, 255, 255, 0.2);
            border: 2px solid white;
            color: white;
            padding: 12px 24px;
            border-radius: 25px;
            cursor: pointer;
            transition: all 0.3s ease;
            margin: 10px;
        }
        
        .demo-button:hover {
            background: white;
            color: #333;
            transform: scale(1.05);
        }
        
        .demo-list {
            list-style: none;
            padding: 0;
            margin: 20px 0;
        }
        
        .demo-list li {
            background: rgba(255, 255, 255, 0.1);
            margin: 8px 0;
            padding: 12px;
            border-radius: 8px;
            border-left: 4px solid white;
        }
    </style>
</head>
<body>
    <div class="demo-container">
        <h2>CSS 样式演示</h2>
        <p>这是一个展示CSS效果的页面</p>
        <button class="demo-button">悬停按钮</button>
        <button class="demo-button">另一个按钮</button>
        <ul class="demo-list">
            <li>列表项目 1</li>
            <li>列表项目 2</li>
            <li>列表项目 3</li>
        </ul>
    </div>
</body>
</html>`;
    basicPreview.render(cssCode);
}

// 完整页面示例
function renderCompleteExample() {
    const completeCode = `<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <title>完整页面示例</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            margin: 0;
            padding: 20px;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .app {
            background: white;
            padding: 40px;
            border-radius: 20px;
            box-shadow: 0 15px 35px rgba(0,0,0,0.1);
            text-align: center;
            max-width: 400px;
            width: 100%;
        }
        .counter {
            font-size: 3rem;
            font-weight: bold;
            margin: 20px 0;
            color: #333;
        }
        .btn {
            background: #007acc;
            color: white;
            border: none;
            padding: 15px 25px;
            border-radius: 8px;
            cursor: pointer;
            margin: 5px;
            font-size: 16px;
            transition: all 0.3s ease;
        }
        .btn:hover {
            background: #005a9e;
            transform: translateY(-2px);
        }
        .btn.reset {
            background: #dc3545;
        }
        .btn.reset:hover {
            background: #c82333;
        }
    </style>
</head>
<body>
    <div class="app">
        <h1>🎯 计数器应用</h1>
        <div id="counter" class="counter">0</div>
        <button class="btn" onclick="increment()">➕ 增加</button>
        <button class="btn" onclick="decrement()">➖ 减少</button>
        <button class="btn reset" onclick="reset()">🔄 重置</button>
        
        <script>
            let count = 0;
            const counterElement = document.getElementById('counter');
            
            function updateDisplay() {
                counterElement.textContent = count;
                counterElement.style.color = count > 0 ? '#28a745' : count < 0 ? '#dc3545' : '#333';
            }
            
            function increment() {
                count++;
                updateDisplay();
            }
            
            function decrement() {
                count--;
                updateDisplay();
            }
            
            function reset() {
                count = 0;
                updateDisplay();
            }
        </script>
    </div>
</body>
</html>`;
    basicPreview.render(completeCode);
}

// 错误示例
function renderErrorExample() {
    const errorCode = `<!DOCTYPE html>
<html>
<head>
    <title>错误示例</title>
</head>
<body>
    <h3>这段代码会产生错误</h3>
    <div id="output"></div>
    
    <script>
        try {
            // 引用未定义的变量
            console.log(undefinedVariable);
        } catch (e) {
            document.getElementById('output').innerHTML = 
                '<p style="color: red;">错误: ' + e.message + '</p>';
        }
        
        try {
            // 调用不存在的函数
            nonExistentFunction();
        } catch (e) {
            document.getElementById('output').innerHTML += 
                '<p style="color: red;">错误: ' + e.message + '</p>';
        }
    </script>
</body>
</html>`;
    errorPreview.render(errorCode);
}

// 空内容示例
function renderEmptyExample() {
    errorPreview.render('');
}

// 页面加载时显示默认示例
document.addEventListener('DOMContentLoaded', function() {
    renderHtmlExample();
    console.log('🚀 CodePreview 示例页面已加载完成！');
});