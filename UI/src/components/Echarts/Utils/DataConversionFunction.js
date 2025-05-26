/**
 * ECharts数据转换工具类
 * 这是数据转换函数，实际上只要能传入正确格式的数据即可，用不用这个函数是无所谓的，有自己的转化逻辑用自己的也行，反正这东西我八成也不会维护
 */
export class EChartsDataConverter {
    /**
     * 通用数据转换函数
     * @param {Array} data - 原始数据数组
     * @param {Object} config - 配置对象
     * @param {string|Array<string>} config.categoryField - 分类字段名或字段数组
     * @param {string|Array<string>} config.valueField - 数值字段名或字段数组
     * @param {string} config.seriesField - 系列字段名（用于多系列数据）
     * @param {Array<Object>} config.dimensions - 多维度配置数组
     * @param {string} type - 图表类型：'pie' | 'rose' | 'polarBar' | 'radar' | 'scatter' | 'area' | 'bar' | 'line'
     * @returns {Object} - 转换后的ECharts数据格式
     */
    static convertToEChartsData(data, config, type) {
        // 验证输入
        if (!Array.isArray(data) || !data.length) {
            throw new Error('输入数据必须是非空数组');
        }

        // 标准化数据结构
        const normalizedData = this.normalizeData(data, config);
        
        // 根据图表类型选择转换方法并传递标准化后的数据
        return this.convertByChartType(normalizedData, type);
    }

    /**
     * 将各种格式的数据标准化为统一结构
     * @param {Array} data - 原始数据数组
     * @param {Object} config - 配置对象
     * @returns {Object} - 包含标准化数据和配置信息的对象
     */
    static normalizeData(data, config) {
        const { categoryField, valueField, seriesField, dimensions } = config;
        
        // 检查配置的数据类型
        const isMultiSeries = !!seriesField;
        const isMultiDimension = Array.isArray(dimensions) && dimensions.length > 0;

        let result = {
            rawData: data,
            config: config,
            isMultiSeries,
            isMultiDimension,
            categories: [],
            series: [],
            seriesData: {},
            dimensions: []
        };

        // 处理多维度数据
        if (isMultiDimension) {
            result.dimensions = dimensions.map(dim => ({ 
                field: dim.field,
                name: dim.name || dim.field,
                max: dim.max,
                min: dim.min
            }));
            
            // 不需要提取categories，因为多维度直接使用dimensions定义
            return result;
        }
        
        // 提取分类数据
        if (categoryField) {
            result.categories = [...new Set(data.map(item => item[categoryField]))];
        }
        
        // 处理多系列数据
        if (isMultiSeries) {
            // 提取所有唯一的系列值
            result.series = [...new Set(data.map(item => item[seriesField]))];
            
            // 按系列组织数据
            result.seriesData = result.series.reduce((acc, seriesValue) => {
                const seriesItems = data.filter(item => item[seriesField] === seriesValue);
                
                // 为每个系列预处理数据
                if (categoryField) {
                    // 构建按分类组织的数据映射
                    const categoryMap = {};
                    seriesItems.forEach(item => {
                        categoryMap[item[categoryField]] = item[valueField];
                    });
                    
                    // 确保所有分类都有数据点
                    acc[seriesValue] = {
                        name: seriesValue,
                        // 确保每个系列都有所有类别的数据，没有的用0填充
                        values: result.categories.map(category => categoryMap[category] || 0),
                        // 保存原始项以便需要时访问
                        items: seriesItems
                    };
                } else {
                    // 不基于类别的多系列数据
                    acc[seriesValue] = {
                        name: seriesValue,
                        values: seriesItems.map(item => item[valueField]),
                        items: seriesItems
                    };
                }
                return acc;
            }, {});
        } else if (categoryField && valueField) {
            // 单系列数据
            // 提取数值
            const values = data.map(item => item[valueField]);
            result.seriesData['default'] = {
                values: values,
                items: data
            };
        }
        
        return result;
    }

