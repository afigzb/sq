import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

export class DraggableContainer extends LitElement {
    static styles = css`
        :host {
            display: inline-block;
            position: fixed;
            top: 0;
            left: 0;
            cursor: move;
            user-select: none;
            z-index: 1000;
        }
        
        .position-container {
            position: relative;
            transition: transform 0.1s ease-out;
        }
        
        .position-container.dragging {
            transition: none;
        }
        
        .content-wrapper {
            position: absolute;
            top: 0;
            left: 0;
        }
    `;

    static properties = {
        isDragging: { type: Boolean, state: true },
        isInertia: { type: Boolean, state: true },
        x: { type: Number, state: true },
        y: { type: Number, state: true }
    };

    constructor() {
        super();
        this.isDragging = false;
        this.isInertia = false;
        this.x = 0;
        this.y = 0;
        
        // 拖拽相关
        this.startPos = { x: 0, y: 0 };
        this.initialPos = { x: 0, y: 0 };
        this.velocity = { x: 0, y: 0 };
        this.lastPos = { x: 0, y: 0 };
        this.lastTime = 0;
        
        // 拖拽检测
        this.hasDragged = false;
        this.dragThreshold = 5;
        this.preventClickTimeout = null;
        
        // 惯性参数
        this.DECELERATION = 0.95;
        this.MIN_VELOCITY = 0.5;
        this.VELOCITY_SCALE = 0.15;

        // 绑定事件
        this.bindEvents();
    }

    bindEvents() {
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleSelectStart = this.handleSelectStart.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    firstUpdated() {
        this.addEventListener('mousedown', this.handleMouseDown);
        this.addEventListener('selectstart', this.handleSelectStart);
        this.addEventListener('click', this.handleClick, true);
        document.addEventListener('mousemove', this.handleMouseMove);
        document.addEventListener('mouseup', this.handleMouseUp);
        this.updatePosition();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        document.removeEventListener('mousemove', this.handleMouseMove);
        document.removeEventListener('mouseup', this.handleMouseUp);
        if (this.preventClickTimeout) {
            clearTimeout(this.preventClickTimeout);
        }
    }

    getContentDimensions() {
        const contentWrapper = this.shadowRoot.querySelector('.content-wrapper');
        if (contentWrapper) {
            const rect = contentWrapper.getBoundingClientRect();
            return { width: rect.width, height: rect.height };
        }
        const hostRect = this.getBoundingClientRect();
        return { width: hostRect.width, height: hostRect.height };
    }

    getBoundaryLimits() {
        const { width, height } = this.getContentDimensions();
        return {
            maxX: Math.max(0, window.innerWidth - width),
            maxY: Math.max(0, window.innerHeight - height)
        };
    }

    updatePosition() {
        const container = this.shadowRoot.querySelector('.position-container');
        if (container) {
            container.style.transform = `translate(${this.x}px, ${this.y}px)`;
        }
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
        this.updatePosition();
    }

    constrainPosition(x, y) {
        const { maxX, maxY } = this.getBoundaryLimits();
        return {
            x: Math.max(0, Math.min(x, maxX)),
            y: Math.max(0, Math.min(y, maxY))
        };
    }

    updateVelocity(clientX, clientY) {
        const currentTime = Date.now();
        const timeDelta = currentTime - this.lastTime;
        
        if (timeDelta > 0) {
            this.velocity.x = (clientX - this.lastPos.x) / timeDelta * 16;
            this.velocity.y = (clientY - this.lastPos.y) / timeDelta * 16;
        }
        
        this.lastPos.x = clientX;
        this.lastPos.y = clientY;
        this.lastTime = currentTime;
    }

    toggleDraggingClass(add) {
        const container = this.shadowRoot.querySelector('.position-container');
        if (container) {
            container.classList.toggle('dragging', add);
        }
    }

    handleMouseDown(e) {
        this.isDragging = true;
        this.isInertia = false;
        this.hasDragged = false;
        
        this.startPos.x = e.clientX;
        this.startPos.y = e.clientY;
        this.initialPos.x = this.x;
        this.initialPos.y = this.y;
        
        this.lastPos.x = e.clientX;
        this.lastPos.y = e.clientY;
        this.lastTime = Date.now();
        this.velocity.x = 0;
        this.velocity.y = 0;
        
        this.toggleDraggingClass(true);
        e.preventDefault();
    }

    handleMouseMove(e) {
        if (!this.isDragging) return;
        
        const deltaX = e.clientX - this.startPos.x;
        const deltaY = e.clientY - this.startPos.y;
        
        // 检查拖拽阈值
        if (Math.sqrt(deltaX * deltaX + deltaY * deltaY) > this.dragThreshold) {
            this.hasDragged = true;
        }
        
        // 更新位置
        const newPos = this.constrainPosition(
            this.initialPos.x + deltaX,
            this.initialPos.y + deltaY
        );
        
        this.x = newPos.x;
        this.y = newPos.y;
        this.updatePosition();
        
        this.updateVelocity(e.clientX, e.clientY);
    }

    handleMouseUp() {
        if (!this.isDragging) return;
        
        this.isDragging = false;
        this.toggleDraggingClass(false);
        
        if (this.hasDragged) {
            this.preventClickEvents();
            
            // 应用速度缩放并开始惯性
            this.velocity.x *= this.VELOCITY_SCALE;
            this.velocity.y *= this.VELOCITY_SCALE;
            
            if (Math.abs(this.velocity.x) > this.MIN_VELOCITY || 
                Math.abs(this.velocity.y) > this.MIN_VELOCITY) {
                this.isInertia = true;
                this.inertiaAnimation();
            }
        }
    }

    preventClickEvents() {
        if (this.preventClickTimeout) {
            clearTimeout(this.preventClickTimeout);
        }
        this.preventClickTimeout = setTimeout(() => {
            this.hasDragged = false;
        }, 100);
    }

    handleClick(e) {
        if (this.hasDragged) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            return false;
        }
    }

    inertiaAnimation() {
        if (!this.isInertia) return;
        
        const newPos = this.constrainPosition(
            this.x + this.velocity.x,
            this.y + this.velocity.y
        );
        
        // 碰到边界时停止对应方向的速度
        if (newPos.x !== this.x + this.velocity.x) this.velocity.x = 0;
        if (newPos.y !== this.y + this.velocity.y) this.velocity.y = 0;
        
        this.x = newPos.x;
        this.y = newPos.y;
        this.updatePosition();
        
        // 应用减速
        this.velocity.x *= this.DECELERATION;
        this.velocity.y *= this.DECELERATION;
        
        // 检查是否停止
        if (Math.abs(this.velocity.x) < this.MIN_VELOCITY && 
            Math.abs(this.velocity.y) < this.MIN_VELOCITY) {
            this.isInertia = false;
            this.velocity.x = 0;
            this.velocity.y = 0;
            return;
        }
        
        requestAnimationFrame(() => this.inertiaAnimation());
    }

    handleSelectStart(e) {
        e.preventDefault();
    }

    render() {
        return html`
            <div class="position-container">
                <div class="content-wrapper">
                    <slot></slot>
                </div>
            </div>
        `;
    }
}

customElements.define('draggable-container', DraggableContainer);