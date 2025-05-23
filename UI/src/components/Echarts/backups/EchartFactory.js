/**
 * ECharts图表工厂模块
 * 这是废弃的旧代码，很复杂所以我不用他了，你觉得好拿来有也是完全可以的
 * 该模块实现了一个灵活的图表生成系统，支持多种图表类型和主题配置
 * 使用策略模式和工厂模式来创建和管理不同类型的图表
 */

import { getThemeConfig, mergeThemeWithCustom, getPresetConfig, getToolboxConfig, themeHasToolbox } from '../config/index.js';

/**
 * 主题管理器类
 * 负责处理图表的主题配置，包括颜色、样式等
 * 提供主题相关的配置生成方法
 */
class ThemeManager {
  /**
   * 构造函数
   * @param {string|object} themeConfig - 主题配置，可以是主题名称或自定义主题对象
   */
  constructor(themeConfig = 'dark') {
    // 初始化时更新主题配置
    this.updateTheme(themeConfig);
  }

  /**
   * 更新主题配置
   * @param {string|object} themeConfig - 新的主题配置
   */
  updateTheme(themeConfig) {
    // 如果传入的是字符串，获取对应的主题配置
    if (typeof themeConfig === 'string') {
      this.theme = getThemeConfig(themeConfig);
    } 
    // 如果传入的是对象，与默认主题合并
    else if (typeof themeConfig === 'object') {
      this.theme = mergeThemeWithCustom('dark', themeConfig);
    } 
    // 如果传入的值无效，使用默认暗色主题
    else {
      this.theme = getThemeConfig('dark');
    }
  }

  /**
   * 获取提示框样式配置
   * @param {string} type - 提示框类型：'item'或'axis'
   * @returns {object} 提示框配置对象
   */
  getTooltipStyle(type = 'item') {
    // 基础提示框配置
    const base = {
      // 继承主题中的提示框配置
      ...this.theme.components.tooltip,
      // 设置背景色（如果主题中没有设置，则使用默认值）
      backgroundColor: this.theme.components.tooltip.backgroundColor || this.theme.colors.background.tooltip,
      // 设置文本样式
      textStyle: { 
        ...this.theme.components.tooltip.textStyle, 
        color: this.theme.colors.text.inverse 
      },
      // 添加额外的CSS样式（如果主题中没有设置，则使用默认值）
      extraCssText: this.theme.components.tooltip.extraCssText || 'box-shadow: 0 2px 8px rgba(0,0,0,0.15); border-radius: 4px; padding: 8px 12px;'
    };

    // 如果是坐标轴提示框，添加额外的配置
    if (type === 'axis') {
      return {
        ...base,
        trigger: 'axis',
        axisPointer: { 
          type: 'line', 
          lineStyle: { color: this.theme.colors.axisLine, width: 1 } 
        }
      };
    }
    
    // 返回基础提示框配置
    return {
      ...base,
      trigger: 'item'
    };
  }

  /**
   * 获取增强的坐标轴样式配置（包含主题组件配置）
   * @returns {object} 增强的坐标轴样式配置对象
   */
  getEnhancedAxisStyle() {
    return {
      // 设置坐标轴线样式
      axisLine: { lineStyle: { color: this.theme.colors.axisLine, width: 1 } },
      // 设置坐标轴标签样式（包含主题组件配置）
      axisLabel: { 
        color: this.theme.colors.text.secondary,
        ...this.theme.components.axisLabel
      }
    };
  }

  /**
   * 获取坐标轴样式配置
   * @returns {object} 坐标轴样式配置对象
   */
  getAxisStyle() {
    return {
      // 设置坐标轴线样式
      axisLine: { lineStyle: { color: this.theme.colors.axisLine, width: 1 } },
      // 设置坐标轴标签样式（仅提供基础样式，不覆盖自定义配置）
      axisLabel: { 
        color: this.theme.colors.text.secondary
        // 移除 ...this.theme.components.axisLabel 避免覆盖自定义配置
      }
    };
  }

