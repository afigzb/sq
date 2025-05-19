/**
 * FaultTextEffect - 一个创建文字故障效果的自定义元素
 * 使用方法: <fault-text-effect>Your Text</fault-text-effect>
 * 
 * 功能特点:
 * 1. 点击文字时触发故障效果
 * 2. 支持多个文本容器叠加
 * 3. 包含RGB通道分离效果
 * 4. 可自定义动画持续时间和容器数量
 */
class FaultTextEffect extends HTMLElement {
  // ========== 生命周期方法 ==========
  constructor() {
    super();
    // 创建Shadow DOM，实现样式隔离
    this.attachShadow({ mode: 'open' });
    // 动画状态标志
    this.animationActive = false;
    // 绑定方法到实例
    this._bindMethods();
    // 初始化DOM结构
    this._initializeDOM();
  }

  // 组件被添加到DOM时调用
  connectedCallback() {
    this._setDefaultAttributes();
    this._setupContainers();
    this._addEventListeners();
  }

  // 组件从DOM中移除时调用
  disconnectedCallback() {
    this._removeEventListeners();
    this._clearAllTimers();
  }

  // 组件属性变化时调用
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    this._handleAttributeChange(name);
  }

  // ========== 属性定义 ==========
  // 定义需要观察的属性
  static get observedAttributes() {
    return ['container-count', 'animation-duration'];
  }

  // 获取容器数量属性
  get containerCount() {
    return parseInt(this.getAttribute('container-count') || '3', 10);
  }

  // 获取动画持续时间属性
  get animationDuration() {
    return parseInt(this.getAttribute('animation-duration') || '2000', 10);
  }

  // ========== 初始化方法 ==========
  // 绑定方法到实例，确保this指向正确
  _bindMethods() {
    this._handleClick = this._handleClick.bind(this);
    this._handleSlotChange = this._handleSlotChange.bind(this);
  }

  // 设置默认属性值
  _setDefaultAttributes() {
    if (!this.hasAttribute('container-count')) {
      this.setAttribute('container-count', '3');
    }
    if (!this.hasAttribute('animation-duration')) {
      this.setAttribute('animation-duration', '2000');
    }
  }

  // 初始化DOM结构和样式
  _initializeDOM() {
    this.shadowRoot.innerHTML = `
      <style>
        /* 父容器样式 - 用于包裹所有文本效果 */
        .glitch-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          cursor: pointer;
        }

        /* 文本容器样式 - 用于定位和裁剪文本 */
        .text-container {
          position: absolute;
          user-select: none;
          /* 初始裁剪路径，显示完整文本 */
          clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
          transform: translate(-50%, -50%);
          top: 50%;
          left: 50%;
        }

        /* 原始文本样式 - 作为基础显示 */
        .original-text {
          font-weight: bold;
          color: white;
          text-transform: uppercase;
          position: relative;
          z-index: 1;
        }

        /* 通道文本样式 - 用于RGB分离效果 */
        .channel {
          position: absolute;
          top: 0;
          left: 0;
          font-weight: bold;
          text-transform: uppercase;
          mix-blend-mode: screen;
          opacity: 0;
          transition: opacity 0.2s ease;
          z-index: 2;
        }

        /* 红色通道文本样式 - 向左偏移 */
        .red-channel { 
          color: #FF0000;
          transform: translate(-5px, 0);
        }

        /* 蓝色通道文本样式 - 向右偏移 */
        .blue-channel { 
          color: #0000FF;
          transform: translate(5px, 0);
        }

        /* 激活状态下的通道显示 - 控制RGB分离效果的显示 */
        .active .channel { opacity: 1; }
      </style>
      <div class="glitch-wrapper">
        <div class="text-container">
          <div class="original-text">
            <slot></slot>
          </div>
        </div>
      </div>
    `;
    // 保存关键DOM元素的引用
    this.glitchWrapper = this.shadowRoot.querySelector('.glitch-wrapper');
    this.originalContainer = this.shadowRoot.querySelector('.text-container');
  }

  // ========== 事件处理方法 ==========
  // 添加事件监听器
  _addEventListeners() {
    this.glitchWrapper.addEventListener('click', this._handleClick);
    const slot = this.shadowRoot.querySelector('slot');
    slot.addEventListener('slotchange', this._handleSlotChange);
  }

  // 移除事件监听器
  _removeEventListeners() {
    this.glitchWrapper.removeEventListener('click', this._handleClick);
    const slot = this.shadowRoot.querySelector('slot');
    slot.removeEventListener('slotchange', this._handleSlotChange);
  }

  // 处理点击事件 - 触发故障效果
  _handleClick() {
    if (this.animationActive) return;
    this.animationActive = true;
    this._startAllGlitchEffects();
    setTimeout(() => {
      this.animationActive = false;
    }, this.animationDuration);
  }

  // 处理插槽内容变化
  _handleSlotChange() {
    const text = this.textContent.trim();
    this._updateAllContainersText(text);
  }

  // 处理属性变化
  _handleAttributeChange(name) {
    switch (name) {
      case 'container-count':
        if (this.isConnected) {
          this._resetContainers();
        }
        break;
      case 'animation-duration':
        // 动画持续时间改变时不需要重新设置
        break;
    }
  }

  // ========== 容器管理方法 ==========
  // 重置所有容器
  _resetContainers() {
    const containers = this._getAllContainers();
    for (let i = 1; i < containers.length; i++) {
      containers[i].remove();
    }
    this._setupContainers();
  }

  // 设置容器和效果
  _setupContainers() {
    this._duplicateContainers();
    this._setupEffects();
  }

  // 复制文本容器
  _duplicateContainers() {
    const containerCount = this.containerCount;
    const existingContainers = this._getAllContainers();
    
    // 移除多余的容器
    for (let i = 1; i < existingContainers.length; i++) {
      existingContainers[i].remove();
    }
    
    // 创建新的容器
    for (let i = 1; i < containerCount; i++) {
      const newContainer = this.originalContainer.cloneNode(true);
      newContainer.style.transform = 'translate(-50%, -50%)';
      this.glitchWrapper.appendChild(newContainer);
    }
  }

  // 获取所有文本容器
  _getAllContainers() {
    return this.shadowRoot.querySelectorAll('.text-container');
  }

  // 更新所有容器的文本内容
  _updateAllContainersText(text) {
    this._getAllContainers().forEach(container => {
      const originalText = container.querySelector('.original-text');
      const channels = container.querySelectorAll('.channel');
      
      if (originalText) {
        originalText.textContent = text;
      }
      
      channels.forEach(channel => {
        channel.textContent = text;
      });
    });
  }

  // ========== 故障效果方法 ==========
  // 为所有容器设置效果
  _setupEffects() {
    this._getAllContainers().forEach(container => {
      this._setupContainerEffects(container);
    });
  }

  // 为单个容器设置效果
  _setupContainerEffects(container) {
    // 移除现有的通道元素
    const existingChannels = container.querySelectorAll('.channel');
    existingChannels.forEach(channel => channel.remove());
    
    const originalText = container.querySelector('.original-text');
    const text = originalText.textContent;
    
    // 创建RGB通道元素
    const redChannel = this._createChannelElement('red-channel', text);
    const blueChannel = this._createChannelElement('blue-channel', text);
    
    container.appendChild(redChannel);
    container.appendChild(blueChannel);
    
    // 保存通道元素引用和定时器数组
    container.glitchElements = { redChannel, blueChannel };
    container.timers = [];
    container.startGlitchEffect = () => this._startGlitchEffect(container);
  }

  // 启动所有容器的故障效果
  _startAllGlitchEffects() {
    this._getAllContainers().forEach(container => {
      if (container.startGlitchEffect) {
        container.startGlitchEffect();
      }
    });
  }

  // 启动单个容器的故障效果
  _startGlitchEffect(container) {
    const elements = container.glitchElements;
    const timers = container.timers;
    
    container.classList.add('active');
    
    // 设置抖动和裁剪动画
    timers.push(
      setInterval(() => this._updateJitter(container), 50),
      setInterval(() => this._updateClipPath(container), 100)
    );
    
    // 设置效果结束时间
    setTimeout(() => this._stopGlitchEffect(container), this.animationDuration);
  }

  // 停止故障效果
  _stopGlitchEffect(container) {
    const elements = container.glitchElements;
    const timers = container.timers;
    
    container.classList.remove('active');
    timers.forEach(timer => clearInterval(timer));
    container.timers = [];
    
    // 重置容器样式
    container.style.transform = 'translate(-50%, -50%)';
    container.style.clipPath = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';
  }

  // ========== 视觉效果方法 ==========
  // 更新抖动效果
  _updateJitter(container) {
    const jitterX = this._getRandomInt(-30, 30);
    const jitterY = this._getRandomInt(-30, 30);
    container.style.transform = `translate(-50%, -50%) translate(${jitterX}%, ${jitterY}%)`;
  }

  // 更新裁剪路径效果
  _updateClipPath(container) {
    const blockWidth = this._getRandomInt(10, 40);
    const blockHeight = this._getRandomInt(10, 40);
    const blockX = this._getRandomInt(0, 40);
    const blockY = this._getRandomInt(0, 40);
    
    container.style.clipPath = `polygon(
      ${blockX}% ${blockY}%,
      calc(${blockX}% + ${blockWidth}%) ${blockY}%,
      calc(${blockX}% + ${blockWidth}%) calc(${blockY}% + ${blockHeight}%),
      ${blockX}% calc(${blockY}% + ${blockHeight}%)
    )`;
  }

  // ========== 工具方法 ==========
  // 创建通道元素
  _createChannelElement(className, text) {
    const channel = document.createElement('div');
    channel.className = `channel ${className}`;
    channel.textContent = text;
    return channel;
  }

  // 清除所有定时器
  _clearAllTimers() {
    this._getAllContainers().forEach(container => {
      if (container.timers) {
        container.timers.forEach(timer => clearInterval(timer));
        container.timers = [];
      }
    });
  }

  // 生成随机整数
  _getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

// 注册自定义元素
customElements.define('fault-text-effect', FaultTextEffect); 