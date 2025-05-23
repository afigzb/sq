/**
 * EChartFactory2 使用示例
 * 展示API使用方法
 * 使用预转换的图表数据，专注于图表创建和配置逻辑
 * 只是个使用示例，想看代码直接看EchartFactory2这一个文件就行
 */
// 这个是非常详细的使用示例，真正用起来会比这个简单很多，这个只是展示API各种各样的使用方法
import { createChart, updateChart, createCharts, EChartFactory2 } from './EchartFactory/EchartFactory2.js';
import {
  // 转换后的图表数据
  basicBarChartData,
  multiLineChartData,
  pieChartData,
  radarChartData,
  customStyleChartData,
  presetChartData,
  batchChartsData,
  dynamicChartData,
  customThemeChartData,
  stackedBarChartData,
  inverseBarChartData,
  areaChartData,
  scatterChartData,
  roseChartData,
  polarBarChartData,
  polarLineChartData,
  multiRadarChartData,
  mixedChartData,
  dynamicDataChartData,
  independentStyleChartData,
  // 原始数据（用于动态更新）
  dynamicProductData
} from './data.js';

// =====================================
// 基础使用示例
// =====================================

/**
 * 示例1：创建基础柱状图
 * 使用销售数据，按产品分组显示销售额
 */
function createBasicBarChart(container = null) {
  const chartContainer = container || document.getElementById('chart1');
  
  // 直接使用转换后的数据
  const chart = createChart(chartContainer, 'bar', 'default');
  chart.update(basicBarChartData);
  
  return chart;
}

/**
 * 示例2：创建多系列折线图
 * 使用月度财务数据，显示收入和支出趋势
 */
function createMultiLineChart(container = null) {
  const chartContainer = container || document.getElementById('chart2');
  
  const chart = createChart(chartContainer, 'line', 'default');
  chart.update(multiLineChartData, { areaStyle: true });
  
  return chart;
}

/**
 * 示例3：饼图与主题切换
 * 使用产品分类数据显示市场份额
 */
function createPieChart(container = null) {
  const chartContainer = container || document.getElementById('chart3');
  
  const chart = createChart(chartContainer, 'pie', 'minimal');
  chart.update(pieChartData);
  return chart;
}

/**
 * 示例4：雷达图
 * 使用员工绩效数据显示多维度评分
 */
function createRadarChart(container = null) {
  const chartContainer = container || document.getElementById('chart4');
  
  const chart = createChart(chartContainer, 'radar', 'default');
  chart.update(radarChartData);
  
  return chart;
}

/**
 * 示例5：自定义样式和配置
 * 使用自定义样式测试数据展示自定义配置功能
 */
function createCustomChart() {
  const container = document.getElementById('chart5');
  
  // 自定义配置
  const customConfig = {
    toolboxType: 'standard',
    // 直接覆盖ECharts配置
    grid: {
      left: '10%',
      right: '10%'
    },
    // 自定义样式
    itemStyle: {
      borderWidth: 2,
      borderColor: '#fff'
    }
  };
  
  const chart = createChart(container, 'bar', 'futuristic');
  chart.update(customStyleChartData, customConfig);
  
  // 设置自定义样式
  chart.setCustomStyle({
    animation: { duration: 2000 }
  });
  
  return chart;
}

/**
 * 示例6：预设配置的使用
 * 使用季度财务数据展示预设配置功能
 */
function createPresetChart() {
  const container = document.getElementById('chart6');
  
  const chart = createChart(container, 'bar', 'default');
  
  // 使用仪表盘预设
  chart.setPreset('dashboard');
  chart.update(presetChartData);
  
  // 切换到分析预设
  setTimeout(() => {
    chart.setPreset('analysis');
  }, 3000);
  
  return chart;
}