  /**
   * 获取工具箱样式配置
   * @param {string} type - 工具箱类型
   * @returns {object} 工具箱配置对象
   */
  getToolboxStyle(type = 'basic') {
    // 获取基础工具箱配置
    const toolboxConfig = getToolboxConfig(type, this.theme);
    
    // 如果主题禁用了工具箱，直接返回配置
    if (this.theme.hasToolbox === false) {
      return toolboxConfig;
    }
    
    // 返回完整的工具箱配置
    return {
      show: true,
      right: '10px',
      top: '10px',
      // 设置图标样式
      iconStyle: {
        borderColor: this.theme.colors.text.secondary
      },
      // 设置高亮样式
      emphasis: {
        iconStyle: {
          borderColor: this.theme.colors.text.primary
        }
      },
      ...toolboxConfig
    };
  }

  /**
   * 获取基础配置
   * @returns {object} 基础配置对象
   */
  getBaseConfig() {
    return {
      // 设置系列颜色
      color: this.theme.colors.series,
      // 设置背景色
      backgroundColor: this.theme.colors.background.chart,
      // 设置网格配置
      grid: this.theme.grid,
      // 设置图例配置
      legend: {
        textStyle: { 
          color: this.theme.colors.text.primary
        },
        icon: 'circle',
        itemHeight: 8,
        left: 'center',
        top: 'top',
        itemGap: 20
      }
    };
  }

  /**
   * 获取系列颜色
   * @param {number} index - 颜色索引
   * @returns {string} 颜色值
   */
  getSeriesColor(index) {
    // 循环使用主题中定义的颜色
    return this.theme.colors.series[index % this.theme.colors.series.length];
  }
}

/**
 * 图表工具类
 * 提供通用的工具方法
 */
class ChartUtils {
  /**
   * 深度合并多个对象
   * @param {...object} objects - 要合并的对象
   * @returns {object} 合并后的对象
   */
  static deepMerge(...objects) {
    // 使用lodash的merge方法进行深度合并
    return _.merge({}, ...objects);
  }

  /**
   * 获取两个配置对象的差异
   * @param {object} oldOptions - 旧配置
   * @param {object} newOptions - 新配置
   * @returns {object} 差异对象
   */
  static getOptionsDiff(oldOptions, newOptions) {
    const diff = {};
    // 检查旧配置中在新配置中不存在的属性
    Object.keys(oldOptions).forEach(key => {
      if (!Object.prototype.hasOwnProperty.call(newOptions, key)) {
        _.set(diff, key, undefined);
      }
    });
    
    // 递归比较对象差异
    const compareObjects = (obj1, obj2, path = '') => {
      // 获取所有键的并集
      const allKeys = _.union(_.keys(obj1), _.keys(obj2));
      allKeys.forEach(key => {
        const currentPath = path ? `${path}.${key}` : key;
        const val1 = _.get(obj1, key);
        const val2 = _.get(obj2, key);
        // 如果值不相等
        if (!_.isEqual(val1, val2)) {
          // 如果是对象且不是数组，继续递归比较
          if (_.isObject(val2) && _.isObject(val1) && !_.isArray(val2)) {
            compareObjects(val1, val2, currentPath);
          } else {
            // 记录差异
            _.set(diff, currentPath, val2);
          }
        }
      });
    };
    
    // 开始比较
    compareObjects(oldOptions, newOptions);
    return diff;
  }
}

/**
 * 坐标系统策略基类
 * 定义坐标系统的基本接口
 */
class CoordinateSystemStrategy {
  /**
   * @param {ThemeManager} themeManager - 主题管理器实例
   */
  constructor(themeManager) {
    this.themeManager = themeManager;
  }

  /**
   * 生成坐标系统配置
   * @param {object} chartData - 图表数据
   * @throws {Error} 未实现错误
   */
  generateConfig(chartData) {
    throw new Error('Method not implemented');
  }

