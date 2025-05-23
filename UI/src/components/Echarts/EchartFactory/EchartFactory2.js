/**
 * EChartsFactory2 - 简化版图表工厂
 * 
 * 设计理念：
 * 1. 简化：相比v1版本，将所有逻辑内聚在一个文件中，减少文件依赖
 * 2. 灵活：支持多种图表类型、主题切换、自定义配置
 * 3. 易扩展：模块化设计，新增图表类型和主题都很方便
 * 4. 易维护：代码结构清晰，注释详细，看不懂直接问AI
 * 
 * 主要功能：
 * - 支持柱状图、折线图、饼图、雷达图、散点图、极坐标图等
 * - 内置多种主题：default、futuristic、minimal、cleanDark
 * - 支持自定义配置和样式
 * - 自动处理图表自适应和响应式
 * - 提供批量创建、独立样式等高级功能
 * 
 * 使用示例：
 * ```javascript
 * // 基础用法
 * const chart = createChart(container, 'bar', 'default');
 * chart.update(data);
 * 
 * // 高级用法
 * const factory = new EChartFactory2(container, 'line', 'futuristic');
 * factory.init().update(data, { stack: 'total', areaStyle: true });
 * ```
 */

import { themes, toolboxConfigs, presetConfigurations } from '../config/themes.js';

// =====================================
// 核心配置定义
// =====================================

/**
 * 图表类型配置映射
 * 
 * 这个对象定义了支持的所有图表类型及其配置生成器
 * 每种图表类型包含：
 * - coordinateSystem: 坐标系类型（cartesian直角坐标系/polar极坐标系/radar雷达图/none无坐标系）
 * - series: 系列配置生成函数，负责生成ECharts的series配置
 * - defaultConfig: 默认配置，用于设置该图表类型的特殊默认值
 * 
 * 扩展新图表类型：
 * 1. 在这里添加新的配置项
 * 2. 实现series生成函数
 * 3. 确定使用的坐标系类型
 */