    /**
     * 根据图表类型将标准化数据转换为特定图表格式
     * @param {Object} normalizedData - 标准化后的数据
     * @param {string} type - 图表类型
     * @returns {Object} - 特定图表格式的数据
     */
    static convertByChartType(normalizedData, type) {
        const { isMultiSeries, isMultiDimension } = normalizedData;
        
        // 根据图表类型和数据特性选择转换方法
        // 分组按图表大类处理
        if (this.isAxisBasedChart(type)) {
            return this.createAxisBasedChart(normalizedData, type);
        } else if (this.isCircularChart(type)) {
            return this.createCircularChart(normalizedData, type);
        } else if (type === 'radar') {
            return this.createRadarChart(normalizedData);
        } else if (type === 'scatter' || type === 'scatter3D') {
            return this.createScatterChart(normalizedData, type);
        } else if (type === 'polarBar') {
            return this.createPolarBarChart(normalizedData);
        } else if (type === 'parallel') {
            return this.createParallelChart(normalizedData);
        } else {
            throw new Error(`不支持的图表类型: ${type}`);
        }
    }
    
    /**
     * 判断图表类型是否为轴基础图表
     */
    static isAxisBasedChart(type) {
        return ['bar', 'line', 'area'].includes(type);
    }
    
    /**
     * 判断图表类型是否为圆形图表
     */
    static isCircularChart(type) {
        return ['pie', 'rose'].includes(type);
    }

    /**
     * 创建轴基础图表（柱状图、折线图、面积图）
     */
    static createAxisBasedChart(normalizedData, type) {
        const { categories, isMultiSeries, series, seriesData } = normalizedData;
        
        // 图表类型转换（area 类型在 ECharts 中使用 line 类型加 areaStyle）
        const chartType = type === 'area' ? 'line' : type;
        
        // 构建系列配置
        const buildSeriesConfig = (name, values) => {
            const config = {
                name,
                type: chartType,
                data: values
            };
            
            if (type === 'area') {
                config.areaStyle = {};
            }
            
            return config;
        };

        // 构建系列数据
        const seriesConfig = isMultiSeries 
            ? series.map(seriesName => buildSeriesConfig(
                seriesName, 
                seriesData[seriesName].values
            ))
            : [buildSeriesConfig('默认系列', seriesData['default'].values)];
        
        // 返回最终的图表配置
        return {
            xAxis: {
                type: 'category',
                data: categories
            },
            yAxis: {
                type: 'value'
            },
            series: seriesConfig
        };
    }

    /**
     * 创建圆形图表（饼图、玫瑰图）
     */
    static createCircularChart(normalizedData, type) {
        const { isMultiSeries, series, seriesData, rawData, config } = normalizedData;
        const { categoryField, valueField } = config;
        
        if (isMultiSeries) {
            // 多系列饼图
            const seriesConfig = series.map((seriesName, index) => {
                const items = seriesData[seriesName].items;
                
                return {
                    name: seriesName,
                    type: 'pie',
                    radius: `${50 / series.length}%`,
                    center: [`${50}%`, `${50}%`],
                    data: items.map(item => ({
                        name: item[categoryField],
                        value: item[valueField]
                    }))
                };
            });
            
            return { series: seriesConfig };
        } else {
            // 单系列饼图/玫瑰图
            const seriesConfig = {
                type: 'pie',
                data: rawData.map(item => ({
                    name: item[categoryField],
                    value: item[valueField]
                }))
            };
            
            // 玫瑰图特有配置
            if (type === 'rose') {
                seriesConfig.radius = ['30%', '75%'];
                seriesConfig.roseType = 'area';
            }
            
            return { series: [seriesConfig] };
        }
    }

