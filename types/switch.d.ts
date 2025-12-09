import { ElementUIComponent } from './component'

/** Switch Component */
export declare class ElSwitch extends ElementUIComponent {
  /** Whether Switch is on */
  value: boolean

  /** Whether Switch is disabled */
  disabled: boolean

  /** Width of Switch */
  width: number

  /** Class name of the icon displayed when in on state, overrides on-text */
  activeIconClass: string

  /** Class name of the icon displayed when in off state, overrides off-text */
  inactiveIconClass: string

  /** Text displayed when in on state */
  activeText: string

  /** Text displayed when in off state */
  inactiveText: string

  /** Inner text displayed inside switch when in on state */
  activeInnerText: string

  /** Inner text displayed inside switch when in off state */
  inactiveInnerText: string

  /** Background color when in on state */
  activeColor: string

  /** Background color when in off state */
  inactiveColor: string

  /** Switch value when in on state */
  activeValue: string | boolean | number

  /** Switch value when in off state */
  inactiveValue: string | boolean | number

  /** Input name of Switch */
  name: string

  /** Whether to trigger form validation */
  validateEvent: boolean

  /** Before change hook, return a boolean or Promise, if false or reject, stop switching */
  beforeChange: () => boolean | Promise<boolean>
}
