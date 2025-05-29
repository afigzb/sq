/**
 * Canvas教学数据模块
 * 支持章节和多个示例的数据结构
 */

// 教学数据
export const canvasTutorialData = {
    title: "🎨 Canvas 基础教学",
    description: "交互式学习平台，掌握Canvas绘图技能",
    
    // 教学章节
    chapters: [
        {
            id: 'basics',
            title: '基础入门',
            subtitle: '学习Canvas元素创建、上下文获取和坐标系统',
            examples: [
                {
                    id: 'canvas-setup',
                    title: 'Canvas元素创建',
                    description: '学习如何创建Canvas元素并获取绘图上下文',
                    code: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Canvas基础</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 20px;
            background: #f5f5f5;
        }
        canvas {
            border: 2px solid #333;
            background: white;
            display: block;
            margin: 20px auto;
        }
        .info {
            text-align: center;
            margin: 20px;
            padding: 15px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
    </style>
</head>
<body>
    <div class="info">
        <h2>Canvas基础教程</h2>
        <p>这是一个空的Canvas画布，尺寸为400x300像素</p>
    </div>
    
    <canvas id="myCanvas" width="400" height="300"></canvas>
    
    <div class="info">
        <p><strong>重要概念：</strong></p>
        <p>• Canvas元素需要设置width和height属性</p>
        <p>• 通过getContext('2d')获取2D绘图上下文</p>
        <p>• 所有的绘图操作都通过上下文对象进行</p>
    </div>

    <script>
        // 获取Canvas元素
        const canvas = document.getElementById('myCanvas');
        const ctx = canvas.getContext('2d');
        
        // 在控制台输出上下文对象信息
        console.log('Canvas元素:', canvas);
        console.log('绘图上下文:', ctx);
        console.log('Canvas尺寸:', canvas.width + 'x' + canvas.height);
    </script>
</body>
</html>`,
                    instructions: `# 📐 Canvas基础入门

## 核心概念
- **Canvas元素**：HTML5提供的画布标签
- **绘图上下文**：通过getContext('2d')获取2D绘图操作接口
- **坐标系统**：左上角为原点(0,0)，向右为X轴正方向，向下为Y轴正方向

## 关键要点
1. **元素创建**：使用&lt;canvas&gt;标签创建画布
2. **尺寸设置**：width和height属性设置画布大小
3. **获取上下文**：使用getContext('2d')获取2D绘图上下文
4. **控制台调试**：打开浏览器控制台查看相关信息

## 练习建议
- 尝试修改Canvas的宽度和高度
- 查看浏览器控制台的输出信息
- 了解Canvas元素的基本属性

## 注意事项
- Canvas的宽高最好通过HTML属性设置，而非CSS
- Canvas默认大小为300x150像素`
                },
                {
                    id: 'coordinate-system',
                    title: '坐标系统详解',
                    description: '深入理解Canvas的坐标系统和像素操作',
                    code: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Canvas坐标系统</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 20px;
            background: #f5f5f5;
        }
        canvas {
            border: 2px solid #333;
            background: white;
            display: block;
            margin: 20px auto;
        }
    </style>
</head>
<body>
    <canvas id="coordinateCanvas" width="500" height="400"></canvas>

    <script>
        const canvas = document.getElementById('coordinateCanvas');
        const ctx = canvas.getContext('2d');
        
        // 绘制坐标轴
        ctx.strokeStyle = '#ddd';
        ctx.lineWidth = 1;
        
        // 垂直线
        for (let x = 0; x <= canvas.width; x += 50) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }
        
        // 水平线
        for (let y = 0; y <= canvas.height; y += 50) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }
        
        // 绘制原点
        ctx.fillStyle = '#e74c3c';
        ctx.fillRect(0, 0, 10, 10);
        
        // 标注坐标
        ctx.fillStyle = '#2c3e50';
        ctx.font = '12px Arial';
        ctx.fillText('(0,0)', 15, 15);
        ctx.fillText('(100,50)', 115, 65);
        ctx.fillText('(200,150)', 215, 165);
        
        // 绘制示例点
        ctx.fillStyle = '#3498db';
        ctx.fillRect(100, 50, 8, 8);
        ctx.fillRect(200, 150, 8, 8);
        
        // X轴和Y轴标签
        ctx.fillStyle = '#e74c3c';
        ctx.font = 'bold 14px Arial';
        ctx.fillText('X →', canvas.width - 30, 20);
        ctx.fillText('Y', 10, 30);
        ctx.fillText('↓', 10, 45);
    </script>
</body>
</html>`,
                    instructions: `# 📍 Canvas坐标系统详解

## 坐标原点位置
- **原点(0,0)**：位于Canvas的左上角
- **X轴**：从左到右递增
- **Y轴**：从上到下递增（注意与数学坐标系不同）

## 坐标单位
- Canvas坐标以像素为单位
- 每个整数坐标代表一个像素点
- 可以使用小数坐标实现子像素渲染

## 实际应用
- 了解坐标系统是所有Canvas绘图的基础
- 正确计算坐标位置才能精确绘制图形
- 坐标变换可以改变绘图的参考系

## 常见误区
- 不要与数学坐标系混淆（Y轴方向相反）
- 注意Canvas尺寸与CSS样式尺寸的区别`
                }
            ]
        },
        
        {
            id: 'basic-shapes',
            title: '基本图形',
            subtitle: '掌握矩形、圆形等基础图形的绘制方法',
            examples: [
                {
                    id: 'rectangles',
                    title: '矩形绘制',
                    description: '学习各种矩形绘制方法和样式设置',
                    code: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Canvas矩形绘制</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 20px;
            background: #f5f5f5;
        }
        canvas {
            border: 2px solid #333;
            background: white;
            display: block;
            margin: 20px auto;
        }
    </style>
</head>
<body>
    <canvas id="rectCanvas" width="600" height="400"></canvas>

    <script>
        const canvas = document.getElementById('rectCanvas');
        const ctx = canvas.getContext('2d');
        
        // 1. 填充矩形
        ctx.fillStyle = '#e74c3c';
        ctx.fillRect(50, 50, 120, 80);
        
        // 2. 边框矩形
        ctx.strokeStyle = '#3498db';
        ctx.lineWidth = 4;
        ctx.strokeRect(200, 50, 120, 80);
        
        // 3. 先填充后描边
        ctx.fillStyle = '#2ecc71';
        ctx.fillRect(350, 50, 120, 80);
        ctx.strokeStyle = '#27ae60';
        ctx.lineWidth = 3;
        ctx.strokeRect(350, 50, 120, 80);
        
        // 4. 透明填充
        ctx.fillStyle = 'rgba(155, 89, 182, 0.5)';
        ctx.fillRect(50, 180, 120, 80);
        
        // 5. 虚线边框
        ctx.setLineDash([10, 5]);
        ctx.strokeStyle = '#f39c12';
        ctx.lineWidth = 3;
        ctx.strokeRect(200, 180, 120, 80);
        
        // 6. 清除矩形区域
        ctx.fillStyle = '#34495e';
        ctx.fillRect(350, 180, 120, 80);
        ctx.clearRect(370, 200, 80, 40);
        
        // 添加标签
        ctx.setLineDash([]); // 重置虚线
        ctx.fillStyle = '#2c3e50';
        ctx.font = '12px Arial';
        ctx.fillText('填充矩形', 70, 140);
        ctx.fillText('边框矩形', 220, 140);
        ctx.fillText('填充+边框', 365, 140);
        ctx.fillText('透明填充', 70, 270);
        ctx.fillText('虚线边框', 220, 270);
        ctx.fillText('清除区域', 370, 270);
    </script>
</body>
</html>`,
                    instructions: `# 🔲 矩形绘制详解

## 基本方法
- **fillRect(x, y, width, height)**：绘制填充矩形
- **strokeRect(x, y, width, height)**：绘制边框矩形
- **clearRect(x, y, width, height)**：清除矩形区域

## 样式设置
- **fillStyle**：设置填充颜色或样式
- **strokeStyle**：设置边框颜色或样式
- **lineWidth**：设置边框宽度

## 高级技巧
- 可以组合使用fillRect和strokeRect
- 支持透明度：rgba(r, g, b, alpha)
- setLineDash([])：设置虚线样式
- clearRect可以创建"镂空"效果

## 注意事项
- 矩形坐标是左上角位置
- 宽高为负值会反向绘制
- 边框宽度是居中绘制的`
                },
                {
                    id: 'circles',
                    title: '圆形与弧形',
                    description: '使用arc方法绘制圆形、扇形和弧线',
                    code: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Canvas圆形绘制</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 20px;
            background: #f5f5f5;
        }
        canvas {
            border: 2px solid #333;
            background: white;
            display: block;
            margin: 20px auto;
        }
    </style>
</head>
<body>
    <canvas id="circleCanvas" width="600" height="400"></canvas>

    <script>
        const canvas = document.getElementById('circleCanvas');
        const ctx = canvas.getContext('2d');
        
        // 1. 填充圆形
        ctx.beginPath();
        ctx.arc(100, 100, 40, 0, 2 * Math.PI);
        ctx.fillStyle = '#e74c3c';
        ctx.fill();
        
        // 2. 边框圆形
        ctx.beginPath();
        ctx.arc(250, 100, 40, 0, 2 * Math.PI);
        ctx.strokeStyle = '#3498db';
        ctx.lineWidth = 4;
        ctx.stroke();
        
        // 3. 半圆
        ctx.beginPath();
        ctx.arc(400, 100, 40, 0, Math.PI);
        ctx.fillStyle = '#2ecc71';
        ctx.fill();
        ctx.strokeStyle = '#27ae60';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // 4. 四分之一圆（扇形）
        ctx.beginPath();
        ctx.moveTo(100, 250);
        ctx.arc(100, 250, 40, 0, Math.PI / 2);
        ctx.lineTo(100, 250);
        ctx.fillStyle = '#f39c12';
        ctx.fill();
        
        // 5. 弧线
        ctx.beginPath();
        ctx.arc(250, 250, 40, Math.PI / 4, 7 * Math.PI / 4);
        ctx.strokeStyle = '#9b59b6';
        ctx.lineWidth = 5;
        ctx.stroke();
        
        // 6. 环形
        ctx.beginPath();
        ctx.arc(400, 250, 40, 0, 2 * Math.PI);
        ctx.arc(400, 250, 20, 0, 2 * Math.PI, true); // 逆时针
        ctx.fillStyle = '#1abc9c';
        ctx.fill();
        
        // 添加标签
        ctx.fillStyle = '#2c3e50';
        ctx.font = '12px Arial';
        ctx.fillText('填充圆', 80, 160);
        ctx.fillText('边框圆', 230, 160);
        ctx.fillText('半圆', 380, 160);
        ctx.fillText('扇形', 80, 320);
        ctx.fillText('弧线', 230, 320);
        ctx.fillText('环形', 380, 320);
    </script>
</body>
</html>`,
                    instructions: `# ⭕ 圆形与弧形绘制

## 核心方法
- **arc(x, y, radius, startAngle, endAngle, anticlockwise)**
  - x, y：圆心坐标
  - radius：半径
  - startAngle：起始角度（弧度）
  - endAngle：结束角度（弧度）
  - anticlockwise：是否逆时针（可选）

## 角度转换
- 圆周角度：0 到 2π（或 0 到 360°）
- 起始位置：3点钟方向（0弧度）
- 角度方向：顺时针递增

## 常用角度
- 0°：3点钟方向（0弧度）
- 90°：6点钟方向（π/2弧度）
- 180°：9点钟方向（π弧度）
- 270°：12点钟方向（3π/2弧度）

## 绘制技巧
- 完整圆形：startAngle=0, endAngle=2π
- 环形：使用两个圆弧，内圆设置anticlockwise=true
- 扇形：需要使用moveTo连接圆心`
                }
            ]
        },
        
        {
            id: 'paths',
            title: '路径绘制',
            subtitle: '使用路径API创建线条、曲线和复杂图形',
            examples: [
                {
                    id: 'basic-paths',
                    title: '基础路径',
                    description: '学习moveTo、lineTo等基础路径方法',
                    code: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Canvas基础路径</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 20px;
            background: #f5f5f5;
        }
        canvas {
            border: 2px solid #333;
            background: white;
            display: block;
            margin: 20px auto;
        }
    </style>
</head>
<body>
    <canvas id="pathCanvas" width="600" height="400"></canvas>

    <script>
        const canvas = document.getElementById('pathCanvas');
        const ctx = canvas.getContext('2d');
        
        // 1. 简单直线
        ctx.beginPath();
        ctx.moveTo(50, 50);
        ctx.lineTo(200, 50);
        ctx.strokeStyle = '#e74c3c';
        ctx.lineWidth = 3;
        ctx.stroke();
        
        // 2. 折线
        ctx.beginPath();
        ctx.moveTo(50, 100);
        ctx.lineTo(100, 120);
        ctx.lineTo(150, 80);
        ctx.lineTo(200, 140);
        ctx.strokeStyle = '#3498db';
        ctx.lineWidth = 3;
        ctx.stroke();
        
        // 3. 三角形（闭合路径）
        ctx.beginPath();
        ctx.moveTo(300, 50);
        ctx.lineTo(250, 140);
        ctx.lineTo(350, 140);
        ctx.closePath();
        ctx.fillStyle = '#2ecc71';
        ctx.fill();
        ctx.strokeStyle = '#27ae60';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // 4. 多边形
        ctx.beginPath();
        ctx.moveTo(450, 50);
        ctx.lineTo(500, 80);
        ctx.lineTo(480, 130);
        ctx.lineTo(420, 130);
        ctx.lineTo(400, 80);
        ctx.closePath();
        ctx.fillStyle = '#f39c12';
        ctx.fill();
        
        // 5. 星形
        function drawStar(x, y, size) {
            ctx.beginPath();
            ctx.moveTo(x, y - size);
            
            for (let i = 0; i < 5; i++) {
                const angle1 = (i * 144 - 90) * Math.PI / 180;
                const angle2 = ((i + 0.5) * 144 - 90) * Math.PI / 180;
                
                ctx.lineTo(x + Math.cos(angle1) * size, y + Math.sin(angle1) * size);
                ctx.lineTo(x + Math.cos(angle2) * size * 0.5, y + Math.sin(angle2) * size * 0.5);
            }
            
            ctx.closePath();
            ctx.fillStyle = '#9b59b6';
            ctx.fill();
        }
        
        drawStar(125, 280, 40);
        
        // 6. 心形
        function drawHeart(x, y, size) {
            ctx.beginPath();
            ctx.moveTo(x, y + size * 0.3);
            
            ctx.bezierCurveTo(x - size * 0.5, y - size * 0.2, x - size, y + size * 0.1, x, y + size * 0.7);
            ctx.bezierCurveTo(x + size, y + size * 0.1, x + size * 0.5, y - size * 0.2, x, y + size * 0.3);
            
            ctx.fillStyle = '#e91e63';
            ctx.fill();
        }
        
        drawHeart(350, 250, 30);
        
        // 添加标签
        ctx.fillStyle = '#2c3e50';
        ctx.font = '12px Arial';
        ctx.fillText('直线', 110, 40);
        ctx.fillText('折线', 110, 170);
        ctx.fillText('三角形', 280, 170);
        ctx.fillText('多边形', 430, 170);
        ctx.fillText('星形', 100, 350);
        ctx.fillText('心形', 330, 350);
    </script>
</body>
</html>`,
                    instructions: `# ✏️ 路径绘制基础

## 基础方法
- **beginPath()**：开始新路径
- **moveTo(x, y)**：移动到指定点（不绘制）
- **lineTo(x, y)**：绘制直线到指定点
- **closePath()**：闭合当前路径
- **stroke()**：绘制路径轮廓
- **fill()**：填充路径内部

## 路径状态
- 每次beginPath()都会清空之前的路径
- 可以在同一路径中绘制多个图形
- closePath()会自动连接到起始点

## 复杂图形技巧
- 使用数学函数计算坐标点
- 循环绘制重复图案
- 组合基础路径创建复杂形状

## 填充规则
- 路径必须闭合才能正确填充
- 可以同时使用stroke()和fill()
- 填充在描边之前执行避免覆盖`
                },
                {
                    id: 'curves',
                    title: '曲线绘制',
                    description: '掌握二次和三次贝塞尔曲线的使用',
                    code: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Canvas曲线绘制</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 20px;
            background: #f5f5f5;
        }
        canvas {
            border: 2px solid #333;
            background: white;
            display: block;
            margin: 20px auto;
        }
    </style>
</head>
<body>
    <canvas id="curveCanvas" width="600" height="400"></canvas>

    <script>
        const canvas = document.getElementById('curveCanvas');
        const ctx = canvas.getContext('2d');
        
        // 1. 二次贝塞尔曲线
        ctx.beginPath();
        ctx.moveTo(50, 150);
        ctx.quadraticCurveTo(150, 50, 250, 150);
        ctx.strokeStyle = '#e74c3c';
        ctx.lineWidth = 3;
        ctx.stroke();
        
        // 绘制控制点
        ctx.fillStyle = '#e74c3c';
        ctx.fillRect(50, 150, 6, 6);
        ctx.fillRect(150, 50, 6, 6);
        ctx.fillRect(250, 150, 6, 6);
        
        // 控制线（辅助线）
        ctx.beginPath();
        ctx.moveTo(50, 150);
        ctx.lineTo(150, 50);
        ctx.lineTo(250, 150);
        ctx.strokeStyle = '#bdc3c7';
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 5]);
        ctx.stroke();
        ctx.setLineDash([]);
        
        // 2. 三次贝塞尔曲线
        ctx.beginPath();
        ctx.moveTo(350, 200);
        ctx.bezierCurveTo(350, 100, 450, 100, 450, 200);
        ctx.strokeStyle = '#3498db';
        ctx.lineWidth = 3;
        ctx.stroke();
        
        // 绘制控制点
        ctx.fillStyle = '#3498db';
        ctx.fillRect(350, 200, 6, 6);
        ctx.fillRect(350, 100, 6, 6);
        ctx.fillRect(450, 100, 6, 6);
        ctx.fillRect(450, 200, 6, 6);
        
        // 3. 波浪线
        ctx.beginPath();
        ctx.moveTo(50, 300);
        ctx.quadraticCurveTo(100, 250, 150, 300);
        ctx.quadraticCurveTo(200, 350, 250, 300);
        ctx.quadraticCurveTo(300, 250, 350, 300);
        ctx.strokeStyle = '#2ecc71';
        ctx.lineWidth = 4;
        ctx.stroke();
        
        // 4. S形曲线
        ctx.beginPath();
        ctx.moveTo(400, 250);
        ctx.bezierCurveTo(450, 250, 450, 300, 500, 300);
        ctx.bezierCurveTo(550, 300, 550, 350, 600, 350);
        ctx.strokeStyle = '#9b59b6';
        ctx.lineWidth = 4;
        ctx.stroke();
        
        // 添加标签
        ctx.fillStyle = '#2c3e50';
        ctx.font = '12px Arial';
        ctx.fillText('二次贝塞尔曲线', 120, 180);
        ctx.fillText('控制点', 140, 40);
        ctx.fillText('三次贝塞尔曲线', 380, 230);
        ctx.fillText('波浪线', 180, 330);
        ctx.fillText('S形曲线', 480, 380);
    </script>
</body>
</html>`,
                    instructions: `# 🌊 曲线绘制技术

## 二次贝塞尔曲线
- **quadraticCurveTo(cpx, cpy, x, y)**
  - cpx, cpy：控制点坐标
  - x, y：终点坐标
- 特点：只有一个控制点，曲线相对简单

## 三次贝塞尔曲线
- **bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)**
  - cp1x, cp1y：第一个控制点
  - cp2x, cp2y：第二个控制点
  - x, y：终点坐标
- 特点：两个控制点，可以创建更复杂的曲线

## 控制点作用
- 控制点决定曲线的弯曲方向和程度
- 控制点不在曲线上，只是影响曲线形状
- 调整控制点位置可以精确控制曲线

## 实际应用
- 创建平滑的界面元素
- 绘制自然的运动轨迹
- 设计优美的装饰图案

## 设计技巧
- 控制点距离影响曲线弯曲程度
- 对称控制点可以创建平滑连接
- 多段曲线可以创建复杂路径`
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

// 导出默认配置
export const defaultTutorialConfig = {
    title: canvasTutorialData.title,
    description: canvasTutorialData.description,
    theme: canvasTutorialData.config.theme,
    editorConfig: canvasTutorialData.config.editorConfig
};

// 兼容性API - 保持向后兼容
export function getLesson(lessonId) {
    // 从chapters中查找对应的example
    for (const chapter of canvasTutorialData.chapters) {
        const example = chapter.examples.find(ex => ex.id === lessonId);
        if (example) {
            return {
                id: example.id,
                title: example.title,
                description: example.description,
                code: example.code,
                instructions: example.instructions,
                language: 'html'
            };
        }
    }
    return null;
}

export function getLessonsList() {
    const lessons = [];
    canvasTutorialData.chapters.forEach(chapter => {
        chapter.examples.forEach(example => {
            lessons.push({
                id: example.id,
                title: example.title,
                description: example.description,
                difficulty: chapter.title,
                language: 'html'
            });
        });
    });
    return lessons;
}

export function getTutorialConfig() {
    return defaultTutorialConfig;
}

// 新的API - 支持章节结构
export function getTutorialData() {
    return canvasTutorialData;
}

export function getChapter(chapterId) {
    return canvasTutorialData.chapters.find(chapter => chapter.id === chapterId);
}

export function getAllChapters() {
    return canvasTutorialData.chapters;
}
