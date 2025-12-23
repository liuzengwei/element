import { ElementUIComponent, ElementUIComponentSize } from './component'

export type SegmentedOption = Record<string, any> | string | number | boolean

export interface SegmentedProps {
  /** 指定选项值为选项对象的某个属性值 */
  value?: string
  /** 指定选项标签为选项对象的某个属性值 */
  label?: string  
  /** 指定选项的禁用为选项对象的某个属性值 */
  disabled?: string
}

/** Segmented Component */
export declare class ElSegmented extends ElementUIComponent {
  /** 绑定值 */
  value: string | number | boolean

  /** 选项数据 */
  options: SegmentedOption[]

  /** 配置选项 */
  props: SegmentedProps

  /** 尺寸 */
  size: ElementUIComponentSize

  /** 是否适应父元素宽度 */
  block: boolean

  /** 是否横向撑满容器但保持item固定宽度 */
  stretch: boolean

  /** 是否禁用 */
  disabled: boolean

  /** 是否触发表单验证 */
  validateEvent: boolean

  /** 原生 name 属性 */
  name: string

  /** 原生 id 属性 */
  id: string

  /** 原生 aria-label 属性 */
  ariaLabel: string

  /** 显示方向 */
  direction: 'horizontal' | 'vertical'
}