/**
 * 示例7：批量创建图表 - API演示与主题对比
 * 
 * 功能演示：
 * 1. 使用 createCharts() 批量API一次性创建多个图表
 * 2. 展示不同主题在相同数据类型上的视觉效果对比
 * 3. 演示配置数组的使用方式，提高开发效率
 * 
 * 实际应用场景：
 * - 仪表盘页面需要创建多个图表
 * - 主题切换功能的预览
 * - 批量图表的统一管理和配置
 */
function createBatchCharts() {
  const { barData, lineData, pieData } = batchChartsData;
  
  // 批量配置数组 - 一次性定义多个图表的配置
  const configs = [
    {
      container: document.getElementById('chart7-1'),
      chartType: 'bar',
      theme: 'default',        // 默认主题
      data: {
        xAxis: barData.xAxis.data,
        series: [{ data: barData.series[0].data }]
      }
    },
    {
      container: document.getElementById('chart7-2'),
      chartType: 'line',
      theme: 'minimal',        // 简约风格主题
      data: {
        xAxis: lineData.xAxis.data,
        series: [{ data: lineData.series[0].data }]
      }
    },
    {
      container: document.getElementById('chart7-3'),
      chartType: 'pie',
      theme: 'cleanDark',      // 清爽暗色主题
      data: {
        series: pieData.series
      }
    }
  ];
  
  // 使用批量API创建图表 - 比单独创建更高效
  const charts = createCharts(configs);
  console.log('批量创建完成！创建了', charts.length, '个不同主题的图表');
  
  return charts;
}

/**
 * 示例8：动态图表类型切换
 * 使用动态图表类型切换数据展示图表类型切换功能
 */
function createDynamicChart() {
  const container = document.getElementById('chart8');
  
  const chart = createChart(container, 'bar', 'default');
  chart.update(dynamicChartData);
  
  const chartTypes = ['bar', 'line', 'scatter'];
  let currentTypeIndex = 0;
  
  // 每2秒切换一次图表类型
  setInterval(() => {
    currentTypeIndex = (currentTypeIndex + 1) % chartTypes.length;
    chart.switchType(chartTypes[currentTypeIndex]);
  }, 2000);
  
  return chart;
}

/**
 * 示例9：自定义主题对象
 * 使用自定义主题测试数据展示自定义主题功能
 */
function createCustomThemeChart() {
  const container = document.getElementById('chart9');
  
  // 自定义主题
  const customTheme = {
    colors: {
      series: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7'],
      text: { primary: '#2d3436', secondary: '#636e72' },
      background: { chart: '#f8f9fa' }
    },
    grid: {
      left: '8%',
      right: '8%',
      top: '15%',
      bottom: '15%'
    }
  };
  
  const chart = new EChartFactory2(container, 'bar', customTheme);
  chart.init().update(customThemeChartData);
  
  return chart;
}

// =====================================
// 高级功能示例
// =====================================

/**
 * 示例11：堆叠柱状图
 * 使用用户访问数据，按渠道堆叠显示访问量
 */
function createStackedBarChart() {
  const container = document.getElementById('stackedBarChart');
  
  const chart = createChart(container, 'bar', 'default');
  chart.update(stackedBarChartData, { stack: 'total' });
  
  return chart;
}

/**
 * 示例12：翻转坐标系柱状图（水平柱状图）
 * 使用地区销售数据显示各地区Q1和Q2销售对比
 */
function createInverseBarChart() {
  const container = document.getElementById('inverseBarChart');
  
  const chart = createChart(container, 'bar', 'default');
  chart.update(inverseBarChartData, { inverse: true });
  
  return chart;
}

/**
 * 示例13：面积折线图
 * 使用用户访问数据显示各渠道访问趋势
 */
function createAreaChart() {
  const container = document.getElementById('areaChart');
  
  const chart = createChart(container, 'line', 'default');
  chart.update(areaChartData, { areaStyle: true });
  
  return chart;
}

/**
 * 示例14：散点图
 * 使用身高体重数据按性别分组显示
 */
