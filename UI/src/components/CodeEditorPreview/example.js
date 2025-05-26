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
    
    document.getElementById('lineNumbersCheck').addEventListener('change', function() {
        advancedExample.setAttribute('show-line-numbers', this.checked);
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

    // 初始化基础示例
    setTimeout(() => {
        const basicExample = document.getElementById('basicExample');
        if (basicExample) {
            basicExample.setCode(codeSamples.html, 'html');
        }
    }, 1000);
});