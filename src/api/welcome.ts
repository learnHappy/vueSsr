// 首页api配置
import url from './url';

export default {
  // 1.1首页收入金额汇总
  amountSummary: `${url}/api/esFyFyls/getIncomeSum`,
  // 1.2首页人次,处方数,结算次数汇总数据
  comprehensive: `${url}/api/costInfoRedundant/getsTheTotalOfPrescriptionsAndSettlementAndVisits`,
  // 1.3首页最近五笔营收记录
  latelyRevenue: `${url}/api/esFyFyls/getLastFiveRevenueRecords`,
  // 1.4首页近七天营收变化
  latelyRevenueChange: `${url}/api/esFyFyls/getRevenueChangesInTheLastSevenDays`,
  // 1.5首页近七天人次变化
  latelyMChange: `${url}/api/esFyFyls/getPersonTimesChangesInTheLastSevenDays`,
  // 1.6首页当天开票项目营收情况
  dayMakeRevenue: `${url}/api/costInfoRedundant/getHomePageInvoiceProjectIncomeSum`,
  // 1.7首页近效期提醒
  shortTermReminder: `${url}/api/esKcPckctzRedundant/getHomePageNearlyEffectiveRemind`,
};
