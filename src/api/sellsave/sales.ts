// 首页api配置
import url from '../url';

export default {
  // 5.1药品销售统计物资类别
  salesSuppliesCategory: `${url}/api/kcBdlsRedundant/getDrugsSalesStatisticsSuppliesCategory`,

  // 5.2药品销售统计开票项目
  salesMakeOutAnInvoice: `${url}/api/kcBdlsRedundant/getDrugsSalesStatisticsInvoiceProject`,

  // 5.3药品销售统计Otc/处方药/麻黄碱类药品
  salesEphedrine: `${url}/api/kcBdlsRedundant/getDrugsSalesStatisticsOTCandEphedrine`
};
