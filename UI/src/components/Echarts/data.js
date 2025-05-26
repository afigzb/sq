/**
 * 模拟数据库数据及转换后的图表数据
 * 这些数据模拟从后端API或数据库获取的原始数据格式
 * 并通过数据转换工具转换为ECharts可用的格式
 * 只是个数据模拟的js，同时有展示如何使用数据转换函数
 */

import { EChartsDataConverter } from './Utils/DataConversionFunction.js';

// =====================================
// 原始数据库数据
// =====================================

// 销售数据表
export const salesData = [
  { id: 1, date: '2024-01-01', product: '产品A', sales_amount: 120, region: '华北', category: '电子产品' },
  { id: 2, date: '2024-01-01', product: '产品B', sales_amount: 200, region: '华南', category: '电子产品' },
  { id: 3, date: '2024-01-01', product: '产品C', sales_amount: 150, region: '华东', category: '家居用品' },
  { id: 4, date: '2024-01-02', product: '产品A', sales_amount: 80, region: '华北', category: '电子产品' },
  { id: 5, date: '2024-01-02', product: '产品B', sales_amount: 70, region: '华南', category: '电子产品' },
  { id: 6, date: '2024-01-02', product: '产品C', sales_amount: 90, region: '华东', category: '家居用品' },
  { id: 7, date: '2024-01-03', product: '产品A', sales_amount: 160, region: '华北', category: '电子产品' },
  { id: 8, date: '2024-01-03', product: '产品B', sales_amount: 180, region: '华南', category: '电子产品' },
  { id: 9, date: '2024-01-03', product: '产品C', sales_amount: 140, region: '华东', category: '家居用品' }
];

// 用户访问数据表
export const userVisitData = [
  { id: 1, date: '2024-01-01', channel: '直接访问', visits: 320, bounce_rate: 0.3, avg_duration: 180 },
  { id: 2, date: '2024-01-01', channel: '邮件营销', visits: 120, bounce_rate: 0.4, avg_duration: 240 },
  { id: 3, date: '2024-01-01', channel: '联盟广告', visits: 220, bounce_rate: 0.35, avg_duration: 200 },
  { id: 4, date: '2024-01-02', channel: '直接访问', visits: 302, bounce_rate: 0.32, avg_duration: 190 },
  { id: 5, date: '2024-01-02', channel: '邮件营销', visits: 132, bounce_rate: 0.38, avg_duration: 250 },
  { id: 6, date: '2024-01-02', channel: '联盟广告', visits: 182, bounce_rate: 0.33, avg_duration: 210 },
  { id: 7, date: '2024-01-03', channel: '直接访问', visits: 301, bounce_rate: 0.29, avg_duration: 195 },
  { id: 8, date: '2024-01-03', channel: '邮件营销', visits: 101, bounce_rate: 0.42, avg_duration: 230 },
  { id: 9, date: '2024-01-03', channel: '联盟广告', visits: 191, bounce_rate: 0.31, avg_duration: 220 }
];

// 员工绩效数据表
export const employeePerformanceData = [
  { id: 1, employee_name: '张三', department: '销售部', sales_score: 85, management_score: 70, tech_score: 60, service_score: 80, research_score: 65, market_score: 75 },
  { id: 2, employee_name: '李四', department: '技术部', sales_score: 60, management_score: 80, tech_score: 95, service_score: 70, research_score: 90, market_score: 55 },
  { id: 3, employee_name: '王五', department: '市场部', sales_score: 75, management_score: 85, tech_score: 50, service_score: 85, research_score: 70, market_score: 90 },
  { id: 4, employee_name: '赵六', department: '客服部', sales_score: 70, management_score: 75, tech_score: 65, service_score: 95, research_score: 60, market_score: 80 }
];

