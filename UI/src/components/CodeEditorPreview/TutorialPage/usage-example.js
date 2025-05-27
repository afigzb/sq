/**
 * CodeEditorPreview 使用示例函数
 * 用于创建主题切换示例
 */

import { themeDemo } from './data.js';

// 工具函数：创建代码编辑预览器组件
function createCodeEditorPreview(container, code, language = 'html', instructions = '', options = {}) {
    if (!container) {
        console.error('容器元素不存在');
        return null;
    }

    // 创建组件元素
    const component = document.createElement('code-editor-preview');
    
    // 设置基础属性
    component.setAttribute('default-code', code);
    component.setAttribute('language', language);
    component.setAttribute('instructions', instructions);
    
    // 设置可选属性
    const defaultOptions = {
        theme: 'prism',
        editable: true,
        autoPreview: true,
        showToolbar: true,
        showFullscreen: true,
        debounceDelay: 300
    };
    
    const finalOptions = { ...defaultOptions, ...options };
    
    Object.keys(finalOptions).forEach(key => {
        const attrName = key.replace(/([A-Z])/g, '-$1').toLowerCase();
        component.setAttribute(attrName, finalOptions[key]);
    });
    
    // 清空容器并添加组件
    container.innerHTML = '';
    container.appendChild(component);
    
    return component;
}

// 创建主题切换示例
export function createThemeDemo(container) {
    return createCodeEditorPreview(
        container,
        themeDemo.code,
        themeDemo.language,
        themeDemo.instructions,
        { theme: 'prism' }
    );
}

// 工具函数：等待组件加载完成
export function waitForComponents(components, timeout = 5000) {
    return new Promise((resolve, reject) => {
        const startTime = Date.now();
        
        function checkComponents() {
            const allReady = components.every(component => {
                return component && component.getController && component.getController();
            });
            
            if (allReady) {
                resolve(components);
            } else if (Date.now() - startTime > timeout) {
                reject(new Error('组件加载超时'));
            } else {
                setTimeout(checkComponents, 100);
            }
        }
        
        checkComponents();
    });
}

// 导出默认配置
export const defaultConfig = {
    theme: 'prism',
    language: 'html',
    editable: true,
    autoPreview: true,
    showToolbar: true,
    showFullscreen: true,
    debounceDelay: 300
};