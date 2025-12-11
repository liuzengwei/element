import { ElementUIComponent } from './component'

/** AreaLoading Component */
export declare class ElAreaLoading extends ElementUIComponent {
  /** Whether to show loading */
  loading: boolean

  /** Loading text */
  text: string

  /** Custom spinner icon class name */
  spinner: string

  /** Background color of the mask */
  background: string

  /** Size of the spinner */
  size: 'small' | 'default' | 'large'

  /** Whether to blur the content when loading */
  blur: boolean

  /** Show loading */
  show(): void

  /** Hide loading */
  hide(): void

  /** Toggle loading state */
  toggle(): void

  /** Set loading state */
  setLoading(loading: boolean): void
}
