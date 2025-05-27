/**
 * TutorialPage 工具函数
 * 处理页面导航、组件演示等功能
 */

import { 
    createThemeDemo,
    waitForComponents
} from './usage-example.js';

// 全局变量存储组件
window.component = null;

// 初始化示例
async function initExample() {
    console.log('🚀 开始初始化教学示例...');
    
    try {
        // 初始化所有代码展示
        initCodeDisplays();
        
        // 创建主题切换示例
        window.component = createThemeDemo(document.getElementById('theme-demo'));

        // 创建CodeDisplay演示
        initCodeDisplayDemo();

        // 创建CodePreview演示
        initCodePreviewDemo();
        
        // 创建iframe演示
        initIframeDemo();

        // 等待组件完全加载
        await waitForComponents([window.component], 5000);
        console.log('✅ 组件加载完成！');

    } catch (error) {
        console.error('❌ 初始化组件时出错:', error);
    }
}

// 初始化CodeDisplay演示
function initCodeDisplayDemo() {
    const container = document.getElementById('code-display-demo');
    if (!container) return;

    // 动态加载CodeDisplay
    import('../CodeDisplay/CodeDisplay.js').then(({ CodeDisplay }) => {
        const sampleCode = `function greetUser(name) {
    // 检查参数
    if (!name || typeof name !== 'string') {
        throw new Error('姓名必须是非空字符串');
    }
    
    // 生成问候语
    const greeting = \`你好，\${name}！欢迎使用CodeDisplay组件。\`;
    
    // 输出到控制台
    console.log(greeting);
    
    return greeting;
}

// 使用示例
greetUser('开发者');

// iframe技术演示
const iframe = document.createElement('iframe');
iframe.sandbox = 'allow-scripts allow-same-origin';
iframe.srcdoc = '<h1>Hello iframe!</h1>';
console.log('iframe创建完成');`;

        const codeDisplay = new CodeDisplay(container, {
            theme: 'prism',
            editable: true,
            maxHeight: '350px',
            onChange: (code, language) => {
                console.log('代码已更新:', code.length + ' 字符');
            }
        });

        codeDisplay.render(sampleCode, 'javascript');
        console.log('✅ CodeDisplay演示初始化完成');
    }).catch(error => {
        console.error('❌ CodeDisplay加载失败:', error);
        container.innerHTML = '<p style="text-align:center;color:#666;padding:20px;">CodeDisplay演示加载失败</p>';
    });
}

// 初始化CodePreview演示
function initCodePreviewDemo() {
    const container = document.getElementById('code-preview-demo');
    if (!container) return;

    // 动态加载CodePreview
    import('../CodePreview/CodePreview.js').then(({ CodePreview }) => {
        const sampleHtml = `<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            min-height: 100vh;
        }
        .card {
            background: rgba(255,255,255,0.15);
            padding: 25px;
            border-radius: 15px;
            backdrop-filter: blur(10px);
            text-align: center;
            box-shadow: 0 8px 32px rgba(0,0,0,0.1);
            border: 1px solid rgba(255,255,255,0.2);
        }
        button {
            background: white;
            color: #667eea;
            border: none;
            padding: 12px 24px;
            border-radius: 25px;
            cursor: pointer;
            margin: 10px 5px;
            font-weight: 600;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }
        button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0,0,0,0.15);
        }
        .demo-text {
            margin: 15px 0;
            opacity: 0.9;
        }
    </style>
</head>
<body>
    <div class="card">
        <h2>🚀 CodePreview iframe演示</h2>
        <p class="demo-text">这是一个在iframe沙箱中安全运行的HTML示例</p>
        <p class="demo-text">点击下面的按钮测试iframe的交互功能：</p>
        <button onclick="alert('Hello from iframe沙箱!')">弹出提示</button>
        <button onclick="changeBackground()">切换背景</button>
        <button onclick="addElement()">添加元素</button>
    </div>
    
    <script>
        function changeBackground() {
            const colors = [
                'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                'linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 100%)',
                'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
                'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
            ];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            document.body.style.background = randomColor;
        }
        
        function addElement() {
            const div = document.createElement('div');
            div.style.cssText = 'margin:10px;padding:10px;background:rgba(255,255,255,0.2);border-radius:8px;';
            div.textContent = '新添加的元素 ' + Date.now();
            document.querySelector('.card').appendChild(div);
        }
        
        console.log('iframe内部JavaScript正常运行');
    </script>
</body>
</html>`;

        const codePreview = new CodePreview(container, {
            width: '100%',
            height: '350px',
            onLoad: () => {
                console.log('✅ CodePreview演示加载完成');
            }
        });

        codePreview.render(sampleHtml);
    }).catch(error => {
        console.error('❌ CodePreview加载失败:', error);
        container.innerHTML = '<p style="text-align:center;color:#666;padding:20px;">CodePreview演示加载失败</p>';
    });
}

