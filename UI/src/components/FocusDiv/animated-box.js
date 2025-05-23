import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

// 动画常量配置，提取到组件外部以便更好地组织
const ANIMATION_CONSTANTS = {
  ENTER: {
    DURATION: 600,  // 进入动画持续时间（毫秒）
    DELAY: 50,      // 进入动画延迟时间（毫秒）
    EASING: 'cubic-bezier(0.5, 0, 0.6, 1)'  // 进入动画缓动函数
  },
  LEAVE: {
    DURATION: 600,  // 离开动画持续时间（毫秒）
    EASING: 'cubic-bezier(0.5, 0, 0.6, 1)'  // 离开动画缓动函数
  },
  QUICK_EXIT: {
    DURATION: 1200,  // 快速退出动画持续时间（毫秒）
    EASING: 'cubic-bezier(0.5, 0, 1, 1)'    // 快速退出动画缓动函数
  },
  STATES: {
    IDLE: 'idle',           // 空闲状态
    ENTER: 'enter',         // 进入状态
    ACTIVE: 'active',       // 激活状态
    LEAVE: 'leave',         // 离开状态
    INTERRUPTED: 'interrupted'  // 中断状态
  }
};

// 动画管理器类，专门处理所有动画相关逻辑
class AnimationManager {
  constructor(elements) {
    this.elements = elements;  // 存储DOM元素引用
    this.animationTimeout = null;  // 动画定时器
  }

  // 清除动画定时器
  clearTimeout() {
    if (this.animationTimeout) {
      clearTimeout(this.animationTimeout);
      this.animationTimeout = null;
    }
  }

  // 设置CSS过渡效果
  setTransition(transitionValue) {
    this.elements.movingBox.style.transition = transitionValue;
  }

  // 获取当前元素的变换矩阵
  getCurrentTransform() {
    const { movingBox } = this.elements;
    const transform = window.getComputedStyle(movingBox).transform;
    
    if (transform && transform !== 'none') {
      try {
        const matrix = transform.match(/matrix.*\((.+)\)/)[1].split(', ');
        return {
          x: parseFloat(matrix[4] || 0),
          y: parseFloat(matrix[5] || 0)
        };
      } catch (e) {
        return { x: 0, y: 0 };
      }
    }
    return { x: 0, y: 0 };
  }

  // 设置初始位置
  setInitialPosition() {
    const { movingBox, triggerBox } = this.elements;
    const triggerHeight = triggerBox.offsetHeight;
    const movingHeight = movingBox.offsetHeight;
    const initialY = (triggerHeight + movingHeight) / 2;
    
    this.setTransition('none');
    movingBox.style.transform = `translate(0px, ${initialY}px)`;
    movingBox.offsetHeight; // 强制重排
  }

  // 执行进入动画
  enterAnimation(callback) {
    this.clearTimeout();
    
    const { movingBox } = this.elements;
    const C = ANIMATION_CONSTANTS;
    
    this.setInitialPosition();
    this.setTransition(`transform ${C.ENTER.DURATION}ms ${C.ENTER.EASING}`);
    
    this.animationTimeout = setTimeout(() => {
      movingBox.style.transform = 'translate(0px, 0px)';
      if (callback) callback(C.STATES.ACTIVE);
    }, C.ENTER.DELAY);
  }

  // 执行离开动画
  leaveAnimation(callback) {
    this.clearTimeout();
    
    const { movingBox, triggerBox } = this.elements;
    const triggerHeight = triggerBox.offsetHeight;
    const movingHeight = movingBox.offsetHeight;
    const C = ANIMATION_CONSTANTS;
    
    this.setTransition(`transform ${C.LEAVE.DURATION}ms ${C.LEAVE.EASING}`);
    movingBox.style.transform = `translate(0px, -${(movingHeight + triggerHeight) / 2}px)`;
    
    this.animationTimeout = setTimeout(() => {
      if (callback) callback(C.STATES.IDLE);
    }, C.LEAVE.DURATION);
  }

  // 执行中断动画（快速退出）
  interruptedAnimation(callback) {
    this.clearTimeout();
    
    const { movingBox, triggerBox } = this.elements;
    const triggerHeight = triggerBox.offsetHeight;
    const movingHeight = movingBox.offsetHeight;
    const C = ANIMATION_CONSTANTS;
    
    const currentPosition = this.getCurrentTransform();
    this.setTransition(`transform ${C.QUICK_EXIT.DURATION}ms ${C.QUICK_EXIT.EASING}`);
    
    const exitY = currentPosition.y < 0 
      ? -((movingHeight + triggerHeight) / 2)
      : ((movingHeight + triggerHeight) / 2);
      
    movingBox.style.transform = `translate(0px, ${exitY}px)`;
    
    this.animationTimeout = setTimeout(() => {
      if (callback) callback(C.STATES.IDLE);
    }, C.QUICK_EXIT.DURATION);
  }
}

// 动画盒子组件
export class AnimatedBox extends LitElement {
  // 获取动画常量
  static get CONSTANTS() {
    return ANIMATION_CONSTANTS;
  }

