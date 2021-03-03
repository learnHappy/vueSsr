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

// 支付方式入参
export let paymentGinseng = [
  { label: '现金', value: '01' },
  { label: '支付宝', value: '02' },
  { label: '微信', value: '03' },
  { label: '银联', value: '05' },
  { label: '其他', value: '99' }
];
// 物资类别入参
export let suppliesGinseng = [
  { label: '药品', value: '0' },
  { label: '材料', value: '1' },
  { label: '器械', value: '2' },
  { label: '保健品', value: '3' },
  { label: '非药品', value: '4' },
  { label: '诊疗', value: '99' }
];
