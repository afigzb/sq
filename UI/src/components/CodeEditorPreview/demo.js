        // 导入主组件
        import './CodeEditorPreview.js';
        
        // 等待DOM加载完成
        document.addEventListener('DOMContentLoaded', () => {
            const editor = document.querySelector('code-editor-preview');
            
            // 监听代码变化事件
            editor.addEventListener('code-change', (event) => {
                console.log('代码已更新:', event.detail);
            });
            
            // 设置一个更丰富的默认代码用于测试全屏预览
            const testCode = `<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>全屏预览测试</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .container {
            background: white;
            padding: 40px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            text-align: center;
            max-width: 600px;
            width: 100%;
        }
        h1 { 
            color: #333; 
            margin-bottom: 20px;
            font-size: 2.5em;
        }
        p { 
            color: #666; 
            line-height: 1.6;
            margin-bottom: 30px;
        }
        .button {
            background: #667eea;
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 25px;
            cursor: pointer;
            font-size: 16px;
            transition: all 0.3s ease;
        }
        .button:hover {
            background: #764ba2;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }
        .demo-box {
            background: #f8f9fa;
            padding: 20px;
            margin: 20px 0;
            border-radius: 8px;
            border: 2px dashed #dee2e6;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 全屏预览测试</h1>
        <p>这是一个用于测试全屏预览功能的示例页面。点击预览区域右上角的全屏按钮来查看效果。</p>
        <div class="demo-box">
            <p>在全屏模式下，此内容应该占满整个屏幕，并且所有样式都应该正确显示。</p>
        </div>
        <button class="button" onclick="showTime()">显示当前时间</button>
        <p id="timeDisplay" style="margin-top: 20px; font-weight: bold; color: #667eea;"></p>
    </div>
    
    <script>
        function showTime() {
            const now = new Date();
            document.getElementById('timeDisplay').textContent = 
                '当前时间: ' + now.toLocaleString('zh-CN');
        }
        
        // 自动显示时间
        showTime();
    </script>
</body>
</html>`;

            // 延迟设置代码，确保组件完全初始化
            setTimeout(() => {
                editor.setCode(testCode);
            }, 500);
            
            // 测试函数
            window.testSwitchToInstructions = () => {
                editor.switchToInstructions();
                console.log('切换到使用说明视图');
                
                // 调试信息
                const overlay = document.querySelector('.instructions-overlay');
                if (overlay) {
                    console.log('覆盖层元素:', overlay);
                    console.log('覆盖层样式:', window.getComputedStyle(overlay).display);
                    console.log('覆盖层位置:', overlay.getBoundingClientRect());
                }
            };
            
            window.testSwitchToEditor = () => {
                editor.switchToEditor();
                console.log('切换到编辑器视图');
                
                // 调试信息
                const overlay = document.querySelector('.instructions-overlay');
                if (overlay) {
                    console.log('覆盖层样式:', window.getComputedStyle(overlay).display);
                }
            };
            
            window.testUpdateInstructions = () => {
                const newInstructions = `更新后的使用说明 (${new Date().toLocaleTimeString()}):

这是动态更新的使用说明内容，演示了数据驱动的特性。

功能特点：
- ✅ 支持动态切换视图
- ✅ 覆盖层实现，性能更好
- ✅ 支持滚动条，适应长内容
- ✅ 数据驱动，状态管理清晰

测试步骤：
1. 点击"切换到使用说明"按钮
2. 查看使用说明内容
3. 点击"切换到编辑器"按钮
4. 返回代码编辑模式

当前时间: ${new Date().toLocaleString()}`;
                
                editor.setInstructions(newInstructions);
                console.log('使用说明已更新');
            };

            window.testFullscreen = () => {
                const controller = editor.getController();
                if (controller) {
                    controller.openFullscreen();
                    console.log('打开全屏预览');
                }
            };
        });