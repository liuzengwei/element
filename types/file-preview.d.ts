import { ElementUIComponent } from './component'

/** 文件对象类型 */
export interface FileItem {
  /** 文件 URL */
  url?: string
  /** 文件名称 */
  name?: string
  [key: string]: any
}

/** FilePreview Component */
export declare class ElFilePreview extends ElementUIComponent {
  /** 文件列表 */
  fileList: FileItem[] | string[]

  /** URL 字段名 */
  urlKey: string

  /** 文件名字段名 */
  nameKey: string

  /** 是否启用图片预览 */
  previewEnabled: boolean

  /** 视频快照处理函数 */
  videoSnapshotHandler: ((url: string) => string) | null

  /** 视频对话框标题 */
  videoDialogTitle: string
}

