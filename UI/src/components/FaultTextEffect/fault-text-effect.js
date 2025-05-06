/**
 * FaultTextEffect - 一个创建文字故障效果的自定义元素
 * 使用方法: <fault-text-effect>Your Text</fault-text-effect>
 */
class FaultTextEffect extends HTMLElement {
  // ========== 生命周期方法 ==========
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.animationActive = false;
    this._bindMethods();
    this._initializeDOM();
  }

  connectedCallback() {
    this._setDefaultAttributes();
    this._setupContainers();
    this._addEventListeners();
  }

  disconnectedCallback() {
    this._removeEventListeners();
    this._clearAllTimers();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    this._handleAttributeChange(name);
  }

  // ========== 属性定义 ==========
  static get observedAttributes() {
    return ['container-count', 'animation-duration'];
  }

  get containerCount() {
    return parseInt(this.getAttribute('container-count') || '3', 10);
  }

  get animationDuration() {
    return parseInt(this.getAttribute('animation-duration') || '2000', 10);
  }

  // ========== 初始化方法 ==========
  _bindMethods() {
    this._handleClick = this._handleClick.bind(this);
    this._handleSlotChange = this._handleSlotChange.bind(this);
  }

  _setDefaultAttributes() {
    if (!this.hasAttribute('container-count')) {
      this.setAttribute('container-count', '3');
    }
    if (!this.hasAttribute('animation-duration')) {
      this.setAttribute('animation-duration', '2000');
    }
  }

  _initializeDOM() {
    this.shadowRoot.innerHTML = `
      <style>
        /* 父容器样式 */
        .glitch-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          cursor: pointer;
        }

        /* 文本容器样式 */
        .text-container {
          position: absolute;
          user-select: none;
          /* 初始裁剪路径，显示完整文本 */
          clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
          transform: translate(-50%, -50%);
          top: 50%;
          left: 50%;
        }

        /* 原始文本样式 */
        .original-text {
          font-weight: bold;
          color: white;
          text-transform: uppercase;
          position: relative;
          z-index: 1;
        }

        /* 通道文本样式 */
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

        /* 红色通道文本样式 */
        .red-channel { color: #FF0000; }

        /* 蓝色通道文本样式 */
        .blue-channel { color: #0000FF; }

        /* 激活状态下的通道显示 */
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
    this.glitchWrapper = this.shadowRoot.querySelector('.glitch-wrapper');
    this.originalContainer = this.shadowRoot.querySelector('.text-container');
  }

  // ========== 事件处理方法 ==========
  _addEventListeners() {
    this.glitchWrapper.addEventListener('click', this._handleClick);
    const slot = this.shadowRoot.querySelector('slot');
    slot.addEventListener('slotchange', this._handleSlotChange);
  }

  _removeEventListeners() {
    this.glitchWrapper.removeEventListener('click', this._handleClick);
    const slot = this.shadowRoot.querySelector('slot');
    slot.removeEventListener('slotchange', this._handleSlotChange);
  }

  _handleClick() {
    if (this.animationActive) return;
    this.animationActive = true;
    this._startAllGlitchEffects();
    setTimeout(() => {
      this.animationActive = false;
    }, this.animationDuration);
  }

  _handleSlotChange() {
    const text = this.textContent.trim();
    this._updateAllContainersText(text);
  }

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
  _resetContainers() {
    const containers = this._getAllContainers();
    for (let i = 1; i < containers.length; i++) {
      containers[i].remove();
    }
    this._setupContainers();
  }

  _setupContainers() {
    this._duplicateContainers();
    this._setupEffects();
  }

  _duplicateContainers() {
    const containerCount = this.containerCount;
    const existingContainers = this._getAllContainers();
    
    for (let i = 1; i < existingContainers.length; i++) {
      existingContainers[i].remove();
    }
    
    for (let i = 1; i < containerCount; i++) {
      const newContainer = this.originalContainer.cloneNode(true);
      newContainer.style.transform = 'translate(-50%, -50%)';
      this.glitchWrapper.appendChild(newContainer);
    }
  }

  _getAllContainers() {
    return this.shadowRoot.querySelectorAll('.text-container');
  }

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
  _setupEffects() {
    this._getAllContainers().forEach(container => {
      this._setupContainerEffects(container);
    });
  }

  _setupContainerEffects(container) {
    const existingChannels = container.querySelectorAll('.channel');
    existingChannels.forEach(channel => channel.remove());
    
    const originalText = container.querySelector('.original-text');
    const text = originalText.textContent;
    
    const redChannel = this._createChannelElement('red-channel', text);
    const blueChannel = this._createChannelElement('blue-channel', text);
    
    container.appendChild(redChannel);
    container.appendChild(blueChannel);
    
    container.glitchElements = { redChannel, blueChannel };
    container.timers = [];
    container.startGlitchEffect = () => this._startGlitchEffect(container);
  }

  _startAllGlitchEffects() {
    this._getAllContainers().forEach(container => {
      if (container.startGlitchEffect) {
        container.startGlitchEffect();
      }
    });
  }

  _startGlitchEffect(container) {
    const elements = container.glitchElements;
    const timers = container.timers;
    
    container.classList.add('active');
    
    // 设置各种动画效果
    timers.push(
      setInterval(() => {
        if (Math.random() > 0.7) {
          this._updateColorSeparation(elements);
        }
      }, 50),
      setInterval(() => this._updateJitter(container), 50),
      setInterval(() => this._updateClipPath(container), 100)
    );
    
    this._updateColorSeparation(elements);
    
    setTimeout(() => this._stopGlitchEffect(container), this.animationDuration);
  }

  _stopGlitchEffect(container) {
    const elements = container.glitchElements;
    const timers = container.timers;
    
    container.classList.remove('active');
    timers.forEach(timer => clearInterval(timer));
    container.timers = [];
    
    elements.redChannel.style.transform = 'translate(0%, 0%)';
    elements.blueChannel.style.transform = 'translate(0%, 0%)';
    container.style.transform = 'translate(-50%, -50%)';
    container.style.clipPath = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';
  }

  // ========== 视觉效果方法 ==========
  _updateColorSeparation(elements) {
    const redOffsetX = this._getRandomInt(-5, 5);
    const redOffsetY = this._getRandomInt(-5, 5);
    const blueOffsetX = this._getRandomInt(-5, 5);
    const blueOffsetY = this._getRandomInt(-5, 5);
    
    elements.redChannel.style.transform = `translate(${redOffsetX}%, ${redOffsetY}%)`;
    elements.blueChannel.style.transform = `translate(${blueOffsetX}%, ${blueOffsetY}%)`;
  }

  _updateJitter(container) {
    const jitterX = this._getRandomInt(-30, 30);
    const jitterY = this._getRandomInt(-30, 30);
    container.style.transform = `translate(-50%, -50%) translate(${jitterX}%, ${jitterY}%)`;
  }

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
  _createChannelElement(className, text) {
    const channel = document.createElement('div');
    channel.className = `channel ${className}`;
    channel.textContent = text;
    return channel;
  }

  _clearAllTimers() {
    this._getAllContainers().forEach(container => {
      if (container.timers) {
        container.timers.forEach(timer => clearInterval(timer));
        container.timers = [];
      }
    });
  }

  _getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

customElements.define('fault-text-effect', FaultTextEffect); 