// 产品分类销售数据表
export const productCategoryData = [
  { id: 1, category: '电子产品', total_sales: 2850, market_share: 0.35, growth_rate: 0.15 },
  { id: 2, category: '家居用品', total_sales: 2100, market_share: 0.25, growth_rate: 0.08 },
  { id: 3, category: '服装配饰', total_sales: 1680, market_share: 0.20, growth_rate: 0.12 },
  { id: 4, category: '食品饮料', total_sales: 1260, market_share: 0.15, growth_rate: 0.05 },
  { id: 5, category: '其他', total_sales: 420, market_share: 0.05, growth_rate: 0.03 }
];

// 月度财务数据表
export const monthlyFinanceData = [
  { id: 1, month: '1月', revenue: 1200000, expense: 800000, profit: 400000, tax: 80000 },
  { id: 2, month: '2月', revenue: 1500000, expense: 1000000, profit: 500000, tax: 100000 },
  { id: 3, month: '3月', revenue: 1800000, expense: 1200000, profit: 600000, tax: 120000 },
  { id: 4, month: '4月', revenue: 2000000, expense: 1400000, profit: 600000, tax: 120000 },
  { id: 5, month: '5月', revenue: 2200000, expense: 1500000, profit: 700000, tax: 140000 },
  { id: 6, month: '6月', revenue: 2500000, expense: 1600000, profit: 900000, tax: 180000 }
];

// 地区销售数据表
export const regionSalesData = [
  { id: 1, region: '华北', q1_sales: 1200, q2_sales: 1500, q3_sales: 1800, q4_sales: 2000 },
  { id: 2, region: '华南', q1_sales: 1000, q2_sales: 1300, q3_sales: 1600, q4_sales: 1900 },
  { id: 3, region: '华东', q1_sales: 1500, q2_sales: 1800, q3_sales: 2100, q4_sales: 2400 },
  { id: 4, region: '华西', q1_sales: 800, q2_sales: 1000, q3_sales: 1200, q4_sales: 1500 },
  { id: 5, region: '东北', q1_sales: 600, q2_sales: 800, q3_sales: 1000, q4_sales: 1200 }
];

// 用户年龄分布数据表
export const userAgeData = [
  { id: 1, age_group: '18-25', user_count: 1548, percentage: 0.25 },
  { id: 2, age_group: '26-35', user_count: 2100, percentage: 0.34 },
  { id: 3, age_group: '36-45', user_count: 1350, percentage: 0.22 },
  { id: 4, age_group: '46-55', user_count: 780, percentage: 0.13 },
  { id: 5, age_group: '55+', user_count: 372, percentage: 0.06 }
];

// 身高体重数据表（用于散点图）
export const heightWeightData = [
  { id: 1, gender: '女性', height: 161.2, weight: 51.6, age: 25 },
  { id: 2, gender: '女性', height: 167.5, weight: 59.0, age: 28 },
  { id: 3, gender: '女性', height: 159.5, weight: 49.2, age: 22 },
  { id: 4, gender: '女性', height: 157.0, weight: 63.0, age: 30 },
  { id: 5, gender: '女性', height: 155.8, weight: 53.6, age: 26 },
  { id: 6, gender: '女性', height: 170.0, weight: 59.0, age: 29 },
  { id: 7, gender: '女性', height: 159.1, weight: 47.6, age: 24 },
  { id: 8, gender: '女性', height: 166.0, weight: 69.8, age: 32 },
  { id: 9, gender: '女性', height: 176.2, weight: 66.8, age: 27 },
  { id: 10, gender: '女性', height: 160.2, weight: 75.2, age: 31 },
  { id: 11, gender: '男性', height: 174.0, weight: 65.6, age: 28 },
  { id: 12, gender: '男性', height: 175.3, weight: 71.8, age: 30 },
  { id: 13, gender: '男性', height: 193.5, weight: 80.7, age: 35 },
  { id: 14, gender: '男性', height: 186.5, weight: 72.6, age: 29 },
  { id: 15, gender: '男性', height: 187.2, weight: 78.8, age: 32 },
  { id: 16, gender: '男性', height: 181.5, weight: 74.8, age: 27 },
  { id: 17, gender: '男性', height: 184.0, weight: 86.4, age: 33 },
  { id: 18, gender: '男性', height: 184.5, weight: 78.4, age: 31 },
  { id: 19, gender: '男性', height: 175.0, weight: 62.0, age: 26 },
  { id: 20, gender: '男性', height: 184.0, weight: 81.6, age: 34 }
];

