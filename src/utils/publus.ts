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

// 租户编号
// export const tenantId = '3305231132';
// export const tenantId = '3305021187';
export const tenantId = '3305231132';

// 表格支付方式入参
export let paymentGinseng = [
  { label: '现金', value: '01' },
  { label: '支付宝', value: '02' },
  { label: '微信', value: '03' },
  { label: '银联', value: '05' },
  { label: '会员卡扣款', value: '06' },
  { label: '聚合支付', value: '07' },
  { label: '智能POSD支付', value: '08' },
  { label: '其他', value: '99' },
  { label: '医保金额', value: '100' }
];
// 表格物资类别入参
export let suppliesGinseng = [
  { label: '药品', value: '0' },
  { label: '材料', value: '1' },
  { label: '器械', value: '2' },
  { label: '保健品', value: '3' },
  { label: '非药品', value: '4' },
  { label: '诊疗', value: '99' }
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
