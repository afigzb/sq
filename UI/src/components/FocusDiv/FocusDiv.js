import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

/**
 * DragFollow 组件
 * 实现了一个带有回弹效果的拖拽跟随效果
 * 使用胡克定律(F = -kx)和阻尼力(F = -bv)模拟物理回弹
 */
class DragFollow extends LitElement {
    // 组件属性定义
    static properties = {
        maxOffset: { type: Number },      // 最大偏移距离
        followSpeed: { type: Number },    // 跟随速度
        xCoefficient: { type: Number },   // X轴系数
        yCoefficient: { type: Number },   // Y轴系数
        springConstant: { type: Number }, // 弹簧系数k
        dampingFactor: { type: Number },  // 阻尼系数b
        maxBounceTimes: { type: Number }, // 最大回弹次数
        bounceThreshold: { type: Number } // 回弹停止阈值
    };

    // 组件样式定义
    static styles = css`
        :host {
            display: inline-block;
            position: relative;
        }
        .container {
            will-change: transform;        // 优化性能，提示浏览器即将进行变换
            transform: translate3d(0, 0, 0);
            cursor: pointer;
            position: relative;
            z-index: 1;
            --translate-x: 0px;           // CSS变量用于动态更新位置
            --translate-y: 0px;
            transform: translate3d(var(--translate-x), var(--translate-y), 0);
        }
    `;

    constructor() {
        super();
        this.initializeProperties();
        this.initializeState();
    }

    /**
     * 初始化组件属性
     * 设置默认值和常量
     */
    initializeProperties() {
        this.maxOffset = 50;              // 最大偏移距离
        this.followSpeed = 0.05;          // 跟随速度
        this.springConstant = 0.8;        // 弹簧系数，控制回弹速度
        this.dampingFactor = 0.3;         // 阻尼系数，控制衰减速度
        this.maxBounceTimes = 3;          // 最大回弹次数
        this.bounceThreshold = 0.5;       // 回弹停止阈值
        this.MIN_MOVEMENT_THRESHOLD = 0.05; // 最小移动阈值，防止微小抖动
        this.mouseMoveThrottleTime = 16;  // 鼠标移动节流时间（约60fps）
    }

    /**
     * 初始化组件状态
     * 设置所有状态变量的初始值
     */
    initializeState() {
        this.state = {
            position: { x: 0, y: 0 },     // 当前位置
            target: { x: 0, y: 0 },       // 目标位置
            velocity: { x: 0, y: 0 },     // 当前速度
            lastVelocity: { x: 0, y: 0 }, // 上一帧速度（用于检测方向改变）
            isAnimating: false,           // 是否正在动画
            isBouncing: false,            // 是否正在回弹
            bounceCount: 0,               // 回弹次数
            lastFrameTime: 0              // 上一帧时间
        };
        this.lastAppliedPosition = { x: 0, y: 0 }; // 最后应用的位置
        this.animationFrameId = null;     // 动画帧ID
    }

    /**
     * 组件首次更新后的初始化
     */
    firstUpdated() {
        this.initializeContainer();
        this.setupDragEffect();
    }

    /**
     * 初始化容器元素
     * 设置容器引用和计算系数
     */
    initializeContainer() {
        const container = this.shadowRoot.querySelector('.container');
        this.container = container;

        // 计算宽高比以调整Y轴系数
        const rect = this.container.getBoundingClientRect();// 获取元素的布局信息
        const aspectRatio = rect.width / rect.height;// 计算宽高比

        // 用于计算悬停时容器x y轴方向的偏移速度
        this.xCoefficient = this.xCoefficient ?? 1;
        this.yCoefficient = this.yCoefficient ?? aspectRatio;
    }

    /**
     * 设置拖拽效果
     */
    setupDragEffect() {
        this.setupEventListeners();
    }