// 编程语言热度数据表
export const programmingLanguageData = [
  { id: 1, language: 'JavaScript', popularity_score: 95, github_stars: 2500000, job_count: 15000 },
  { id: 2, language: 'Python', popularity_score: 88, github_stars: 2200000, job_count: 12000 },
  { id: 3, language: 'Java', popularity_score: 82, github_stars: 1800000, job_count: 18000 },
  { id: 4, language: 'TypeScript', popularity_score: 76, github_stars: 1500000, job_count: 8000 },
  { id: 5, language: 'Go', popularity_score: 71, github_stars: 1200000, job_count: 6000 },
  { id: 6, language: 'Rust', popularity_score: 65, github_stars: 900000, job_count: 3000 }
];

// 极坐标数据表
export const polarData = [
  { id: 1, angle: '0°', value1: 1, value2: 2 },
  { id: 2, angle: '45°', value1: 2, value2: 3 },
  { id: 3, angle: '90°', value1: 3, value2: 4 },
  { id: 4, angle: '135°', value1: 4, value2: 5 },
  { id: 5, angle: '180°', value1: 3, value2: 4 },
  { id: 6, angle: '225°', value1: 2, value2: 3 },
  { id: 7, angle: '270°', value1: 1, value2: 2 },
  { id: 8, angle: '315°', value1: 2, value2: 3 }
];

// 周访问量数据表
export const weeklyVisitData = [
  { id: 1, day: '周一', visits: 28 },
  { id: 2, day: '周二', visits: 48 },
  { id: 3, day: '周三', visits: 40 },
  { id: 4, day: '周四', visits: 19 },
  { id: 5, day: '周五', visits: 86 },
  { id: 6, day: '周六', visits: 27 },
  { id: 7, day: '周日', visits: 90 }
];

// 玫瑰图数据表
export const roseData = [
  { id: 1, category: '玫瑰1', value: 40 },
  { id: 2, category: '玫瑰2', value: 38 },
  { id: 3, category: '玫瑰3', value: 32 },
  { id: 4, category: '玫瑰4', value: 30 },
  { id: 5, category: '玫瑰5', value: 28 },
  { id: 6, category: '玫瑰6', value: 26 },
  { id: 7, category: '玫瑰7', value: 22 },
  { id: 8, category: '玫瑰8', value: 18 }
];

// 温度降水数据表（用于混合图表）
export const weatherData = [
  { id: 1, month: '1月', evaporation: 2.0, precipitation: 2.6, temperature: 2.0 },
  { id: 2, month: '2月', evaporation: 4.9, precipitation: 5.9, temperature: 2.2 },
  { id: 3, month: '3月', evaporation: 7.0, precipitation: 9.0, temperature: 3.3 },
  { id: 4, month: '4月', evaporation: 23.2, precipitation: 26.4, temperature: 4.5 },
  { id: 5, month: '5月', evaporation: 25.6, precipitation: 28.7, temperature: 6.3 },
  { id: 6, month: '6月', evaporation: 76.7, precipitation: 70.7, temperature: 10.2 }
];

// 动态产品销量数据表
export const dynamicProductData = [
  { id: 1, product: '产品A', sales: 234 },
  { id: 2, product: '产品B', sales: 567 },
  { id: 3, product: '产品C', sales: 345 },
  { id: 4, product: '产品D', sales: 789 },
  { id: 5, product: '产品E', sales: 432 }
];

// 自定义样式测试数据表
export const customStyleData = [
  { id: 1, category: 'A', value: 20 },
  { id: 2, category: 'B', value: 35 },
  { id: 3, category: 'C', value: 45 },
  { id: 4, category: 'D', value: 25 },
  { id: 5, category: 'E', value: 60 }
];