function createScatterChart() {
  const container = document.getElementById('scatterChart');
  
  const chart = createChart(container, 'scatter', 'default');
  chart.update(scatterChartData);
  
  return chart;
}

/**
 * 示例15：玫瑰图
 * 使用玫瑰数据创建南丁格尔玫瑰图
 */
function createRoseChart() {
  const container = document.getElementById('roseChart');
  
  const chart = createChart(container, 'pie', 'default');
  chart.update(roseChartData, { roseType: 'area' });
  
  return chart;
}

/**
 * 示例16：极坐标柱状图
 * 使用极坐标数据创建极坐标柱状图
 */
function createPolarBarChart() {
  const container = document.getElementById('polarBarChart');
  
  const chart = createChart(container, 'polarBar', 'default');
  chart.update(polarBarChartData, { 
    legend: {
      show: true,
      bottom: '5%'
    }
  });
  
  return chart;
}

/**
 * 示例17：极坐标折线图
 * 使用周访问量数据创建极坐标折线图
 */
function createPolarLineChart() {
  const container = document.getElementById('polarLineChart');
  
  const chart = createChart(container, 'polarLine', 'default');
  chart.update(polarLineChartData);
  
  return chart;
}

/**
 * 示例18：多系列雷达图
 * 使用员工绩效数据显示部门对比
 */
function createMultiRadarChart() {
  const container = document.getElementById('multiRadarChart');
  
  const chart = createChart(container, 'radar', 'default');
  chart.update(multiRadarChartData);
  
  return chart;
}

/**
 * 示例19：复杂多系列混合图表
 * 使用天气数据创建蒸发量、降水量柱状图和温度折线图的混合图表
 */
function createMixedChart() {
  const container = document.getElementById('mixedChart');
  
  const chart = createChart(container, 'bar', 'default');
  
  // 使用主题系统的配置，然后添加混合图表的特殊配置
  const mixedConfig = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: chart.theme.colors.axisLine || '#999'
        }
      }
    },
    legend: {
      data: ['蒸发量', '降水量', '平均温度'],
      top: '8%'
    },
    yAxis: [
      {
        type: 'value',
        name: '水量',
        position: 'left',
        min: 0,
        max: 80,
        interval: 20,
        axisLabel: {
          formatter: '{value} ml'
        }
      },
      {
        type: 'value',
        name: '温度',
        position: 'right',
        min: 0,
        max: 12,
        interval: 3,
        axisLabel: {
          formatter: '{value} °C'
        }
      }
    ],
    series: [
      {
        name: '蒸发量',
        type: 'bar',
        data: mixedChartData.evaporationData
      },
      {
        name: '降水量',
        type: 'bar',
        data: mixedChartData.precipitationData
      },
      {
        name: '平均温度',
        type: 'line',
        yAxisIndex: 1,
        data: mixedChartData.temperatureData,
        smooth: true,
        itemStyle: { 
          color: chart.theme.colors.series[2] || '#fac858' 
        },
        lineStyle: { 
          color: chart.theme.colors.series[2] || '#fac858',
          width: 2
        },
        symbol: 'circle',
        symbolSize: 6
      }
    ]
  };
  
  chart.update({
    xAxis: mixedChartData.xAxis,
    series: []
  }, mixedConfig);
  
  return chart;
}

/**
 * 示例20：动态数据更新演示
 * 使用动态产品数据，定期更新数据
 */
function createDynamicDataChart() {
  const container = document.getElementById('dynamicDataChart');
  
  const chart = createChart(container, 'bar', 'default');
  chart.update(dynamicDataChartData);
  
  // 每3秒更新一次数据
  setInterval(() => {
    // 随机更新销量数据并重新转换
    const updatedData = dynamicProductData.map(item => ({
      ...item,
      sales: Math.floor(Math.random() * 1000) + 100
    }));
    
    // 简单的数据转换（这里可以调用转换工具，但为了演示简化）
    const newChartData = {
      xAxis: updatedData.map(item => item.product),
      series: [{
        name: '销量',
        data: updatedData.map(item => item.sales)
      }]
    };
    
    chart.update(newChartData);
  }, 3000);
  
  return chart;
}

