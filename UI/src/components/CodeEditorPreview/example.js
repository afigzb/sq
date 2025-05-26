// 代码示例数据
const codeSamples = {
    html: `<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <title>HTML 示例</title>
    <style>
        body { 
            font-family: Arial, sans-serif; 
            padding: 20px; 
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            min-height: 100vh;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: rgba(255, 255, 255, 0.1);
            padding: 30px;
            border-radius: 15px;
            backdrop-filter: blur(10px);
        }
        .highlight { 
            background: rgba(255, 255, 0, 0.3); 
            padding: 2px 4px; 
            border-radius: 3px;
        }
        .feature-list {
            list-style: none;
            padding: 0;
        }
        .feature-list li {
            padding: 10px;
            margin: 8px 0;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 5px;
            border-left: 4px solid #4CAF50;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎉 欢迎使用代码编辑预览器</h1>
        <p>这是一个 <span class="highlight">HTML</span> 示例页面，展示了基础的网页结构。</p>
        
        <h2>✨ 主要功能</h2>
        <ul class="feature-list">
            <li>📝 支持实时预览</li>
            <li>🎨 语法高亮显示</li>
            <li>⚡ 在线编辑功能</li>
            <li>🔧 多主题支持</li>
            <li>📱 响应式设计</li>
        </ul>
        
        <p>试试双击代码区域来编辑代码，实时看到预览效果！</p>
    </div>
</body>
</html>`,

    css: `<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <title>CSS 动画示例</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 20px;
            background: linear-gradient(45deg, #667eea, #764ba2);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0;
        }
        
        .animation-container {
            text-align: center;
            color: white;
            background: rgba(255, 255, 255, 0.1);
            padding: 40px;
            border-radius: 20px;
            backdrop-filter: blur(10px);
        }
        
        .bounce-ball {
            width: 60px;
            height: 60px;
            background: linear-gradient(45deg, #ff6b6b, #ee5a24);
            border-radius: 50%;
            margin: 20px auto;
            animation: bounce 1.5s infinite;
            box-shadow: 0 4px 15px rgba(255, 107, 107, 0.4);
        }
        
        @keyframes bounce {
            0%, 100% { 
                transform: translateY(0) scale(1); 
            }
            50% { 
                transform: translateY(-30px) scale(1.1); 
            }
        }
        
        .pulse-text {
            font-size: 2.5em;
            animation: pulse 2s infinite;
            margin: 20px 0;
        }
        
        @keyframes pulse {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.05); opacity: 0.8; }
            100% { transform: scale(1); opacity: 1; }
        }
        
        .rotate-icon {
            font-size: 4em;
            animation: rotate 3s linear infinite;
            margin: 20px;
            display: inline-block;
        }
        
        @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        
        .slide-in {
            animation: slideIn 1s ease-out;
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(-100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        .glow-button {
            background: linear-gradient(45deg, #4CAF50, #45a049);
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 25px;
            font-size: 16px;
            cursor: pointer;
            margin: 10px;
            transition: all 0.3s;
            box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
        }
        
        .glow-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(76, 175, 80, 0.4);
        }
    </style>
</head>
<body>
    <div class="animation-container slide-in">
        <h1 class="pulse-text">🎨 CSS 动画示例</h1>
        <div class="rotate-icon">⚙️</div>
        <div class="bounce-ball"></div>
        <p>各种精美的 CSS 动画效果</p>
        <button class="glow-button" onclick="showMessage()">点击我！</button>
        <div id="message"></div>
    </div>
    
    <script>
        function showMessage() {
            document.getElementById('message').innerHTML = 
                '<p style="margin-top: 20px; font-size: 18px;">✨ 动画效果很棒吧！</p>';
        }
    </script>
</body>
</html>`,

    js: `<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <title>JavaScript 交互示例</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 20px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            min-height: 100vh;
            margin: 0;
        }
        .game-container {
            max-width: 700px;
            margin: 0 auto;
            background: rgba(255, 255, 255, 0.95);
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        .header {
            text-align: center;
            color: #333;
            margin-bottom: 20px;
        }
        .controls {
            margin: 20px 0;
            text-align: center;
        }
        button {
            padding: 12px 24px;
            margin: 8px;
            border: none;
            border-radius: 25px;
            background: linear-gradient(45deg, #007acc, #0056b3);
            color: white;
            cursor: pointer;
            font-size: 14px;
            font-weight: 600;
            transition: all 0.3s;
            box-shadow: 0 4px 15px rgba(0, 122, 204, 0.3);
        }
        button:hover { 
            background: linear-gradient(45deg, #0056b3, #004085);
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0, 122, 204, 0.4);
        }
        .score { 
            font-size: 1.8em; 
            font-weight: bold; 
            color: #007acc; 
            text-align: center;
            margin: 15px 0;
        }
        .game-area {
            border: 3px solid #ddd;
            height: 250px;
            position: relative;
            overflow: hidden;
            background: linear-gradient(45deg, #f0f8ff, #e6f3ff);
            border-radius: 10px;
            margin: 20px 0;
        }
        .target {
            position: absolute;
            width: 35px;
            height: 35px;
            background: linear-gradient(45deg, #ff6b6b, #ee5a24);
            border-radius: 50%;
            cursor: pointer;
            transition: transform 0.1s;
            box-shadow: 0 2px 8px rgba(255, 107, 107, 0.4);
        }
        .target:hover { 
            transform: scale(1.3); 
        }
        .status {
            text-align: center;
            font-size: 16px;
            color: #666;
            background: #f8f9fa;
            padding: 10px;
            border-radius: 8px;
            margin: 10px 0;
        }
    </style>
</head>
<body>
    <div class="game-container">
        <div class="header">
            <h1>🎯 JavaScript 点击游戏</h1>
            <p>点击红色圆点获得分数，看看你能得多少分！</p>
        </div>
        
        <div class="score">得分: <span id="score">0</span></div>
        
        <div class="controls">
            <button onclick="startGame()">🚀 开始游戏</button>
            <button onclick="resetGame()">🔄 重置游戏</button>
            <button onclick="toggleMode()">⚡ 切换模式</button>
        </div>
        
        <div class="game-area" id="gameArea"></div>
        <div class="status" id="status">点击"开始游戏"来开始挑战！</div>
    </div>
    
    <script>
        let score = 0;
        let gameActive = false;
        let gameMode = 'normal';
        let gameInterval;
        
        function startGame() {
            if (gameActive) return;
            
            gameActive = true;
            score = 0;
            updateScore();
            document.getElementById('status').textContent = '游戏进行中...快速点击红色圆点获得分数！';
            document.getElementById('status').style.background = '#d4edda';
            document.getElementById('status').style.color = '#155724';
            
            gameInterval = setInterval(createTarget, gameMode === 'hard' ? 600 : 1200);
            setTimeout(endGame, 20000); // 20秒后结束
        }
        
        function endGame() {
            gameActive = false;
            clearInterval(gameInterval);
            document.getElementById('gameArea').innerHTML = '';
            document.getElementById('status').innerHTML = 
                "🎉 游戏结束！最终得分: " + score + " 分<br>模式: " + (gameMode === 'hard' ? '困难模式' : '普通模式');
            document.getElementById('status').style.background = '#f8d7da';
            document.getElementById('status').style.color = '#721c24';
        }
        
        function resetGame() {
            gameActive = false;
            clearInterval(gameInterval);
            score = 0;
            updateScore();
            document.getElementById('gameArea').innerHTML = '';
            document.getElementById('status').textContent = '游戏已重置，点击"开始游戏"重新开始！';
            document.getElementById('status').style.background = '#f8f9fa';
            document.getElementById('status').style.color = '#666';
        }
        
        function toggleMode() {
            gameMode = gameMode === 'normal' ? 'hard' : 'normal';
            document.getElementById('status').textContent = 
                "模式已切换为: " + (gameMode === 'hard' ? '困难模式（更快速度，更高分数）' : '普通模式');
            document.getElementById('status').style.background = '#d1ecf1';
            document.getElementById('status').style.color = '#0c5460';
        }
        
        function createTarget() {
            if (!gameActive) return;
            
            const gameArea = document.getElementById('gameArea');
            const target = document.createElement('div');
            target.className = 'target';
            
            // 随机位置
            const maxX = gameArea.offsetWidth - 35;
            const maxY = gameArea.offsetHeight - 35;
            target.style.left = Math.random() * maxX + 'px';
            target.style.top = Math.random() * maxY + 'px';
            
            // 点击事件
            target.onclick = function() {
                score += gameMode === 'hard' ? 3 : 1;
                updateScore();
                
                // 点击效果
                this.style.transform = 'scale(1.5)';
                this.style.background = 'linear-gradient(45deg, #4CAF50, #45a049)';
                setTimeout(() => this.remove(), 100);
            };
            
            gameArea.appendChild(target);
            
            // 自动消失
            setTimeout(() => {
                if (target.parentNode) {
                    target.remove();
                }
            }, gameMode === 'hard' ? 800 : 1500);
        }
        
        function updateScore() {
            document.getElementById('score').textContent = score;
        }
        
        // 初始化
        console.log('🎮 JavaScript 交互游戏已加载完成！');
        
        // 添加键盘支持
        document.addEventListener('keydown', function(e) {
            if (e.code === 'Space' && !gameActive) {
                e.preventDefault();
                startGame();
            }
        });
    </script>
</body>
</html>`
};

