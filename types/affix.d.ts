import { ElementUIComponent } from './component'

export type AffixPosition = 'top' | 'bottom'

/** Affix Component */
export declare class ElAffix extends ElementUIComponent {
  /** Offset distance */
  offset: number

  /** Position of affix */
  position: AffixPosition

  /** Target container (CSS selector) */
  target: string

  /** z-index of affix */
  zIndex: number

  /** Update affix state manually */
  update(): void

  /** Update rootRect info */
  updateRoot(): void
}
