        // 代码示例数据
        const codeSamples = {
            html: `<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <title>HTML 示例</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        .highlight { background: yellow; padding: 2px 4px; }
    </style>
</head>
<body>
    <h1>欢迎使用代码编辑预览器</h1>
    <p>这是一个 <span class="highlight">HTML</span> 示例页面</p>
    <ul>
        <li>支持实时预览</li>
        <li>语法高亮显示</li>
        <li>在线编辑功能</li>
    </ul>
</body>
</html>`,

            react: `<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <title>React 组件示例</title>
    <script crossorigin src="https://unpkg.com/react@17/umd/react.development.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        .counter { text-align: center; padding: 20px; }
        .count { font-size: 2em; margin: 20px; }
        button { padding: 10px 20px; margin: 5px; font-size: 16px; }
    </style>
</head>
<body>
    <div id="root"></div>
    
    <script type="text/babel">
        function Counter() {
            const [count, setCount] = React.useState(0);
            
            return (
                <div className="counter">
                    <h1>React 计数器</h1>
                    <div className="count">计数: {count}</div>
                    <button onClick={() => setCount(count + 1)}>增加</button>
                    <button onClick={() => setCount(count - 1)}>减少</button>
                    <button onClick={() => setCount(0)}>重置</button>
                </div>
            );
        }
        
        ReactDOM.render(<Counter />, document.getElementById('root'));
    </script>
</body>
</html>`,

            vue: `<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <title>Vue 组件示例</title>
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        .todo-app { max-width: 400px; margin: 0 auto; }
        .todo-item { padding: 10px; border-bottom: 1px solid #eee; }
        .completed { text-decoration: line-through; opacity: 0.6; }
        input { width: 100%; padding: 10px; margin-bottom: 10px; }
        button { padding: 5px 10px; margin-left: 10px; }
    </style>
</head>
<body>
    <div id="app"></div>
    
    <script>
        const { createApp, ref } = Vue;
        
        createApp({
            setup() {
                const todos = ref([
                    { id: 1, text: '学习 Vue 3', completed: false },
                    { id: 2, text: '使用代码编辑器', completed: true }
                ]);
                const newTodo = ref('');
                
                const addTodo = () => {
                    if (newTodo.value.trim()) {
                        todos.value.push({
                            id: Date.now(),
                            text: newTodo.value,
                            completed: false
                        });
                        newTodo.value = '';
                    }
                };
                
                const toggleTodo = (todo) => {
                    todo.completed = !todo.completed;
                };
                
                const removeTodo = (id) => {
                    todos.value = todos.value.filter(todo => todo.id !== id);
                };
                
                return { todos, newTodo, addTodo, toggleTodo, removeTodo };
            },
            
            template: \`
                <div class="todo-app">
                    <h1>Vue Todo 应用</h1>
                    <input 
                        v-model="newTodo" 
                        @keyup.enter="addTodo"
                        placeholder="添加新任务...">
                    <button @click="addTodo">添加</button>
                    
                    <div v-for="todo in todos" :key="todo.id" class="todo-item">
                        <span 
                            :class="{ completed: todo.completed }"
                            @click="toggleTodo(todo)">
                            {{ todo.text }}
                        </span>
                        <button @click="removeTodo(todo.id)">删除</button>
                    </div>
                </div>
            \`
        }).mount('#app');
    </script>
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
        }
        
        .animation-container {
            text-align: center;
            color: white;
        }
        
        .bounce-ball {
            width: 50px;
            height: 50px;
            background: #ff6b6b;
            border-radius: 50%;
            margin: 20px auto;
            animation: bounce 1s infinite;
        }
        
        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-30px); }
        }
        
        .pulse-text {
            font-size: 2em;
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.1); opacity: 0.7; }
            100% { transform: scale(1); opacity: 1; }
        }
        
        .rotate-icon {
            font-size: 3em;
            animation: rotate 3s linear infinite;
            margin: 20px;
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
    </style>
</head>
<body>
    <div class="animation-container">
        <h1 class="pulse-text slide-in">CSS 动画示例</h1>
        <div class="rotate-icon">⚙️</div>
        <div class="bounce-ball"></div>
        <p class="slide-in">各种精美的 CSS 动画效果</p>
    </div>
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
            background: #f0f2f5;
        }
        .game-container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        .controls {
            margin: 20px 0;
            text-align: center;
        }
        button {
            padding: 10px 20px;
            margin: 5px;
            border: none;
            border-radius: 5px;
            background: #007acc;
            color: white;
            cursor: pointer;
            transition: background 0.3s;
        }
        button:hover { background: #0056b3; }
        .score { font-size: 1.5em; font-weight: bold; color: #007acc; }
        .game-area {
            border: 2px solid #ddd;
            height: 200px;
            position: relative;
            overflow: hidden;
            background: linear-gradient(45deg, #f0f8ff, #e6f3ff);
        }
        .target {
            position: absolute;
            width: 30px;
            height: 30px;
            background: #ff6b6b;
            border-radius: 50%;
            cursor: pointer;
            transition: transform 0.1s;
        }
        .target:hover { transform: scale(1.2); }
    </style>
</head>
<body>
    <div class="game-container">
        <h1>🎯 JavaScript 点击游戏</h1>
        <div class="score">得分: <span id="score">0</span></div>
        <div class="controls">
            <button onclick="startGame()">开始游戏</button>
            <button onclick="resetGame()">重置游戏</button>
            <button onclick="toggleMode()">切换模式</button>
        </div>
        <div class="game-area" id="gameArea"></div>
        <p id="status">点击"开始游戏"来开始！</p>
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
            document.getElementById('status').textContent = '游戏进行中...点击红色圆点得分！';
            
            gameInterval = setInterval(createTarget, gameMode === 'hard' ? 800 : 1500);
            setTimeout(endGame, 15000); // 15秒后结束
        }
        
        function endGame() {
            gameActive = false;
            clearInterval(gameInterval);
            document.getElementById('gameArea').innerHTML = '';
                         document.getElementById('status').textContent = 
                 "游戏结束！最终得分: " + score + " 分。模式: " + (gameMode === 'hard' ? '困难' : '普通');
         }
         
         function resetGame() {
             gameActive = false;
             clearInterval(gameInterval);
             score = 0;
             updateScore();
             document.getElementById('gameArea').innerHTML = '';
             document.getElementById('status').textContent = '游戏已重置，点击"开始游戏"来开始！';
         }
         
         function toggleMode() {
             gameMode = gameMode === 'normal' ? 'hard' : 'normal';
             document.getElementById('status').textContent = 
                 "模式已切换为: " + (gameMode === 'hard' ? '困难模式（更快速度）' : '普通模式');
         }
        
        function createTarget() {
            if (!gameActive) return;
            
            const gameArea = document.getElementById('gameArea');
            const target = document.createElement('div');
            target.className = 'target';
            
            // 随机位置
            const maxX = gameArea.offsetWidth - 30;
            const maxY = gameArea.offsetHeight - 30;
            target.style.left = Math.random() * maxX + 'px';
            target.style.top = Math.random() * maxY + 'px';
            
            // 点击事件
            target.onclick = function() {
                score += gameMode === 'hard' ? 2 : 1;
                updateScore();
                this.remove();
            };
            
            gameArea.appendChild(target);
            
            // 自动消失
            setTimeout(() => {
                if (target.parentNode) {
                    target.remove();
                }
            }, gameMode === 'hard' ? 1000 : 2000);
        }
        
        function updateScore() {
            document.getElementById('score').textContent = score;
        }
        
        // 初始化
        console.log('JavaScript 交互游戏已加载！');
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
                        basicExample.setCode(codeSamples[sample], sample === 'css' ? 'html' : 'html');
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