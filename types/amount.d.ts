import { ElementUIComponent } from './component'

export type CurrencyPosition = 'prefix' | 'suffix'

/** Amount Component */
export declare class ElAmount extends ElementUIComponent {
  /** 金额数值 */
  value: number | string

  /** 标题 */
  title: string

  /** 小数精度 */
  precision: number

  /** 缺省状态显示文本 */
  placeholder: string

  /** 缺省状态是否显示货币符号 */
  placeholderShowCurrency: boolean

  /** 货币符号 */
  currency: string

  /** 是否显示货币符号 */
  showCurrency: boolean

  /** 货币符号位置 */
  currencyPosition: CurrencyPosition

  /** 是否启用万元换算 */
  convertToWan: boolean

  /** 万元换算阈值 */
  wanThreshold: number

  /** 万元单位文本 */
  wanUnit: string

  /** 万元转换后的精度 */
  wanPrecision: number

  /** 是否启用亿元换算 */
  convertToYi: boolean

  /** 亿元换算阈值 */
  yiThreshold: number

  /** 亿元单位文本 */
  yiUnit: string

  /** 亿元转换后的精度 */
  yiPrecision: number

  /** 千分位分隔符 */
  groupSeparator: string

  /** 小数点分隔符 */
  decimalSeparator: string

  /** 是否显示千分位分隔符 */
  showGroupSeparator: boolean

  /** 是否补齐小数位 */
  padDecimal: boolean

  /** 前缀文本 */
  prefix: string

  /** 后缀文本 */
  suffix: string

  /** 是否显示正号 + */
  showPlus: boolean

  /** 是否使用颜色区分正负值 */
  colorful: boolean

  /** 正值颜色 */
  positiveColor: string

  /** 负值颜色 */
  negativeColor: string

  /** 零值颜色 */
  zeroColor: string

  /** 前缀样式 */
  prefixStyle: object

  /** 前缀类名 */
  prefixClass: string

  /** 货币符号样式 */
  currencyStyle: object

  /** 货币符号类名 */
  currencyClass: string

  /** 金额主体样式 */
  valueStyle: object

  /** 金额主体类名 */
  valueClass: string

  /** 单位样式 */
  unitStyle: object

  /** 单位类名 */
  unitClass: string

  /** 后缀样式 */
  suffixStyle: object

  /** 后缀类名 */
  suffixClass: string

  /** 缺省状态样式 */
  placeholderStyle: object

  /** 缺省状态类名 */
  placeholderClass: string

  /** 是否启用数字滚动动画 */
  animated: boolean

  /** 动画持续时间（毫秒） */
  duration: number

  /** 获取格式化后的金额字符串 */
  format(): string

  /** 重置动画 */
  resetAnimation(): void
}
