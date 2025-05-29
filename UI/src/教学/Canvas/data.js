/**
 * Canvas教学数据模块
 * 支持章节和多个示例的数据结构
 */

import { loadHtmlAsString, createExampleFromFile } from '../../components/TeachingComponents/utils.js';

// 在头部预加载所有HTML文件内容
// 基础教学文件
const overviewHtml = await loadHtmlAsString('../../教学/Canvas/概要.html');
const basicShapesHtml = await loadHtmlAsString('../../教学/Canvas/基础教学/基础形状绘制.html');
const transformHtml = await loadHtmlAsString('../../教学/Canvas/基础教学/变换操作.html');
const pathsHtml = await loadHtmlAsString('../../教学/Canvas/基础教学/路径和曲线.html');
const gradientHtml = await loadHtmlAsString('../../教学/Canvas/基础教学/渐变效果.html');
const textHtml = await loadHtmlAsString('../../教学/Canvas/基础教学/文字渲染.html');
const patternHtml = await loadHtmlAsString('../../教学/Canvas/基础教学/图案填充.html');
const interactiveDrawHtml = await loadHtmlAsString('../../教学/Canvas/基础教学/互动绘图工具.html');
const simpleGameHtml = await loadHtmlAsString('../../教学/Canvas/基础教学/简单游戏.html');
const uiComponentHtml = await loadHtmlAsString('../../教学/Canvas/基础教学/UI组件.html');
const engineeringHtml = await loadHtmlAsString('../../教学/Canvas/基础教学/工程绘图.html');
const financialChartHtml = await loadHtmlAsString('../../教学/Canvas/基础教学/金融图表.html');
const onlineDesignHtml = await loadHtmlAsString('../../教学/Canvas/基础教学/在线设计工具.html');
const dashboardHtml = await loadHtmlAsString('../../教学/Canvas/基础教学/数据仪表板.html');

// 深入教学文件
const cube3DHtml = await loadHtmlAsString('../../教学/Canvas/深入教学/3D立方体旋转.html');
const advancedDrawHtml = await loadHtmlAsString('../../教学/Canvas/深入教学/高级绘图工具.html');
const particleEngineHtml = await loadHtmlAsString('../../教学/Canvas/深入教学/粒子物理引擎.html');
const fluidAnimationHtml = await loadHtmlAsString('../../教学/Canvas/深入教学/流体动画模拟.html');
const realtimeFilterHtml = await loadHtmlAsString('../../教学/Canvas/深入教学/实时滤镜效果.html');
const starFieldHtml = await loadHtmlAsString('../../教学/Canvas/深入教学/星空穿梭效果.html');