// 初始化所有代码展示
function initCodeDisplays() {
    // 动态加载CodeDisplay
    import('../CodeDisplay/CodeDisplay.js').then(({ CodeDisplay }) => {
        // iframe基本用法演示
        initIframeBasicDemo(CodeDisplay);
        // iframe应用场景演示
        initIframeUsageDemo(CodeDisplay);
        // 安全机制演示
        initSecurityDemo(CodeDisplay);
        // 组件联通代码演示
        initConnectionDemo(CodeDisplay);
        // 交互流程演示
        initInteractionFlowDemo(CodeDisplay);
        // 数据层演示
        initDataLayerDemo(CodeDisplay);
        // 工厂模式演示
        initFactoryDemo(CodeDisplay);
        // CodeDisplay使用示例
        initCodeDisplayUsageDemo(CodeDisplay);
    }).catch(error => {
        console.error('❌ CodeDisplay加载失败:', error);
    });
}

// iframe基本用法演示
function initIframeBasicDemo(CodeDisplay) {
    const container = document.getElementById('iframe-basic-demo');
    if (!container) return;

    const code = `<!-- 基础用法：嵌入外部网页 -->
<iframe src="https://example.com" width="800" height="600"></iframe>

<!-- 使用srcdoc：直接嵌入HTML内容 -->
<iframe srcdoc="<h1>Hello World</h1>" width="400" height="300"></iframe>

<!-- 沙箱模式：限制iframe的权限 -->
<iframe src="untrusted.html" 
        sandbox="allow-scripts allow-same-origin"></iframe>`;

    new CodeDisplay(container, {
        theme: 'prism',
        editable: false,
        maxHeight: '200px'
    }).render(code, 'html');
}

// iframe应用场景演示
function initIframeUsageDemo(CodeDisplay) {
    const container = document.getElementById('iframe-usage-demo');
    if (!container) return;

    const code = `// 1. 代码预览 - 我们的使用场景
const iframe = document.createElement('iframe');
iframe.sandbox = 'allow-scripts allow-same-origin allow-forms allow-modals';
iframe.srcdoc = userCode; // 用户编写的HTML/CSS/JS代码

// 2. 嵌入第三方内容
<iframe src="https://www.youtube.com/embed/VIDEO_ID"></iframe>

// 3. 创建安全的代码编辑器
<iframe srcdoc="<script>console.log('安全执行')</script>"
        sandbox="allow-scripts"></iframe>

// 4. 广告隔离 - 防止广告代码影响主页面
<iframe src="ad.html" sandbox="allow-scripts"></iframe>`;

    new CodeDisplay(container, {
        theme: 'prism',
        editable: true,
        maxHeight: '250px'
    }).render(code, 'javascript');
}

// 安全机制演示
function initSecurityDemo(CodeDisplay) {
    const container = document.getElementById('security-mechanism-demo');
    if (!container) return;

    const code = `// CodePreview中的沙箱配置
this.iframe.sandbox = 'allow-scripts allow-same-origin allow-forms allow-modals';

// 注入安全脚本，拦截潜在的危险操作
const webSocketScript = \`
    <script>
        // 防止WebSocket连接
        window.WebSocket = function(url) {
            console.log('WebSocket连接已被沙箱环境拦截:', url);
            return {
                send: function() {},
                close: function() {},
                addEventListener: function() {}
            };
        };
    </script>
\`;

// 完整的HTML文档包装
const processedCode = \`<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    \${scrollbarStyles}
    \${webSocketScript}
</head>
<body>
    \${userCode}
</body>
</html>\`;

this.iframe.srcdoc = processedCode;`;

    new CodeDisplay(container, {
        theme: 'prism',
        editable: true,
        maxHeight: '400px'
    }).render(code, 'javascript');
}

