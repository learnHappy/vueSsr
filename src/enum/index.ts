// 物资类别枚举
export enum SuppliesCategory {
  // 药品
  Drug = '0',
  // 材料

  Material = '1',
  // 器械

  Instrument = '2',
  // 保健品

  HealthProducts = '3',
  // 非药品

  TheDrug = '4',
  // 诊疗

  Treatment = '99'
}

// 支付方式枚举类

export enum Payment {
  // 现金
  Cash = '01',
  // 支付宝
  Alipay = '02',
  // 微信
  WeChat = '03',
  // 单位记账
  Unit = '04',
  // 银联
  Unionpay = '05',
  // 会员卡
  members = '06',
  // 聚合
  Aggregation = '07',
  // 智能POSD
  SmartPOSD = '08',
  // 其他
  Other = '99'
}