const CHART_TYPE_CONFIGS = {
  // 柱状图配置
  bar: {
    coordinateSystem: 'cartesian', // 使用直角坐标系
    /**
     * 柱状图系列配置生成器
     * @param {Object} data - 数据对象，包含data数组和可选的color、name等
     * @param {Object} theme - 主题配置对象
     * @param {Object} config - 用户自定义配置
     * @returns {Object} ECharts series配置对象
     */
    series: (data, theme, config) => ({
      type: 'bar',
      data: data.data, // 柱状图的数据数组
      itemStyle: {
        color: data.color || theme.colors.series[0], // 优先使用数据指定的颜色，否则使用主题颜色
        // 根据是否横向显示设置边框圆角
        borderRadius: config.inverse ? [0, 2, 2, 0] : [2, 2, 0, 0]
      },
      stack: config.stack || undefined // 堆叠配置，用于创建堆叠柱状图
    }),
    defaultConfig: { boundaryGap: true } // 柱状图默认在分类轴上留边距
  },

  // 折线图配置
  line: {
    coordinateSystem: 'cartesian',
    /**
     * 折线图系列配置生成器
     * @param {Object} data - 数据对象
     * @param {Object} theme - 主题配置
     * @param {Object} config - 用户配置，支持areaStyle等
     * @returns {Object} ECharts series配置
     */
    series: (data, theme, config) => ({
      type: 'line',
      data: data.data,
      smooth: true, // 平滑曲线
      lineStyle: { width: config.areaStyle ? 1 : 2 }, // 面积图线条细一些
      symbol: 'circle', // 数据点样式
      symbolSize: 6,
      itemStyle: { color: data.color || theme.colors.series[0] },
      // 如果启用面积样式，添加areaStyle配置
      ...(config.areaStyle && { areaStyle: { opacity: 0.25 } })
    }),
    defaultConfig: { boundaryGap: false } // 折线图默认不留边距，线条紧贴边缘
  },

  // 散点图配置
  scatter: {
    coordinateSystem: 'cartesian',
    /**
     * 散点图系列配置生成器
     * 散点图用于展示两个变量之间的关系
     */
    series: (data, theme, config) => ({
      type: 'scatter',
      data: data.data, // 散点数据，通常是[x, y]格式的数组
      symbolSize: 8, // 散点大小
      itemStyle: {
        color: data.color || theme.colors.series[0],
        borderWidth: 1.5 // 散点边框，增强视觉效果
      }
    }),
    defaultConfig: { boundaryGap: false }
  },

  // 饼图配置
  pie: {
    coordinateSystem: 'none', // 饼图不需要坐标系
    /**
     * 饼图系列配置生成器
     * 饼图用于展示数据的占比关系
     */
    series: (data, theme, config) => {
      // 确保饼图数据有不同的颜色，每个扇形都有独特的颜色
      const pieData = (data.data || []).map((item, index) => ({
        ...item,
        itemStyle: {
          // 优先级：item.itemStyle.color > item.color > 主题颜色[index]
          color: item.itemStyle?.color || item.color || theme.colors.series[index % theme.colors.series.length]
        }
      }));
      
      return {
        type: 'pie',
        data: pieData,
        // 玫瑰图使用内外半径，普通饼图使用固定半径
        radius: config.roseType ? ['15%', '55%'] : ['40%', '70%'],
        center: ['50%', '50%'], // 饼图中心位置
        roseType: config.roseType || undefined, // 玫瑰图类型
        itemStyle: { borderRadius: config.roseType ? 5 : 0 }, // 玫瑰图有圆角
        // 标签配置：玫瑰图显示标签，普通饼图隐藏
        label: config.roseType 
          ? { show: true, position: 'outside', formatter: '{b}: {d}%' }
          : { show: false }
      };
    },
    defaultConfig: {}
  },

  // 雷达图配置
  radar: {
    coordinateSystem: 'radar', // 使用雷达坐标系
    /**
     * 雷达图系列配置生成器
     * 雷达图用于多维度数据对比
     */
    series: (data, theme, config) => ({
      type: 'radar',
      // 处理多系列雷达图数据，每个系列有不同的颜色和样式
      data: data.data.map((item, idx) => ({
        ...item,
        itemStyle: { color: item.color || theme.colors.series[idx] },
        lineStyle: { color: item.color || theme.colors.series[idx] },
        areaStyle: { 
          color: item.color || theme.colors.series[idx], 
          opacity: 0.25 // 半透明填充
        }
      })),
      symbol: 'circle',
      symbolSize: 6
    }),
    defaultConfig: {}
  },

  // 极坐标柱状图配置
  polarBar: {
    coordinateSystem: 'polar',
    /**
     * 极坐标柱状图系列配置生成器
     * 在极坐标系中显示柱状图，常用于环形图表
     */
    series: (data, theme, config) => ({
      type: 'bar',
      data: data.data,
      coordinateSystem: 'polar', // 指定使用极坐标系
      stack: 'polarStack', // 极坐标图默认堆叠
      itemStyle: { color: data.color || theme.colors.series[0] },
      name: data.name || '数据'
    }),
    defaultConfig: {}
  },

  // 极坐标折线图配置
  polarLine: {
    coordinateSystem: 'polar',
    /**
     * 极坐标折线图系列配置生成器
     * 在极坐标系中显示折线图，适合周期性数据
     */
    series: (data, theme, config) => ({
      type: 'line',
      data: data.data,
      coordinateSystem: 'polar',
      smooth: true, // 平滑曲线
      itemStyle: { color: data.color || theme.colors.series[0] },
      lineStyle: { color: data.color || theme.colors.series[0] },
      name: data.name || '数据'
    }),
    defaultConfig: {}
  }
};

/**
 * 坐标系统配置生成器
 * 
 * 根据不同的坐标系类型生成对应的配置
 * 这是图表工厂的核心部分，负责处理不同图表的坐标系需求
 */