// 季度财务预设数据表
export const quarterlyFinanceData = [
  { id: 1, quarter: 'Q1', revenue: 1200, expense: 800 },
  { id: 2, quarter: 'Q2', revenue: 1500, expense: 1000 },
  { id: 3, quarter: 'Q3', revenue: 1800, expense: 1200 },
  { id: 4, quarter: 'Q4', revenue: 2000, expense: 1400 }
];

// 批量图表测试数据表
export const batchChartData = [
  { id: 1, category: 'A', value: 10, chart_type: 'bar' },
  { id: 2, category: 'B', value: 20, chart_type: 'bar' },
  { id: 3, category: 'C', value: 30, chart_type: 'bar' },
  { id: 4, category: 'A', value: 15, chart_type: 'line' },
  { id: 5, category: 'B', value: 25, chart_type: 'line' },
  { id: 6, category: 'C', value: 35, chart_type: 'line' }
];

// 饼图批量数据表
export const pieBatchData = [
  { id: 1, name: 'A', value: 30 },
  { id: 2, name: 'B', value: 40 },
  { id: 3, name: 'C', value: 30 }
];

// 动态图表类型切换数据表
export const dynamicTypeData = [
  { id: 1, month: '1月', value: 120 },
  { id: 2, month: '2月', value: 200 },
  { id: 3, month: '3月', value: 150 },
  { id: 4, month: '4月', value: 80 },
  { id: 5, month: '5月', value: 70 }
];

// 自定义主题测试数据表
export const customThemeData = [
  { id: 1, category: '分类1', value: 45 },
  { id: 2, category: '分类2', value: 62 },
  { id: 3, category: '分类3', value: 38 },
  { id: 4, category: '分类4', value: 77 }
];

// =====================================
// 转换后的图表数据
// =====================================

// 基础柱状图数据（使用销售数据）
export const basicBarChartData = (() => {
  const filteredData = salesData.filter(item => item.date === '2024-01-01');
  const converted = EChartsDataConverter.convertToEChartsData(
    filteredData,
    { categoryField: 'product', valueField: 'sales_amount' },
    'bar'
  );
  return {
    xAxis: converted.xAxis.data,
    series: [{ name: '销售额', data: converted.series[0].data }]
  };
})();

// 多系列折线图数据（使用月度财务数据）
export const multiLineChartData = (() => {
  const revenueData = EChartsDataConverter.convertToEChartsData(
    monthlyFinanceData,
    { categoryField: 'month', valueField: 'revenue' },
    'line'
  );
  const expenseData = EChartsDataConverter.convertToEChartsData(
    monthlyFinanceData,
    { categoryField: 'month', valueField: 'expense' },
    'line'
  );
  return {
    xAxis: revenueData.xAxis.data,
    series: [
      { name: '收入', data: revenueData.series[0].data, color: '#5470c6' },
      { name: '支出', data: expenseData.series[0].data, color: '#91cc75' }
    ]
  };
})();

// 饼图数据（使用产品分类数据）
export const pieChartData = (() => {
  const converted = EChartsDataConverter.convertToEChartsData(
    productCategoryData,
    { categoryField: 'category', valueField: 'total_sales' },
    'pie'
  );
  return { series: converted.series };
})();

// 雷达图数据（使用员工绩效数据）
export const radarChartData = (() => {
  const converted = EChartsDataConverter.convertToEChartsData(
    employeePerformanceData,
    {
      dimensions: [
        { field: 'sales_score', name: '销售', max: 100 },
        { field: 'management_score', name: '管理', max: 100 },
        { field: 'tech_score', name: '信息技术', max: 100 },
        { field: 'service_score', name: '客服', max: 100 },
        { field: 'research_score', name: '研发', max: 100 },
        { field: 'market_score', name: '市场', max: 100 }
      ]
    },
    'radar'
  );
  return {
    indicator: converted.radar.indicator,
    series: [{
      data: employeePerformanceData.map(emp => ({
        value: [
          emp.sales_score, emp.management_score, emp.tech_score,
          emp.service_score, emp.research_score, emp.market_score
        ],
        name: emp.employee_name
      }))
    }]
  };
})();

