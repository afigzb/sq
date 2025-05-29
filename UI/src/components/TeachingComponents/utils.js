/**
 * HTML文件读取工具函数
 * 简单直接地读取HTML文件内容并转换为字符串
 * 但是使用他后会在原本是html的文件中注入live-server的代码
 */

/**
 * 读取HTML文件内容并转换为字符串
 * @param {string} filePath - HTML文件的相对路径
 * @returns {Promise<string>} - 返回HTML内容字符串
 */
export async function loadHtmlAsString(filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const htmlContent = await response.text();
        return htmlContent;
    } catch (error) {
        console.error('读取HTML文件失败:', error);
        return '';
    }
}

/**
 * 批量读取多个HTML文件
 * @param {string[]} filePaths - HTML文件路径数组
 * @returns {Promise<Object>} - 返回以文件名为键，内容为值的对象
 */
export async function loadMultipleHtmlFiles(filePaths) {
    const results = {};
    
    for (const filePath of filePaths) {
        const fileName = filePath.split('/').pop().replace('.html', '');
        results[fileName] = await loadHtmlAsString(filePath);
    }
    
    return results;
}

/**
 * 从HTML内容中提取代码块（去除注释等）
 * @param {string} htmlContent - HTML内容字符串
 * @returns {string} - 清理后的HTML内容
 */
export function cleanHtmlContent(htmlContent) {
    // 简单清理，去除多余的空行和注释
    return htmlContent
        .replace(/<!--[\s\S]*?-->/g, '') // 移除HTML注释
        .replace(/\n\s*\n/g, '\n') // 移除多余空行
        .trim();
}

/**
 * 从文件路径生成教学数据项
 * @param {string} filePath - HTML文件路径
 * @param {string} title - 示例标题
 * @param {string} description - 示例描述
 * @returns {Promise<Object>} - 返回教学数据格式的对象
 */
export async function createExampleFromFile(filePath, title, description) {
    const htmlContent = await loadHtmlAsString(filePath);
    const fileName = filePath.split('/').pop().replace('.html', '');
    
    return {
        id: fileName.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase(),
        title: title || fileName,
        description: description || `${fileName} 示例`,
        code: cleanHtmlContent(htmlContent),
        instructions: `# ${title || fileName}\n\n这是从 ${filePath} 加载的示例代码。`
    };
}