  /**
   * 验证数据
   * @param {object} chartData - 图表数据
   * @throws {Error} 未实现错误
   */
  validateData(chartData) {
    throw new Error('Method not implemented');
  }
}

/**
 * 图表类型策略基类
 * 定义图表类型的基本接口
 */
class ChartTypeStrategy {
  /**
   * @param {ThemeManager} themeManager - 主题管理器实例
   * @param {CoordinateSystemStrategy} coordSystemStrategy - 坐标系统策略实例
   */
  constructor(themeManager, coordSystemStrategy) {
    this.themeManager = themeManager;
    this.coordSystemStrategy = coordSystemStrategy;
  }

  /**
   * 生成系列配置
   * @param {object} series - 系列数据
   * @param {number} index - 系列索引
   * @param {object} customConfig - 自定义配置
   * @throws {Error} 未实现错误
   */
  generateSeriesConfig(series, index, customConfig) {
    throw new Error('Method not implemented');
  }

  /**
   * 生成图表配置
   * @param {object} chartData - 图表数据
   * @param {object} customConfig - 自定义配置
   * @throws {Error} 未实现错误
   */
  generateOptions(chartData, customConfig = {}) {
    throw new Error('Method not implemented');
  }
}

class CartesianCoordinateSystem extends CoordinateSystemStrategy {
  generateConfig(chartData) {
    const { xAxis: xData, inverse = false } = chartData;
    
    const valueAxis = {
      type: 'value',
      splitLine: { 
        lineStyle: { 
          color: this.themeManager.theme.colors.axisLine, 
          width: 0.5, 
          opacity: 0.4 
        } 
      }
    };
    
    const categoryAxis = {
      type: 'category',
      data: inverse ? undefined : xData,
      ...this.themeManager.getEnhancedAxisStyle()
    };

    return {
      xAxis: inverse ? valueAxis : categoryAxis,
      yAxis: inverse ? categoryAxis : valueAxis
    };
  }

  validateData() {
    return true;
  }
}

class PolarCoordinateSystem extends CoordinateSystemStrategy {
  generateConfig(chartData) {
    const { angleData } = chartData;
    
    return {
      polar: { 
        center: ['50%', '50%'], 
        radius: '70%' 
      },
      angleAxis: { 
        type: 'category',
        data: angleData || [],
        ...this.themeManager.getEnhancedAxisStyle()
      },
      radiusAxis: {
        type: 'value',
        ...this.themeManager.getEnhancedAxisStyle()
      },
      xAxis: { 
        show: false, 
        axisLine: {show: false}, 
        axisTick: {show: false}, 
        axisLabel: {show: false} 
      },
      yAxis: { 
        show: false, 
        axisLine: {show: false}, 
        axisTick: {show: false}, 
        axisLabel: {show: false} 
      },
      grid: { show: false }
    };
  }

  validateData() {
    return true;
  }
}

class RadarCoordinateSystem extends CoordinateSystemStrategy {
  generateConfig(chartData) {
    const indicators = chartData.indicator || chartData.series?.[0]?.indicator || [];
    
    return {
      radar: {
        indicator: indicators,
        axisLine: { lineStyle: { color: this.themeManager.theme.colors.axisLine } },
        splitLine: { lineStyle: { color: this.themeManager.theme.colors.axisLine, opacity: 0.4 } },
        splitArea: { areaStyle: { color: ['transparent'] } },
        name: { textStyle: { color: this.themeManager.theme.colors.text.secondary } }
      },
      xAxis: { 
        show: false, 
        axisLine: {show: false}, 
        axisTick: {show: false}, 
        axisLabel: {show: false} 
      },
      yAxis: { 
        show: false, 
        axisLine: {show: false}, 
        axisTick: {show: false}, 
        axisLabel: {show: false} 
      },
      grid: { show: false }
    };
  }

  validateData() {
    return true;
  }
}