// 等待页面加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 基础示例事件处理
    document.querySelectorAll('.code-sample-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const sample = this.dataset.sample;
            const basicExample = document.getElementById('basicExample');
            if (basicExample && codeSamples[sample]) {
                basicExample.setCode(codeSamples[sample], 'html');
            }
        });
    });

    // 高级配置控制
    const advancedExample = document.getElementById('advancedExample');
    
    document.getElementById('themeSelect').addEventListener('change', function() {
        advancedExample.setAttribute('theme', this.value);
    });
    
    document.getElementById('languageSelect').addEventListener('change', function() {
        advancedExample.setLanguage(this.value);
    });
    

    
    document.getElementById('editableCheck').addEventListener('change', function() {
        advancedExample.setAttribute('editable', this.checked);
    });
    
    document.getElementById('getCodeBtn').addEventListener('click', function() {
        const code = advancedExample.getCode();
        alert('当前代码长度: ' + code.length + ' 字符\n\n' + code.substring(0, 200) + '...');
    });
    
    document.getElementById('clearCodeBtn').addEventListener('click', function() {
        advancedExample.clearCode();
    });

    // API 示例控制
    const apiExample = document.getElementById('apiExample');
    
    document.getElementById('setHtmlBtn').addEventListener('click', function() {
        apiExample.setCode(codeSamples.html, 'html');
    });
    
    document.getElementById('setCssBtn').addEventListener('click', function() {
        apiExample.setCode(codeSamples.css, 'html');
    });
    
    document.getElementById('setJsBtn').addEventListener('click', function() {
        apiExample.setCode(codeSamples.js, 'html');
    });
    
    document.getElementById('addEventBtn').addEventListener('click', function() {
        // 添加事件监听器示例
        apiExample.addEventListener('code-change', function(event) {
            console.log('代码已更改:', event.detail);
        });
        
        apiExample.addEventListener('error', function(event) {
            console.error('组件错误:', event.detail);
        });
        
        alert('事件监听器已添加，请查看控制台输出');
    });

    // 外部文件导入示例控制
    const externalFileExample = document.getElementById('externalFileExample');
    
    document.getElementById('loadDemoBtn').addEventListener('click', function() {
        const demoCode = `<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <title>外部文件导入示例</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 20px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            min-height: 100vh;
            margin: 0;
        }
        .demo-container {
            max-width: 800px;
            margin: 0 auto;
            background: rgba(255, 255, 255, 0.95);
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        .demo-section {
            margin: 20px 0;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 8px;
            background: #f9f9f9;
        }
        .output {
            margin: 10px 0;
            padding: 10px;
            background: #e9ecef;
            border-radius: 4px;
            font-family: monospace;
        }
        #dynamicContent {
            min-height: 50px;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="demo-container">
        <h1>🚀 外部文件导入演示</h1>
        <p>这个示例展示了如何使用从 test.js 导入的工具类和函数。</p>
        
        <div class="demo-section">
            <h3>📅 日期格式化</h3>
            <button class="btn btn-primary" onclick="showFormattedDate()">显示当前时间</button>
            <div id="dateOutput" class="output"></div>
        </div>
        
        <div class="demo-section">
            <h3>🎨 随机颜色生成</h3>
            <button class="btn btn-success" onclick="changeBackgroundColor()">随机背景色</button>
            <button class="btn btn-warning" onclick="addColoredCard()">添加彩色卡片</button>
        </div>
        
        <div class="demo-section">
            <h3>✨ 动画效果</h3>
            <button class="btn btn-primary" onclick="testFadeIn()">淡入动画</button>
            <button class="btn btn-success" onclick="testSlideDown()">下滑动画</button>
            <button class="btn btn-warning" onclick="testShake()">摇摆动画</button>
            <div id="animationTarget" style="display: none; padding: 10px; background: #007acc; color: white; border-radius: 4px; margin-top: 10px;">
                这是动画测试元素！
            </div>
        </div>
        
        <div class="demo-section">
            <h3>💾 本地存储</h3>
            <input type="text" id="storageInput" placeholder="输入要保存的内容" style="width: 200px; padding: 5px;">
            <button class="btn btn-primary" onclick="saveToStorage()">保存</button>
            <button class="btn btn-success" onclick="loadFromStorage()">读取</button>
            <button class="btn btn-danger" onclick="clearStorage()">清空</button>
            <div id="storageOutput" class="output"></div>
        </div>
        
        <div class="demo-section">
            <h3>🔔 通知系统</h3>
            <button class="btn btn-primary" onclick="showInfoNotification()">信息通知</button>
            <button class="btn btn-success" onclick="showSuccessNotification()">成功通知</button>
            <button class="btn btn-warning" onclick="showWarningNotification()">警告通知</button>
            <button class="btn btn-danger" onclick="showErrorNotification()">错误通知</button>
        </div>
        
        <div class="demo-section">
            <h3>📝 表单验证</h3>
            <form id="testForm" onsubmit="return validateTestForm(event)">
                <input type="email" id="email" placeholder="邮箱地址" style="width: 200px; padding: 5px; margin: 5px;">
                <input type="text" id="phone" placeholder="手机号码" style="width: 200px; padding: 5px; margin: 5px;">
                <button type="submit" class="btn btn-primary">验证表单</button>
            </form>
            <div id="validationOutput" class="output"></div>
        </div>
        
        <div id="dynamicContent"></div>
    </div>
    
    <script>
        // 检查工具类是否已加载
        if (typeof Utils === 'undefined') {
            document.body.innerHTML = '<div style="text-align: center; padding: 50px; color: red;"><h2>错误：test.js 文件未正确加载！</h2><p>请确保外部文件导入功能正常工作。</p></div>';
        } else {
            console.log('✅ test.js 工具类已成功导入！');
        }
        
        // 日期格式化
        function showFormattedDate() {
            const formattedDate = Utils.formatDate();
            document.getElementById('dateOutput').textContent = '当前时间: ' + formattedDate;
        }
        
        // 背景色变换
        function changeBackgroundColor() {
            const color = Utils.randomColor();
            document.querySelector('.demo-container').style.background = 
                \`linear-gradient(135deg, \${color}, rgba(255, 255, 255, 0.9))\`;
            UIHelper.showNotification(\`背景色已变为: \${color}\`, 'info');
        }
        
        // 添加彩色卡片
        function addColoredCard() {
            const color = Utils.randomColor();
            const randomNum = Utils.randomNumber(1, 100);
            const card = UIHelper.createCard(
                \`彩色卡片 #\${randomNum}\`,
                \`这是一个随机生成的卡片，颜色是 <strong>\${color}</strong>\`
            );
            card.style.borderLeft = \`4px solid \${color}\`;
            document.getElementById('dynamicContent').appendChild(card);
        }
        
        // 动画测试
        function testFadeIn() {
            const target = document.getElementById('animationTarget');
            target.style.display = 'none';
            AnimationHelper.fadeIn(target);
        }
        
        function testSlideDown() {
            const target = document.getElementById('animationTarget');
            target.style.display = 'block';
            AnimationHelper.slideDown(target);
        }
        
        function testShake() {
            const target = document.getElementById('animationTarget');
            target.style.display = 'block';
            AnimationHelper.shake(target);
        }
        
        // 存储功能
        function saveToStorage() {
            const input = document.getElementById('storageInput');
            const value = input.value.trim();
            if (value) {
                SimpleStorage.set('demo-data', value);
                document.getElementById('storageOutput').textContent = '已保存: ' + value;
                input.value = '';
                UIHelper.showNotification('数据已保存！', 'success');
            }
        }
        
        function loadFromStorage() {
            const data = SimpleStorage.get('demo-data', '暂无数据');
            document.getElementById('storageOutput').textContent = '读取的数据: ' + data;
        }
        
        function clearStorage() {
            SimpleStorage.remove('demo-data');
            document.getElementById('storageOutput').textContent = '存储已清空';
            UIHelper.showNotification('存储已清空！', 'warning');
        }
        
        // 通知系统
        function showInfoNotification() {
            UIHelper.showNotification('这是一个信息通知', 'info');
        }
        
        function showSuccessNotification() {
            UIHelper.showNotification('操作成功完成！', 'success');
        }
        
        function showWarningNotification() {
            UIHelper.showNotification('请注意这个警告', 'warning');
        }
        
        function showErrorNotification() {
            UIHelper.showNotification('发生了一个错误', 'error');
        }
        
        // 表单验证
        function validateTestForm(event) {
            event.preventDefault();
            
            const formData = {
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value
            };
            
            const rules = {
                email: [
                    { type: 'required', message: '邮箱不能为空' },
                    { type: 'email', message: '邮箱格式不正确' }
                ],
                phone: [
                    { type: 'required', message: '手机号不能为空' }
                ]
            };
            
            const validation = FormValidator.validateForm(formData, rules);
            const output = document.getElementById('validationOutput');
            
            if (validation.isValid) {
                output.innerHTML = '<span style="color: green;">✅ 表单验证通过！</span>';
                UIHelper.showNotification('表单验证成功！', 'success');
            } else {
                const errors = Object.values(validation.errors).join(', ');
                output.innerHTML = \`<span style="color: red;">❌ 验证失败: \${errors}</span>\`;
                UIHelper.showNotification('表单验证失败', 'error');
            }
            
            return false;
        }
        
        // 初始化演示
        document.addEventListener('DOMContentLoaded', function() {
            // 设置事件总线监听
            eventBus.on('demo-event', function(data) {
                console.log('收到演示事件:', data);
            });
            
            // 触发一个演示事件
            setTimeout(() => {
                eventBus.emit('demo-event', { message: '外部文件导入示例已加载！' });
            }, 1000);
            
            console.log('🎉 外部文件导入演示页面已初始化完成！');
        });
    </script>
</body>
</html>`;
        
        externalFileExample.setCode(demoCode, 'html');
    });
    
    document.getElementById('testUtilsBtn').addEventListener('click', function() {
        const testCode = `<!DOCTYPE html>
<html>
<head>
    <title>工具函数测试</title>
</head>
<body>
    <h1>Utils 工具类测试</h1>
    <button onclick="runTests()">运行测试</button>
    <div id="results"></div>
    
    <script>
        function runTests() {
            const results = document.getElementById('results');
            results.innerHTML = '';
            
            // 测试日期格式化
            const date = Utils.formatDate();
            results.innerHTML += '<p>当前时间: ' + date + '</p>';
            
            // 测试随机颜色
            const color = Utils.randomColor();
            results.innerHTML += '<p style="color: ' + color + '">随机颜色: ' + color + '</p>';
            
            // 测试随机数
            const num = Utils.randomNumber(1, 100);
            results.innerHTML += '<p>随机数(1-100): ' + num + '</p>';
            
            UIHelper.showNotification('工具函数测试完成！', 'success');
        }
    </script>
</body>
</html>`;
        externalFileExample.setCode(testCode, 'html');
    });
    
    document.getElementById('testAnimationBtn').addEventListener('click', function() {
        const animationCode = `<!DOCTYPE html>
<html>
<head>
    <title>动画测试</title>
    <style>
        .test-box {
            width: 100px;
            height: 100px;
            background: #007acc;
            margin: 20px;
            border-radius: 8px;
            display: none;
        }
    </style>
</head>
<body>
    <h1>动画效果测试</h1>
    <button onclick="AnimationHelper.fadeIn(document.getElementById('box1'))">淡入</button>
    <button onclick="AnimationHelper.slideDown(document.getElementById('box2'))">滑动</button>
    <button onclick="AnimationHelper.shake(document.getElementById('box3'))">摇摆</button>
    
    <div id="box1" class="test-box"></div>
    <div id="box2" class="test-box"></div>
    <div id="box3" class="test-box" style="display: block;"></div>
</body>
</html>`;
        externalFileExample.setCode(animationCode, 'html');
    });
    
    document.getElementById('testStorageBtn').addEventListener('click', function() {
        const storageCode = `<!DOCTYPE html>
<html>
<head>
    <title>存储测试</title>
</head>
<body>
    <h1>本地存储测试</h1>
    <input type="text" id="input" placeholder="输入内容">
    <button onclick="save()">保存</button>
    <button onclick="load()">读取</button>
    <button onclick="clear()">清空</button>
    <div id="output"></div>
    
    <script>
        function save() {
            const value = document.getElementById('input').value;
            SimpleStorage.set('test-key', value);
            document.getElementById('output').innerHTML = '已保存: ' + value;
        }
        
        function load() {
            const value = SimpleStorage.get('test-key', '暂无数据');
            document.getElementById('output').innerHTML = '读取: ' + value;
        }
        
        function clear() {
            SimpleStorage.remove('test-key');
            document.getElementById('output').innerHTML = '已清空';
        }
    </script>
</body>
</html>`;
        externalFileExample.setCode(storageCode, 'html');
    });
    
    document.getElementById('testUIHelperBtn').addEventListener('click', function() {
        const uiCode = `<!DOCTYPE html>
<html>
<head>
    <title>UI助手测试</title>
</head>
<body>
    <h1>UI助手测试</h1>
    <button onclick="createElements()">创建元素</button>
    <button onclick="showNotifications()">显示通知</button>
    <div id="container"></div>
    
    <script>
        function createElements() {
            const container = document.getElementById('container');
            container.innerHTML = '';
            
            // 创建按钮
            const btn = UIHelper.createButton('测试按钮', () => {
                UIHelper.showNotification('按钮被点击了！', 'info');
            }, 'btn btn-primary');
            container.appendChild(btn);
            
            // 创建卡片
            const card = UIHelper.createCard('测试卡片', '这是通过 UIHelper 创建的卡片');
            container.appendChild(card);
        }
        
        function showNotifications() {
            setTimeout(() => UIHelper.showNotification('信息通知', 'info'), 0);
            setTimeout(() => UIHelper.showNotification('成功通知', 'success'), 500);
            setTimeout(() => UIHelper.showNotification('警告通知', 'warning'), 1000);
            setTimeout(() => UIHelper.showNotification('错误通知', 'error'), 1500);
        }
    </script>
</body>
</html>`;
        externalFileExample.setCode(uiCode, 'html');
    });

    // 初始化基础示例
    setTimeout(() => {
        const basicExample = document.getElementById('basicExample');
        if (basicExample) {
            basicExample.setCode(codeSamples.html, 'html');
        }
    }, 1000);
});