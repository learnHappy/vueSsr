import { ElMessage } from 'element-plus';
import axios from '../axios/index';
import baseApi from '../api/base';

// export const suppliesCategory = () => {

// }

// 租户编号
// export const tenantId = '3305231132';
// export const tenantId = '3305021187';
export const tenantId = '3305231132';

// 根据电脑分辨率设置高度
// 参数:  that: 传入this对象 ,reduceHeight 当前页面可见高度减去高度
// 使用该方法前提 需要在setup里面定义state常量且属性有height
export const pageHeight = (that: any, reduceHeight: number) => {
  let height = window.document.body.scrollHeight;
  that.state.height = height - reduceHeight + 'px';
  if (that.state.tableHeight) {
    that.state.tableHeight = height - reduceHeight - 32 + 'px';
  }
};

// 点击快速选择时间范围
export const fastDateHanderClick = (val: string, state: any, params: any, moment: any) => {
  state.fastDateType = val;
  let day = moment(new Date()).format('YYYYMMDD');
  if (val === 'day') {
    params.startDate = day;
    params.endDate = day;
  } else if (val === 'month') {
    params.startDate = moment(new Date()).startOf('month').format('YYYYMMDD');
    params.endDate = day;
  } else if (val === 'year') {
    params.startDate = moment(new Date()).startOf('year').format('YYYYMMDD');
    params.endDate = day;
  }
  state.date = [params.startDate, params.endDate];
};

// 自定义时间范围
export const customTimeRange = (val: string, state: any, params: any, moment: any) => {
  params.startDate = moment(val[0]).format('YYYYMMDD');
  params.endDate = moment(val[1]).format('YYYYMMDD');
  state.fastDateType = 'timeRange';
};

// 分析金额格式化
export const anlyzeMoneyFormatter = (row: any, column: any) => {
  if (!row[column.className]) {
    return '0.00';
  }
  return parseFloat(row[column.className]).toFixed(2);
};

// 金额格式化
let moneyFormatter = (row: any, column: any, cellValue: any) => {
  return parseFloat(cellValue).toFixed(2);
};

/**
 * 加载生成柱状图
 * id: dom的id
 * echarts: 引入echarts插件
 * datas: 需要加载的数据
 */
export const revenueEchartsStatistical = (id: any, echart: any, datas: any, ginsengEcharts: any) => {
  /**
   * 报表功能
   */
  let echartsCategory = echart.init(window.document.getElementById(id), 'light');
  // 指定图表的配置项和数据
  let option = {
    title: {
      text: ''
    },
    tooltip: {},
    // 防止左侧数据
    grid: {
      left: '2%',
      right: '2%',
      bottom: '10%',
      containLabel: true,
      show: 'true',
      borderWidth: '0'
    },
    xAxis: {
      data: datas.map((item: any) => {
        return ginsengEcharts[item.aggregationElement];
      })
    },
    yAxis: {
      // type: 'category',
    },
    series: [
      {
        name: '金额',
        type: 'bar',
        data: datas.map((item: any) => item.amount)
      }
    ]
  };
  // 使用刚指定的配置项和数据显示图表。
  echartsCategory.setOption(option);
};

/**
 * 加载生成柱状图
 * id: dom的id
 * echarts: 引入echarts插件
 * datas: 需要加载的数据
 */
export const echartsStatistical = (id: string, echart: any, datas: any, series: any) => {
  /**
   * 报表功能
   */
  echart.dispose(window.document.getElementById(id));
  let echartsCategory = echart.init(window.document.getElementById(id), 'light');
  // 指定图表的配置项和数据
  let option = {
    title: {
      text: ''
    },
    tooltip: {},
    // 防止左侧数据
    grid: {
      left: '2%',
      right: '2%',
      bottom: '10%',
      containLabel: true,
      show: 'true',
      borderWidth: '0'
    },
    legend: {
      data: series.map((item: any) => item.name),
      selectedMode: false,
      orient: 'horizontal',
      left: '0'
    },
    xAxis: {
      data: datas.map((item: any) => {
        return item.happenTime;
      })
    },
    yAxis: {
      // type: 'category',
    },
    series
  };
  // 使用刚指定的配置项和数据显示图表。
  echartsCategory.setOption(option);
};

/**
 * 加载生成饼图
 * id: dom的id
 * echarts: 引入echarts插件
 * datas: 需要加载的数据
 */