// 自定义样式图表数据
export const customStyleChartData = (() => {
  const converted = EChartsDataConverter.convertToEChartsData(
    customStyleData,
    { categoryField: 'category', valueField: 'value' },
    'bar'
  );
  return {
    xAxis: converted.xAxis.data,
    series: [{ name: '数值', data: converted.series[0].data }]
  };
})();

// 预设配置图表数据
export const presetChartData = (() => {
  const revenueData = EChartsDataConverter.convertToEChartsData(
    quarterlyFinanceData,
    { categoryField: 'quarter', valueField: 'revenue' },
    'bar'
  );
  const expenseData = EChartsDataConverter.convertToEChartsData(
    quarterlyFinanceData,
    { categoryField: 'quarter', valueField: 'expense' },
    'bar'
  );
  return {
    xAxis: revenueData.xAxis.data,
    series: [
      { name: '收入', data: revenueData.series[0].data },
      { name: '支出', data: expenseData.series[0].data }
    ]
  };
})();

// 批量图表数据
export const batchChartsData = (() => {
  const barData = EChartsDataConverter.convertToEChartsData(
    batchChartData.filter(item => item.chart_type === 'bar'),
    { categoryField: 'category', valueField: 'value' },
    'bar'
  );
  const lineData = EChartsDataConverter.convertToEChartsData(
    batchChartData.filter(item => item.chart_type === 'line'),
    { categoryField: 'category', valueField: 'value' },
    'line'
  );
  const pieData = EChartsDataConverter.convertToEChartsData(
    pieBatchData,
    { categoryField: 'name', valueField: 'value' },
    'pie'
  );
  return { barData, lineData, pieData };
})();

// 动态图表数据
export const dynamicChartData = (() => {
  const converted = EChartsDataConverter.convertToEChartsData(
    dynamicTypeData,
    { categoryField: 'month', valueField: 'value' },
    'bar'
  );
  return {
    xAxis: converted.xAxis.data,
    series: [{ name: '数据', data: converted.series[0].data }]
  };
})();

// 自定义主题图表数据
export const customThemeChartData = (() => {
  const converted = EChartsDataConverter.convertToEChartsData(
    customThemeData,
    { categoryField: 'category', valueField: 'value' },
    'bar'
  );
  return {
    xAxis: converted.xAxis.data,
    series: [{ name: '数据', data: converted.series[0].data }]
  };
})();

// 堆叠柱状图数据
export const stackedBarChartData = (() => {
  const converted = EChartsDataConverter.convertToEChartsData(
    userVisitData,
    { categoryField: 'date', valueField: 'visits', seriesField: 'channel' },
    'bar'
  );
  return {
    xAxis: converted.xAxis.data,
    series: converted.series.map((series, index) => ({
      ...series,
      color: ['#5470c6', '#91cc75', '#fac858'][index]
    }))
  };
})();

// 翻转坐标系柱状图数据
export const inverseBarChartData = (() => {
  const q1Data = EChartsDataConverter.convertToEChartsData(
    regionSalesData,
    { categoryField: 'region', valueField: 'q1_sales' },
    'bar'
  );
  const q2Data = EChartsDataConverter.convertToEChartsData(
    regionSalesData,
    { categoryField: 'region', valueField: 'q2_sales' },
    'bar'
  );
  return {
    xAxis: q1Data.xAxis.data,
    series: [
      { name: 'Q1销售', data: q1Data.series[0].data, color: '#ee6666' },
      { name: 'Q2销售', data: q2Data.series[0].data, color: '#3ba272' }
    ]
  };
})();

