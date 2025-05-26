/**
 * 测试用的外部依赖文件
 * 包含一些实用的工具函数和类，用于演示外部文件导入功能
 */

// 工具函数类
class Utils {
    static formatDate(date = new Date()) {
        return date.toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    }
    
    static randomColor() {
        const colors = [
            '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', 
            '#FECA57', '#FF9FF3', '#54A0FF', '#5F27CD',
            '#00D2D3', '#FF9F43', '#10AC84', '#EE5A24'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    static randomNumber(min = 0, max = 100) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// 动画效果类
class AnimationHelper {
    static fadeIn(element, duration = 300) {
        element.style.opacity = '0';
        element.style.display = 'block';
        
        let start = performance.now();
        
        function animate(currentTime) {
            let elapsed = currentTime - start;
            let progress = elapsed / duration;
            
            if (progress < 1) {
                element.style.opacity = progress;
                requestAnimationFrame(animate);
            } else {
                element.style.opacity = '1';
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    static slideDown(element, duration = 300) {
        element.style.maxHeight = '0';
        element.style.overflow = 'hidden';
        element.style.transition = `max-height ${duration}ms ease-out`;
        
        setTimeout(() => {
            element.style.maxHeight = element.scrollHeight + 'px';
            
            setTimeout(() => {
                element.style.maxHeight = '';
                element.style.transition = '';
                element.style.overflow = '';
            }, duration);
        }, 10);
    }
    
    static shake(element) {
        element.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            element.style.animation = '';
        }, 500);
    }
}

// 数据存储类
class SimpleStorage {
    static set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.warn('无法保存到 localStorage:', e);
            return false;
        }
    }
    
    static get(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (e) {
            console.warn('无法从 localStorage 读取:', e);
            return defaultValue;
        }
    }
    
    static remove(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (e) {
            console.warn('无法从 localStorage 删除:', e);
            return false;
        }
    }
}

// 简单的事件总线
class EventBus {
    constructor() {
        this.events = {};
    }
    
    on(event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
    }
    
    off(event, callback) {
        if (!this.events[event]) return;
        
        const index = this.events[event].indexOf(callback);
        if (index > -1) {
            this.events[event].splice(index, 1);
        }
    }
    
    emit(event, data) {
        if (!this.events[event]) return;
        
        this.events[event].forEach(callback => {
            try {
                callback(data);
            } catch (e) {
                console.error('事件处理器执行错误:', e);
            }
        });
    }
}

// UI 组件助手
class UIHelper {
    static createButton(text, onClick, className = 'btn') {
        const button = document.createElement('button');
        button.textContent = text;
        button.className = className;
        if (onClick) button.addEventListener('click', onClick);
        return button;
    }
    
    static createCard(title, content, className = 'card') {
        const card = document.createElement('div');
        card.className = className;
        card.innerHTML = `
            <div class="card-header">
                <h3>${title}</h3>
            </div>
            <div class="card-body">
                ${content}
            </div>
        `;
        return card;
    }
    
    static showNotification(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 5px;
            color: white;
            font-weight: bold;
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
            max-width: 300px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        `;
        
        // 设置背景色
        const colors = {
            info: '#007acc',
            success: '#28a745',
            warning: '#ffc107',
            error: '#dc3545'
        };
        notification.style.backgroundColor = colors[type] || colors.info;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, duration);
    }
}

// 表单验证器
class FormValidator {
    static isEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    static isPhone(phone) {
        const re = /^1[3-9]\d{9}$/;
        return re.test(phone);
    }
    
    static isNotEmpty(value) {
        return value && value.trim().length > 0;
    }
    
    static isMinLength(value, min) {
        return value && value.length >= min;
    }
    
    static isMaxLength(value, max) {
        return value && value.length <= max;
    }
    
    static validateForm(formData, rules) {
        const errors = {};
        
        for (const [field, fieldRules] of Object.entries(rules)) {
            const value = formData[field];
            
            for (const rule of fieldRules) {
                if (rule.type === 'required' && !this.isNotEmpty(value)) {
                    errors[field] = rule.message || `${field} 不能为空`;
                    break;
                }
                
                if (rule.type === 'email' && value && !this.isEmail(value)) {
                    errors[field] = rule.message || `${field} 格式不正确`;
                    break;
                }
                
                if (rule.type === 'minLength' && value && !this.isMinLength(value, rule.value)) {
                    errors[field] = rule.message || `${field} 长度不能少于 ${rule.value} 位`;
                    break;
                }
                
                if (rule.type === 'maxLength' && value && !this.isMaxLength(value, rule.value)) {
                    errors[field] = rule.message || `${field} 长度不能超过 ${rule.value} 位`;
                    break;
                }
            }
        }
        
        return {
            isValid: Object.keys(errors).length === 0,
            errors
        };
    }
}

// 创建全局实例
window.eventBus = new EventBus();

// 添加必要的 CSS 动画
if (!document.querySelector('#test-js-styles')) {
    const style = document.createElement('style');
    style.id = 'test-js-styles';
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
            20%, 40%, 60%, 80% { transform: translateX(10px); }
        }
        
        .card {
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            margin: 10px 0;
            overflow: hidden;
        }
        
        .card-header {
            background: #f8f9fa;
            padding: 15px 20px;
            border-bottom: 1px solid #e9ecef;
        }
        
        .card-header h3 {
            margin: 0;
            color: #333;
        }
        
        .card-body {
            padding: 20px;
        }
        
        .btn {
            padding: 8px 16px;
            border: 1px solid #ddd;
            border-radius: 4px;
            background: white;
            cursor: pointer;
            transition: all 0.2s;
            margin: 4px;
        }
        
        .btn:hover {
            background: #f8f9fa;
            border-color: #adb5bd;
        }
        
        .btn-primary {
            background: #007acc;
            color: white;
            border-color: #007acc;
        }
        
        .btn-primary:hover {
            background: #0056b3;
        }
        
        .btn-success {
            background: #28a745;
            color: white;
            border-color: #28a745;
        }
        
        .btn-success:hover {
            background: #218838;
        }
        
        .btn-warning {
            background: #ffc107;
            color: #212529;
            border-color: #ffc107;
        }
        
        .btn-warning:hover {
            background: #e0a800;
        }
        
        .btn-danger {
            background: #dc3545;
            color: white;
            border-color: #dc3545;
        }
        
        .btn-danger:hover {
            background: #c82333;
        }
    `;
    document.head.appendChild(style);
}

console.log('🎉 测试依赖文件 test.js 已成功加载！');
console.log('可用的工具类:', {
    Utils,
    AnimationHelper,
    SimpleStorage,
    EventBus,
    UIHelper,
    FormValidator
});