// 组件联通代码演示
function initConnectionDemo(CodeDisplay) {
    const container = document.getElementById('connection-code-demo');
    if (!container) return;

    const code = `// 在CodeEditorPreview主组件中的关键代码
class CodeEditorPreview {
    init() {
        // 创建CodeDisplay实例
        this.codeDisplay = new CodeDisplay(this.editorContainer, {
            editable: true,
            onChange: (code, language) => {
                // 🔗 关键联通点：CodeDisplay变化触发预览更新
                this.handleCodeChange(code, language);
            }
        });
        
        // 创建CodePreview实例  
        this.codePreview = new CodePreview(this.previewContainer, {
            onLoad: () => {
                console.log('预览加载完成');
            }
        });
    }
    
    // 处理代码变化的核心方法
    handleCodeChange(code, language) {
        // 更新当前代码状态
        this.currentCode = code;
        this.currentLanguage = language;
        
        // 🎯 防抖处理，避免频繁更新
        if (this.debounceTimer) {
            clearTimeout(this.debounceTimer);
        }
        
        this.debounceTimer = setTimeout(() => {
            // 🚀 触发预览更新
            this.updatePreview();
        }, this.options.debounceDelay);
    }
    
    // 更新预览的核心逻辑
    updatePreview() {
        if (this.codePreview && this.currentCode) {
            // 🔗 数据从CodeDisplay流向CodePreview
            this.codePreview.render(this.currentCode);
        }
    }
}`;

    new CodeDisplay(container, {
        theme: 'prism',
        editable: true,
        maxHeight: '500px'
    }).render(code, 'javascript');
}

// 交互流程演示
function initInteractionFlowDemo(CodeDisplay) {
    const container = document.getElementById('interaction-flow-demo');
    if (!container) return;

    const code = `// 完整的用户交互流程
1. 用户双击CodeDisplay → 进入编辑模式
   ↓
2. 用户输入代码 → 触发input事件
   ↓  
3. CodeDisplay触发onChange回调
   ↓
4. 主控制器接收到变化 → handleCodeChange()
   ↓
5. 设置防抖定时器 → 300ms延迟
   ↓
6. 定时器触发 → updatePreview()
   ↓
7. CodePreview.render(newCode) → iframe更新
   ↓
8. 用户看到实时预览效果

// 同时支持的其他交互
- 主题切换：同时更新CodeDisplay和CodePreview的样式
- 语言切换：CodeDisplay重新高亮 + CodePreview重新渲染
- 代码重置：两个组件同步回到初始状态`;

    new CodeDisplay(container, {
        theme: 'prism',
        editable: false,
        maxHeight: '350px'
    }).render(code, 'javascript');
}

// 数据层演示
function initDataLayerDemo(CodeDisplay) {
    const container = document.getElementById('data-layer-demo');
    if (!container) return;

    const code = `export const themeDemo = {
    code: \`<!DOCTYPE html>
<html>
<head>
    <style>
        body { 
            background: linear-gradient(45deg, #667eea, #764ba2);
            color: white;
            font-family: Arial, sans-serif;
        }
    </style>
</head>
<body>
    <h1>主题切换示例</h1>
    <p>这是一个完整的HTML示例</p>
</body>
</html>\`,
    language: 'html',
    instructions: \`主题切换配置示例：
    
🎨 **主题系统特点：**
1. **CSS变量** - 使用:root定义全局变量
2. **类切换** - JavaScript动态切换主题类
3. **本地存储** - 记住用户的主题选择\`
};`;

    new CodeDisplay(container, {
        theme: 'prism',
        editable: true,
        maxHeight: '300px'
    }).render(code, 'javascript');
}

// 工厂模式演示
function initFactoryDemo(CodeDisplay) {
    const container = document.getElementById('factory-demo');
    if (!container) return;

    const code = `// 工厂函数封装复杂的初始化逻辑
export function createThemeDemo(container) {
    return createCodeEditorPreview(
        container,
        themeDemo.code,
        themeDemo.language,
        themeDemo.instructions,
        { theme: 'prism' }
    );
}

// 通用的组件创建工厂
function createCodeEditorPreview(container, code, language = 'html', instructions = '', options = {}) {
    if (!container) {
        console.error('容器元素不存在');
        return null;
    }

    // 创建组件元素
    const component = document.createElement('code-editor-preview');
    
    // 设置基础属性
    component.setAttribute('default-code', code);
    component.setAttribute('language', language);
    component.setAttribute('instructions', instructions);
    
    // 设置可选属性
    const defaultOptions = {
        theme: 'prism',
        editable: true,
        autoPreview: true,
        showToolbar: true,
        debounceDelay: 300
    };
    
    const finalOptions = { ...defaultOptions, ...options };
    
    Object.keys(finalOptions).forEach(key => {
        const attrName = key.replace(/([A-Z])/g, '-$1').toLowerCase();
        component.setAttribute(attrName, finalOptions[key]);
    });
    
    // 清空容器并添加组件
    container.innerHTML = '';
    container.appendChild(component);
    
    return component;
}`;

    new CodeDisplay(container, {
        theme: 'prism',
        editable: true,
        maxHeight: '400px'
    }).render(code, 'javascript');
}