const COORDINATE_SYSTEMS = {
  /**
   * 直角坐标系配置生成器
   * 用于柱状图、折线图、散点图等
   * @param {Object} chartData - 图表数据，包含xAxis等
   * @param {Object} theme - 主题配置
   * @param {Object} config - 用户配置，支持inverse（翻转）等
   * @returns {Object} 包含xAxis和yAxis的配置对象
   */
  cartesian: (chartData, theme, config) => ({
    // 根据inverse配置决定坐标轴类型和数据
    xAxis: config.inverse ? 
      { type: 'value', ...getAxisStyle(theme) } : // 横向柱状图：X轴为数值轴
      { type: 'category', data: chartData.xAxis, ...getAxisStyle(theme) }, // 普通图表：X轴为分类轴
    yAxis: config.inverse ?
      { type: 'category', data: chartData.xAxis, ...getAxisStyle(theme) } : // 横向柱状图：Y轴为分类轴
      { type: 'value', ...getAxisStyle(theme) } // 普通图表：Y轴为数值轴
  }),

  /**
   * 极坐标系配置生成器
   * 用于极坐标柱状图、极坐标折线图等
   * @param {Object} chartData - 图表数据
   * @param {Object} theme - 主题配置
   * @param {Object} config - 用户配置
   * @returns {Object} 极坐标系配置对象
   */
  polar: (chartData, theme, config) => ({
    // 极坐标配置
    polar: { 
      center: ['50%', '50%'], // 极坐标中心位置
      radius: '70%', // 极坐标半径
      // 应用主题样式到分割线和分割区域
      splitLine: { 
        lineStyle: { 
          color: theme.colors.axisLine, 
          opacity: 0.3 
        } 
      },
      splitArea: { 
        areaStyle: { 
          color: ['transparent', 'rgba(255,255,255,0.02)'] // 交替的分割区域颜色
        } 
      }
    },
    // 角度轴配置（相当于普通图表的X轴）
    angleAxis: { 
      type: 'category', 
      data: chartData.angleData || [], // 角度轴的分类数据
      ...getAxisStyle(theme),
      splitLine: { 
        lineStyle: { 
          color: theme.colors.axisLine, 
          opacity: 0.4 
        } 
      }
    },
    // 径向轴配置（相当于普通图表的Y轴）
    radiusAxis: { 
      type: 'value', 
      ...getAxisStyle(theme),
      splitLine: { 
        lineStyle: { 
          color: theme.colors.axisLine, 
          opacity: 0.4 
        } 
      }
    },
    // 隐藏默认的直角坐标轴，因为我们使用极坐标
    xAxis: { show: false },
    yAxis: { show: false },
    grid: { show: false }
  }),

  /**
   * 雷达图坐标系配置生成器
   * @param {Object} chartData - 图表数据，需要包含indicator指示器
   * @param {Object} theme - 主题配置
   * @returns {Object} 雷达图坐标系配置
   */
  radar: (chartData, theme) => ({
    radar: {
      // 雷达图的指示器，定义每个维度的名称和范围
      indicator: chartData.indicator || chartData.series?.[0]?.indicator || [],
      // 雷达图样式配置
      axisLine: { lineStyle: { color: theme.colors.axisLine } },
      splitLine: { lineStyle: { color: theme.colors.axisLine, opacity: 0.4 } },
      splitArea: { areaStyle: { color: ['transparent'] } }, // 透明分割区域
      name: { textStyle: { color: theme.colors.text.secondary } } // 指示器名称样式
    },
    // 隐藏直角坐标轴
    xAxis: { show: false },
    yAxis: { show: false },
    grid: { show: false }
  }),

  /**
   * 无坐标系配置生成器
   * 用于饼图等不需要坐标系的图表
   */
  none: () => ({
    xAxis: { show: false },
    yAxis: { show: false },
    grid: { show: false }
  })
};

// =====================================
// 工具函数
// =====================================

/**
 * 获取坐标轴样式配置
 * 
 * 这个函数统一处理所有坐标轴的样式，确保主题的一致性
 * @param {Object} theme - 主题配置对象
 * @returns {Object} 坐标轴样式配置
 */
function getAxisStyle(theme) {
  return {
    // 坐标轴线样式
    axisLine: { 
      lineStyle: { 
        color: theme.colors.axisLine, // 轴线颜色
        width: 1 // 轴线宽度
      } 
    },
    // 坐标轴标签样式
    axisLabel: { 
      color: theme.colors.text.secondary, // 标签文字颜色
      ...(theme.components?.axisLabel || {}) // 合并主题中的额外标签配置
    },
    // 分割线样式
    splitLine: { 
      lineStyle: { 
        color: theme.colors.axisLine, 
        width: 0.5, 
        opacity: 0.4 // 分割线半透明
      } 
    }
  };
}

/**
 * 获取提示框（tooltip）配置
 * 
 * 提示框是鼠标悬停时显示的信息框
 * @param {Object} theme - 主题配置
 * @param {string} type - 提示框类型：'item'（悬停数据项）或'axis'（悬停坐标轴）
 * @returns {Object} 提示框配置对象
 */
