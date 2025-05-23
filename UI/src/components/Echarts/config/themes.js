/**
 * themes.js
 * 这个文件是主题配置文件，提供了预定义的主题配置，我预先定义了几个主题，有需要自己更改
 * 主要功能：
 * 1. 提供预定义的主题配置
 * 2. 集中管理图表主题样式
 */

// --------------------------------
// 工具箱配置
// --------------------------------

/**
 * 工具箱配置
 * 提供常用的图表工具
 */
export const toolboxConfigs = {
  // 无工具箱
  none: {
    show: false,
    feature: {}
  },
  
  // 基础工具箱
  basic: {
    feature: {
      saveAsImage: {
        title: '保存为图片',
        icon: 'path://M10.3,9.3V5.5h1.7v3.8H16v1.7h-3.9v3.8h-1.7v-3.8H6.5V9.3H10.3z M4.9,2.5h14.2v14.2H4.9V2.5z'
      }
    }
  },
  
  // 标准工具箱
  standard: {
    feature: {
      saveAsImage: {
        title: '保存为图片',
        icon: 'path://M10.3,9.3V5.5h1.7v3.8H16v1.7h-3.9v3.8h-1.7v-3.8H6.5V9.3H10.3z M4.9,2.5h14.2v14.2H4.9V2.5z'
      },
      dataView: {
        title: '数据视图',
        readOnly: false
      },
      restore: {
        title: '还原'
      }
    }
  }
};

// --------------------------------
// 预定义主题
// --------------------------------

/**
 * 默认主题
 * 简洁、通用的基础主题
 */
export const defaultTheme = {
  colors: {
    text: { primary: '#333333', secondary: '#666666', inverse: '#FFFFFF' },
    background: { tooltip: '#333333', chart: 'transparent' },
    axisLine: '#CCCCCC',
    series: [
      '#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de',
      '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'
    ]
  },
  components: {
    axisLabel: { fontSize: 12 },
    tooltip: { textStyle: { fontSize: 14, color: '#FFFFFF' }, padding: [8, 12] }
  },
  grid: {
    left: '5%',
    right: '5%',
    bottom: '15%',
    top: '5%',
    containLabel: true
  }
};

/**
 * 未来科技主题
 * 带有渐变、圆角等现代化元素
 */
export const futuristicTheme = {
  colors: {
    text: { primary: '#EAEAEA', secondary: '#A0A0A0', inverse: '#111111' },
    background: { tooltip: '#10101080', chart: '#151515' },
    axisLine: '#333333',
    series: [
      // 渐变色预定义
      {
        type: 'linear',
        x: 0, y: 0, x2: 0, y2: 1,
        colorStops: [
          { offset: 0, color: '#3FB1E3' },
          { offset: 1, color: '#6be6c1' }
        ]
      },
      {
        type: 'linear',
        x: 0, y: 0, x2: 0, y2: 1,
        colorStops: [
          { offset: 0, color: '#ff9a9e' },
          { offset: 1, color: '#fad0c4' }
        ]
      },
      {
        type: 'linear',
        x: 0, y: 0, x2: 0, y2: 1,
        colorStops: [
          { offset: 0, color: '#a18cd1' },
          { offset: 1, color: '#fbc2eb' }
        ]
      },
      {
        type: 'linear',
        x: 0, y: 0, x2: 0, y2: 1,
        colorStops: [
          { offset: 0, color: '#fad0c4' },
          { offset: 1, color: '#ffd1ff' }
        ]
      },
      '#4facfe', '#00f2fe', '#43e97b', '#38f9d7'
    ]
  },
  components: {
    axisLabel: { 
      fontSize: 12,
      color: '#A0A0A0',
      fontFamily: '"Roboto", sans-serif'
    },
    tooltip: { 
      textStyle: { 
        fontSize: 14, 
        color: '#FFFFFF',
        fontWeight: '500'
      }, 
      padding: [12, 16],
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
      extraCssText: 'border-radius: 12px; backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.2); box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);'
    }
  },
  grid: {
    left: '5%',
    right: '5%',
    bottom: '10%',
    top: '10%',
    containLabel: true
  },
  customStyle: {
    itemBorderRadius: 8,
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowBlur: 10,
    useGradient: true,
    animation: {
      duration: 1500, 
      easing: 'cubicOut'
    }
  }
};