/**
 * 示例10：复杂独立样式图表（不遵循主题）
 * 使用编程语言热度数据创建赛博朋克风格图表
 */
function createIndependentStyleChart() {
  const container = document.getElementById('independentChart');

  // 创建基础图表实例
  const chart = createChart(container, 'bar', 'default');
  
  // 定义复杂的独立样式配置
  const independentStyle = {
    // 深色渐变背景
    backgroundColor: {
      type: 'linear',
      x: 0, y: 0, x2: 0, y2: 1,
      colorStops: [
        { offset: 0, color: '#0f0f23' },
        { offset: 0.5, color: '#1a1a2e' },
        { offset: 1, color: '#16213e' }
      ]
    },
    
    // 自定义颜色调色板
    color: [
      {
        type: 'linear',
        x: 0, y: 0, x2: 0, y2: 1,
        colorStops: [
          { offset: 0, color: '#00d2ff' },
          { offset: 1, color: '#3a7bd5' }
        ]
      }
    ],
    
    // 标题配置
    title: {
      text: '编程语言热度榜',
      subtext: '基于 GitHub 活跃度统计',
      left: 'center',
      top: '3%',
      textStyle: {
        color: '#ffffff',
        fontSize: 28,
        fontWeight: 'bold',
        fontFamily: '"Orbitron", "Microsoft YaHei", sans-serif',
        textShadowColor: '#00d2ff',
        textShadowBlur: 10,
        textShadowOffsetX: 0,
        textShadowOffsetY: 0
      },
      subtextStyle: {
        color: '#a8a8a8',
        fontSize: 14,
        fontFamily: '"Roboto Mono", monospace'
      }
    },
    
    // 网格配置
    grid: {
      left: '8%',
      right: '8%',
      bottom: '15%',
      top: '20%',
      containLabel: true,
      backgroundColor: 'rgba(255, 255, 255, 0.02)',
      borderColor: 'rgba(0, 210, 255, 0.3)',
      borderWidth: 1,
      shadowColor: 'rgba(0, 210, 255, 0.5)',
      shadowBlur: 20
    },
    
    // X轴配置
    xAxis: {
      type: 'category',
      data: independentStyleChartData.xAxis,
      axisLine: {
        lineStyle: {
          color: '#00d2ff',
          width: 2,
          shadowColor: '#00d2ff',
          shadowBlur: 10
        }
      },
      axisTick: {
        lineStyle: {
          color: '#00d2ff',
          width: 2
        },
        length: 8
      },
      axisLabel: {
        color: '#ffffff',
        fontSize: 14,
        fontFamily: '"Fira Code", "Courier New", monospace',
        fontWeight: 'bold',
        margin: 12,
        rotate: 0,
        textShadowColor: '#00d2ff',
        textShadowBlur: 5
      },
      splitLine: {
        show: false
      }
    },
    
    // Y轴配置
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: '#00d2ff',
          width: 2,
          shadowColor: '#00d2ff',
          shadowBlur: 10
        }
      },
      axisTick: {
        lineStyle: {
          color: '#00d2ff',
          width: 2
        }
      },
      axisLabel: {
        color: '#ffffff',
        fontSize: 12,
        fontFamily: '"Roboto Mono", monospace',
        formatter: '{value}%',
        textShadowColor: '#00d2ff',
        textShadowBlur: 3
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(0, 210, 255, 0.2)',
          width: 1,
          type: 'dashed'
        }
      }
    },
    
    // 系列配置
    series: [{
      name: '受欢迎程度',
      type: 'bar',
      data: independentStyleChartData.series[0].data,
      barWidth: '60%',
      itemStyle: {
        color: {
          type: 'linear',
          x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: '#00f5ff' },
            { offset: 0.5, color: '#00d2ff' },
            { offset: 1, color: '#3a7bd5' }
          ]
        },
        borderColor: '#00f5ff',
        borderWidth: 2,
        borderRadius: [8, 8, 0, 0],
        shadowColor: 'rgba(0, 245, 255, 0.8)',
        shadowBlur: 20,
        shadowOffsetX: 0,
        shadowOffsetY: 0
      },
      emphasis: {
        itemStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: '#ff6b6b' },
              { offset: 0.5, color: '#ee5a52' },
              { offset: 1, color: '#d63031' }
            ]
          },
          shadowColor: 'rgba(255, 107, 107, 1)',
          shadowBlur: 30
        }
      },
      label: {
        show: true,
        position: 'top',
        color: '#ffffff',
        fontSize: 14,
        fontWeight: 'bold',
        fontFamily: '"Orbitron", sans-serif',
        formatter: '{c}%',
        textShadowColor: '#00d2ff',
        textShadowBlur: 5
      },
      animationDelay: function (idx) {
        return idx * 200;
      },
      animationEasing: 'elasticOut'
    }],
    
    // 提示框配置
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(15, 15, 35, 0.9)',
      borderColor: '#00d2ff',
      borderWidth: 2,
      textStyle: {
        color: '#ffffff',
        fontSize: 14,
        fontFamily: '"Roboto", sans-serif'
      },
      extraCssText: `
        box-shadow: 0 0 30px rgba(0, 210, 255, 0.8);
        border-radius: 10px;
        backdrop-filter: blur(10px);
      `,
      formatter: function(params) {
        const data = params[0];
        return `
          <div style="text-align: center;">
            <div style="color: #00d2ff; font-size: 16px; font-weight: bold; margin-bottom: 8px;">
              ${data.name}
            </div>
            <div style="color: #ffffff; font-size: 18px;">
              受欢迎程度: <span style="color: #00f5ff; font-weight: bold;">${data.value}%</span>
            </div>
          </div>
        `;
      }
    },
    
    // 图例配置
    legend: {
      show: false
    },
    
    // 工具箱配置
    toolbox: {
      show: true,
      right: '5%',
      top: '5%',
      iconStyle: {
        borderColor: '#00d2ff',
        borderWidth: 2
      },
      emphasis: {
        iconStyle: {
          borderColor: '#00f5ff',
          shadowColor: '#00f5ff',
          shadowBlur: 10
        }
      },
      feature: {
        saveAsImage: {
          title: '保存图片',
          backgroundColor: '#0f0f23'
        },
        restore: {
          title: '重置'
        }
      }
    },
    
    // 动画配置
    animation: true,
    animationDuration: 2000,
    animationEasing: 'elasticOut',
    animationDelay: 0,
    animationDurationUpdate: 1000,
    animationEasingUpdate: 'cubicInOut'
  };

  // 应用独立样式
  const options = chart.generateIndependentOptions(independentStyleChartData, independentStyle);
  chart.setCustomOptions(options);
  
  return chart;
}

// =====================================
// 页面加载时执行所有示例
// =====================================

document.addEventListener('DOMContentLoaded', () => {
  // 确保页面有对应的容器元素后再执行
  if (document.getElementById('chart1')) {
    createBasicBarChart();
  }
  
  // 其他示例类似...
  console.log('EChartFactory2 示例加载完成 - 使用预转换的图表数据');
});

// 导出示例函数，便于在控制台测试
export {
  createBasicBarChart,
  createMultiLineChart,
  createPieChart,
  createRadarChart,
  createCustomChart,
  createPresetChart,
  createBatchCharts,
  createDynamicChart,
  createCustomThemeChart,
  createIndependentStyleChart,
  createStackedBarChart,
  createInverseBarChart,
  createAreaChart,
  createScatterChart,
  createRoseChart,
  createPolarBarChart,
  createPolarLineChart,
  createMultiRadarChart,
  createMixedChart,
  createDynamicDataChart
}; 