class StandaloneCoordinateSystem extends CoordinateSystemStrategy {
  generateConfig() {
    return {
      xAxis: { show: false, axisLine: {show: false}, axisTick: {show: false}, axisLabel: {show: false} },
      yAxis: { show: false, axisLine: {show: false}, axisTick: {show: false}, axisLabel: {show: false} },
      grid: { show: false }
    };
  }

  validateData() {
    return true;
  }
}

class BarChartStrategy extends ChartTypeStrategy {
  generateSeriesConfig(series, index, customConfig = {}) {
    const { inverse = false, stack = false } = customConfig;
    
    return {
      type: 'bar',
      name: series.name,
      data: series.data,
      stack: stack || undefined,
      itemStyle: { 
        color: series.color || this.themeManager.getSeriesColor(index),
        borderRadius: inverse ? [0, 2, 2, 0] : [2, 2, 0, 0]
      }
    };
  }

  generateOptions(chartData, customConfig = {}) {
    const coordConfig = this.coordSystemStrategy.generateConfig(chartData);
    
    const series = chartData.series.map((s, idx) => 
      this.generateSeriesConfig(s, idx, customConfig)
    );

    const toolboxType = customConfig.toolboxType || 'standard';

    // 基础配置合并，确保 customConfig 有最高优先级
    const options = ChartUtils.deepMerge(
      this.themeManager.getBaseConfig(),
      coordConfig,
      {
        series,
        tooltip: this.themeManager.getTooltipStyle('axis'),
        toolbox: this.themeManager.getToolboxStyle(toolboxType)
      },
      customConfig  // customConfig 放在最后，确保最高优先级
    );

    if (options.xAxis) {
      options.xAxis.boundaryGap = true;
    }
    if (options.yAxis) {
      options.yAxis.boundaryGap = true;
    }

    return options;
  }
}

class LineChartStrategy extends ChartTypeStrategy {
  generateSeriesConfig(series, index, customConfig = {}) {
    const { areaStyle = false } = customConfig;
    
    const config = {
      type: 'line',
      name: series.name,
      data: series.data,
      smooth: true,
      lineStyle: { width: areaStyle ? 1 : 2 },
      symbol: 'circle',
      symbolSize: 6,
      itemStyle: { 
        color: series.color || this.themeManager.getSeriesColor(index) 
      }
    };
    
    if (areaStyle) {
      config.areaStyle = { opacity: 0.25 };
    }
    
    return config;
  }

  generateOptions(chartData, customConfig = {}) {
    const coordConfig = this.coordSystemStrategy.generateConfig(chartData);
    
    const series = chartData.series.map((s, idx) => 
      this.generateSeriesConfig(s, idx, customConfig)
    );

    const toolboxType = customConfig.toolboxType || 'standard';

    // 基础配置合并，确保 customConfig 有最高优先级
    return ChartUtils.deepMerge(
      this.themeManager.getBaseConfig(),
      coordConfig,
      {
        series,
        tooltip: this.themeManager.getTooltipStyle('axis'),
        toolbox: this.themeManager.getToolboxStyle(toolboxType)
      },
      customConfig  // customConfig 放在最后，确保最高优先级
    );
  }
}

class ScatterChartStrategy extends ChartTypeStrategy {
  generateSeriesConfig(series, index, customConfig = {}) {
    return {
      type: 'scatter',
      name: series.name,
      data: series.data,
      symbolSize: 8,
      itemStyle: { 
        color: series.color || this.themeManager.getSeriesColor(index),
        borderWidth: 1.5
      }
    };
  }

  generateOptions(chartData, customConfig = {}) {
    const coordConfig = this.coordSystemStrategy.generateConfig(chartData);
    
    const series = chartData.series.map((s, idx) => 
      this.generateSeriesConfig(s, idx, customConfig)
    );

    const toolboxType = customConfig.toolboxType || 'standard';

    // 基础配置合并，确保 customConfig 有最高优先级
    return ChartUtils.deepMerge(
      this.themeManager.getBaseConfig(),
      coordConfig,
      {
        series,
        tooltip: this.themeManager.getTooltipStyle('axis'),
        toolbox: this.themeManager.getToolboxStyle(toolboxType)
      },
      customConfig  // customConfig 放在最后，确保最高优先级
    );
  }
}

