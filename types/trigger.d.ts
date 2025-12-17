import { ElementUIComponent } from './component'
import { CSSProperties } from 'vue/types/jsx'

export type TriggerType = 'hover' | 'click' | 'focus' | 'contextMenu'

export type TriggerPosition = 'top' | 'tl' | 'tr' | 'bottom' | 'bl' | 'br' | 'left' | 'lt' | 'lb' | 'right' | 'rt' | 'rb'

export interface TriggerPopupTranslateObject {
  [key: string]: [number, number]
}

export type TriggerPopupTranslate = [number, number] | TriggerPopupTranslateObject

export interface DurationObject {
  enter: number
  leave: number
}

/** Trigger Component */
export declare class ElTrigger extends ElementUIComponent {
  /** Whether the popup is visible (v-model) */
  popupVisible: boolean

  /** Whether the popup is visible by default (uncontrolled mode) */
  defaultPopupVisible: boolean

  /** Trigger type */
  trigger: TriggerType

  /** Popup position */
  position: TriggerPosition

  /** Whether the trigger is disabled */
  disabled: boolean

  /** Popup offset */
  popupOffset: number

  /** Popup translate distance */
  popupTranslate: TriggerPopupTranslate

  /** Whether to show arrow */
  showArrow: boolean

  /** Whether the popup follows the mouse */
  alignPoint: boolean

  /** Whether to keep the popup visible when moving to it */
  popupHoverStay: boolean

  /** Whether to close on blur */
  blurToClose: boolean

  /** Whether to close on click */
  clickToClose: boolean

  /** Whether to close on outside click */
  clickOutsideToClose: boolean

  /** Whether to unmount on close */
  unmountOnClose: boolean

  /** Content class name */
  contentClass: string | string[] | object

  /** Content style */
  contentStyle: CSSProperties

  /** Arrow class name */
  arrowClass: string | string[] | object

  /** Arrow style */
  arrowStyle: CSSProperties

  /** Popup style */
  popupStyle: CSSProperties

  /** Animation name */
  animationName: string

  /** Animation duration */
  duration: number | DurationObject

  /** Mouse enter delay */
  mouseEnterDelay: number

  /** Mouse leave delay */
  mouseLeaveDelay: number

  /** Focus delay */
  focusDelay: number

  /** Whether to auto fit popup width */
  autoFitPopupWidth: boolean

  /** Whether to auto fit popup min width */
  autoFitPopupMinWidth: boolean

  /** Whether to auto fix position */
  autoFixPosition: boolean

  /** Popup container */
  popupContainer: string | HTMLElement

  /** Whether to update position on scroll */
  updateAtScroll: boolean

  /** Whether to auto fit position */
  autoFitPosition: boolean

  /** Whether to render to body */
  renderToBody: boolean

  /** Whether to prevent focus */
  preventFocus: boolean

  /** Whether to close on scroll */
  scrollToClose: boolean

  /** Scroll threshold for closing */
  scrollToCloseDistance: number
}