/**
 * 简约经典主题
 * 无工具箱，简洁的设计风格
 */
export const minimalTheme = {
  colors: {
    text: { primary: '#222222', secondary: '#888888', inverse: '#FFFFFF' },
    background: { tooltip: '#444444', chart: '#f7f7f7' },
    axisLine: '#dddddd',
    series: [
      '#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae',
      '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570'
    ]
  },
  components: {
    axisLabel: { 
      fontSize: 10,
      color: '#888888',
      fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
      formatter: function(value) {
        if (typeof value === 'string' && value.length > 8) {
          return value.substring(0, 8) + '...';
        }
        return value;
      }
    },
    tooltip: { 
      textStyle: { fontSize: 12, color: '#FFFFFF' }, 
      padding: [6, 8],
      backgroundColor: '#444444',
      extraCssText: 'border-radius: 2px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);'
    }
  },
  grid: {
    left: '3%',
    right: '3%',
    bottom: '5%',
    top: '8%',
    containLabel: true
  },
  customStyle: {
    itemBorderRadius: 0,
    shadowColor: 'transparent',
    shadowBlur: 0,
    useGradient: false,
    animation: {
      duration: 500, 
      easing: 'linear'
    }
  },
  hasToolbox: false,
  toolbox: toolboxConfigs.none
};

/**
 * 清爽暗色主题
 * 无工具箱，暗色设计
 */
export const cleanDarkTheme = {
  colors: {
    text: { primary: '#CCCCCC', secondary: '#999999', inverse: '#333333' },
    background: { tooltip: '#333333', chart: '#242424' },
    axisLine: '#555555',
    series: [
      '#3aa757', '#4285f4', '#fbbc05', '#ea4335', '#8ab4f8',
      '#1a73e8', '#34a853', '#9aa0a6', '#4487f6', '#ff7043'
    ]
  },
  components: {
    axisLabel: { 
      fontSize: 11,
      color: '#999999'
    },
    tooltip: { 
      textStyle: { fontSize: 13, color: '#CCCCCC' }, 
      padding: [8, 10],
      backgroundColor: 'rgba(51, 51, 51, 0.9)',
      extraCssText: 'border-radius: 4px; border: 1px solid #555555; box-shadow: none;'
    }
  },
  grid: {
    left: '4%',
    right: '4%',
    bottom: '8%',
    top: '8%',
    containLabel: true
  },
  customStyle: {
    itemBorderRadius: 2,
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowBlur: 4,
    useGradient: false,
    animation: {
      duration: 400, 
      easing: 'cubicOut'
    }
  },
  hasToolbox: false,
  toolbox: toolboxConfigs.none
};

/**
 * 预定义主题集合
 */
export const themes = {
  default: defaultTheme,
  futuristic: futuristicTheme,
  minimal: minimalTheme,
  cleanDark: cleanDarkTheme
};

/**
 * 预设图表配置
 * 提供不同场景下的默认配置
 */
export const presetConfigurations = {
  // 仪表盘预设
  dashboard: {
    animation: true,
    grid: {
      top: '10%',
      bottom: '10%'
    },
    legend: {
      show: false
    },
    toolbox: toolboxConfigs.basic
  },
  
  // 数据分析预设
  analysis: {
    animation: false,
    grid: {
      top: '10%',
      bottom: '10%',
      left: '10%',
      right: '10%'
    },
    legend: {
      show: true,
      type: 'scroll'
    },
    toolbox: toolboxConfigs.standard,
  }
}; 