class PolarBarChartStrategy extends ChartTypeStrategy {
  generateSeriesConfig(series, index, customConfig = {}) {
    return {
      type: 'bar',
      name: series.name,
      data: series.data,
      coordinateSystem: 'polar',
      stack: 'polarStack',
      itemStyle: { 
        color: series.color || this.themeManager.getSeriesColor(index)
      }
    };
  }

  generateOptions(chartData, customConfig = {}) {
    const coordConfig = this.coordSystemStrategy.generateConfig(chartData);
    
    const series = chartData.series.map((s, idx) => 
      this.generateSeriesConfig(s, idx, customConfig)
    );

    const toolboxType = customConfig.toolboxType || 'basic';

    // 基础配置合并，确保 customConfig 有最高优先级
    return ChartUtils.deepMerge(
      this.themeManager.getBaseConfig(),
      coordConfig,
      {
        series,
        tooltip: this.themeManager.getTooltipStyle('item'),
        toolbox: this.themeManager.getToolboxStyle(toolboxType)
      },
      customConfig  // customConfig 放在最后，确保最高优先级
    );
  }
}

class PolarLineChartStrategy extends ChartTypeStrategy {
  generateSeriesConfig(series, index, customConfig = {}) {
    return {
      type: 'line',
      name: series.name,
      data: series.data,
      coordinateSystem: 'polar',
      smooth: true,
      itemStyle: { 
        color: series.color || this.themeManager.getSeriesColor(index)
      }
    };
  }

  generateOptions(chartData, customConfig = {}) {
    const coordConfig = this.coordSystemStrategy.generateConfig(chartData);
    
    const series = chartData.series.map((s, idx) => 
      this.generateSeriesConfig(s, idx, customConfig)
    );

    const toolboxType = customConfig.toolboxType || 'basic';

    // 基础配置合并，确保 customConfig 有最高优先级
    return ChartUtils.deepMerge(
      this.themeManager.getBaseConfig(),
      coordConfig,
      {
        series,
        tooltip: this.themeManager.getTooltipStyle('item'),
        toolbox: this.themeManager.getToolboxStyle(toolboxType)
      },
      customConfig  // customConfig 放在最后，确保最高优先级
    );
  }
}

class RadarChartStrategy extends ChartTypeStrategy {
  generateSeriesConfig(series, index) {
    return {
      type: 'radar',
      name: series.name,
      data: (series.data || []).map((item, idx) => ({
        ...item,
        itemStyle: {
          color: item.color || this.themeManager.getSeriesColor(idx)
        },
        lineStyle: {
          color: item.color || this.themeManager.getSeriesColor(idx)
        },
        areaStyle: {
          color: item.color || this.themeManager.getSeriesColor(idx),
          opacity: 0.25
        }
      })),
      symbol: 'circle',
      symbolSize: 6
    };
  }

  generateOptions(chartData, customConfig = {}) {
    const coordConfig = this.coordSystemStrategy.generateConfig(chartData);
    
    const series = chartData.series.map((s, idx) => 
      this.generateSeriesConfig(s, idx, customConfig)
    );

    const toolboxType = customConfig.toolboxType || 'basic';

    // 基础配置合并，确保 customConfig 有最高优先级
    return ChartUtils.deepMerge(
      this.themeManager.getBaseConfig(),
      coordConfig,
      {
        series,
        tooltip: this.themeManager.getTooltipStyle('item'),
        toolbox: this.themeManager.getToolboxStyle(toolboxType)
      },
      customConfig  // customConfig 放在最后，确保最高优先级
    );
  }
}