  // 组件样式
  static styles = css`
    .trigger-box {
      overflow: hidden;
      position: relative;
      background: white;
      border-radius: 4px;
      border: 2px solid #e5e7eb;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 8px 16px;
      min-width: 96px;
      min-height: 32px;
    }

    .moving-box {
      position: absolute;
      pointer-events: none;
      left: 0;
      right: 0;
    }

    .moving-box-top,
    .moving-box-bottom {
      background: black;
      width: 100%;
    }

    .moving-box-top {
      border-top-left-radius: 50% 50%;
      border-top-right-radius: 50% 50%;
    }

    .moving-box-bottom {
      border-bottom-left-radius: 50% 50%;
      border-bottom-right-radius: 50% 50%;
    }
  `;

  // 组件属性定义
  static properties = {
    animationState: { type: String }  // 动画状态
  };

  constructor() {
    super();
    this.animationState = ANIMATION_CONSTANTS.STATES.IDLE;  // 初始状态为空闲
    this._elements = {};  // 存储DOM元素引用
    this._resizeObserver = null;  // 尺寸观察器
    this._animationManager = null;  // 动画管理器
  }

  // 组件断开连接时清理资源
  disconnectedCallback() {
    super.disconnectedCallback();
    this._cleanup();
  }

  // 清理资源
  _cleanup() {
    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
      this._resizeObserver = null;
    }
    
    if (this._animationManager) {
      this._animationManager.clearTimeout();
    }
  }

  // 组件首次更新时初始化
  firstUpdated() {
    this._initializeElements();
    this._initializeAnimationManager();
    this._setupResizeObserver();
    this._setupEventListeners();
    this._setInitialPosition();
  }

  // 初始化DOM元素引用
  _initializeElements() {
    this._elements = {
      triggerBox: this.shadowRoot.querySelector('.trigger-box'),
      movingBox: this.shadowRoot.querySelector('.moving-box'),
      movingBoxTop: this.shadowRoot.querySelector('.moving-box-top'),
      movingBoxBottom: this.shadowRoot.querySelector('.moving-box-bottom')
    };
  }

  // 初始化动画管理器
  _initializeAnimationManager() {
    this._animationManager = new AnimationManager(this._elements);
  }

  // 设置尺寸观察器
  _setupResizeObserver() {
    this._resizeObserver = new ResizeObserver(() => {
      this._updateBoxHeights();
      this._setInitialPosition();
    });

    this._resizeObserver.observe(this._elements.triggerBox);
  }

  // 更新盒子高度
  _updateBoxHeights() {
    const { triggerBox, movingBoxTop, movingBoxBottom } = this._elements;
    const height = triggerBox.offsetHeight;
    movingBoxTop.style.height = `${height}px`;
    movingBoxBottom.style.height = `${height}px`;
  }

  // 设置事件监听器
  _setupEventListeners() {
    const { triggerBox } = this._elements;
    triggerBox.addEventListener('mouseenter', this._handleMouseEnter.bind(this));
    triggerBox.addEventListener('mouseleave', this._handleMouseLeave.bind(this));
  }

  // 设置初始位置
  _setInitialPosition() {
    this._animationManager.setInitialPosition();
  }

  // 应用动画
  _applyAnimation(state) {
    const C = ANIMATION_CONSTANTS.STATES;
    const updateState = (newState) => {
      this.animationState = newState;
    };
    
    switch (state) {
      case C.ENTER:
        this._animationManager.enterAnimation(updateState);
        break;
        
      case C.LEAVE:
        this._animationManager.leaveAnimation(updateState);
        break;
        
      case C.INTERRUPTED:
        this._animationManager.interruptedAnimation(updateState);
        break;
    }
  }

  // 处理鼠标进入事件
  _handleMouseEnter() {
    const C = ANIMATION_CONSTANTS.STATES;
    
    if (this.animationState === C.ENTER || this.animationState === C.ACTIVE) {
      return;
    }
    
    this.animationState = C.ENTER;
    this._applyAnimation(this.animationState);
  }

  // 处理鼠标离开事件
  _handleMouseLeave() {
    const C = ANIMATION_CONSTANTS.STATES;
    
    if (this.animationState === C.ACTIVE) {
      this.animationState = C.LEAVE;
      this._applyAnimation(this.animationState);
    } 
    else if (this.animationState === C.ENTER) {
      this.animationState = C.INTERRUPTED;
      this._applyAnimation(this.animationState);
    }
  }

  // 属性更新时触发
  updated(changedProperties) {
    if (changedProperties.has('animationState')) {
      this._applyAnimation(this.animationState);
    }
  }

  // 渲染组件
  render() {
    return html`
      <div class="trigger-box">
        <slot></slot>
        <div class="moving-box">
          <div class="moving-box-top"></div>
          <div class="moving-box-bottom"></div>
        </div>
      </div>
    `;
  }
}

// 注册自定义元素
customElements.define('animated-box', AnimatedBox);