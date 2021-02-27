// 药品
const Drug: String = '0';
// 材料
const Material: String = '1';
// 器械
const Instrument: String = '2';
// 保健品
const HealthProducts: String = '3';
// 非药品
const TheDrug: String = '4';
// 诊疗
const Treatment: String = '99';

// 物资类别枚举
export enum SuppliesCategory {
  Drug,
  Material,
  Instrument,
  HealthProducts,
  TheDrug,
  Treatment = '99'
}
