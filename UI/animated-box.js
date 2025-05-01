import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

export class AnimatedBox extends LitElement {
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
      transition: transform 0.3s ease-out;
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

  static properties = {
    isHovering: { type: Boolean }
  };

  constructor() {
    super();
    this.isHovering = false;
    this._elements = {};
    this._resizeObserver = null;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
    }
  }

  firstUpdated() {
    this._initializeElements();
    this._setupResizeObserver();
    this._setupEventListeners();
    this.resetPosition();
  }

  _initializeElements() {
    this._elements = {
      triggerBox: this.shadowRoot.querySelector('.trigger-box'),
      movingBox: this.shadowRoot.querySelector('.moving-box'),
      movingBoxTop: this.shadowRoot.querySelector('.moving-box-top'),
      movingBoxBottom: this.shadowRoot.querySelector('.moving-box-bottom')
    };
  }

  _setupResizeObserver() {
    this._resizeObserver = new ResizeObserver(() => {
      const { triggerBox, movingBoxTop, movingBoxBottom } = this._elements;
      const height = triggerBox.offsetHeight;
      movingBoxTop.style.height = `${height}px`;
      movingBoxBottom.style.height = `${height}px`;
      this.resetPosition();
    });

    this._resizeObserver.observe(this._elements.triggerBox);
  }

  _setupEventListeners() {
    const { triggerBox } = this._elements;
    triggerBox.addEventListener('mouseenter', () => this.handleMouseEnter());
    triggerBox.addEventListener('mouseleave', () => this.handleMouseLeave());
  }

  resetPosition() {
    const { movingBox, triggerBox } = this._elements;
    const triggerHeight = triggerBox.offsetHeight;
    const movingHeight = movingBox.offsetHeight;

    movingBox.style.transition = 'none';
    movingBox.style.transform = `translate(0px, ${(triggerHeight + movingHeight) / 2}px)`;
    movingBox.offsetHeight; // Force reflow
    movingBox.style.transition = 'transform 0.3s ease';
  }

  handleMouseEnter() {
    if (this.isHovering) return;
    this.isHovering = true;
    
    this.resetPosition();
    
    setTimeout(() => {
      this._elements.movingBox.style.transform = 'translate(0px, 0px)';
    }, 50);
  }

  handleMouseLeave() {
    if (!this.isHovering) return;
    this.isHovering = false;
    
    const { movingBox, triggerBox } = this._elements;
    const triggerHeight = triggerBox.offsetHeight;
    const movingHeight = movingBox.offsetHeight;
    
    movingBox.style.transform = `translate(0px, -${(movingHeight + triggerHeight) / 2}px)`;
    
    setTimeout(() => {
      this.resetPosition();
    }, 300);
  }

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

customElements.define('animated-box', AnimatedBox); 