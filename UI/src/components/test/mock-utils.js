// 模拟的工具函数文件
// 用于测试外部文件导入功能

// 日期格式化函数
function formatDate(date) {
    return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// 字符串首字母大写
function capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// 数组求和
function sumArray(arr) {
    return arr.reduce((sum, num) => sum + num, 0);
}

// 生成随机颜色
function getRandomColor() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// 模拟 ES6 导出（在实际使用中会被处理）
export { formatDate, capitalize, sumArray, getRandomColor }; 