class PieChartStrategy extends ChartTypeStrategy {
  generateSeriesConfig(series, customConfig = {}) {
    const { roseType } = customConfig;
    
    const config = {
      type: 'pie',
      data: series.data || [],
      itemStyle: { 
        borderRadius: roseType ? 5 : 0
      }
    };
    
    if (roseType) {
      config.radius = ['15%', '55%'];
      config.center = ['50%', '50%'];
      config.roseType = roseType;
      config.label = { 
        show: true, 
        position: 'outside', 
        formatter: '{b}: {d}%' 
      };
    } else {
      config.radius = ['40%', '70%'];
      config.label = { show: false };
    }
    
    return config;
  }

  generateOptions(chartData, customConfig = {}) {
    const coordConfig = this.coordSystemStrategy.generateConfig(chartData);
    
    const seriesData = chartData.series?.[0];
    const series = [this.generateSeriesConfig(seriesData, customConfig)];
    
    const toolboxType = customConfig.toolboxType || 'standard';
    
    // 基础配置合并，确保 customConfig 有最高优先级
    const baseOptions = ChartUtils.deepMerge(
      this.themeManager.getBaseConfig(),
      coordConfig,
      {
        series,
        tooltip: this.themeManager.getTooltipStyle('item'),
        toolbox: this.themeManager.getToolboxStyle(toolboxType)
      },
      customConfig  // customConfig 放在最后，确保最高优先级
    );
    
    // 设置图例数据（如果没有自定义legend数据）
    if (!customConfig.legend?.data && seriesData?.data) {
      baseOptions.legend.data = seriesData.data.map(item => item.name) || [];
    }
    
    return baseOptions;
  }
}

/**
 * 策略工厂类
 * 负责创建和管理各种图表策略
 */
class StrategyFactory {
  /**
   * @param {ThemeManager} themeManager - 主题管理器实例
   */
  constructor(themeManager) {
    this.themeManager = themeManager;
    this.coordinateStrategies = {
      cartesian: new CartesianCoordinateSystem(themeManager),
      polar: new PolarCoordinateSystem(themeManager),
      radar: new RadarCoordinateSystem(themeManager),
      standalone: new StandaloneCoordinateSystem(themeManager)
    };
  }

  /**
   * 根据图表类型获取对应的坐标系统
   * @param {string} chartType - 图表类型
   * @returns {CoordinateSystemStrategy} 坐标系统策略实例
   */
  getCoordinateSystemForChartType(chartType) {
    const mappings = {
      bar: 'cartesian',
      line: 'cartesian',
      area: 'cartesian',
      scatter: 'cartesian',
      polarBar: 'polar',
      polarLine: 'polar',
      radar: 'radar',
      pie: 'standalone',
      rose: 'standalone'
    };
    
    return this.coordinateStrategies[mappings[chartType] || 'standalone'];
  }

  /**
   * 创建图表策略
   * @param {string} chartType - 图表类型
   * @returns {ChartTypeStrategy} 图表策略实例
   * @throws {Error} 不支持的图表类型错误
   */
  createChartStrategy(chartType) {
    const coordSystem = this.getCoordinateSystemForChartType(chartType);
    
    switch (chartType) {
      case 'bar':
        return new BarChartStrategy(this.themeManager, coordSystem);
      case 'line':
        return new LineChartStrategy(this.themeManager, coordSystem);
      case 'area':
        return new LineChartStrategy(this.themeManager, coordSystem, { areaStyle: true });
      case 'scatter':
        return new ScatterChartStrategy(this.themeManager, coordSystem);
      case 'polarBar':
        return new PolarBarChartStrategy(this.themeManager, coordSystem);
      case 'polarLine':
        return new PolarLineChartStrategy(this.themeManager, coordSystem);
      case 'radar':
        return new RadarChartStrategy(this.themeManager, coordSystem);
      case 'pie':
      case 'rose':
        return new PieChartStrategy(this.themeManager, coordSystem);
      default:
        throw new Error(`Unsupported chart type: ${chartType}`);
    }
  }
}