// CodeDisplay使用示例
function initCodeDisplayUsageDemo(CodeDisplay) {
    const container = document.getElementById('code-display-usage-demo');
    if (!container) return;

    const code = `// 创建CodeDisplay实例
const codeDisplay = new CodeDisplay(container, {
    theme: 'prism-dark',
    editable: true,
    maxHeight: '400px',
    wordWrap: true,
    onChange: (code, language) => {
        console.log('代码更新:', code);
        // 可以在这里触发预览更新
        updatePreview(code);
    }
});

// 渲染代码
await codeDisplay.render(code, 'javascript');

// 动态更新代码
codeDisplay.setCode('console.log("Hello World");', 'javascript');

// 切换主题
codeDisplay.changeTheme('prism-dark');

// 设置可编辑状态
codeDisplay.setEditable(true);`;

    new CodeDisplay(container, {
        theme: 'prism',
        editable: true,
        maxHeight: '300px'
    }).render(code, 'javascript');
}

// 初始化iframe演示
function initIframeDemo() {
    const container = document.getElementById('iframe-demo');
    if (!container) return;

    // 创建各种iframe演示
    const demoContainer = document.createElement('div');
    demoContainer.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 20px;';

    // 1. 基础srcdoc用法
    const demo1 = createIframeDemoCard(
        '📄 srcdoc - 直接嵌入HTML',
        '<div style="padding:20px;background:linear-gradient(135deg,#667eea,#764ba2);color:white;text-align:center;font-family:Arial;border-radius:8px;"><h2>🎯 srcdoc演示</h2><p>直接在srcdoc属性中写HTML代码</p><button onclick="alert(\'Hello from srcdoc!\')" style="padding:8px 16px;background:white;color:#667eea;border:none;border-radius:4px;cursor:pointer;">点击测试</button></div>',
        'allow-scripts'
    );

    // 2. 沙箱限制演示
    const demo2 = createIframeDemoCard(
        '🛡️ sandbox - 安全沙箱',
        '<div style="padding:20px;background:linear-gradient(135deg,#ff6b6b,#4ecdc4);color:white;text-align:center;font-family:Arial;border-radius:8px;"><h2>🔒 沙箱限制</h2><p>这个iframe有沙箱保护</p><button onclick="changeBackground()" style="padding:8px 16px;background:white;color:#ff6b6b;border:none;border-radius:4px;cursor:pointer;margin:5px;">切换背景</button><button onclick="addText()" style="padding:8px 16px;background:white;color:#ff6b6b;border:none;border-radius:4px;cursor:pointer;margin:5px;">添加文字</button><div id="output"></div><script>function changeBackground(){document.body.style.background=Math.random()>0.5?"linear-gradient(135deg,#a8edea,#fed6e3)":"linear-gradient(135deg,#ffecd2,#fcb69f)"}function addText(){document.getElementById("output").innerHTML+="<p style=\\"margin:5px 0;font-size:14px;\\">时间: "+new Date().toLocaleTimeString()+"</p>"}</script></div>',
        'allow-scripts'
    );

    // 3. 表单演示
    const demo3 = createIframeDemoCard(
        '📝 allow-forms - 表单支持',
        '<div style="padding:20px;background:linear-gradient(135deg,#4ecdc4,#44a08d);color:white;font-family:Arial;border-radius:8px;"><h2>📋 表单演示</h2><form onsubmit="handleSubmit(event)" style="margin:10px 0;"><input type="text" placeholder="输入你的名字" style="padding:8px;border:none;border-radius:4px;margin-right:8px;" id="nameInput"><button type="submit" style="padding:8px 16px;background:white;color:#4ecdc4;border:none;border-radius:4px;cursor:pointer;">提交</button></form><div id="result"></div><script>function handleSubmit(e){e.preventDefault();const name=document.getElementById("nameInput").value;document.getElementById("result").innerHTML="<p style=\\"margin:10px 0;padding:10px;background:rgba(255,255,255,0.2);border-radius:4px;\\">你好, "+(name||"匿名用户")+"!</p>";document.getElementById("nameInput").value=""}</script></div>',
        'allow-scripts allow-forms'
    );

    // 4. 模态框演示
    const demo4 = createIframeDemoCard(
        '🪟 allow-modals - 模态框',
        '<div style="padding:20px;background:linear-gradient(135deg,#764ba2,#667eea);color:white;text-align:center;font-family:Arial;border-radius:8px;"><h2>💬 模态框演示</h2><p>测试不同类型的弹窗</p><button onclick="alert(\'这是alert弹窗!\')" style="padding:8px 12px;background:white;color:#764ba2;border:none;border-radius:4px;cursor:pointer;margin:4px;display:block;width:90%;">Alert 弹窗</button><button onclick="showConfirm()" style="padding:8px 12px;background:white;color:#764ba2;border:none;border-radius:4px;cursor:pointer;margin:4px;display:block;width:90%;">Confirm 确认</button><button onclick="showPrompt()" style="padding:8px 12px;background:white;color:#764ba2;border:none;border-radius:4px;cursor:pointer;margin:4px;display:block;width:90%;">Prompt 输入</button><div id="modalResult"></div><script>function showConfirm(){const result=confirm("你确定要继续吗?");document.getElementById("modalResult").innerHTML="<p style=\\"margin:8px 0;font-size:12px;\\">Confirm结果: "+result+"</p>"}function showPrompt(){const result=prompt("请输入你的年龄:");document.getElementById("modalResult").innerHTML="<p style=\\"margin:8px 0;font-size:12px;\\">Prompt结果: "+(result||"未输入")+"</p>"}</script></div>',
        'allow-scripts allow-modals'
    );

    // 5. 无沙箱危险示例
    const demo5 = createIframeDemoCard(
        '⚠️ 无沙箱 - 危险示例',
        '<div style="padding:20px;background:linear-gradient(135deg,#fc8181,#f56565);color:white;text-align:center;font-family:Arial;border-radius:8px;"><h2>⚠️ 危险操作</h2><p>这个iframe没有沙箱限制</p><button onclick="dangerousAction()" style="padding:8px 16px;background:white;color:#fc8181;border:none;border-radius:4px;cursor:pointer;margin:5px;">危险操作</button><button onclick="tryAccess()" style="padding:8px 16px;background:white;color:#fc8181;border:none;border-radius:4px;cursor:pointer;margin:5px;">尝试访问父级</button><div id="dangerResult"></div><script>function dangerousAction(){try{document.getElementById("dangerResult").innerHTML="<p style=\\"margin:8px 0;font-size:12px;\\">执行了危险操作!</p>"}catch(e){console.error(e)}}function tryAccess(){try{parent.document.body.style.background="red";document.getElementById("dangerResult").innerHTML="<p style=\\"margin:8px 0;font-size:12px;\\">尝试修改父页面(可能被阻止)</p>"}catch(e){document.getElementById("dangerResult").innerHTML="<p style=\\"margin:8px 0;font-size:12px;\\">访问被阻止: "+e.message+"</p>"}}</script></div>',
        '',
        '#fff5f5',
        '#feb2b2',
        '#c53030',
        '注意：这个iframe没有sandbox属性，存在安全风险'
    );

    // 6. 复杂交互演示
    const demo6 = createIframeDemoCard(
        '🎮 复杂交互演示',
        '<div style="padding:15px;background:linear-gradient(135deg,#48bb78,#38a169);color:white;font-family:Arial;border-radius:8px;"><h3 style="margin:0 0 10px 0;font-size:16px;">🎯 迷你游戏</h3><div style="display:flex;flex-wrap:wrap;gap:4px;margin:10px 0;"><button onclick="clickBtn(this)" style="width:40px;height:40px;border:none;border-radius:4px;cursor:pointer;background:rgba(255,255,255,0.8);color:#48bb78;font-weight:bold;" data-clicked="false">1</button><button onclick="clickBtn(this)" style="width:40px;height:40px;border:none;border-radius:4px;cursor:pointer;background:rgba(255,255,255,0.8);color:#48bb78;font-weight:bold;" data-clicked="false">2</button><button onclick="clickBtn(this)" style="width:40px;height:40px;border:none;border-radius:4px;cursor:pointer;background:rgba(255,255,255,0.8);color:#48bb78;font-weight:bold;" data-clicked="false">3</button><button onclick="clickBtn(this)" style="width:40px;height:40px;border:none;border-radius:4px;cursor:pointer;background:rgba(255,255,255,0.8);color:#48bb78;font-weight:bold;" data-clicked="false">4</button><button onclick="clickBtn(this)" style="width:40px;height:40px;border:none;border-radius:4px;cursor:pointer;background:rgba(255,255,255,0.8);color:#48bb78;font-weight:bold;" data-clicked="false">5</button><button onclick="clickBtn(this)" style="width:40px;height:40px;border:none;border-radius:4px;cursor:pointer;background:rgba(255,255,255,0.8);color:#48bb78;font-weight:bold;" data-clicked="false">6</button></div><p id="score" style="margin:8px 0;font-size:14px;">点击按钮得分: 0</p><button onclick="reset()" style="padding:6px 12px;background:white;color:#48bb78;border:none;border-radius:4px;cursor:pointer;font-size:12px;">重置游戏</button><script>let score=0;function clickBtn(btn){if(btn.dataset.clicked==="false"){btn.dataset.clicked="true";btn.style.background="#f7fafc";btn.style.color="#2d3748";score+=10;document.getElementById("score").textContent="点击按钮得分: "+score;if(score>=60){alert("恭喜通关!")}}}function reset(){score=0;document.getElementById("score").textContent="点击按钮得分: 0";document.querySelectorAll("button[data-clicked]").forEach(btn=>{btn.dataset.clicked="false";btn.style.background="rgba(255,255,255,0.8)";btn.style.color="#48bb78"})}</script></div>',
        'allow-scripts allow-modals',
        '#f0fff4',
        '#9ae6b4',
        '#2f855a'
    );

    // 添加所有演示
    demoContainer.appendChild(demo1);
    demoContainer.appendChild(demo2);
    demoContainer.appendChild(demo3);
    demoContainer.appendChild(demo4);
    demoContainer.appendChild(demo5);
    demoContainer.appendChild(demo6);

    // 添加总结说明
    const summary = document.createElement('div');
    summary.style.cssText = 'margin-top: 20px; padding: 15px; background: #edf2f7; border-radius: 8px; border-left: 4px solid #4299e1;';
    summary.innerHTML = `
        <h4 style="margin: 0 0 10px 0; color: #2b6cb0;">💡 iframe用法总结</h4>
        <ul style="margin: 0; padding-left: 20px; color: #2d3748;">
            <li><strong>srcdoc</strong>: 直接嵌入HTML内容，避免外部文件依赖</li>
            <li><strong>sandbox="allow-scripts"</strong>: 允许JavaScript执行</li>
            <li><strong>sandbox="allow-forms"</strong>: 允许表单提交</li>
            <li><strong>sandbox="allow-modals"</strong>: 允许弹出模态框</li>
            <li><strong>sandbox="allow-same-origin"</strong>: 允许同源访问</li>
            <li><strong>无sandbox</strong>: 完全信任内容，存在安全风险</li>
        </ul>
    `;

    container.appendChild(demoContainer);
    container.appendChild(summary);
}