// 面积图数据
export const areaChartData = (() => {
  const converted = EChartsDataConverter.convertToEChartsData(
    userVisitData,
    { categoryField: 'date', valueField: 'visits', seriesField: 'channel' },
    'area'
  );
  return {
    xAxis: converted.xAxis.data,
    series: converted.series.map((series, index) => ({
      ...series,
      color: ['#5470c6', '#91cc75', '#fac858'][index]
    }))
  };
})();

// 散点图数据
export const scatterChartData = (() => {
  const converted = EChartsDataConverter.convertToEChartsData(
    heightWeightData,
    { categoryField: 'height', valueField: 'weight', seriesField: 'gender' },
    'scatter'
  );
  return {
    series: converted.series.map((series, index) => ({
      ...series,
      color: ['#ff6b6b', '#4ecdc4'][index]
    }))
  };
})();

// 玫瑰图数据
export const roseChartData = (() => {
  const converted = EChartsDataConverter.convertToEChartsData(
    roseData,
    { categoryField: 'category', valueField: 'value' },
    'rose'
  );
  return { series: converted.series };
})();

// 极坐标柱状图数据
export const polarBarChartData = (() => {
  const converted = EChartsDataConverter.convertToEChartsData(
    polarData,
    { categoryField: 'angle', valueField: 'value1' },
    'polarBar'
  );
  return {
    angleData: converted.angleAxis.data,
    series: [
      { name: '数据1', data: converted.series[0].data },
      { name: '数据2', data: polarData.map(item => item.value2) }
    ]
  };
})();

// 极坐标折线图数据
export const polarLineChartData = (() => {
  const converted = EChartsDataConverter.convertToEChartsData(
    weeklyVisitData,
    { categoryField: 'day', valueField: 'visits' },
    'line'
  );
  return {
    angleData: converted.xAxis.data,
    series: [{ name: '访问量', data: converted.series[0].data }]
  };
})();

// 多系列雷达图数据
export const multiRadarChartData = (() => {
  const selectedEmployees = employeePerformanceData.slice(0, 2);
  return {
    indicator: [
      { name: '销售', max: 100 }, { name: '管理', max: 100 },
      { name: '信息技术', max: 100 }, { name: '客服', max: 100 },
      { name: '研发', max: 100 }, { name: '市场', max: 100 }
    ],
    series: [{
      data: selectedEmployees.map(emp => ({
        value: [
          emp.sales_score, emp.management_score, emp.tech_score,
          emp.service_score, emp.research_score, emp.market_score
        ],
        name: emp.employee_name,
        itemStyle: { color: emp.employee_name === '张三' ? '#5470c6' : '#91cc75' }
      }))
    }]
  };
})();

// 混合图表数据
export const mixedChartData = (() => {
  const evaporationData = EChartsDataConverter.convertToEChartsData(
    weatherData,
    { categoryField: 'month', valueField: 'evaporation' },
    'bar'
  );
  const precipitationData = EChartsDataConverter.convertToEChartsData(
    weatherData,
    { categoryField: 'month', valueField: 'precipitation' },
    'bar'
  );
  return {
    xAxis: evaporationData.xAxis.data,
    evaporationData: evaporationData.series[0].data,
    precipitationData: precipitationData.series[0].data,
    temperatureData: weatherData.map(item => item.temperature)
  };
})();

// 动态数据更新图表数据
export const dynamicDataChartData = (() => {
  const converted = EChartsDataConverter.convertToEChartsData(
    dynamicProductData,
    { categoryField: 'product', valueField: 'sales' },
    'bar'
  );
  return {
    xAxis: converted.xAxis.data,
    series: [{ name: '销量', data: converted.series[0].data }]
  };
})();

// 独立样式图表数据
export const independentStyleChartData = (() => {
  const converted = EChartsDataConverter.convertToEChartsData(
    programmingLanguageData,
    { categoryField: 'language', valueField: 'popularity_score' },
    'bar'
  );
  return {
    xAxis: converted.xAxis.data,
    series: [{ name: '受欢迎程度', data: converted.series[0].data }]
  };
})();
