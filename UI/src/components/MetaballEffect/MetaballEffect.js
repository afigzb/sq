/**
 * 融球效果 Web Component
 * 为容器内的元素提供融球效果，支持任意HTML内容
 */
class MetaballContainer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.blurIntensity = 10;
        this.contrastLevel = 20;
        this.init();
    }

    init() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    position: relative;
                    /* 核心：高对比度滤镜实现融球效果 */
                    filter: contrast(${this.contrastLevel}) blur(0.5px);
                    background: inherit;
                }

                ::slotted(*) {
                    /* 核心：为所有插槽内容添加模糊效果 */
                    filter: blur(${this.blurIntensity}px) !important;
                }

                .container {
                    width: 100%;
                    height: 100%;
                    position: relative;
                }
            </style>
            <div class="container">
                <slot></slot>
            </div>
        `;
    }

    /**
     * 设置模糊强度
     * @param {number} intensity - 模糊强度 (2-15)
     */
    setBlur(intensity) {
        this.blurIntensity = intensity;
        this.updateStyles();
    }

    /**
     * 设置对比度
     * @param {number} level - 对比度级别 (10-40)
     */
    setContrast(level) {
        this.contrastLevel = level;
        this.updateStyles();
    }

    /**
     * 更新样式
     * @private
     */
    updateStyles() {
        const style = this.shadowRoot.querySelector('style');
        style.textContent = `
            :host {
                display: block;
                position: relative;
                filter: contrast(${this.contrastLevel}) blur(0.5px);
                background: inherit;
            }

            ::slotted(*) {
                filter: blur(${this.blurIntensity}px) !important;
            }

            .container {
                width: 100%;
                height: 100%;
                position: relative;
            }
        `;
    }

    /**
     * 获取所有子元素
     * @returns {Array} 子元素数组
     */
    getItems() {
        return Array.from(this.children);
    }

    /**
     * 获取当前模糊强度
     * @returns {number} 当前模糊强度
     */
    getBlur() {
        return this.blurIntensity;
    }

    /**
     * 获取当前对比度
     * @returns {number} 当前对比度
     */
    getContrast() {
        return this.contrastLevel;
    }
}

// 注册Web Component
customElements.define('metaball-container', MetaballContainer);

// 导出组件
export default MetaballContainer;