    /**
     * 创建雷达图
     */
    static createRadarChart(normalizedData) {
        const { isMultiSeries, isMultiDimension, categories, series, seriesData, dimensions, rawData, config } = normalizedData;
        const { categoryField, valueField } = config;
        
        // 多维度雷达图
        if (isMultiDimension) {
            // 构建雷达图指标
            const indicator = dimensions.map(dim => ({
                name: dim.name,
                max: dim.max || Math.max(...rawData.map(item => item[dim.field]), 1) * 1.1
            }));
            
            // 构建系列数据
            const seriesData = rawData.map((item, index) => ({
                name: item.name || `数据${index + 1}`,
                value: dimensions.map(dim => item[dim.field] || 0)
            }));
            
            return {
                radar: { indicator },
                series: [{ type: 'radar', data: seriesData }]
            };
        }
        
        // 单系列或多系列雷达图
        // 计算每个指标的最大值
        const getMaxValue = (category) => {
            const relevantData = rawData.filter(item => item[categoryField] === category);
            return Math.max(...relevantData.map(item => item[valueField]), 1) * 1.1;
        };
        
        // 构建雷达图指标
        const indicator = categories.map(category => ({
            name: category,
            max: getMaxValue(category)
        }));
        
        if (isMultiSeries) {
            // 多系列雷达图数据
            const seriesItems = series.map(seriesName => {
                const seriesItems = seriesData[seriesName].items;
                const categoryMap = {};
                
                // 映射每个类别的值
                seriesItems.forEach(item => {
                    categoryMap[item[categoryField]] = item[valueField];
                });
                
                // 确保所有类别都有数据
                return {
                    name: seriesName,
                    value: categories.map(category => categoryMap[category] || 0)
                };
            });
            
            return {
                radar: { indicator },
                series: [{ type: 'radar', data: seriesItems }]
            };
        } else {
            // 单系列雷达图数据
            const categoryValueMap = {};
            rawData.forEach(item => {
                categoryValueMap[item[categoryField]] = item[valueField];
            });
            
            // 确保所有类别都有数据，没有的用0填充
            const seriesItem = {
                name: '数据',
                value: categories.map(category => categoryValueMap[category] || 0)
            };
            
            return {
                radar: { indicator },
                series: [{ type: 'radar', data: [seriesItem] }]
            };
        }
    }

    /**
     * 创建散点图
     */
    static createScatterChart(normalizedData, type) {
        const { isMultiSeries, isMultiDimension, series, seriesData, dimensions, rawData, config } = normalizedData;
        const { categoryField, valueField, seriesField } = config;
        
        // 3D散点图（多维度）
        if (type === 'scatter3D') {
            if (!isMultiDimension || dimensions.length < 3) {
                throw new Error('3D散点图至少需要3个维度');
            }
            
            // 构建3D散点图数据
            const scatterData = rawData.map(item => [
                item[dimensions[0].field] || 0,
                item[dimensions[1].field] || 0,
                item[dimensions[2].field] || 0
            ]);
            
            return {
                xAxis3D: { name: dimensions[0].name },
                yAxis3D: { name: dimensions[1].name },
                zAxis3D: { name: dimensions[2].name },
                series: [{ type: 'scatter3D', data: scatterData }]
            };
        }
        
        // 2D散点图
        if (isMultiSeries) {
            // 多系列散点图
            const seriesConfig = series.map(seriesName => ({
                name: seriesName,
                type: 'scatter',
                data: seriesData[seriesName].items.map(item => [
                    item[categoryField],
                    item[valueField]
                ])
            }));
            
            return {
                xAxis: { type: 'category' },
                yAxis: { type: 'value' },
                series: seriesConfig
            };
        } else {
            // 单系列散点图
            return {
                xAxis: { 
                    type: 'category',
                    data: [...new Set(rawData.map(item => item[categoryField]))]
                },
                yAxis: { type: 'value' },
                series: [{
                    type: 'scatter',
                    data: rawData.map(item => [item[categoryField], item[valueField]])
                }]
            };
        }
    }

    /**
     * 创建极坐标柱状图
     */
    static createPolarBarChart(normalizedData) {
        const { rawData, config } = normalizedData;
        const { categoryField, valueField } = config;
        
        return {
            polar: {
                radius: ['20%', '80%']
            },
            angleAxis: {
                type: 'category',
                data: rawData.map(item => item[categoryField])
            },
            radiusAxis: {
                type: 'value'
            },
            series: [{
                type: 'bar',
                data: rawData.map(item => item[valueField]),
                coordinateSystem: 'polar'
            }]
        };
    }

    /**
     * 创建平行坐标图
     */
    static createParallelChart(normalizedData) {
        const { dimensions, rawData } = normalizedData;
        
        // 构建坐标轴
        const parallelAxis = dimensions.map((dim, index) => ({
            dim: index,
            name: dim.name,
            max: dim.max,
            min: dim.min
        }));
        
        // 构建系列数据
        const seriesData = rawData.map(item => {
            return dimensions.map(dim => item[dim.field] || 0);
        });
        
        return {
            parallelAxis: parallelAxis,
            series: [{
                type: 'parallel',
                data: seriesData
            }]
        };
    }
}
