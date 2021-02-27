// 首页api配置
import url from '../url';

export default {
  // 2.1营收统计物资类别汇总
  suppliesCategory: `${url}/api/costInfoRedundant/getRevenueStatisticsSuppliesCategory`,
  // 2.2营收统计开票项目汇总
  makeOutAnInvoice: `${url}/api/costInfoRedundant/getRevenueStatisticsInvoiceProject`,
  // 2.3营收统计支付方式汇总
  methodOfPayment: `${url}/api/costInfoRedundant/getRevenueStatisticsPaymentMethod`
};
