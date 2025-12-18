import { ElementUIComponent } from './component'

/** LazyLoad Component */
export declare class ElLazyLoad extends ElementUIComponent {
  /** Container tag name */
  tag: string

  /** Visibility threshold, 0-1 */
  threshold: number

  /** Preload offset distance */
  offset: string

  /** Whether to load only once */
  once: boolean

  /** Whether to show skeleton screen */
  showSkeleton: boolean

  /** Scroll container selector */
  scrollContainer: string

  /** Reload content manually */
  reload(): void
}