    /**
     * 设置事件监听器
     */
    setupEventListeners() {
        // 节流调用悬停事件处理方法
        this.throttledMouseMove = this.throttle(this.handleMouseMove.bind(this), this.mouseMoveThrottleTime);
        this.container.addEventListener('mousemove', this.throttledMouseMove);
        this.container.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
        
        // 用于离开页面时重置状态
        document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this));
    }

    /**
     * 物理计算相关方法
     * 用矢量来表示力
     */

    /**
     * 计算弹簧力 F = -kx
     * @param {Object} position - 当前位置
     * @returns {Object} 弹簧力
     */
    calculateSpringForce(position) {
        return {
            x: -this.springConstant * position.x,
            y: -this.springConstant * position.y
        };
    }

    /**
     * 计算阻尼力 F = -bv
     * @param {Object} velocity - 当前速度
     * @returns {Object} 阻尼力
     */
    calculateDampingForce(velocity) {
        return {
            x: -this.dampingFactor * velocity.x,
            y: -this.dampingFactor * velocity.y
        };
    }

    /**
     * 计算合力（弹簧力 + 阻尼力）
     * @param {Object} position - 当前位置
     * @param {Object} velocity - 当前速度
     * @returns {Object} 合力
     */
    calculateTotalForce(position, velocity) {
        const springForce = this.calculateSpringForce(position);
        const dampingForce = this.calculateDampingForce(velocity);
        return {
            x: springForce.x + dampingForce.x,
            y: springForce.y + dampingForce.y
        };
    }

    /**
     * 更新物理状态
     * 根据力和时间更新速度和位置
     * @param {number} deltaTime - 时间增量
     */
    updatePhysics(deltaTime) {
        const totalForce = this.calculateTotalForce(this.state.position, this.state.velocity);
        
        // 更新速度 (F = ma, 假设质量m=1，有F=a) F*deltaTime 表示力在时间增量内的累积效果
        this.state.velocity.x += totalForce.x * deltaTime;
        this.state.velocity.y += totalForce.y * deltaTime;

        // v*deltaTime 表示速度在时间增量内的累积效果
        this.state.position.x += this.state.velocity.x * deltaTime;
        this.state.position.y += this.state.velocity.y * deltaTime;
    }

    /**
     * 动画相关方法
     */

    /**
     * 处理回弹动画
     * 更新物理状态并检查是否需要停止
     */
    handleBounceAnimation() {
        if (!this.state.isBouncing) return;

        // 当前时间-上一帧时间获取时间增量
        const currentTime = performance.now();
        const deltaTime = (currentTime - this.state.lastFrameTime) / 100;// 受限于浏览器性能和帧率影响
        this.state.lastFrameTime = currentTime;

        // 更新物理状态
        this.updatePhysics(deltaTime);
        this.updateDOMPosition();

        // 计算速度方向是否改变
        const velocityChanged = 
            (this.state.velocity.x * this.state.lastVelocity?.x < 0) ||
            (this.state.velocity.y * this.state.lastVelocity?.y < 0);

        if (velocityChanged) {
            this.state.bounceCount++;
        }

        this.state.lastVelocity = { ...this.state.velocity };

        // 计算总能量
        const totalEnergy = Math.sqrt(
            Math.pow(this.state.position.x, 2) + 
            Math.pow(this.state.position.y, 2) +
            Math.pow(this.state.velocity.x, 2) + 
            Math.pow(this.state.velocity.y, 2)
        );

        if (this.shouldStopBounce(totalEnergy)) {
            this.stopBounceAnimation();
        } else {
            this.animationFrameId = requestAnimationFrame(() => this.handleBounceAnimation());
        }
    }

    /**
     * 判断是否应该停止回弹
     * @param {number} totalEnergy - 总能量
     * @returns {boolean} 是否应该停止
     */
    shouldStopBounce(totalEnergy) {
        return totalEnergy < this.bounceThreshold || 
               this.state.bounceCount >= this.maxBounceTimes;
    }

    /**
     * 停止回弹动画
     * 重置所有状态到初始值
     */
    stopBounceAnimation() {
        this.state.isBouncing = false;
        this.state.isAnimating = false;
        this.state.position = { x: 0, y: 0 };
        this.state.target = { x: 0, y: 0 };
        this.state.velocity = { x: 0, y: 0 };
        this.state.lastVelocity = { x: 0, y: 0 };
        this.state.bounceCount = 0;
        
        this.updateDOMPosition();
        
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
    }

    /**
     * 事件处理方法
     */

    /**
     * 处理鼠标移动事件
     * @param {MouseEvent} e - 鼠标事件对象
     */
    handleMouseMove(e) {
        if (this.state.isBouncing) {
            this.interruptBounceAnimation();
        }

        const center = this.getElementCenter();
        const offset = this.calculateOffset(e.clientX, e.clientY, center.x, center.y);
        this.state.target = offset;
        this.startAnimation();
    }

    /**
     * 中断回弹动画
     * 保持当前位置并重置其他状态
     */
    interruptBounceAnimation() {
        const currentPosition = { ...this.state.position };
        
        this.state.isBouncing = false;
        this.state.isAnimating = false;
        this.state.velocity = { x: 0, y: 0 };
        this.state.lastVelocity = { x: 0, y: 0 };
        this.state.bounceCount = 0;
        
        this.state.position = currentPosition;
        this.state.target = currentPosition;
        
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
    }

    /**
     * 处理鼠标离开事件
     * 开始回弹动画
     */
    handleMouseLeave() {
        this.state.isBouncing = true;
        this.state.bounceCount = 0;
        this.state.lastFrameTime = performance.now();
        
        // 设置初始速度（基于当前位置）
        this.state.velocity = {
            x: -this.state.position.x * this.springConstant,
            y: -this.state.position.y * this.springConstant
        };

        this.handleBounceAnimation();
    }

    /**
     * 辅助方法
     */

    /**
     * 获取元素中心点坐标
     * @returns {Object} 中心点坐标
     */
    getElementCenter() {
        const rect = this.container.getBoundingClientRect();
        return {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2
        };
    }

    /**
     * 计算偏移量
     * @param {number} mouseX - 鼠标X坐标
     * @param {number} mouseY - 鼠标Y坐标
     * @param {number} centerX - 中心点X坐标
     * @param {number} centerY - 中心点Y坐标
     * @returns {Object} 偏移量
     */
    calculateOffset(mouseX, mouseY, centerX, centerY) {
        const dx = mouseX - centerX;
        const dy = mouseY - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        const ratio = Math.min(distance / 100, 1);
        const maxOffset = parseFloat(this.getAttribute('max-offset')) || 50;

        return {
            x: (dx / distance) * maxOffset * ratio * this.xCoefficient,
            y: (dy / distance) * maxOffset * ratio * this.yCoefficient
        };
    }

    /**
     * 线性插值
     * @param {number} start - 起始值
     * @param {number} end - 结束值
     * @param {number} factor - 插值因子
     * @returns {number} 插值结果
     */
    lerp(start, end, factor) {
        return start + (end - start) * factor;
    }

    /**
     * 更新DOM元素位置
     * 使用CSS变量实现平滑过渡
     */
    updateDOMPosition() {
        const deltaX = Math.abs(this.state.position.x - this.lastAppliedPosition.x);
        const deltaY = Math.abs(this.state.position.y - this.lastAppliedPosition.y);

        if (deltaX > this.MIN_MOVEMENT_THRESHOLD || deltaY > this.MIN_MOVEMENT_THRESHOLD) {
            const smoothX = parseFloat(this.state.position.x.toFixed(3));
            const smoothY = parseFloat(this.state.position.y.toFixed(3));
            
            this.container.style.setProperty('--translate-x', `${smoothX}px`);
            this.container.style.setProperty('--translate-y', `${smoothY}px`);
            this.lastAppliedPosition = { x: smoothX, y: smoothY };
        }
    }

    /**
     * 更新位置
     * 处理拖拽跟随动画
     */
    updatePosition() {
        const speed = parseFloat(this.getAttribute('follow-speed')) || 0.1;
        const currentTime = performance.now();

        if (this.state.isBouncing) {
            this.handleBounceAnimation();
            return;
        }

        const distanceToTarget = Math.sqrt(
            Math.pow(this.state.target.x - this.state.position.x, 2) +
            Math.pow(this.state.target.y - this.state.position.y, 2)
        );

        const adjustedSpeed = distanceToTarget < 1 ? speed * 0.5 : speed;
        
        this.state.position.x = this.lerp(this.state.position.x, this.state.target.x, adjustedSpeed);
        this.state.position.y = this.lerp(this.state.position.y, this.state.target.y, adjustedSpeed);

        this.updateDOMPosition();

        const isNearTarget = Math.abs(this.state.target.x - this.state.position.x) < 0.01 &&
                           Math.abs(this.state.target.y - this.state.position.y) < 0.01;

        if (!isNearTarget) {
            this.animationFrameId = requestAnimationFrame(this.animate.bind(this));
        } else {
            this.state.position = { x: 0, y: 0 };
            this.updateDOMPosition();
            this.state.isAnimating = false;
            if (this.animationFrameId) {
                cancelAnimationFrame(this.animationFrameId);
                this.animationFrameId = null;
            }
        }
    }

    /**
     * 动画循环
     */
    animate() {
        this.updatePosition();
    }

    /**
     * 开始动画
     */
    startAnimation() {
        if (!this.state.isAnimating) {
            this.state.isAnimating = true;
            requestAnimationFrame(this.animate.bind(this));
        }
    }

    /**
     * 节流函数
     * @param {Function} callback - 要执行的函数
     * @param {number} delay - 延迟时间
     * @returns {Function} 节流后的函数
     */
    throttle(callback, delay) {
        let lastCall = 0;
        return function (...args) {
            const now = performance.now();
            if (now - lastCall >= delay) {
                lastCall = now;
                callback.apply(this, args);
            }
        };
    }

    /**
     * 处理页面可见性变化
     * 当页面隐藏时重置状态
     */
    handleVisibilityChange() {
        if (document.hidden) {
            this.resetToInitialState();
        }
    }

    /**
     * 重置到初始状态
     */
    resetToInitialState() {
        // 重置所有状态
        this.state.isBouncing = false;
        this.state.isAnimating = false;
        this.state.position = { x: 0, y: 0 };
        this.state.target = { x: 0, y: 0 };
        this.state.velocity = { x: 0, y: 0 };
        this.state.lastVelocity = { x: 0, y: 0 };
        this.state.bounceCount = 0;
        
        // 重置DOM位置
        this.updateDOMPosition();
        
        // 取消动画
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
    }

    /**
     * 清理资源
     * 移除事件监听器和取消动画
     */
    cleanup() {
        if (this.container) {
            this.container.removeEventListener('mousemove', this.throttledMouseMove);
            this.container.removeEventListener('mouseleave', this.handleMouseLeave.bind(this));
            // 移除页面可见性变化监听
            document.removeEventListener('visibilitychange', this.handleVisibilityChange.bind(this));
            if (this.animationFrameId) {
                cancelAnimationFrame(this.animationFrameId);
                this.animationFrameId = null;
            }
            this.container.style.setProperty('--translate-x', '0px');
            this.container.style.setProperty('--translate-y', '0px');
            this.lastAppliedPosition = { x: 0, y: 0 };
        }
    }

    /**
     * 组件断开连接时的清理
     */
    disconnectedCallback() {
        super.disconnectedCallback();
        this.cleanup();
    }

    /**
     * 渲染组件
     */
    render() {
        return html`
            <div class="container">
                <slot></slot>
            </div>
        `;
    }
}

customElements.define('drag-follow', DragFollow);