function getTooltipConfig(theme, type = 'item') {
  // 基础配置
  const base = {
    backgroundColor: theme.colors.background.tooltip, // 提示框背景色
    textStyle: { 
      color: theme.colors.text.inverse, // 提示框文字颜色
      ...(theme.components?.tooltip?.textStyle || {})
    },
    padding: theme.components?.tooltip?.padding || [8, 12], // 内边距
    extraCssText: theme.components?.tooltip?.extraCssText || 
      'box-shadow: 0 2px 8px rgba(0,0,0,0.15); border-radius: 4px;' // 额外CSS样式
  };

  // 根据类型设置触发方式
  if (type === 'axis') {
    // 坐标轴触发：适用于折线图、柱状图等，显示该位置所有系列的数据
    base.trigger = 'axis';
    base.axisPointer = { 
      type: 'line', // 轴指示器类型
      lineStyle: { color: theme.colors.axisLine, width: 1 } 
    };
  } else {
    // 数据项触发：适用于饼图、散点图等，只显示当前数据项
    base.trigger = 'item';
  }

  return base;
}

/**
 * 获取工具箱（toolbox）配置
 * 
 * 工具箱提供保存图片、数据视图、缩放等功能
 * @param {Object} theme - 主题配置
 * @param {string} type - 工具箱类型，对应toolboxConfigs中的配置
 * @returns {Object} 工具箱配置对象
 */
function getToolboxConfig(theme, type = 'basic') {
  // 如果主题明确禁用工具箱
  if (theme.hasToolbox === false) {
    return { show: false };
  }

  // 获取预定义的工具箱配置
  const config = toolboxConfigs[type] || toolboxConfigs.basic;
  
  return {
    show: true,
    right: '10px', // 工具箱位置
    top: '10px',
    iconStyle: { borderColor: theme.colors.text.secondary }, // 图标样式
    emphasis: { iconStyle: { borderColor: theme.colors.text.primary } }, // 悬停时的图标样式
    ...config // 合并预定义配置
  };
}

/**
 * 深度合并对象
 * 
 * 这是一个工具函数，用于合并多个配置对象
 * 与Object.assign不同，这个函数会递归合并嵌套对象
 * 
 * @param {Object} target - 目标对象
 * @param {...Object} sources - 源对象数组
 * @returns {Object} 合并后的对象
 * 
 * 示例：
 * ```javascript
 * const result = deepMerge(
 *   { a: { x: 1 } },
 *   { a: { y: 2 } },
 *   { b: 3 }
 * );
 * // 结果：{ a: { x: 1, y: 2 }, b: 3 }
 * ```
 */
function deepMerge(target, ...sources) {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        // 如果值是对象，递归合并
        if (!target[key]) Object.assign(target, { [key]: {} });
        deepMerge(target[key], source[key]);
      } else {
        // 如果值不是对象，直接赋值
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  // 递归处理剩余的源对象
  return deepMerge(target, ...sources);
}

/**
 * 判断是否为对象（不包括数组）
 * @param {*} item - 要判断的项
 * @returns {boolean} 是否为对象
 */
function isObject(item) {
  return item && typeof item === 'object' && !Array.isArray(item);
}

// =====================================
// 主要类定义
// =====================================

/**
 * 简化的ECharts工厂类
 * 
 * 这是整个图表工厂的核心类，负责：
 * 1. 管理图表实例的生命周期
 * 2. 处理数据更新和配置变更
 * 3. 提供主题切换、类型切换等功能
 * 4. 处理图表的自适应和响应式
 * 
 * 使用方式：
 * ```javascript
 * // 创建实例
 * const factory = new EChartFactory2(container, 'bar', 'default');
 * 
 * // 初始化并更新数据
 * factory.init().update(data, { stack: 'total' });
 * 
 * // 切换主题
 * factory.switchTheme('futuristic');
 * 
 * // 切换图表类型
 * factory.switchType('line');
 * ```
 */
class EChartFactory2 {
  /**
   * 构造函数
   * @param {HTMLElement} container - 图表容器DOM元素
   * @param {string} chartType - 图表类型，如'bar'、'line'、'pie'等
   * @param {string|Object} theme - 主题名称或主题对象
   */
  constructor(container, chartType = 'bar', theme = 'default') {
    this.container = container; // 图表容器
    this.chartType = chartType; // 当前图表类型
    this.themeName = theme; // 主题名称
    this.theme = this.getTheme(theme); // 主题配置对象
    
    // 图表实例和观察器
    this.chartInstance = null; // ECharts实例
    this.resizeObserver = null; // 尺寸变化观察器
    
    // 状态管理
    this.currentData = null; // 当前数据
    this.currentConfig = {}; // 当前配置
    this.preset = null; // 当前预设
  }