export const revenueEcharts = (id: string, echarts: any, datas: any, ginsengEcharts: any) => {
  echarts.dispose(window.document.getElementById(id));
  let echartsRecords = echarts.init(window.document.getElementById(id), 'light');
  let option = {
    title: {
      text: '',
      subtext: '',
      textStyle: { fontFamily: 'serif' },
      top: 50,
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    series: [
      {
        name: '金额',
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: true,
        label: {
          show: false,
          position: 'outside'
        },
        labelLine: {
          show: false
        },
        data: datas.map((item: any) => {
          return {
            name: ginsengEcharts[item.aggregationElement],
            value: item.amount
          };
        })
      }
    ]
  };
  // 使用刚指定的配置项和数据显示图表。
  echartsRecords.setOption(option);
};

// 折线图
export const echartsLineEcharts = (id: string, echarts: any, datas: any, series: any) => {
  /**
   * 报表功能
   */
  echarts.dispose(window.document.getElementById(id));
  let echartsRecords = echarts.init(window.document.getElementById(id), 'light');
  // 指定图表的配置项和数据
  let option = {
    title: {
      text: ''
    },
    tooltip: {
      formatter: (params: any) => {
        return `${params.name}${params.seriesName}金额为${params.value}`;
      }
    },
    legend: {
      data: series.map((item: any) => item.name),
      selectedMode: false,
      orient: 'horizontal',
      left: '0'
    },
    // visualMap: {
    //   calculable: false
    // },
    xAxis: {
      name: '日期',
      data: datas.map((item: any) => item.happenTime),
      nameTextStyle: {
        color: 'black'
      }
    },
    yAxis: {
      name: '',
      nameTextStyle: {
        color: 'black'
      }
    },
    series
  }; // 使用刚指定的配置项和数据显示图表。
  echartsRecords.setOption(option);
};

// 4.2租户开票项目
export const invoiceAixosData = async () => {
  let baseParams = {
    tenantId,
    fplb: '0'
  };
  let invoiceGinseng: any = [],
    invoiceFormatter: any = {};
  await axios.post(baseApi.tenantInvoiceProject, baseParams, { loading: false }).then((res: any) => {
    if (res.code === '1') {
      invoiceGinseng = res.data.map((item: any) => {
        invoiceFormatter[item.xmdm] = item.xmmc;
        return {
          label: item.xmmc,
          value: item.xmdm
        };
      });
    } else {
      ElMessage({ message: res.message, duration: 0, showClose: true, offset: 200 });
    }
  });
  return {
    invoiceGinseng,
    invoiceFormatter
  };
};

// 表格支付方式入参
export let paymentGinseng = [
  { label: '现金', value: '01', checked: true },
  { label: '支付宝', value: '02', checked: true },
  { label: '微信', value: '03', checked: true },
  { label: '银联', value: '05', checked: true },
  { label: '会员卡扣款', value: '06', checked: true },
  { label: '聚合支付', value: '07', checked: true },
  { label: '智能POSD支付', value: '08', checked: true },
  { label: '其他', value: '99', checked: true },
  { label: '医保金额', value: '100', checked: true }
];
// 表格物资类别入参
export let suppliesGinseng = [
  { label: '药品', value: '0', checked: true },
  { label: '材料', value: '1', checked: true },
  { label: '器械', value: '2', checked: true },
  { label: '保健品', value: '3', checked: true },
  { label: '非药品', value: '4', checked: true },
  { label: '诊疗', value: '99', checked: true }
];

// 表格物资类别入参
export let invoicePartGinseng = [
  { label: '西药', value: '01', checked: true },
  { label: '中成药', value: '02', checked: true },
  { label: '中草药', value: '03', checked: true }
];

// 麻黄碱表格入参
export let ephedrineGinseng = [
  { label: '处方药', value: '0', checked: true },
  { label: 'otc', value: '1', checked: true },
  { label: '麻黄碱', value: '3', checked: true }
];

// 支付方式键值对
export let paymentGinsengEcharts = {
  '01': '现金',
  '02': '支付宝',
  '03': '微信',
  '05': '银联',
  '06': '会员卡扣款',
  '07': '聚合支付',
  '08': '智能POSD支付',
  '99': '其他',
  '100': '医保金额'
};

// 物资类别键值对
export let suppliesGinsengEcharts = { '0': '药品', '1': '材料', '2': '器械', '3': '保健品', '4': '非药品', '99': '诊疗' };

// 开票项目部分键值对
export let invoicePartGinsengEcharts = { '01': '西药', '02': '中成药', '03': '中草药' };

// 麻黄碱键值对
export let ephedrineGinsengEcharts = {
  '0': '处方药',
  '1': 'otc',
  '3': '麻黄碱'
};