/**
 * ECharts图表工厂类
 * 主要的图表创建和管理类
 */
class EChartFactory {
  /**
   * 构造函数
   * @param {HTMLElement} chartDom - 图表容器DOM元素
   * @param {string} chartType - 图表类型
   * @param {string} theme - 主题名称
   * @param {string} preset - 预设配置名称
   */
  constructor(chartDom, chartType, theme = 'dark', preset) {
    // 保存图表容器
    this.chartDom = chartDom;
    // 保存图表类型
    this.chartType = chartType;
    // 图表实例初始化为null
    this.chartInstance = null;
    // 大小观察器初始化为null
    this.resizeObserver = null;
    // 最后的配置选项初始化为null
    this.lastOptions = null;
    // 创建主题管理器
    this.themeManager = new ThemeManager(theme);
    // 创建策略工厂
    this.strategyFactory = new StrategyFactory(this.themeManager);
    // 创建图表策略
    this.chartStrategy = this.strategyFactory.createChartStrategy(chartType);
    // 保存预设配置
    this.preset = preset;
    // 保存当前主题
    this._currentTheme = theme;
    // 保存当前数据
    this._currentData = null;
    // 保存当前自定义配置
    this._currentCustomConfig = null;
  }

  /**
   * 初始化图表实例
   * @returns {EChartFactory} 当前实例
   */
  init() {
    // 如果图表实例不存在，创建新实例
    if (!this.chartInstance) {
      this.chartInstance = echarts.init(this.chartDom);
    }
    return this;
  }

  /**
   * 更新图表数据和配置
   * @param {object} chartData - 图表数据
   * @param {object} customConfig - 自定义配置
   * @returns {EChartFactory} 当前实例
   */
  update(chartData, customConfig = {}) {
    // 确保图表已初始化
    this.init();
    
    // 处理配置
    let finalConfig = customConfig;
    if (this.preset) {
      // 如果有预设配置，与自定义配置合并
      const presetConfig = getPresetConfig(this.preset);
      finalConfig = _.merge({}, presetConfig, customConfig);
    }
    
    // 生成图表配置
    const options = this.chartStrategy.generateOptions(chartData, finalConfig);
    
    // 设置图表配置
    this.chartInstance.setOption(options, true);
    
    // 保存当前配置和数据
    this.lastOptions = _.cloneDeep(options);
    this._currentData = chartData;
    this._currentCustomConfig = customConfig;
    return this;
  }

  /**
   * 监听容器大小变化
   * @returns {EChartFactory} 当前实例
   */
  observeResize() {
    // 如果还没有创建观察器
    if (!this.resizeObserver) {
      // 创建ResizeObserver实例
      this.resizeObserver = new ResizeObserver(entries => {
        entries.forEach(entry => {
          // 获取新的尺寸
          const [size] = entry.contentBoxSize;
          const width = size.inlineSize;
          const height = size.blockSize;
          // 调整图表大小
          this.chartInstance?.resize({
            width: width,
            height: height,
            animation: { duration: 0 }
          });
        });
      });
      // 开始观察容器
      this.resizeObserver.observe(this.chartDom, { box: 'content-box' });
    }
    return this;
  }

  /**
   * 切换主题
   * @param {string} theme - 新主题名称
   * @returns {EChartFactory} 当前实例
   */
  switchTheme(theme) {
    // 更新主题管理器
    this.themeManager.updateTheme(theme);
    // 保存当前主题
    this._currentTheme = theme;
    
    // 如果有图表实例和配置，重新应用配置
    if (this.chartInstance && this.lastOptions) {
      this.chartInstance.setOption(this.lastOptions, true);
    }
    return this;
  }