  /**
   * 初始化图表
   * 
   * 创建ECharts实例并设置自适应监听
   * 这个方法是幂等的，多次调用不会重复创建实例
   * 
   * @returns {EChartFactory2} 返回自身，支持链式调用
   */
  init() {
    if (!this.chartInstance) {
      // 创建ECharts实例
      this.chartInstance = echarts.init(this.container);
      // 设置尺寸自适应
      this.setupResize();
    }
    return this;
  }

  /**
   * 更新图表数据
   * 
   * 这是最常用的方法，用于更新图表的数据和配置
   * 
   * @param {Object} data - 图表数据对象
   * @param {Array} data.xAxis - X轴数据（分类轴）
   * @param {Array|Object} data.series - 系列数据，可以是单个系列对象或系列数组
   * @param {Object} config - 自定义配置对象
   * @param {string} config.stack - 堆叠配置
   * @param {boolean} config.inverse - 是否翻转坐标轴
   * @param {boolean} config.areaStyle - 是否显示面积样式
   * @param {string} config.roseType - 玫瑰图类型
   * @returns {EChartFactory2} 返回自身，支持链式调用
   * 
   * 使用示例：
   * ```javascript
   * // 基础用法
   * factory.update({ xAxis: ['A', 'B'], series: { data: [1, 2] } });
   * 
   * // 带配置
   * factory.update(data, { stack: 'total', inverse: true });
   * ```
   */
  update(data, config = {}) {
    this.init(); // 确保图表已初始化
    
    // 保存当前数据和配置，用于主题切换等场景
    this.currentData = data;
    this.currentConfig = config;
    
    // 应用预设配置（如果有）
    const finalConfig = this.preset ? 
      deepMerge({}, presetConfigurations[this.preset], config) : 
      config;
    
    // 生成完整的ECharts配置
    const options = this.generateOptions(data, finalConfig);
    
    // 更新图表（true表示不合并，完全替换）
    this.chartInstance.setOption(options, true);
    
    return this;
  }

  /**
   * 生成图表选项
   * 
   * 这是工厂的核心方法，负责将数据和配置转换为ECharts的option对象
   * 
   * @param {Object} data - 图表数据
   * @param {Object} config - 配置对象
   * @returns {Object} ECharts option对象
   */
  generateOptions(data, config) {
    // 获取图表类型配置
    const chartConfig = CHART_TYPE_CONFIGS[this.chartType];
    if (!chartConfig) {
      throw new Error(`Unsupported chart type: ${this.chartType}`);
    }

    // 基础配置：所有图表共同的配置
    const baseOptions = {
      color: this.theme.colors.series, // 系列颜色
      backgroundColor: this.theme.colors.background.chart, // 图表背景色
      grid: this.theme.grid, // 网格配置
      // 图例配置
      legend: {
        textStyle: { color: this.theme.colors.text.primary },
        icon: 'circle', // 图例图标
        itemHeight: 8,
        left: 'center',
        top: 'top',
        itemGap: 20
      }
    };

    // 坐标系统配置：根据图表类型生成对应的坐标系
    const coordSystem = COORDINATE_SYSTEMS[chartConfig.coordinateSystem];
    const coordConfig = coordSystem ? coordSystem(data, this.theme, config) : {};

    // 系列配置：生成ECharts的series数组
    const series = Array.isArray(data.series) ? 
      // 多系列图表：为每个系列生成配置
      data.series.map((s, idx) => {
        const seriesConfig = chartConfig.series(s, this.theme, config);
        const themeColor = s.color || this.theme.colors.series[idx % this.theme.colors.series.length];
        
        return {
          name: s.name, // 系列名称，用于图例显示
          ...seriesConfig,
          itemStyle: {
            ...seriesConfig.itemStyle,
            color: themeColor // 确保颜色正确应用
          },
          // 为线图和极坐标折线图应用lineStyle颜色
          ...(seriesConfig.lineStyle && {
            lineStyle: {
              ...seriesConfig.lineStyle,
              color: themeColor
            }
          })
        };
      }) :
      // 单系列图表：直接生成一个系列配置
      [chartConfig.series(data.series || data, this.theme, config)];

    // 提示框配置：根据图表类型选择合适的提示框类型
    const tooltipType = ['bar', 'line', 'scatter'].includes(this.chartType) ? 'axis' : 'item';
    const tooltip = getTooltipConfig(this.theme, tooltipType);

    // 工具箱配置
    const toolboxType = config.toolboxType || 'basic';
    const toolbox = getToolboxConfig(this.theme, toolboxType);

    // 特殊配置：处理某些图表类型的特殊需求
    const specialConfig = this.getSpecialConfig(chartConfig, config);

    // 合并所有配置，用户自定义配置具有最高优先级
    return deepMerge(
      baseOptions,
      coordConfig,
      { series, tooltip, toolbox },
      specialConfig,
      config // 用户自定义配置最后合并，确保优先级最高
    );
  }