// 创建iframe演示卡片的辅助函数
function createIframeDemoCard(title, content, sandbox, bgColor = '#f7fafc', borderColor = '#e2e8f0', textColor = '#2d3748', note = '') {
    const card = document.createElement('div');
    card.style.cssText = `background: ${bgColor}; padding: 20px; border-radius: 12px; border: 2px solid ${borderColor};`;
    
    const titleEl = document.createElement('h4');
    titleEl.style.cssText = `margin: 0 0 15px 0; color: ${textColor};`;
    titleEl.textContent = title;
    
    const iframe = document.createElement('iframe');
    iframe.srcdoc = content;
    iframe.style.cssText = 'width:100%;height:180px;border:1px solid #cbd5e0;border-radius:8px;';
    if (sandbox) iframe.sandbox = sandbox;
    
    card.appendChild(titleEl);
    card.appendChild(iframe);
    
    if (note) {
        const noteEl = document.createElement('p');
        noteEl.style.cssText = `margin: 8px 0 0 0; font-size: 12px; color: ${textColor};`;
        noteEl.textContent = note;
        card.appendChild(noteEl);
    }
    
    return card;
}

// 平滑滚动到指定章节
function smoothScrollTo(targetId) {
    const target = document.getElementById(targetId);
    if (target) {
        // 计算目标位置，考虑导航栏高度
        const navHeight = document.querySelector('.nav-menu').offsetHeight + 30;
        const targetPosition = target.offsetTop - navHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// 为导航链接添加平滑滚动
function initNavigation() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            smoothScrollTo(targetId);
        });
    });
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    console.log('📄 页面DOM加载完成');
    
    // 初始化导航
    initNavigation();
    
    // 初始化组件演示
    initExample();
});