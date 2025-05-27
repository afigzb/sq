/**
 * SlidingDamping 组件 - 一个带有阻尼效果的平滑滚动组件
 * 这是滚动阻尼组件，组件库里没有，我闲着没事干写着玩的
 * 主要功能：
 * 1. 实现平滑的滚动效果，带有物理阻尼感
 * 2. 支持鼠标滚轮和触摸屏操作
 * 3. 自适应不同设备类型
 * 4. 可配置的阻尼参数
 */
export class SlidingDamping extends HTMLElement {
  // 定义组件的可观察属性
  static get observedAttributes() {
    return ['damping', 'touch-damping', 'limit-speed'];
  }

  constructor() {
    super();
    
    // 创建 Shadow DOM
    this.attachShadow({ mode: 'open' });
    
    // 添加样式
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          position: relative;
          width: 100%;
          height: 100%;
        }
        
        /* 滚动容器：固定定位，作为视口，用于限制内容显示区域 */
        .smooth-scroll-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        /* 内容包装器：绝对定位，通过transform实现滚动效果 */
        .content-wrapper {
          position: absolute;
          width: 100%;
          will-change: transform; /* 提示浏览器该元素会频繁变化，优化性能 */
        }

        /* 默认的内容区块样式 */
        ::slotted(*) {
          min-height: 100vh;
          width: 100%;
        }
      </style>
      <div class="smooth-scroll-container" id="scrollContainer">
        <div class="content-wrapper" id="content">
          <slot></slot>
        </div>
      </div>
    `;

    // 默认配置参数
    this.damping = 0.03;      // 鼠标滚轮的阻尼系数，值越小滚动越平滑
    this.touchDamping = 0.15; // 触摸设备的阻尼系数，值越大响应越快
    this.limitSpeed = 100;    // 最大滚动速度限制，防止滚动过快

    // 状态变量
    this.currentY = 0;        // 当前实际位置
    this.targetY = 0;         // 目标位置
    this.viewHeight = 0;      // 视口高度
    this.lastY = 0;           // 上一帧的触摸位置
    this.isDragging = false;  // 是否正在拖动
    this.startY = 0;          // 触摸开始位置
    this.isMobile = 'ontouchstart' in window; // 检测是否为移动设备
    
    // 绑定方法到实例，确保this指向正确
    this._render = this._render.bind(this);
    this._onWheel = this._onWheel.bind(this);
    this._onTouchStart = this._onTouchStart.bind(this);
    this._onTouchMove = this._onTouchMove.bind(this);
    this._onTouchEnd = this._onTouchEnd.bind(this);
    this._resize = this._resize.bind(this);
  }

  // 属性变化时的回调
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    
    switch (name) {
      case 'damping':
        this.damping = parseFloat(newValue) || 0.03;
        break;
      case 'touch-damping':
        this.touchDamping = parseFloat(newValue) || 0.15;
        break;
      case 'limit-speed':
        this.limitSpeed = parseInt(newValue) || 100;
        break;
    }
  }

  // 获取可滚动内容的总高度
  get scrollHeight() {
    return this.contentEl ? this.contentEl.scrollHeight : 0;
  }

  // 组件被添加到DOM时调用
  connectedCallback() {
    // 获取DOM元素引用
    this.contentEl = this.shadowRoot.getElementById('content');
    this.containerEl = this.shadowRoot.getElementById('scrollContainer');
    
    // 初始化尺寸和事件监听
    this._resize();
    window.addEventListener('resize', this._resize);
    
    // 绑定事件处理器
    this.containerEl.addEventListener('wheel', this._onWheel, { passive: false });
    this.containerEl.addEventListener('touchstart', this._onTouchStart, { passive: false });
    this.containerEl.addEventListener('touchmove', this._onTouchMove, { passive: false });
    this.containerEl.addEventListener('touchend', this._onTouchEnd);
    
    // 启动渲染循环
    requestAnimationFrame(this._render);
  }

  // 组件从DOM中移除时调用
  disconnectedCallback() {
    // 清理事件监听器，防止内存泄漏
    window.removeEventListener('resize', this._resize);
    
    if (this.containerEl) {
      this.containerEl.removeEventListener('wheel', this._onWheel);
      this.containerEl.removeEventListener('touchstart', this._onTouchStart);
      this.containerEl.removeEventListener('touchmove', this._onTouchMove);
      this.containerEl.removeEventListener('touchend', this._onTouchEnd);
    }
  }

  _resize() {
    // 更新视口尺寸信息
    this.viewHeight = window.innerHeight;
    
    // 确保滚动位置在有效范围内
    const maxScroll = Math.max(0, this.scrollHeight - this.viewHeight);
    this.targetY = Math.max(0, Math.min(this.targetY, maxScroll));
    this.currentY = this.targetY;
    
    this._updatePosition();
  }
  
  _onWheel(e) {
    e.preventDefault();
    
    // 处理鼠标滚轮事件
    const wheelDirection = Math.sign(e.deltaY); // 获取滚动方向
    const scrollStep = Math.min(Math.abs(e.deltaY), this.limitSpeed) * wheelDirection;
    
    // 更新目标位置，并确保在有效范围内
    this.targetY += scrollStep;
    const maxScroll = Math.max(0, this.scrollHeight - this.viewHeight);
    this.targetY = Math.max(0, Math.min(this.targetY, maxScroll));
  }
  
  _onTouchStart(e) {
    // 处理触摸开始事件
    this.isDragging = true;
    this.startY = e.touches[0].clientY;
    this.lastY = this.startY;
  }
  
  _onTouchMove(e) {
    if (!this.isDragging) return;
    e.preventDefault();
    
    // 处理触摸移动事件
    const y = e.touches[0].clientY;
    const delta = this.lastY - y;
    
    // 更新目标位置，放大移动效果使滚动更流畅
    this.targetY += delta * 1.5;
    const maxScroll = Math.max(0, this.scrollHeight - this.viewHeight);
    this.targetY = Math.max(0, Math.min(this.targetY, maxScroll));
    
    this.lastY = y;
  }
  
  _onTouchEnd() {
    // 处理触摸结束事件
    this.isDragging = false;
  }
  
  _updatePosition() {
    // 根据设备类型和状态选择阻尼系数
    const damping = this.isMobile && this.isDragging ? this.touchDamping : this.damping;
    
    // 使用阻尼系数计算新的位置，实现平滑过渡
    this.currentY += (this.targetY - this.currentY) * damping;
    
    // 更新元素位置
    if (this.contentEl) {
      this.contentEl.style.transform = `translateY(${-this.currentY}px)`;
    }
  }
  
  _render() {
    // 动画循环：持续更新位置，实现平滑滚动效果
    this._updatePosition();
    requestAnimationFrame(this._render);
  }
}

// 注册自定义元素
customElements.define('sliding-damping', SlidingDamping); 