  /**
   * 获取特殊配置
   * 
   * 处理某些图表类型需要的特殊配置，如饼图的图例数据等
   * 
   * @param {Object} chartConfig - 图表类型配置
   * @param {Object} config - 用户配置
   * @returns {Object} 特殊配置对象
   */
  getSpecialConfig(chartConfig, config) {
    const special = {};

    // 处理坐标轴边界配置
    if (chartConfig.defaultConfig.boundaryGap !== undefined) {
      if (special.xAxis) special.xAxis.boundaryGap = chartConfig.defaultConfig.boundaryGap;
      if (special.yAxis) special.yAxis.boundaryGap = chartConfig.defaultConfig.boundaryGap;
    }

    // 饼图图例数据：从数据中提取名称用于图例显示
    if (this.chartType === 'pie' && this.currentData?.series?.[0]?.data) {
      special.legend = {
        data: this.currentData.series[0].data.map(item => item.name)
      };
    }

    // 极坐标图表图例数据：显示多系列的名称
    if (['polarBar', 'polarLine'].includes(this.chartType) && Array.isArray(this.currentData?.series)) {
      special.legend = {
        data: this.currentData.series.map(s => s.name),
        show: true
      };
    }

    return special;
  }

  /**
   * 切换主题
   * 
   * 动态切换图表主题，会自动重新渲染图表
   * 
   * @param {string|Object} themeName - 主题名称或主题对象
   * @returns {EChartFactory2} 返回自身，支持链式调用
   * 
   * 使用示例：
   * ```javascript
   * // 切换到预定义主题
   * factory.switchTheme('futuristic');
   * 
   * // 使用自定义主题对象
   * factory.switchTheme({
   *   colors: { series: ['#ff0000', '#00ff00'] }
   * });
   * ```
   */
  switchTheme(themeName) {
    this.themeName = themeName;
    this.theme = this.getTheme(themeName);
    
    // 如果有当前数据，重新渲染图表
    if (this.currentData) {
      this.update(this.currentData, this.currentConfig);
    }
    
    return this;
  }

  /**
   * 切换图表类型
   * 
   * 动态切换图表类型，如从柱状图切换到折线图
   * 
   * @param {string} chartType - 新的图表类型
   * @returns {EChartFactory2} 返回自身，支持链式调用
   * 
   * 使用示例：
   * ```javascript
   * factory.switchType('line'); // 切换到折线图
   * factory.switchType('pie');  // 切换到饼图
   * ```
   */
  switchType(chartType) {
    this.chartType = chartType;
    
    // 如果有当前数据，重新渲染图表
    if (this.currentData) {
      this.update(this.currentData, this.currentConfig);
    }
    
    return this;
  }

  /**
   * 设置预设配置
   * 
   * 预设是预定义的配置组合，如仪表盘模式、分析模式等
   * 
   * @param {string} presetName - 预设名称
   * @returns {EChartFactory2} 返回自身，支持链式调用
   * 
   * 使用示例：
   * ```javascript
   * factory.setPreset('dashboard'); // 仪表盘模式
   * factory.setPreset('analysis');  // 分析模式
   * ```
   */
  setPreset(presetName) {
    this.preset = presetName;
    
    // 如果有当前数据，重新渲染图表
    if (this.currentData) {
      this.update(this.currentData, this.currentConfig);
    }
    
    return this;
  }

  /**
   * 获取主题配置
   * 
   * 根据主题名称或主题对象获取完整的主题配置
   * 
   * @param {string|Object} themeName - 主题名称或主题对象
   * @returns {Object} 主题配置对象
   */
  getTheme(themeName) {
    const theme = themes[themeName] || themes.default;
    
    // 如果传入的是自定义主题对象，与默认主题合并
    if (typeof themeName === 'object') {
      return deepMerge({}, themes.default, themeName);
    }
    
    return theme;
  }

