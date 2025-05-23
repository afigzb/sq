# SlidingDamping Web Component

一个基于Lit的平滑滚动与阻尼效果的Web Component。

## 功能特点

- 使用CSS transform实现平滑滚动，而不是改变scrollTop
- 通过requestAnimationFrame实现平滑动画
- 使用阻尼系数实现滚动减速效果
- 同时支持鼠标滚轮和触摸事件
- 适配不同设备和屏幕尺寸

## 使用方法

### 导入

在HTML文件中直接使用CDN导入Lit和组件：

```html
<script type="module">
    // 导入Lit
    import { LitElement, html, css } from 'https://cdn.jsdelivr.net/npm/lit@2.8.0/index.js?module';
    // 导入组件
    import './path/to/SlidingDamping.js';
</script>
```

### 基本用法

```html
<sliding-damping>
  <div>第一部分内容</div>
  <div>第二部分内容</div>
  <div>第三部分内容</div>
</sliding-damping>
```

### 带参数的用法

```html
<sliding-damping 
  damping="0.05" 
  touch-damping="0.2" 
  limit-speed="80">
  <div>自定义内容...</div>
</sliding-damping>
```

## 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| damping | Number | 0.03 | 鼠标滚轮阻尼系数，控制滚动速度衰减的快慢，值越小滚动越慢 |
| touchDamping | Number | 0.15 | 触摸设备的阻尼系数，通常比鼠标滚轮大，提供更快的响应 |
| limitSpeed | Number | 100 | 最大滚动速度限制，防止滚动过快 |

## 样式定制

组件内部使用Shadow DOM，可以通过CSS变量或::slotted选择器来定制样式：

```css
/* 定制子内容样式 */
sliding-damping::slotted(div) {
  min-height: 50vh;
  background-color: #f5f5f5;
}
```

## 示例

查看`demo.html`文件了解完整的使用示例。

## 工作原理

组件使用了以下技术原理：

1. 使用`transform: translateY()`来实现内容的滚动位移
2. 使用`requestAnimationFrame`实现平滑的动画效果
3. 应用物理学中的阻尼原理，通过阻尼系数计算位置变化
4. 处理触摸事件和鼠标滚轮事件，适配不同设备
5. 自动调整大小以适应视口变化 