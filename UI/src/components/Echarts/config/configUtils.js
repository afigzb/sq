/**
 * configUtils.js
 * 这个文件是配置管理工具函数，提供了获取工具箱配置、获取主题配置、合并主题与自定义配置、获取预设配置、注册自定义主题、获取主题是否有工具箱等工具函数
 * 主要功能：
 * 1. 提供主题配置管理工具函数
 * 2. 提供配置合并和获取工具函数
 */

import { themes, toolboxConfigs, presetConfigurations } from './themes.js';

/**
 * 获取工具箱配置
 * @param {string} type - 工具箱类型：'none', 'basic', 'standard'
 * @param {Object|string} theme - 主题对象或主题名称
 * @returns {Object} 工具箱配置对象
 */
export function getToolboxConfig(type = 'basic', theme) {
  // 如果提供了主题，并且该主题显式设置了不使用工具箱，则返回none配置
  if (theme) {
    const themeObj = typeof theme === 'string' ? getThemeConfig(theme) : theme;
    if (themeObj.hasToolbox === false) {
      return toolboxConfigs.none;
    }
    
    // 如果主题明确指定了工具箱类型，则使用主题指定的类型
    if (themeObj.toolbox && typeof themeObj.toolbox === 'object') {
      return themeObj.toolbox;
    }
  }
  
  // 如果类型为none，则返回none配置
  if (type === 'none') {
    return toolboxConfigs.none;
  }
  
  // 返回指定类型的工具箱，如果不存在则返回基础工具箱
  return toolboxConfigs[type] || toolboxConfigs.basic;
}

/**
 * 获取主题配置
 * @param {string} themeName - 主题名称
 * @returns {Object} 主题配置对象
 */
export function getThemeConfig(themeName = 'default') {
  return themes[themeName] || themes.default;
}

/**
 * 合并主题与自定义配置
 * @param {string|Object} theme - 主题名称或自定义主题对象
 * @param {Object} customConfig - 自定义配置
 * @returns {Object} 合并后的配置对象
 */
export function mergeThemeWithCustom(theme, customConfig = {}) {
  const themeConfig = typeof theme === 'string' ? getThemeConfig(theme) : theme;
  return _.merge({}, themeConfig, customConfig);
}

/**
 * 获取预设配置
 * @param {string} presetName - 预设配置名称
 * @returns {Object} 预设配置对象
 */
export function getPresetConfig(presetName) {
  return presetConfigurations[presetName] || {};
}

/**
 * 注册自定义主题
 * @param {string} themeName - 主题名称
 * @param {Object} themeConfig - 主题配置对象
 */
export function registerTheme(themeName, themeConfig) {
  if (typeof themeName !== 'string' || !themeConfig) {
    throw new Error('主题名称和配置对象都是必需的');
  }
  
  themes[themeName] = themeConfig;
}

/**
 * 获取主题是否有工具箱
 * @param {string} themeName - 主题名称
 * @returns {boolean} 是否有工具箱
 */
export function themeHasToolbox(themeName) {
  const theme = getThemeConfig(themeName);
  return theme.hasToolbox !== false; // 默认为true
} 