// SVG Path 教学数据
export const pathTutorialData = {
    title: "SVG Path 从入门到精通",
    description: "掌握前端最强大的图形绘制工具",
    
    // 教学章节
    chapters: [
        // 基本命令
        {
            id: 'basic-commands',
            title: '基本命令',
            subtitle: '学习 SVG Path 的基础命令，掌握绘制直线和基本图形的技巧',
            examples: [
                {
                    id: 'simple-line',
                    title: '简单直线',
                    description: '使用 M 和 L 命令绘制一条简单的直线',
                    code: `<svg width="250" height="180" viewBox="0 0 250 180">
    <path d="M 30 30 L 220 150" 
          stroke="#e74c3c" 
          stroke-width="3" 
          fill="none"/>
    <circle cx="30" cy="30" r="5" fill="#3498db"/>
    <circle cx="220" cy="150" r="5" fill="#2ecc71"/>
    <text x="35" y="25" font-size="14" fill="#3498db">起点(30,30)</text>
    <text x="140" y="170" font-size="14" fill="#2ecc71">终点(220,150)</text>
</svg>`,
                    instructions: `SVG路径命令详解：
- M 30 30：移动到坐标点(30,30)，这是路径的起点，M代表Move To命令
- L 220 150：从当前位置画直线到坐标点(220,150)，L代表Line To命令
- stroke="#e74c3c"：线条颜色，使用十六进制红色
- stroke-width="3"：线条宽度为3像素
- fill="none"：路径不填充颜色

坐标说明：SVG坐标系原点(0,0)位于左上角，向右x增加，向下y增加`
                },
                {
                    id: 'polyline',
                    title: '多条线段（折线）',
                    description: '连续使用 L 命令创建折线',
                    code: `<svg width="250" height="180" viewBox="0 0 250 180">
    <path d="M 30 150 L 70 50 L 120 100 L 170 30 L 220 120" 
          stroke="#9b59b6" 
          stroke-width="3" 
          fill="none"/>
    <circle cx="30" cy="150" r="4" fill="#e74c3c"/>
    <circle cx="70" cy="50" r="4" fill="#e74c3c"/>
    <circle cx="120" cy="100" r="4" fill="#e74c3c"/>
    <circle cx="170" cy="30" r="4" fill="#e74c3c"/>
    <circle cx="220" cy="120" r="4" fill="#e74c3c"/>
</svg>`,
                    instructions: `SVG折线详解：
- M 30 150：移动到起始点(30,150)，不绘制线条
- L 70 50：从起点画线到第一个转折点(70,50)
- L 120 100：继续画线到第二个转折点(120,100)
- L 170 30：继续画线到第三个转折点(170,30)
- L 220 120：继续画线到最后一个点(220,120)
- stroke="#9b59b6"：使用紫色绘制线条
- stroke-width="3"：线条宽度为3像素
- fill="none"：路径内部不填充颜色

每个坐标点用圆圈标记，形成一条连续的折线图案`
                },
                {
                    id: 'closed-shape',
                    title: '闭合图形（三角形）',
                    description: '使用 Z 命令闭合路径',
                    code: `<svg width="250" height="180" viewBox="0 0 250 180">
    <path d="M 125 30 L 200 150 L 50 150 Z" 
          stroke="#e67e22" 
          stroke-width="3" 
          fill="#f39c12" 
          fill-opacity="0.3"/>
</svg>`,
                    instructions: `SVG闭合三角形详解：
- M 125 30：移动到三角形顶点(125,30)
- L 200 150：画线到右下角点(200,150)
- L 50 150：画线到左下角点(50,150)
- Z：闭合路径，自动连接回起点(125,30)
- stroke="#e67e22"：边框使用橙色
- stroke-width="3"：边框宽度为3像素
- fill="#f39c12"：填充淡橙色
- fill-opacity="0.3"：填充透明度为30%

Z命令很重要，它不仅闭合路径，还确保图形能正确填充颜色`
                },
                {
                    id: 'horizontal-vertical',
                    title: '水平和垂直线',
                    description: '使用 H 和 V 命令简化代码',
                    code: `<svg width="250" height="180" viewBox="0 0 250 180">
    <path d="M 30 40 H 100 V 110 H 180 V 150" 
          stroke="#3498db" 
          stroke-width="3" 
          fill="none"/>
    <path d="M 30 40 L 100 40 L 100 110 L 180 110 L 180 150" 
          stroke="#e74c3c" 
          stroke-width="2" 
          stroke-dasharray="5,5" 
          fill="none"/>
</svg>`,
                    instructions: `SVG水平垂直线详解：
- M 30 40：移动到起点(30,40)
- H 100：画水平线到x=100（等同于L 100 40）
- V 110：画垂直线到y=110（等同于L 100 110）
- H 180：画水平线到x=180（等同于L 180 110）
- V 150：画垂直线到y=150（等同于L 180 150）
- stroke="#3498db"：蓝色实线表示H和V命令
- stroke="#e74c3c"：红色虚线表示等效的L命令

H和V命令的优势：
1. 代码更简洁（只需一个坐标值）
2. 精确的水平垂直线（避免舍入误差）
3. 更易于阅读和维护`
                }
            ]
        },
        
        // 曲线艺术
        {
            id: 'curves',
            title: '曲线艺术',
            subtitle: '掌握贝塞尔曲线和弧线，创建流畅优美的曲线图形',
            examples: [
                {
                    id: 'quadratic-curve',
                    title: '二次贝塞尔曲线（Q命令）',
                    description: '使用一个控制点创建平滑曲线',
                    code: `<svg width="250" height="180" viewBox="0 0 250 180">
    <path d="M 30 150 Q 125 30 220 150" 
          stroke="#e91e63" 
          stroke-width="3" 
          fill="none"/>
    <circle cx="30" cy="150" r="4" fill="#e74c3c"/>
    <circle cx="125" cy="30" r="4" fill="#f39c12"/>
    <circle cx="220" cy="150" r="4" fill="#2ecc71"/>
    <line x1="30" y1="150" x2="125" y2="30" stroke="#bdc3c7" stroke-dasharray="2,2"/>
    <line x1="125" y1="30" x2="220" y2="150" stroke="#bdc3c7" stroke-dasharray="2,2"/>
    <text x="115" y="25" font-size="12" fill="#f39c12">控制点</text>
</svg>`,
                    instructions: `Q 125 30 220 150
  控制点(125,30) 终点(220,150)
控制点决定曲线的弯曲方向和程度`
                },
                {
                    id: 'cubic-curve',
                    title: '三次贝塞尔曲线（C命令）',
                    description: '使用两个控制点创建更复杂的曲线',
                    code: `<svg width="250" height="180" viewBox="0 0 250 180">
    <path d="M 30 150 C 30 30, 220 30, 220 150" 
          stroke="#673ab7" 
          stroke-width="3" 
          fill="none"/>
    <circle cx="30" cy="150" r="4" fill="#e74c3c"/>
    <circle cx="30" cy="30" r="4" fill="#f39c12"/>
    <circle cx="220" cy="30" r="4" fill="#f39c12"/>
    <circle cx="220" cy="150" r="4" fill="#2ecc71"/>
    <line x1="30" y1="150" x2="30" y2="30" stroke="#bdc3c7" stroke-dasharray="2,2"/>
    <line x1="220" y1="30" x2="220" y2="150" stroke="#bdc3c7" stroke-dasharray="2,2"/>
    <text x="5" y="25" font-size="12" fill="#f39c12">控制点1</text>
    <text x="175" y="25" font-size="12" fill="#f39c12">控制点2</text>
</svg>`,
                    instructions: `C 30 30, 220 30, 220 150
  控制点1 控制点2 终点
三次贝塞尔曲线更平滑，控制更精确`
                },
                {
                    id: 'arc-curve',
                    title: '圆弧（A命令）',
                    description: '绘制椭圆弧线段',
                    code: `<svg width="250" height="180" viewBox="0 0 250 180">
    <path d="M 60 120 A 60 40 0 0 1 190 120" 
          stroke="#00bcd4" 
          stroke-width="3" 
          fill="none"/>
    <path d="M 60 120 A 60 40 0 1 0 190 120" 
          stroke="#ff5722" 
          stroke-width="2" 
          stroke-dasharray="5,5" 
          fill="none"/>
    <circle cx="60" cy="120" r="4" fill="#e74c3c"/>
    <circle cx="190" cy="120" r="4" fill="#2ecc71"/>
    <text x="60" y="110" font-size="12" fill="#666">起点</text>
    <text x="170" y="110" font-size="12" fill="#666">终点</text>
</svg>`,
                    instructions: `A rx ry rotation large-arc sweep x y
  60 40 0(旋转) 0(小弧) 1(顺时针) 190 120
实线是小弧，虚线是大弧`
                },
                {
                    id: 'wave-line',
                    title: '波浪线',
                    description: '连续的二次贝塞尔曲线创建波浪效果',
                    code: `<svg width="250" height="180" viewBox="0 0 250 180">
    <path d="M 20 90 
             Q 40 40, 60 90 
             Q 80 140, 100 90
             Q 120 40, 140 90
             Q 160 140, 180 90
             Q 200 40, 220 90" 
          stroke="#3498db" 
          stroke-width="4" 
          fill="none"
          stroke-dasharray="10">
        <animate attributeName="stroke-dashoffset" 
                 values="0;20" 
                 dur="1s" 
                 repeatCount="indefinite"/>
    </path>
</svg>`,
                    instructions: `SVG波浪线详解：
- M 20 90：移动到起点(20,90)
- 五个连续的Q命令创建波浪效果：
  • Q 40 40, 60 90：第一个波谷
  • Q 80 140, 100 90：第一个波峰
  • Q 120 40, 140 90：第二个波谷
  • Q 160 140, 180 90：第二个波峰
  • Q 200 40, 220 90：第三个波谷
- stroke="#3498db"：使用蓝色绘制波浪线
- stroke-width="4"：线宽4像素
- stroke-dasharray="10"：创建虚线效果，线段长度为10
- animate元素：创建stroke-dashoffset动画效果，使波浪看起来像在流动

波浪线原理：
1. 每个Q命令的控制点交替在线的上方和下方
2. 终点始终在中线(y=90)上
3. 控制点y值决定波浪的振幅
4. 修改控制点x值可以改变波浪的频率`
                }
            ]
        },
        
        // 复杂图形
        {
            id: 'complex-shapes',
            title: '复杂图形',
            subtitle: '组合各种命令，创建心形、星形等复杂的装饰图案',
            examples: [
                {
                    id: 'heart-shape',
                    title: '心形',
                    description: '使用贝塞尔曲线绘制心形图案',
                    code: `<svg width="250" height="200" viewBox="0 0 250 200">
    <g transform="translate(125,100)">
        <path d="M 0 20 
                 C 0 20, -40 -10, -40 -35
                 C -40 -60, -20 -70, 0 -45
                 C 20 -70, 40 -60, 40 -35
                 C 40 -10, 0 20, 0 20 Z" 
              fill="#e74c3c" 
              stroke="#c0392b" 
              stroke-width="2">
            <animateTransform 
                attributeName="transform" 
                type="scale" 
                values="1;1.1;1" 
                dur="2s" 
                repeatCount="indefinite"/>
        </path>
    </g>
</svg>`,
                    instructions: `SVG心形详解：

1. 心形路径构建详解：
   - 使用g元素进行居中变换：transform="translate(125,100)"，将整个心形移到SVG中心
   - M 0 20：起始于心形底部中点
   - 四段三次贝塞尔曲线组成心形：
     • C 0 20, -40 -10, -40 -35：左下到左上
     • C -40 -60, -20 -70, 0 -45：左上到顶部中心
     • C 20 -70, 40 -60, 40 -35：顶部中心到右上
     • C 40 -10, 0 20, 0 20：右上到底部中点
   - Z：闭合路径
   - fill="#e74c3c"：填充红色
   - stroke="#c0392b"：深红色边框
   - animateTransform：创建心跳缩放动画效果

心形设计原理：
1. 以(0,0)为中心点绘制
2. 利用C命令的灵活性创建平滑曲线
3. 左右两侧完全对称
4. 顶部使用两条曲线创建凹陷效果
5. 动画使心形有节奏地放大缩小，模拟心跳`
                },
                {
                    id: 'star-shape',
                    title: '星形',
                    description: '用直线段组成五角星',
                    code: `<svg width="250" height="200" viewBox="0 0 250 200">
        <path d="M 100 10 L 110 40 L 140 40 L 120 60 L 130 90 L 100 75 L 70 90 L 80 60 L 60 40 L 90 40 Z"  fill="#f1c40f" stroke="#f39c12">
<animateTransform 
                attributeName="transform" 
                type="scale" 
                values="1;1.1;1" 
                dur="2s" 
                repeatCount="indefinite"/>
</path>
</svg>`,
                    instructions: `SVG五角星详解：

1. 几何结构详解：
   - 五角星由10个精确计算的点组成，形成5个向外的尖角
   - 每个外部顶点角度为36度(360÷10)，每个内部凹陷角度为108度
   - 内圈点距离中心的距离约为外圈点的38%，这个比例产生经典的五角星形状

2. 路径命令详解：
   - M 100 10：移动到顶部尖角(第一个外圈点)
   - 连续的10个L命令创建星形轮廓，按顺时针方向：
     • L 110 40：第一个内圈点(右上)
     • L 140 40：第二个外圈点(右上角)
     • L 120 60：第二个内圈点(右侧)
     • L 130 90：第三个外圈点(右下角)
     • L 100 75：第三个内圈点(底部)
     • L 70 90：第四个外圈点(左下角)
     • L 80 60：第四个内圈点(左侧)
     • L 60 40：第五个外圈点(左上角)
     • L 90 40：第五个内圈点(左上)
   - Z：闭合路径，连接回第一个点(100,10)

3. 样式设置：
   - fill="#f1c40f"：鲜黄色填充，类似传统金色星星
   - stroke="#f39c12"：橙色边框，增强边缘视觉效果
   - 没有指定stroke-width，使用默认的1px边框

4. 动画效果：
   - animateTransform：使用SVG的变换动画
   - type="scale"：应用缩放效果
   - values="1;1.1;1"：从原始大小→放大10%→回到原始大小
   - dur="2s"：完成一次缩放周期的时间
   - repeatCount="indefinite"：无限重复动画

5. 数学原理：
   - 理想五角星的内外半径比为0.382(黄金分割比)
   - 外圈点坐标可通过三角函数计算：
     X = centerX + outerRadius * cos(angle)
     Y = centerY + outerRadius * sin(angle)
   - 内圈点同理，使用内半径和偏移角度计算
   - 本例中使用了简化的近似坐标`
                },
                {
                    id: 'flower-shape',
                    title: '花朵',
                    description: '组合多个花瓣创建完整花朵',
                    code: `<svg width="250" height="200" viewBox="0 0 250 200">
    <g transform="translate(125,100)">
        <!-- 5个花瓣 -->
        <g class="petals">
            <path d="M 0 0 Q -15 -30, 0 -50 Q 15 -30, 0 0 Z" 
                  fill="#ff69b4" 
                  opacity="0.8" 
                  transform="rotate(0)"/>
            <path d="M 0 0 Q -15 -30, 0 -50 Q 15 -30, 0 0 Z" 
                  fill="#ff69b4" 
                  opacity="0.8" 
                  transform="rotate(72)"/>
            <path d="M 0 0 Q -15 -30, 0 -50 Q 15 -30, 0 0 Z" 
                  fill="#ff69b4" 
                  opacity="0.8" 
                  transform="rotate(144)"/>
            <path d="M 0 0 Q -15 -30, 0 -50 Q 15 -30, 0 0 Z" 
                  fill="#ff69b4" 
                  opacity="0.8" 
                  transform="rotate(216)"/>
            <path d="M 0 0 Q -15 -30, 0 -50 Q 15 -30, 0 0 Z" 
                  fill="#ff69b4" 
                  opacity="0.8" 
                  transform="rotate(288)"/>
            
            <animateTransform 
                attributeName="transform" 
                type="rotate" 
                values="0;360" 
                dur="4s" 
                repeatCount="indefinite"/>
        </g>
        
        <!-- 花心 -->
        <circle cx="0" cy="0" r="10" fill="#ffeb3b" stroke="#ffc107" stroke-width="2"/>
        <circle cx="0" cy="0" r="4" fill="#ff9800"/>
    </g>
</svg>`,
                    instructions: `SVG花朵详解：

1. 基础结构设计：
   - 整体使用g元素实现居中：transform="translate(125,100)"
   - 嵌套g元素组织花瓣(.petals)和花心，便于分组动画
   - 使用SVG复制与变换技术，通过单个花瓣生成完整花朵

2. 花瓣设计精解：
   - 基础花瓣路径拆解：
     • M 0 0：从中心点开始
     • Q -15 -30, 0 -50：左侧曲线，控制点在左上方，终点在正上方
     • Q 15 -30, 0 0：右侧曲线，控制点在右上方，回到中心点
     • Z：闭合路径
   - 花瓣形状技巧：
     • 对称的控制点(-15,-30)和(15,-30)确保花瓣左右对称
     • 适当的控制点位置(-15,-30)创建自然弯曲的花瓣形状
     • 终点的精确定位(0,-50)决定花瓣长度

3. 复制与旋转技术：
   - 五个完全相同的花瓣使用不同的旋转角度：
     • rotate(0)：正上方花瓣（基准花瓣）
     • rotate(72)：顺时针旋转72度（360÷5=72）
     • rotate(144)：顺时针旋转144度（72×2）
     • rotate(216)：顺时针旋转216度（72×3）
     • rotate(288)：顺时针旋转288度（72×4）
   - 每个花瓣都精确分布在圆周上，形成均匀的五瓣花

4. 视觉效果增强：
   - fill="#ff69b4"：热粉色填充，模拟真实花瓣颜色
   - opacity="0.8"：轻微透明效果，增加层次感和柔和感
   - 花心由两个同心圆组成：
     • 外圆：r="10" fill="#ffeb3b" stroke="#ffc107"，创建黄色花蕊
     • 内圆：r="4" fill="#ff9800"，增加花心深度感

5. 高级动画效果：
   - 应用于花瓣组(.petals)的旋转动画：
     • attributeName="transform"：指定变换动画
     • type="rotate"：旋转类型
     • values="0;360"：从0度旋转到360度
     • dur="4s"：一次完整旋转需要4秒
     • repeatCount="indefinite"：无限循环旋转
   - 动画使花朵看起来像在风中轻轻摇曳
   
6. 花朵设计数学基础：
   - 花瓣数量和旋转角度关系：每个花瓣旋转角度 = 360° ÷ 花瓣数量
   - 花瓣弧度控制：控制点到中心的距离决定花瓣宽度
   - 花瓣长度控制：终点到中心的距离决定花瓣长度`
                },
                {
                    id: 'gear-shape',
                    title: '齿轮',
                    description: '创建机械感的齿轮图形',
                    code: `<svg width="250" height="200" viewBox="0 0 250 200">
    <g transform="translate(125,100)">
        <!-- 8齿齿轮 -->
        <g class="gear">
            <!-- 外轮廓 -->
            <path d="M -5 -60 L 5 -60 L 8 -50 L 15 -50 L 18 -60 L 25 -55
                     L 35 -35 L 42 -42 L 50 -35 L 55 -25 L 42 -18
                     L 50 -15 L 50 -8 L 60 -5 L 60 5 L 50 8
                     L 50 15 L 42 18 L 55 25 L 50 35 L 42 42
                     L 35 35 L 25 55 L 18 60 L 15 50 L 8 50
                     L 5 60 L -5 60 L -8 50 L -15 50 L -18 60
                     L -25 55 L -35 35 L -42 42 L -50 35 L -55 25
                     L -42 18 L -50 15 L -50 8 L -60 5 L -60 -5
                     L -50 -8 L -50 -15 L -42 -18 L -55 -25 L -50 -35
                     L -42 -42 L -35 -35 L -25 -55 L -18 -60 L -15 -50
                     L -8 -50 Z" 
                  fill="#95a5a6" 
                  stroke="#7f8c8d" 
                  stroke-width="2"/>
            
            <animateTransform 
                attributeName="transform" 
                type="rotate" 
                values="0;360" 
                dur="5s" 
                repeatCount="indefinite"/>
        </g>
        
        <!-- 内圆 -->
        <circle cx="0" cy="0" r="25" fill="#ecf0f1" stroke="#bdc3c7" stroke-width="2"/>
        <circle cx="0" cy="0" r="8" fill="#34495e"/>
    </g>
</svg>`,
                    instructions: `SVG齿轮详解：

1. 工程结构设计：
   - 使用g元素进行居中：transform="translate(125,100)"将齿轮放置在视图中央
   - 嵌套g元素(.gear)用于单独控制齿轮旋转动画
   - 精心设计的径向对称结构，确保齿轮平衡

2. 齿轮轮廓精确构建：
   - 极其复杂的path路径，总计约60个坐标点，构建8个精确的齿
   - 齿轮轮廓构建技术拆解：
     • 从顶部中间位置开始：M -5 -60
     • 每个齿由大约7-8个坐标点组成，包括：
       - 齿顶平面：L 5 -60
       - 齿外侧斜面：L 8 -50 L 15 -50
       - 齿外顶角：L 18 -60
       - 齿外侧过渡：L 25 -55
     • 每个齿间距包含约6个坐标点，形成内凹区域
     • 整个齿轮轮廓按顺时针方向精确绘制
     • 使用Z命令闭合路径

3. 齿轮数学与工程原理：
   - 8齿设计，每个齿占用45度角(360度 ÷ 8个齿)
   - 齿高比例：齿顶圆直径比齿根圆直径约为1.2:1
   - 齿顶处略微变窄，模拟实际工程中的齿形设计
   - 齿间距采用圆弧过渡，减少应力集中
   - 径向对称设计确保齿轮旋转平衡

4. 样式与视觉效果：
   - fill="#95a5a6"：金属灰色填充，模拟真实齿轮材质
   - stroke="#7f8c8d"：深灰色边框，增强轮廓清晰度
   - stroke-width="2"：适中的边框厚度，平衡视觉效果
   - 内圆样式(r="25")：
     • fill="#ecf0f1"：浅灰色填充
     • stroke="#bdc3c7"：灰色边框
   - 中心孔样式(r="8")：
     • fill="#34495e"：深蓝灰色填充，形成视觉层次

5. 旋转动画技术：
   - animateTransform元素实现无限旋转：
     • attributeName="transform"：指定变换属性
     • type="rotate"：旋转类型变换
     • values="0;360"：从0度旋转到360度
     • dur="5s"：完成一次旋转的时间为5秒
     • repeatCount="indefinite"：无限重复旋转
   - 动画应用于齿轮组(.gear)，保持内圆和中心孔静止，增强真实感

6. 工程优化技巧：
   - 使用直线段而非曲线，体现机械精确性
   - 齿形设计考虑啮合功能，具有工程实用性
   - 各部分比例协调，符合机械设计审美
   - 中心轴与内圆结构增强整体设计感`
                }
            ]
        },
        
        // 动画效果
        {
            id: 'animations',
            title: '动画效果',
            subtitle: '为 SVG Path 添加动态效果，创建引人注目的动画',
            examples: [
                {
                    id: 'path-drawing',
                    title: 'Path绘制动画',
                    description: '模拟手绘效果的路径动画',
                    code: `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SVG Continuous Path Animation</title>
    <style>
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            background: #f8f9fa;
        }

        svg {
            border: 2px dashed #bdc3c7;
            border-radius: 8px;
            background: #fafafa;
        }

        /* A1→A2→A3 连续动画 */
        #pathAnimation path {
            stroke-dasharray: 100;
            stroke-dashoffset: 100;
        }

        #path1 { animation: drawPath 1s ease-out 0s forwards; }
        #path2 { animation: drawPath 1s ease-out 1s forwards; }
        #path3 { animation: drawPath 1s ease-out 2s forwards; }
        #path4 { animation: drawPath 1s ease-out 3s forwards; }
        #path5 { animation: drawPath 1s ease-out 4s forwards; }
        #path6 { animation: drawPath 1s ease-out 5s forwards; }

        @keyframes drawPath {
            to { stroke-dashoffset: 0; }
        }

        /* 整个路径动画循环 */
        #pathAnimation {
            animation: resetAnimation 7s infinite;
        }

        @keyframes resetAnimation {
            0% { opacity: 1; }
            85% { opacity: 1; }
            95% { opacity: 0.3; }
            100% { opacity: 1; }
        }
    </style>
</head>
<body>
    <svg width="200" height="150" id="pathAnimation">
        <!-- 背景点位 -->
        <circle cx="30" cy="50" r="4" fill="#3498db" opacity="0.3"/>
        <circle cx="90" cy="30" r="4" fill="#3498db" opacity="0.3"/>
        <circle cx="150" cy="80" r="4" fill="#3498db" opacity="0.3"/>
        <circle cx="170" cy="120" r="4" fill="#3498db" opacity="0.3"/>
        <circle cx="100" cy="130" r="4" fill="#3498db" opacity="0.3"/>
        <circle cx="40" cy="110" r="4" fill="#3498db" opacity="0.3"/>

        <!-- 路径段1: A1→A2 -->
        <path id="path1" d="M 30 50 Q 60 20 90 30" 
              stroke="#e91e63" stroke-width="3" fill="none"
              stroke-dasharray="100" stroke-dashoffset="100"/>

        <!-- 路径段2: A2→A3 -->
        <path id="path2" d="M 90 30 C 120 40, 140 60, 150 80" 
              stroke="#9c27b0" stroke-width="3" fill="none"
              stroke-dasharray="100" stroke-dashoffset="100"/>

        <!-- 路径段3: A3→A4 -->
        <path id="path3" d="M 150 80 Q 160 100 170 120" 
              stroke="#673ab7" stroke-width="3" fill="none"
              stroke-dasharray="100" stroke-dashoffset="100"/>

        <!-- 路径段4: A4→A5 -->
        <path id="path4" d="M 170 120 C 140 125, 120 130, 100 130" 
              stroke="#3f51b5" stroke-width="3" fill="none"
              stroke-dasharray="100" stroke-dashoffset="100"/>

        <!-- 路径段5: A5→A6 -->
        <path id="path5" d="M 100 130 Q 70 120 40 110" 
              stroke="#2196f3" stroke-width="3" fill="none"
              stroke-dasharray="100" stroke-dashoffset="100"/>

        <!-- 路径段6: A6→A1 (闭合) -->
        <path id="path6" d="M 40 110 C 35 80, 32 65, 30 50" 
              stroke="#03a9f4" stroke-width="3" fill="none"
              stroke-dasharray="100" stroke-dashoffset="100"/>

        <!-- 动态点（跟随动画） -->
        <circle id="movingDot" cx="30" cy="50" r="5" fill="#ff5722" opacity="0">
            <animate attributeName="opacity" values="0;1;1;0" dur="6s" repeatCount="indefinite"/>
        </circle>

        <!-- 标签 -->
        <text x="25" y="45" font-size="10" fill="#3498db">A1</text>
        <text x="85" y="25" font-size="10" fill="#3498db">A2</text>
        <text x="155" y="75" font-size="10" fill="#3498db">A3</text>
        <text x="175" y="115" font-size="10" fill="#3498db">A4</text>
        <text x="95" y="145" font-size="10" fill="#3498db">A5</text>
        <text x="35" y="105" font-size="10" fill="#3498db">A6</text>
    </svg>

    <script>
        // 每7秒重置一次A1→A2→A3动画
        setInterval(function() {
            const paths = document.querySelectorAll('#pathAnimation path');
            paths.forEach(function(path) {
                path.style.strokeDashoffset = '100';
            });
            setTimeout(function() {
                paths.forEach(function(path, index) {
                    path.style.animation = 'drawPath 1s ease-out ' + index + 's forwards';
                });
            }, 100);
        }, 7000);
    </script>
</body>
</html>`,
                    instructions: `SVG路径绘制动画详解：

1. 核心原理：
   - stroke-dasharray：定义虚线模式，值为100表示每段长度
   - stroke-dashoffset：控制虚线偏移量，从100到0实现绘制效果
   - 通过CSS动画逐步改变offset值实现"手绘"效果

2. 动画设计：
   - 6个独立的路径段（#path1到#path6）
   - 每段路径通过延迟（0s到5s）依次启动动画
   - 每段动画持续1秒，使用ease-out缓动效果
   - 7秒循环一次完整动画

3. 路径组成：
   - 使用Q（二次贝塞尔）和C（三次贝塞尔）命令创建各种曲线
   - 每段路径使用不同颜色（从粉红色到蓝色渐变）
   - 路径连接6个关键点（A1到A6）形成封闭图形

4. 代码结构：
   - HTML/CSS：设置动画关键帧和样式
   - SVG：定义背景点、路径段和标签
   - JavaScript：控制动画重置和循环

这个例子展示了如何创建高级的路径绘制动画，通过组合多段路径和精确控制动画时间实现复杂效果。`
                },
                {
                    id: 'morphing-shape',
                    title: '形状变形动画',
                    description: '在不同形状之间平滑过渡',
                    code: `<svg width="250" height="180" viewBox="0 0 250 180">
    <g transform="translate(125,90)">
        <path fill="#3498db" stroke="#2980b9" stroke-width="2">
            <animate attributeName="d" 
                     values="M -60 -30 L 60 -30 L 60 30 L -60 30 Z;
                             M -30 -60 Q 30 -30, 30 0 Q 30 30, -30 60 Q -60 30, -60 0 Q -60 -30, -30 -60 Z;
                             M 0 -60 L 40 -20 L 40 20 L 0 60 L -40 20 L -40 -20 Z;
                             M -60 -30 L 60 -30 L 60 30 L -60 30 Z" 
                     dur="4s" 
                     repeatCount="indefinite"/>
        </path>
    </g>
</svg>`,
                    instructions: `SVG形状变形动画详解：

1. 核心原理：
   - 使用<animate>元素修改path的d属性（路径数据）
   - values属性包含4个不同形状的路径数据：
     • 矩形：M -60 -30 L 60 -30 L 60 30 L -60 30 Z
     • 花瓣形：使用Q命令创建弧形边缘
     • 六边形：使用L命令创建六个顶点
     • 回到矩形：形成完整循环

2. 变形要点：
   - 所有形状都以(0,0)为中心点设计
   - 每个形状都保持相似的复杂度和点数
   - 确保起点和终点一致，命令类型匹配
   - dur="4s"：一个完整变形周期为4秒
   - repeatCount="indefinite"：无限重复动画

3. 形状样式：
   - fill="#3498db"：蓝色填充
   - stroke="#2980b9"：深蓝色边框
   - stroke-width="2"：边框宽度为2像素

成功的形状变形动画需要精心设计每个关键帧的路径数据，确保平滑过渡。`
                },
                {
                    id: 'following-path',
                    title: '路径跟随动画',
                    description: '让对象沿着路径移动',
                    code: `<svg width="250" height="180" viewBox="0 0 250 180">
    <!-- 路径 -->
    <path id="motionPath" 
          d="M 30 90 Q 80 30, 125 90 Q 170 150, 220 90" 
          stroke="#bdc3c7" 
          stroke-width="2" 
          fill="none" 
          stroke-dasharray="5,5"/>
    
    <!-- 移动的圆 -->
    <circle r="8" fill="#e74c3c">
        <animateMotion dur="3s" repeatCount="indefinite">
            <mpath href="#motionPath"/>
        </animateMotion>
    </circle>
    
    <!-- 路径绘制效果 -->
    <path d="M 30 90 Q 80 30, 125 90 Q 170 150, 220 90" 
          stroke="#e74c3c" 
          stroke-width="3" 
          fill="none"
          stroke-dasharray="250"
          stroke-dashoffset="250">
        <animate attributeName="stroke-dashoffset" 
                 values="250;0" 
                 dur="3s" 
                 repeatCount="indefinite"/>
    </path>
</svg>`,
                    instructions: `SVG路径跟随动画详解：

1. 路径跟随技术核心原理：
   - animateMotion：SVG专用动画元素，用于沿路径移动元素
   - 数学原理：SVG引擎自动计算路径上的点，并将元素放置在对应位置
   - 技术特点：无需手动计算坐标，直接使用声明式动画实现复杂运动

2. 波浪路径的精确构建：
   - 路径命令：M 30 90 Q 80 30, 125 90 Q 170 150, 220 90
   - 详细分解：
     • M 30 90：起始于左侧中点
     • Q 80 30, 125 90：第一个波峰
       - 控制点(80,30)在上方，创建向上弯曲
       - 终点(125,90)在中线上
     • Q 170 150, 220 90：第二个波峰
       - 控制点(170,150)在下方，创建向下弯曲
       - 终点(220,90)在中线上，与起点同高
   - 技术要点：
     • 控制点垂直距离决定波浪振幅
     • 控制点水平距离影响波浪频率
     • 终点保持在y=90水平线上，确保波浪的对称性

3. 动画实现技术详解：
   - 跟随元素动画：
     • <circle r="8" fill="#e74c3c">：红色圆形，半径为8
     • <animateMotion dur="3s" repeatCount="indefinite">：持续3秒，无限循环
     • <mpath href="#motionPath"/>：引用ID为motionPath的路径
     • 效果：圆形精确跟随波浪路径运动
   
   - 路径绘制动画：
     • 同步显示的红色路径，与虚线路径形状完全相同
     • stroke-dasharray="250"：设置虚线段总长度
     • stroke-dashoffset="250"：初始状态完全隐藏
     • <animate attributeName="stroke-dashoffset" values="250;0" dur="3s">：
       从完全隐藏到完全显示，持续3秒
     • 效果：路径看起来随着圆形运动而被"绘制"出来

4. 样式与视觉增强：
   - 两条视觉路径分离：
     • 静态参考路径：stroke="#bdc3c7" stroke-dasharray="5,5"
       灰色虚线显示完整运动轨迹
     • 动态跟随路径：stroke="#e74c3c" stroke-width="3"
       粗红色实线跟随小球动态绘制
   - 移动元素样式：
     • 使用鲜明的红色圆形作为跟随元素
     • 半径适中(r="8")，便于观察运动轨迹

5. 动画同步控制技巧：
   - 路径长度估算：约250个单位
   - 时间同步：所有动画周期都设为3秒
   - 重复控制：repeatCount="indefinite"确保无限循环
   - 动画方向：默认从路径起点到终点，然后瞬间回到起点重新开始

6. 高级应用技巧：
   - 可添加rotateAuto属性让元素沿路径旋转
   - 可使用keyPoints和keyTimes控制运动速度变化
   - 可添加begin属性设置动画启动时间，创建序列动画
   - 可与其他SVG动画组合，如颜色变化、缩放等

7. 实际应用场景：
   - 引导用户注意流程图中的路径
   - 展示数据变化趋势和流向
   - 创建物理运动演示(如抛物线、摆动等)
   - 设计互动游戏中的角色移动路径`
                },
                {
                    id: 'complex-animation',
                    title: '复杂动画组合',
                    description: '多种动画效果的组合使用',
                    code: `<svg width="250" height="200" viewBox="0 0 250 200">
    <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#e74c3c;stop-opacity:1">
                <animate attributeName="stop-color" 
                         values="#e74c3c;#3498db;#2ecc71;#f39c12;#e74c3c" 
                         dur="3s" 
                         repeatCount="indefinite"/>
            </stop>
            <stop offset="100%" style="stop-color:#3498db;stop-opacity:1">
                <animate attributeName="stop-color" 
                         values="#3498db;#2ecc71;#f39c12;#e74c3c;#3498db" 
                         dur="3s" 
                         repeatCount="indefinite"/>
            </stop>
        </linearGradient>
        
        <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
            </feMerge>
        </filter>
    </defs>
    
    <g transform="translate(125,100)">
        <path d="M -60 0 
                 C -60 -40, -30 -60, 0 -60
                 C 30 -60, 60 -40, 60 0
                 C 60 40, 30 60, 0 60
                 C -30 60, -60 40, -60 0 Z" 
              fill="url(#grad1)" 
              filter="url(#glow)">
            
            <animate attributeName="stroke-dashoffset" 
                     values="250;0;-250" 
                     dur="4s" 
                     repeatCount="indefinite"/>
            
            <animateTransform 
                attributeName="transform" 
                type="rotate" 
                values="0;360;0" 
                dur="6s" 
                repeatCount="indefinite"/>
            
            <animateTransform 
                attributeName="transform" 
                type="scale" 
                values="1;1.2;1" 
                dur="2s" 
                repeatCount="indefinite"
                additive="sum"/>
        </path>
    </g>
</svg>`,
                    instructions: `SVG复杂动画组合详解：

1. 高级滤镜与渐变技术详解：
   - 线性渐变(linearGradient)精确设置：
     • id="grad1"：用于引用的唯一标识符
     • x1="0%" y1="0%" x2="100%" y2="100%"：从左上角到右下角的对角线渐变
     • 两个渐变点(stop)：
       - 起始点：stop-color="#e74c3c"(红色)，stop-opacity="1"(完全不透明)
       - 终止点：stop-color="#3498db"(蓝色)，stop-opacity="1"(完全不透明)
     • 两个动画同时控制渐变颜色：
       - 第一个stop动画：#e74c3c→#3498db→#2ecc71→#f39c12→#e74c3c
       - 第二个stop动画：#3498db→#2ecc71→#f39c12→#e74c3c→#3498db
       - 动画持续3秒，无限循环，创建流动彩虹效果
   
   - 发光滤镜(filter)技术分解：
     • id="glow"：滤镜唯一标识符
     • feGaussianBlur：高斯模糊效果
       - stdDeviation="4"：模糊半径为4个单位
       - result="coloredBlur"：将结果命名为coloredBlur，供后续引用
     • feMerge：合并多个滤镜效果
       - feMergeNode in="coloredBlur"：引入模糊效果
       - feMergeNode in="SourceGraphic"：引入原始图形
       - 效果：原始图形上叠加发光效果，增强视觉冲击力

2. 核心形状路径技术分析：
   - 精心设计的椭圆路径：
     • M -60 0：从左侧中点开始
     • C -60 -40, -30 -60, 0 -60：左上四分之一椭圆
     • C 30 -60, 60 -40, 60 0：右上四分之一椭圆
     • C 60 40, 30 60, 0 60：右下四分之一椭圆
     • C -30 60, -60 40, -60 0：左下四分之一椭圆，回到起点
     • Z：闭合路径
   - 技术要点：
     • 使用四段精确的三次贝塞尔曲线创建完美椭圆
     • 以(0,0)为中心设计，便于应用各种变换
     • 控制点位置(如-60,-40)精确计算，确保曲线平滑

3. 多重动画叠加技术详解：
   - 路径描边动画：
     • attributeName="stroke-dashoffset"：控制描边偏移量
     • values="250;0;-250"：从完全隐藏到显示再到反向隐藏
     • dur="4s"：完成一次循环需要4秒
     • 效果：路径看起来在不断流动
   
   - 旋转动画：
     • attributeName="transform"
     • type="rotate"：指定旋转变换
     • values="0;360;0"：从0度旋转到360度再回到0度
     • dur="6s"：一次旋转周期为6秒
     • 效果：整个形状平滑旋转
   
   - 缩放动画：
     • attributeName="transform"
     • type="scale"：指定缩放变换
     • values="1;1.2;1"：从原始大小→放大20%→回到原始大小
     • dur="2s"：一次缩放周期为2秒
     • additive="sum"：关键参数，允许此变换与其他变换叠加
     • 效果：形状在旋转的同时进行呼吸式缩放

4. 动画同步与叠加技术：
   - 不同持续时间的动画组合：
     • 缩放(2秒)、描边(4秒)、旋转(6秒)
     • 创建复杂的视觉节奏，避免单调重复
   - additive="sum"属性的关键作用：
     • 允许多个transform动画同时应用
     • 没有此属性，后一个变换会覆盖前一个
     • 使用此属性，变换效果会数学叠加

5. 视觉效果与应用：
   - 动态渐变填充：形状内部颜色不断变化
   - 发光效果：模拟霓虹灯或能量场效果
   - 多重动画：同时具有旋转、缩放、流动效果
   - 适用场景：
     • 高端网站的加载指示器
     • 创意交互界面的背景元素
     • 数据可视化中的特殊效果
     • 游戏界面中的能量或魔法元素

6. 性能优化考虑：
   - 使用SVG原生动画而非CSS/JS动画，减少CPU使用
   - 适度的模糊半径(stdDeviation="4")平衡效果与性能
   - 适当的动画周期长度，避免过于频繁的重绘
   - 动画属性选择(transform而非width/height)提高渲染性能`
                }
            ]
        }
    ],
    
    // 快速参考
    quickReference: {
        commands: [
            { cmd: "M x y", desc: "移动到指定点（不画线）" },
            { cmd: "L x y", desc: "画直线到指定点" },
            { cmd: "H x", desc: "画水平线到 x 坐标" },
            { cmd: "V y", desc: "画垂直线到 y 坐标" },
            { cmd: "C x1 y1, x2 y2, x y", desc: "三次贝塞尔曲线" },
            { cmd: "Q x1 y1, x y", desc: "二次贝塞尔曲线" },
            { cmd: "S x2 y2, x y", desc: "平滑三次贝塞尔曲线" },
            { cmd: "T x y", desc: "平滑二次贝塞尔曲线" },
            { cmd: "A rx ry rotation large-arc sweep x y", desc: "椭圆弧" },
            { cmd: "Z", desc: "闭合路径" }
        ],
        tips: [
            "大写字母 = 绝对坐标，小写字母 = 相对坐标",
            "相对坐标通常更简洁，特别是重复图案",
            "使用 H/V 命令简化水平/垂直线",
            "复杂路径建议用工具生成后手动优化",
            "动画时注意路径的命令数量要一致",
            "stroke-dasharray 控制虚线样式",
            "stroke-dashoffset 可以创建绘制动画",
            "组合transform可以创建复杂动画效果"
        ]
    }
};
