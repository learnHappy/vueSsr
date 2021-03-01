// 首页api配置
import url from '../url';

export default {
  // 3.1营收险种分析
  coverageAnalysis: `${url}/api/costInfoRedundant/getRevenueAnalyzePlantCode`,
  // 3.2营收支付方式分析
  paymentAnalysis: `${url}/api/costInfoRedundant/getRevenueAnalyzePaymentMethod`,
  // 3.3营收主管科室分析
  directorAnalysis: `${url}/api/costInfoRedundant/getRevenueAnalyzeCompetentDepartment`,
  // 3.4营收物资类别分析
  suppliesAnalysis: `${url}/api/costInfoRedundant/getRevenueAnalyzeSuppliesCategory`,
  // 3.5营收开票项目分析
  makeOutAnInvoiceAnalysis: `${url}/api/costInfoRedundant/getRevenueAnalyzeInvoiceProject`,
};