  /**
   * 切换预设配置
   * @param {string} preset - 新预设配置名称
   * @returns {EChartFactory} 当前实例
   */
  switchPreset(preset) {
    // 更新预设配置
    this.preset = preset;
    
    // 如果有图表实例和数据，重新更新图表
    if (this.chartInstance && this._currentData) {
      this.update(this._currentData, this._currentCustomConfig || {});
    }
    
    return this;
  }

  /**
   * 设置图表配置
   * @param {object} option - 图表配置对象
   * @returns {EChartFactory} 当前实例
   */
  setOption(option) {
    // 如果有图表实例，设置配置
    if (this.chartInstance) {
      this.chartInstance.setOption(option, true);
      this.lastOptions = _.cloneDeep(option);
    }
    return this;
  }

  /**
   * 获取图表实例
   * @returns {object} ECharts实例
   */
  getChartInstance() {
    return this.chartInstance;
  }

  /**
   * 更改图表类型
   * @param {string} newChartType - 新图表类型
   * @returns {EChartFactory} 当前实例
   */
  changeType(newChartType) {
    // 如果类型没变，直接返回
    if (newChartType === this.chartType) return this;
    
    // 更新图表类型和策略
    this.chartType = newChartType;
    this.chartStrategy = this.strategyFactory.createChartStrategy(newChartType);
    return this;
  }

  /**
   * 销毁图表实例
   * @returns {EChartFactory} 当前实例
   */
  dispose() {
    // 断开大小观察器
    this.resizeObserver?.disconnect();
    // 销毁图表实例
    this.chartInstance?.dispose();
    // 重置所有状态
    this.chartInstance = null;
    this.resizeObserver = null;
    this.lastOptions = null;
    this._currentData = null;
    this._currentCustomConfig = null;
    return this;
  }
}

/**
 * 创建图表工厂实例
 * @param {HTMLElement} chartDom - 图表容器DOM元素
 * @param {string} chartType - 图表类型
 * @param {string} theme - 主题名称
 * @param {string} preset - 预设配置名称
 * @returns {EChartFactory} 图表工厂实例
 */
function createChartFactory(chartDom, chartType, theme = 'dark', preset) {
  // 创建工厂实例并初始化
  return new EChartFactory(chartDom, chartType, theme, preset)
    .init()
    .observeResize();
}

/**
 * 更新通用图表
 * @param {HTMLElement} chartDom - 图表容器DOM元素
 * @param {string} chartType - 图表类型
 * @param {object} chartData - 图表数据
 * @param {object} customConfig - 自定义配置
 * @param {string} theme - 主题名称
 * @param {string} preset - 预设配置名称
 */
function updateUniversalChart(chartDom, chartType, chartData, customConfig, theme = 'dark', preset) {
  // 如果没有容器，直接返回
  if (!chartDom) return;
  
  // 获取或创建图表工厂
  let factory = chartDom._chartFactory;
  let needResetChart = false;
  
  // 检查是否需要创建新的工厂实例
  if (!factory || factory.chartType !== chartType) {
    if (factory) {
      factory.dispose();
    }
    
    factory = createChartFactory(chartDom, chartType, theme, preset);
    chartDom._chartFactory = factory;
    needResetChart = false;
  } 
  // 检查是否需要切换主题
  else if (factory._currentTheme !== theme) {
    factory.switchTheme(theme);
    needResetChart = true;
  }
  // 检查是否需要切换预设
  else if (factory.preset !== preset) {
    factory.switchPreset(preset);
    needResetChart = true;
  }
  
  // 根据是否需要重置图表来决定更新方式
  if (needResetChart) {
    let finalConfig = customConfig;
    if (preset) {
      const presetConfig = getPresetConfig(preset);
      finalConfig = _.merge({}, presetConfig, customConfig);
    }
    
    const strategy = factory.chartStrategy;
    const options = strategy.generateOptions(chartData, finalConfig);
    factory.setOption(options);
  } else {
    factory.update(chartData, customConfig);
  }
}

export {
  createChartFactory,
  updateUniversalChart,
  EChartFactory,
  themeHasToolbox
};