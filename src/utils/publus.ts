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
