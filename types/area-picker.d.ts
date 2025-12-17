import { ElementUIComponent } from './component'

/** AreaPicker Component */
export declare class ElAreaPicker extends ElementUIComponent {
  /** 绑定值 */
  value: string | number | Array<string | number>

  /** 级联选择器的级别，1-省，2-省市，3-省市区 */
  level: number

  /** 是否严格的遵守父子不互相关联 */
  checkStrictly: boolean

  /** 是否多选 */
  multiple: boolean

  /** 输入框占位文本 */
  placeholder: string

  /** 输入框大小 */
  size: 'large' | 'medium' | 'small' | 'mini'

  /** 是否禁用 */
  disabled: boolean

  /** 是否可清空 */
  clearable: boolean

  /** 是否可搜索 */
  filterable: boolean

  /** 选项分隔符 */
  separator: string

  /** 是否显示完整的路径 */
  showAllLevels: boolean

  /** 多选模式下是否折叠Tag */
  collapseTags: boolean

  /** 搜索关键词输入的去抖延迟，毫秒 */
  debounce: number

  /** 搜索前的回调函数 */
  beforeFilter: (value: string) => boolean | Promise<any>

  /** 自定义浮层类名 */
  popperClass: string

  /** 指定选项的值字段名 */
  valueKey: string

  /** 指定选项的标签字段名 */
  labelKey: string

  /** 指定选项的子选项字段名 */
  childrenKey: string

  /** 获取选中的节点 */
  getCheckedNodes(): any[]

  /** 清空已选项 */
  clear(): void

  /** 切换下拉菜单的显示/隐藏 */
  toggleDropDownVisible(visible?: boolean): void
}
