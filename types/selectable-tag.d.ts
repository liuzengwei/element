import { ElementUIComponent, ElementUIComponentSize } from './component'

export type SelectableTagEffect = 'dark' | 'light' | 'plain'

/** SelectableTag Component */
export declare class ElSelectableTag extends ElementUIComponent {
  /** Selectable tag value */
  value: string | number | string[] | number[]

  /** Selectable tag label */
  label: string | number

  /** Whether selectable tag is disabled */
  disabled: boolean

  /** Selectable tag type */
  type: string

  /** Selectable tag size */
  size: ElementUIComponentSize

  /** Icon class name */
  icon: string

  /** Selectable tag effect */
  effect: SelectableTagEffect
}

/** SelectableTag Group Component */
export declare class ElSelectableTagGroup extends ElementUIComponent {
  /** Binding value */
  value: any

  /** Whether the nesting selectable tags are disabled */
  disabled: boolean

  /** Whether multiple selection is allowed, default is true */
  multiple: boolean

  /** Minimum number of selectable tag checked */
  min: number

  /** Maximum number of selectable tag checked */
  max: number

  /** Size of selectable tags */
  size: ElementUIComponentSize

  /** Effect of selectable tags */
  effect: SelectableTagEffect
}
