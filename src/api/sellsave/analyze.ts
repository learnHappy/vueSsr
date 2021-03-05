// 首页api配置
import url from '../url';

export default {
  // 6.1药品销售分析物资类别
  suppliesCategoryAnalyze: `${url}/api/kcBdlsRedundant/getDrugsSalesAnalyzeSuppliesCategory`,

  // 6.2药品销售分析西药/中成药/中草药
  makeOutAnInvoiceAnalyze: `${url}/api/kcBdlsRedundant/getDrugsSalesAnalyzeInvoiceProject`,

  // 6.3药品销售分析OTC/处方药/麻黄碱类药品
  ephedrineAnalyze: `${url}/api/kcBdlsRedundant/ getDrugsSalesAnalyzeOTCandEphedrine`
};