  /**
   * 设置自定义样式
   * 
   * 在当前主题基础上叠加自定义样式
   * 
   * @param {Object} customStyle - 自定义样式对象
   * @returns {EChartFactory2} 返回自身，支持链式调用
   * 
   * 使用示例：
   * ```javascript
   * factory.setCustomStyle({
   *   colors: { series: ['#ff0000'] },
   *   grid: { left: '5%' }
   * });
   * ```
   */
  setCustomStyle(customStyle) {
    this.theme = deepMerge({}, this.theme, { customStyle });
    
    // 如果有当前数据，重新渲染图表
    if (this.currentData) {
      this.update(this.currentData, this.currentConfig);
    }
    
    return this;
  }

  /**
   * 设置大小自适应
   * 
   * 使用ResizeObserver监听容器尺寸变化，自动调整图表大小
   * 这对于响应式设计非常重要
   */
  setupResize() {
    if (!this.resizeObserver) {
      this.resizeObserver = new ResizeObserver(entries => {
        if (this.chartInstance) {
          // 当容器尺寸变化时，调整图表大小
          this.chartInstance.resize();
        }
      });
      // 开始观察容器元素
      this.resizeObserver.observe(this.container);
    }
  }

  /**
   * 获取图表实例
   * 
   * 返回底层的ECharts实例，用于访问ECharts的原生API
   * 
   * @returns {Object|null} ECharts实例
   * 
   * 使用示例：
   * ```javascript
   * const instance = factory.getInstance();
   * instance.on('click', (params) => {
   *   console.log('图表被点击', params);
   * });
   * ```
   */
  getInstance() {
    return this.chartInstance;
  }

  /**
   * 销毁图表
   * 
   * 清理图表实例和相关资源，防止内存泄漏
   * 
   * @returns {EChartFactory2} 返回自身，支持链式调用
   * 
   * 使用场景：
   * - 组件卸载时
   * - 页面切换时
   * - 动态创建/销毁图表时
   */
  dispose() {
    // 停止尺寸观察
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
    
    // 销毁ECharts实例
    if (this.chartInstance) {
      this.chartInstance.dispose();
      this.chartInstance = null;
    }
    
    return this;
  }

  /**
   * 设置完全自定义的ECharts配置
   * 
   * 绕过工厂的所有处理逻辑，直接设置ECharts的原生配置
   * 适用于需要完全控制图表配置的高级场景
   * 
   * @param {Object} customOptions - 完全自定义的ECharts配置对象
   * @returns {EChartFactory2} 返回自身，支持链式调用
   * 
   * 使用示例：
   * ```javascript
   * factory.setCustomOptions({
   *   series: [{
   *     type: 'custom',
   *     renderItem: (params, api) => {
   *       // 自定义渲染逻辑
   *     }
   *   }]
   * });
   * ```
   */
  setCustomOptions(customOptions) {
    this.init();
    this.chartInstance.setOption(customOptions, true);
    return this;
  }

  /**
   * 生成独立样式的图表配置
   * 
   * 生成完全不受主题系统影响的图表配置，用于特殊定制需求
   * 
   * @param {Object} data - 图表数据
   * @param {Object} independentStyle - 独立样式配置
   * @returns {Object} 独立的ECharts配置对象
   * 
   * 使用示例：
   * ```javascript
   * const options = factory.generateIndependentOptions(data, {
   *   color: ['#FF6B6B', '#4ECDC4'],
   *   backgroundColor: '#000000',
   *   series: [{
   *     type: 'bar',
   *     itemStyle: {
   *       borderWidth: 2,
   *       borderColor: '#ffffff'
   *     }
   *   }]
   * });
   * 
   * factory.setCustomOptions(options);
   * ```
   */
  generateIndependentOptions(data, independentStyle) {
    // 完全独立的基础配置，不使用任何主题
    const options = deepMerge({
      // 基础动画配置
      animation: true,
      animationDuration: 2000,
      animationEasing: 'elasticOut',
      
      // 默认颜色调色板（如果独立样式没有指定）
      color: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'],
      
      // 透明背景
      backgroundColor: 'transparent',
      
      // 空的系列数组
      series: [],
      
      // 默认网格布局
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '4%',
        containLabel: true
      }
    }, independentStyle);

