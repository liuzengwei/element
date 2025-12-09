import { ElementUIComponent } from './component'

export type TextType = 'primary' | 'success' | 'warning' | 'danger' | 'info'
export type TextSize = 'large' | 'default' | 'small'

/** Text Component */
export declare class ElText extends ElementUIComponent {
  /** Text type */
  type: TextType

  /** Text size */
  size: TextSize

  /** Render ellipsis */
  truncated: boolean

  /** Maximum lines */
  lineClamp: string | number

  /** Custom element tag */
  tag: string
}