// 教学数据
export const canvasTutorialData = {
    title: "🎨 Canvas 完整教学体系",
    description: "从基础到高级的Canvas绘图技能培训平台",
    
    // 教学章节
    chapters: [
        {
            id: 'overview',
            title: 'Canvas概述',
            subtitle: '了解Canvas的基本概念和核心特性',
            examples: [
                {
                    id: 'canvas-overview',
                    title: '什么是Canvas',
                    description: 'Canvas的基本概念、发展历程和核心特性介绍',
                    code: overviewHtml,
                    instructions: `# 🎨 Canvas概述

## 核心概念
- **Canvas元素**: HTML5引入的绘图元素
- **绘图上下文**: 2D和WebGL两种渲染模式
- **像素级控制**: 直接操作像素的绘图方式
- **立即模式**: 无状态的绘图系统设计

## 发展历程
- 2004年: 苹果Safari首次引入
- 2005-2009年: 主流浏览器支持
- 2010年: HTML5标准纳入
- 2010年至今: 技术持续演进

## 核心特性
- 丰富的绘图API
- 硬件加速渲染
- 像素级精确控制
- 跨平台兼容性
- Web生态深度集成
- 移动设备优化

## 应用场景
- 数据可视化
- Web游戏开发
- 创意工具平台
- 交互体验升级
- 实时图像处理`
                }
            ]
        },
        {
            id: 'basic-foundation',
            title: '基础图形绘制',
            subtitle: '掌握Canvas的基本绘图API和图形操作',
            examples: [
                {
                    id: 'basic-shapes',
                    title: '基础形状绘制',
                    description: '学习矩形、圆形等基本图形的绘制方法',
                    code: basicShapesHtml,
                    instructions: `# 🔲 基础形状绘制

## 核心方法
- **fillRect(x, y, width, height)**: 绘制填充矩形
- **strokeRect(x, y, width, height)**: 绘制边框矩形
- **arc(x, y, radius, startAngle, endAngle)**: 绘制圆形和弧形

## 学习重点
1. 理解Canvas坐标系统
2. 掌握基本几何图形API
3. 学会设置填充和描边样式
4. 练习图形组合绘制

## 实际应用
- 绘制图表的基础元素
- 创建简单的界面组件
- 制作装饰性图案`
                },
                {
                    id: 'gradient-effects',
                    title: '渐变效果',
                    description: '创建线性渐变和径向渐变效果',
                    code: gradientHtml,
                    instructions: `# 🌈 渐变效果制作

## 渐变类型
- **线性渐变**: createLinearGradient(x0, y0, x1, y1)
- **径向渐变**: createRadialGradient(x0, y0, r0, x1, y1, r1)

## 设计技巧
1. 合理选择渐变方向
2. 控制颜色过渡节点
3. 创建视觉层次感
4. 避免过度使用

## 应用场景
- 背景装饰设计
- 按钮和界面美化
- 艺术效果创作`
                },
                {
                    id: 'pattern-fill',
                    title: '图案填充',
                    description: '使用图案和纹理填充图形',
                    code: patternHtml,
                    instructions: `# 🎨 图案填充技术

## 图案类型
- **repeat**: 水平和垂直重复
- **repeat-x**: 仅水平重复
- **repeat-y**: 仅垂直重复
- **no-repeat**: 不重复

## 创建步骤
1. 准备图案素材
2. 使用createPattern()方法
3. 应用到fillStyle或strokeStyle
4. 绘制图形应用图案

## 设计要点
- 选择合适的图案尺寸
- 确保图案无缝拼接
- 考虑图案与内容的对比度`
                },
                {
                    id: 'text-rendering',
                    title: '文字渲染',
                    description: '在Canvas中绘制和样式化文字',
                    code: textHtml,
                    instructions: `# ✍️ 文字渲染技术

## 文字绘制方法
- **fillText(text, x, y)**: 填充文字
- **strokeText(text, x, y)**: 描边文字
- **measureText(text)**: 测量文字宽度

## 样式属性
- **font**: 设置字体大小和类型
- **textAlign**: 文字对齐方式
- **textBaseline**: 文字基线位置
- **fillStyle/strokeStyle**: 文字颜色

## 应用技巧
1. 选择合适的字体和大小
2. 确保文字可读性
3. 合理布局文字位置
4. 处理文字换行和溢出`
                }
            ]
        },
        
        {
            id: 'advanced-graphics',
            title: '高级图形技术',
            subtitle: '学习路径、变换和复杂图形绘制',
            examples: [
                {
                    id: 'paths-curves',
                    title: '路径和曲线',
                    description: '使用路径API创建复杂的线条和曲线',
                    code: pathsHtml,
                    instructions: `# 🌊 路径和曲线绘制

## 路径方法
- **beginPath()**: 开始新路径
- **moveTo(x, y)**: 移动画笔位置
- **lineTo(x, y)**: 绘制直线
- **quadraticCurveTo()**: 二次贝塞尔曲线
- **bezierCurveTo()**: 三次贝塞尔曲线
- **closePath()**: 闭合路径

## 曲线控制
1. 理解控制点的作用
2. 掌握曲线参数调整
3. 创建平滑的路径连接
4. 实现复杂的图形轮廓

## 实际应用
- 绘制自然形状
- 创建装饰性元素
- 制作矢量图形`
                },
                {
                    id: 'transform-operations',
                    title: '变换操作',
                    description: '掌握平移、旋转、缩放等变换技术',
                    code: transformHtml,
                    instructions: `# 🔄 图形变换技术

## 变换方法
- **translate(x, y)**: 平移坐标系
- **rotate(angle)**: 旋转坐标系
- **scale(x, y)**: 缩放坐标系
- **transform()**: 自定义变换矩阵

## 状态管理
- **save()**: 保存当前状态
- **restore()**: 恢复之前状态

## 应用技巧
1. 合理使用save/restore
2. 组合多种变换效果
3. 创建动画效果
4. 优化变换性能

## 实际场景
- 图形旋转动画
- 缩放交互效果
- 复杂图形定位`
                }
            ]
        },
        
        {
            id: 'interactive-apps',
            title: '交互式应用',
            subtitle: '构建具有用户交互功能的Canvas应用',
            examples: [
                {
                    id: 'interactive-drawing',
                    title: '互动绘图工具',
                    description: '创建支持鼠标绘制的交互式画板',
                    code: interactiveDrawHtml,
                    instructions: `# 🖌️ 互动绘图工具开发

## 交互核心
- **鼠标事件处理**: mousedown, mousemove, mouseup
- **触摸事件支持**: touchstart, touchmove, touchend
- **坐标转换**: 将屏幕坐标转换为Canvas坐标

## 功能实现
1. 实时绘制轨迹
2. 多种画笔工具
3. 颜色和大小控制
4. 撤销重做功能

## 性能优化
- 减少不必要的重绘
- 使用requestAnimationFrame
- 优化事件处理频率

## 扩展功能
- 保存和加载画作
- 图层管理
- 滤镜效果`
                },
                {
                    id: 'simple-game',
                    title: '简单游戏开发',
                    description: '使用Canvas制作基础的小游戏',
                    code: simpleGameHtml,
                    instructions: `# 🎮 Canvas游戏开发

## 游戏循环
1. **更新逻辑**: 处理游戏状态变化
2. **渲染画面**: 绘制游戏元素
3. **帧率控制**: 使用requestAnimationFrame

## 核心要素
- **碰撞检测**: 判断游戏对象相互作用
- **用户输入**: 键盘和鼠标事件处理
- **游戏状态**: 开始、进行、结束等状态管理
- **得分系统**: 记录和显示游戏成绩

## 开发技巧
1. 模块化代码结构
2. 合理的性能优化
3. 流畅的动画效果
4. 良好的用户体验

## 进阶方向
- 多关卡设计
- 音效集成
- 移动端适配`
                },
                {
                    id: 'ui-components',
                    title: 'UI组件开发',
                    description: '创建可复用的Canvas用户界面组件',
                    code: uiComponentHtml,
                    instructions: `# 🧩 Canvas UI组件开发

## 组件设计原则
- **可复用性**: 创建通用组件
- **可配置性**: 支持参数自定义
- **响应式**: 适应不同尺寸
- **交互性**: 提供用户反馈

## 常见组件
1. **按钮**: 点击响应和视觉反馈
2. **进度条**: 动态进度显示
3. **滑块**: 数值选择控件
4. **图表**: 数据可视化组件

## 开发流程
1. 设计组件接口
2. 实现绘制逻辑
3. 添加交互功能
4. 优化性能表现

## 最佳实践
- 统一的设计语言
- 清晰的状态管理
- 良好的可访问性`
                }
            ]
        },
        
        {
            id: 'data-visualization',
            title: '数据可视化',
            subtitle: '使用Canvas创建专业的图表和数据展示',
            examples: [
                {
                    id: 'engineering-drawing',
                    title: '工程绘图',
                    description: '绘制精确的工程图形和技术图表',
                    code: engineeringHtml,
                    instructions: `# 📐 工程绘图技术

## 精确绘图要求
- **精确坐标**: 使用精确的数学计算
- **标准符号**: 符合工程制图规范
- **比例尺**: 正确的缩放比例
- **标注系统**: 清晰的尺寸标注

## 绘图元素
1. **几何图形**: 直线、圆、椭圆、多边形
2. **技术符号**: 工程标准符号
3. **尺寸标注**: 长度、角度、直径标注
4. **图层管理**: 不同类型元素分层

## 实现技巧
- 使用数学库提高精度
- 建立坐标系统和网格
- 实现捕捉和对齐功能
- 支持缩放和平移操作

## 应用领域
- 机械设计图纸
- 建筑平面图
- 电路原理图`
                },
                {
                    id: 'financial-charts',
                    title: '金融图表',
                    description: '创建股票走势图和金融数据可视化',
                    code: financialChartHtml,
                    instructions: `# 📈 金融图表制作

## 图表类型
- **K线图**: 股票价格走势图
- **折线图**: 价格趋势线
- **柱状图**: 成交量显示
- **技术指标**: MA、MACD、RSI等

## 数据处理
1. **实时数据**: WebSocket数据更新
2. **历史数据**: 大量数据的高效渲染
3. **时间轴**: 准确的时间刻度
4. **数据缩放**: 支持时间范围选择

## 交互功能
- 十字光标跟踪
- 缩放和平移操作
- 数据点提示显示
- 技术指标切换

## 性能优化
- 虚拟化长列表
- 数据采样和简化
- 增量更新机制
- 离屏渲染技术`
                },
                {
                    id: 'online-design-tool',
                    title: '在线设计工具',
                    description: '构建基于Canvas的图形设计应用',
                    code: onlineDesignHtml,
                    instructions: `# 🎨 在线设计工具开发

## 核心功能
- **图形创建**: 基础形状和自定义图形
- **编辑操作**: 选择、移动、调整大小
- **图层管理**: 层级关系和可见性控制
- **样式设置**: 颜色、边框、阴影等

## 高级特性
1. **组合操作**: 图形的组合和分离
2. **对齐工具**: 智能对齐和分布
3. **复制粘贴**: 图形的复制和粘贴
4. **撤销重做**: 操作历史管理

## 用户体验
- 直观的拖拽操作
- 实时预览效果
- 快捷键支持
- 响应式布局

## 扩展方向
- 矢量图形支持
- 文本编辑功能
- 导入导出功能
- 协同编辑能力`
                },
                {
                    id: 'data-dashboard',
                    title: '数据仪表板',
                    description: '创建动态的数据监控和展示面板',
                    code: dashboardHtml,
                    instructions: `# 📊 数据仪表板开发

## 仪表板组件
- **仪表盘**: 圆形进度指示器
- **数字显示**: 大数字指标展示
- **趋势图**: 小型趋势线图表
- **状态指示**: 颜色编码状态显示

## 数据更新
1. **实时数据**: 定时更新机制
2. **动画过渡**: 平滑的数值变化
3. **阈值监控**: 超限报警提示
4. **历史对比**: 历史数据对比

## 视觉设计
- 清晰的信息层次
- 一致的配色方案
- 合适的字体和大小
- 响应式布局适配

## 交互特性
- 数据钻取功能
- 时间范围选择
- 图表类型切换
- 导出和分享功能`
                }
            ]
        },
        
        {
            id: 'advanced-effects',
            title: '高级视觉效果',
            subtitle: '掌握3D效果、动画和复杂视觉特效的实现',
            examples: [
                {
                    id: '3d-cube-rotation',
                    title: '3D立方体旋转',
                    description: '使用2D Canvas模拟3D立方体旋转效果',
                    code: cube3DHtml,
                    instructions: `# 🎲 3D立方体旋转效果

## 3D数学基础
- **三维坐标系**: X、Y、Z轴的理解
- **投影变换**: 3D坐标到2D屏幕的转换
- **旋转矩阵**: 欧拉角和四元数
- **透视投影**: 近大远小的透视效果

## 实现步骤
1. **定义立方体顶点**: 8个顶点的3D坐标
2. **应用旋转变换**: 绕各轴旋转
3. **投影到2D平面**: 计算屏幕坐标
4. **绘制面和边**: 正确的深度排序

## 视觉增强
- 光照和阴影效果
- 材质纹理贴图
- 动画插值优化
- 性能优化技巧

## 扩展应用
- 3D模型查看器
- 虚拟现实预览
- 建筑可视化
- 产品展示`
                },
                {
                    id: 'particle-physics',
                    title: '粒子物理引擎',
                    description: '创建基于物理规律的粒子系统',
                    code: particleEngineHtml,
                    instructions: `# ⚛️ 粒子物理引擎

## 物理概念
- **运动学**: 位置、速度、加速度
- **力的作用**: 重力、风力、摩擦力
- **碰撞检测**: 粒子间和边界碰撞
- **能量守恒**: 动能和势能转换

## 粒子系统
1. **粒子生成**: 发射器和生成规则
2. **生命周期**: 出生、存活、死亡
3. **属性更新**: 位置、速度、颜色、大小
4. **渲染优化**: 批量绘制和层次管理

## 效果类型
- 火焰和爆炸效果
- 烟雾和云朵模拟
- 流水和液体效果
- 雪花和雨滴动画

## 性能优化
- 对象池管理
- 空间分割算法
- GPU加速计算
- 级别细节控制`
                },
                {
                    id: 'fluid-animation',
                    title: '流体动画模拟',
                    description: '模拟流体的流动和交互效果',
                    code: fluidAnimationHtml,
                    instructions: `# 🌊 流体动画模拟

## 流体力学基础
- **流体属性**: 密度、粘度、表面张力
- **运动方程**: 纳维-斯托克斯方程简化
- **边界条件**: 固体边界和自由表面
- **数值方法**: 有限差分和网格计算

## 模拟技术
1. **网格方法**: 规则网格的离散化
2. **粒子方法**: SPH（光滑粒子流体动力学）
3. **混合方法**: 网格和粒子结合
4. **实时简化**: 适合实时渲染的近似

## 视觉效果
- 波浪和水面模拟
- 液体飞溅效果
- 烟雾扩散动画
- 流体交互响应

## 应用场景
- 游戏特效制作
- 科学可视化
- 艺术创作工具
- 教育演示`
                },
                {
                    id: 'realtime-filters',
                    title: '实时滤镜效果',
                    description: '实现图像处理和实时滤镜特效',
                    code: realtimeFilterHtml,
                    instructions: `# 🎭 实时滤镜效果

## 图像处理基础
- **像素操作**: RGBA颜色通道处理
- **卷积核**: 模糊、锐化、边缘检测
- **颜色空间**: RGB、HSV、LAB转换
- **直方图**: 图像统计和调整

## 滤镜类型
1. **基础调整**: 亮度、对比度、饱和度
2. **艺术效果**: 油画、素描、水彩
3. **模糊效果**: 高斯模糊、运动模糊
4. **色彩滤镜**: 复古、黑白、色调分离

## 实时处理
- WebGL着色器加速
- 图像数据缓存
- 分块处理技术
- 预览和全尺寸渲染

## 交互控制
- 滑块参数调节
- 实时预览更新
- 滤镜组合叠加
- 撤销重做功能`
                },
                {
                    id: 'starfield-effect',
                    title: '星空穿梭效果',
                    description: '创建动态的星空穿梭和空间感效果',
                    code: starFieldHtml,
                    instructions: `# 🌟 星空穿梭效果

## 空间错觉原理
- **透视效果**: 近大远小的视觉规律
- **运动模糊**: 高速运动的拖尾效果
- **景深效果**: 远近物体的清晰度差异
- **视差滚动**: 不同层次的移动速度

## 实现技术
1. **星星生成**: 随机分布的3D坐标
2. **透视投影**: Z坐标影响大小和亮度
3. **运动轨迹**: 向前运动的速度感
4. **循环复用**: 星星的生命周期管理

## 视觉增强
- 星星亮度变化
- 色彩渐变效果
- 拖尾和光晕
- 背景星云纹理

## 应用拓展
- 太空游戏背景
- 科幻电影效果
- VR虚拟环境
- 沉浸式体验`
                },
                {
                    id: 'advanced-drawing-tools',
                    title: '高级绘图工具',
                    description: '构建专业级的高级绘图和编辑工具',
                    code: advancedDrawHtml,
                    instructions: `# 🛠️ 高级绘图工具开发

## 专业工具集
- **矢量绘制**: 贝塞尔曲线编辑器
- **路径操作**: 布尔运算和路径合并
- **变形工具**: 自由变换和网格变形
- **精确测量**: 尺寸标注和网格捕捉

## 高级功能
1. **图层系统**: 复杂的图层管理
2. **蒙版工具**: 剪切蒙版和透明度
3. **滤镜系统**: 实时效果预览
4. **脚本支持**: 自动化操作录制

## 性能优化
- 大型画布虚拟化
- 增量渲染技术
- 多线程处理
- GPU加速计算

## 专业特性
- 色彩管理系统
- 印刷输出支持
- 格式兼容性
- 插件扩展架构`
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