    // 如果有数据，根据图表类型生成系列配置
    if (data && this.chartType) {
      const chartConfig = CHART_TYPE_CONFIGS[this.chartType];
      if (chartConfig) {
        // 创建一个模拟主题对象，只包含颜色信息
        const mockTheme = {
          colors: {
            series: options.color || ['#FF6B6B', '#4ECDC4', '#45B7D1']
          }
        };
        
        // 根据数据结构生成系列配置
        if (Array.isArray(data.series)) {
          // 多系列数据
          options.series = data.series.map((s, idx) => 
            chartConfig.series(s, mockTheme, {})
          );
        } else {
          // 单系列数据
          options.series = [chartConfig.series(data, mockTheme, {})];
        }
      }
    }

    return options;
  }
}

// =====================================
// 工厂函数和实用函数
// =====================================

/**
 * 创建图表实例的工厂函数
 * 
 * 这是最常用的创建图表的方法，提供了简洁的API
 * 
 * @param {HTMLElement} container - 图表容器DOM元素
 * @param {string} chartType - 图表类型，默认'bar'
 * @param {string|Object} theme - 主题名称或主题对象，默认'default'
 * @returns {EChartFactory2} 已初始化的图表工厂实例
 * 
 * 使用示例：
 * ```javascript
 * // 创建基础柱状图
 * const chart = createChart(document.getElementById('chart'), 'bar', 'default');
 * chart.update(data);
 * 
 * // 创建科技风折线图
 * const lineChart = createChart(container, 'line', 'futuristic');
 * lineChart.update(data, { areaStyle: true });
 * ```
 */
export function createChart(container, chartType = 'bar', theme = 'default') {
  return new EChartFactory2(container, chartType, theme).init();
}

/**
 * 快速更新图表的便捷函数
 * 
 * 这个函数会复用容器上已存在的图表实例，如果不存在则创建新的
 * 适用于需要频繁更新图表的场景
 * 
 * @param {HTMLElement} container - 图表容器
 * @param {string} chartType - 图表类型
 * @param {Object} data - 图表数据
 * @param {Object} config - 配置对象，默认空对象
 * @param {string} theme - 主题名称，默认'default'
 * @returns {EChartFactory2} 图表工厂实例
 * 
 * 使用示例：
 * ```javascript
 * // 第一次调用会创建图表
 * updateChart(container, 'bar', data1, {}, 'default');
 * 
 * // 后续调用会复用实例，只更新数据和配置
 * updateChart(container, 'line', data2, { smooth: true }, 'futuristic');
 * ```
 */
export function updateChart(container, chartType, data, config = {}, theme = 'default') {
  // 检查容器上是否已有图表实例
  if (!container._chartFactory2) {
    container._chartFactory2 = createChart(container, chartType, theme);
  }
  
  const factory = container._chartFactory2;
  
  // 检查是否需要更新图表类型
  if (factory.chartType !== chartType) {
    factory.switchType(chartType);
  }
  
  // 检查是否需要更新主题
  if (factory.themeName !== theme) {
    factory.switchTheme(theme);
  }
  
  // 更新数据和配置
  factory.update(data, config);
  
  return factory;
}

/**
 * 批量创建图表
 * 
 * 一次性创建多个图表，适用于仪表盘等需要同时创建多个图表的场景
 * 
 * @param {Array} configs - 图表配置数组
 * @param {HTMLElement} configs[].container - 图表容器
 * @param {string} configs[].chartType - 图表类型
 * @param {string} configs[].theme - 主题名称
 * @param {Object} configs[].data - 图表数据
 * @param {Object} configs[].customConfig - 自定义配置
 * @returns {Array} 图表工厂实例数组
 * 
 * 使用示例：
 * ```javascript
 * const charts = createCharts([
 *   {
 *     container: document.getElementById('chart1'),
 *     chartType: 'bar',
 *     theme: 'default',
 *     data: barData,
 *     customConfig: { stack: 'total' }
 *   },
 *   {
 *     container: document.getElementById('chart2'),
 *     chartType: 'line',
 *     theme: 'futuristic',
 *     data: lineData,
 *     customConfig: { areaStyle: true }
 *   }
 * ]);
 * ```
 */
export function createCharts(configs) {
  return configs.map(config => {
    const { container, chartType, theme, data, customConfig } = config;
    return createChart(container, chartType, theme).update(data, customConfig);
  });
}

// 导出主类，供高级用法使用
export { EChartFactory2 };
