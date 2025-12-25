## FilePreview 文件预览

用于展示和预览各种类型的文件，包括图片、视频、音频和文档等。

### 基础用法

最简单的用法，传入文件列表即可。

:::demo 组件会自动根据文件扩展名判断文件类型，并显示相应的图标或预览。支持图片、视频、音频、文档等多种格式。
```html
<template>
  <el-file-preview 
    :file-list="fileList"
    name-key="accessoryName"
    @download="handleDownload"
    @video-play="handleVideoPlay">
  </el-file-preview>
</template>

<script>
  export default {
    data() {
      return {
        fileList: [
          {
            accessoryName: "测试文件1.png",
            url: "https://xianniu-file.oss-cn-beijing.aliyuncs.com/accessory/2025/12/22/tmp_ac415178ce3cf672159888723acc4c696173b9e815564c89.jpg"
          },
          {
            accessoryName: "测试文件2.docx",
            url: "https://xianniu-file.oss-cn-beijing.aliyuncs.com/accessory/2025/12/22/tmp_ac415178ce3cf672159888723acc4c696173b9e815564c89.jpg"
          },
          {
            accessoryName: "测试文件2",
            url: "https://xianniu-file.oss-cn-beijing.aliyuncs.com/mp3/sound.mp3"
          },
          {
            accessoryName: "测试文件3",
            url: "https://xianniu-file.oss-cn-beijing.aliyuncs.com/L1zxyNcIKF.txt"
          },
          {
            accessoryName: "测试文件4",
            url: "https://xianniu-file.oss-cn-beijing.aliyuncs.com/accessory%252F2023%252F11%252F24%252F%25E6%258A%25A5%25E4%25BB%25B7%252B%25E4%25BF%25A1%25E6%2581%25AF%25E6%2595%25B0%25E6%258D%25AE.xlsx"
          },
          {
            accessoryName: "测试文件5",
            url: "https://xianniu-file.oss-cn-beijing.aliyuncs.com/goodsexcel.zip"
          },
          {
            accessoryName: "测试文件6",
            url: "https://xianniu-file.oss-cn-beijing.aliyuncs.com/mp3/pdf.pdf"
          },
          {
            accessoryName: "测试文件7",
            url: "https://xianniu-file.oss-cn-beijing.aliyuncs.com/mp3/%E8%A7%86%E9%A2%911.mp4"
          },
          {
            accessoryName: "测试文件8测试文件8测试文件8测试文件8",
            url: "https://xianniu-file.oss-cn-beijing.aliyuncs.com/mp3/word.docx"
          },
          {
            accessoryName: "测试文件9测试文件9测试文件9测试文件9测试文件9测试文件9",
            url: "https://xianniu-file.oss-cn-beijing.aliyuncs.com/mp3/%E6%96%B0%E5%BB%BA%20Microsoft%20PowerPoint%20%E6%BC%94%E7%A4%BA%E6%96%87%E7%A8%BF.pptx"
          }
        ]
      };
    },
    methods: {
      handleDownload(file) {
        console.log('下载文件:', file.accessoryName);
      },
      handleVideoPlay(file) {
        console.log('播放视频:', file.accessoryName);
      }
    }
  }
</script>
```
:::

### 综合示例

展示各种文件类型的混合预览效果，包括图片、视频、音频、文档等。

:::demo 支持多种文件格式，自动识别并展示相应的预览方式。使用 `accessoryName` 作为文件名字段。
```html
<template>
  <el-file-preview 
    :file-list="mixedFileList"
    name-key="accessoryName"
    @download="handleDownload"
    @video-play="handleVideoPlay">
  </el-file-preview>
</template>

<script>
  export default {
    data() {
      return {
        mixedFileList: [
          {
            accessoryName: "测试文件1.png",
            url: "https://xianniu-file.oss-cn-beijing.aliyuncs.com/accessory/2025/12/22/tmp_ac415178ce3cf672159888723acc4c696173b9e815564c89.jpg"
          },
          {
            accessoryName: "测试文件2.docx",
            url: "https://xianniu-file.oss-cn-beijing.aliyuncs.com/accessory/2025/12/22/tmp_ac415178ce3cf672159888723acc4c696173b9e815564c89.jpg"
          },
          {
            accessoryName: "测试文件2",
            url: "https://xianniu-file.oss-cn-beijing.aliyuncs.com/mp3/sound.mp3"
          },
          {
            accessoryName: "测试文件3",
            url: "https://xianniu-file.oss-cn-beijing.aliyuncs.com/L1zxyNcIKF.txt"
          },
          {
            accessoryName: "测试文件4",
            url: "https://xianniu-file.oss-cn-beijing.aliyuncs.com/accessory%252F2023%252F11%252F24%252F%25E6%258A%25A5%25E4%25BB%25B7%252B%25E4%25BF%25A1%25E6%2581%25AF%25E6%2595%25B0%25E6%258D%25AE.xlsx"
          },
          {
            accessoryName: "测试文件5",
            url: "https://xianniu-file.oss-cn-beijing.aliyuncs.com/goodsexcel.zip"
          },
          {
            accessoryName: "测试文件6",
            url: "https://xianniu-file.oss-cn-beijing.aliyuncs.com/mp3/pdf.pdf"
          },
          {
            accessoryName: "测试文件7",
            url: "https://xianniu-file.oss-cn-beijing.aliyuncs.com/mp3/%E8%A7%86%E9%A2%911.mp4"
          },
          {
            accessoryName: "测试文件8测试文件8测试文件8测试文件8",
            url: "https://xianniu-file.oss-cn-beijing.aliyuncs.com/mp3/word.docx"
          },
          {
            accessoryName: "测试文件9测试文件9测试文件9测试文件9测试文件9测试文件9",
            url: "https://xianniu-file.oss-cn-beijing.aliyuncs.com/mp3/%E6%96%B0%E5%BB%BA%20Microsoft%20PowerPoint%20%E6%BC%94%E7%A4%BA%E6%96%87%E7%A8%BF.pptx"
          }
        ]
      };
    },
    methods: {
      handleDownload(file) {
        this.$message.success(`开始下载: ${file.accessoryName}`);
      },
      handleVideoPlay(file) {
        this.$message.info(`播放视频: ${file.accessoryName}`);
      }
    }
  }
</script>
```
:::

### 图片预览

支持图片的大图预览功能。

:::demo 点击图片可以预览大图，支持缩放、旋转等操作。
```html
<template>
  <el-file-preview :file-list="imageList"></el-file-preview>
</template>

<script>
  export default {
    data() {
      return {
        imageList: [
          { url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg', name: '美食1.jpg' },
          { url: 'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg', name: '美食2.jpg' },
          { url: 'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg', name: '美食3.jpg' },
          { url: 'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg', name: '美食4.jpg' }
        ]
      };
    }
  }
</script>
```
:::

### 视频播放

支持视频文件的在线播放。

:::demo 点击视频缩略图可以在弹窗中播放视频。
```html
<template>
  <el-file-preview 
    :file-list="videoList"
    @video-play="handleVideoPlay"
    @video-close="handleVideoClose">
  </el-file-preview>
</template>

<script>
  export default {
    data() {
      return {
        videoList: [
          { url: 'https://example.com/demo1.mp4', name: '演示视频1.mp4' },
          { url: 'https://example.com/demo2.mp4', name: '演示视频2.mp4' }
        ]
      };
    },
    methods: {
      handleVideoPlay(file) {
        console.log('播放视频:', file);
      },
      handleVideoClose() {
        console.log('关闭视频');
      }
    }
  }
</script>
```
:::

### 文件下载

点击非图片类型的文件会触发下载。

:::demo 支持各种文档类型，点击即可下载。
```html
<template>
  <el-file-preview 
    :file-list="docList"
    @download="handleDownload">
  </el-file-preview>
</template>

<script>
  export default {
    data() {
      return {
        docList: [
          { url: 'https://example.com/report.pdf', name: '年度报告.pdf' },
          { url: 'https://example.com/contract.docx', name: '合同文档.docx' },
          { url: 'https://example.com/data.xlsx', name: '数据表格.xlsx' },
          { url: 'https://example.com/slides.pptx', name: '演示文稿.pptx' },
          { url: 'https://example.com/archive.zip', name: '压缩包.zip' }
        ]
      };
    },
    methods: {
      handleDownload(file) {
        console.log('下载文件:', file);
      }
    }
  }
</script>
```
:::

### 自定义字段名

可以自定义 URL 和文件名的字段名。

:::demo 通过 `url-key` 和 `name-key` 属性指定文件对象中 URL 和文件名的字段。
```html
<template>
  <el-file-preview 
    :file-list="customFileList"
    url-key="fileUrl"
    name-key="fileName">
  </el-file-preview>
</template>

<script>
  export default {
    data() {
      return {
        customFileList: [
          { fileUrl: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg', fileName: '自定义1.jpg' },
          { fileUrl: 'https://example.com/custom.pdf', fileName: '自定义文档.pdf' }
        ]
      };
    }
  }
</script>
```
:::

### 禁用图片预览

可以禁用图片的大图预览功能。

:::demo 设置 `preview-enabled` 为 `false` 即可禁用。
```html
<template>
  <el-file-preview 
    :file-list="imageList"
    :preview-enabled="false">
  </el-file-preview>
</template>

<script>
  export default {
    data() {
      return {
        imageList: [
          { url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg', name: '图片1.jpg' },
          { url: 'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg', name: '图片2.jpg' }
        ]
      };
    }
  }
</script>
```
:::

### 自定义视频快照

可以自定义视频封面的生成方式。

:::demo 通过 `video-snapshot-handler` 属性传入自定义函数。
```html
<template>
  <el-file-preview 
    :file-list="videoList"
    :video-snapshot-handler="getVideoSnapshot">
  </el-file-preview>
</template>

<script>
  export default {
    data() {
      return {
        videoList: [
          { url: 'https://example.com/demo.mp4', name: '演示视频.mp4' }
        ]
      };
    },
    methods: {
      getVideoSnapshot(url) {
        // 自定义视频封面逻辑
        return url + '?vframe/jpg/offset/1';
      }
    }
  }
</script>
```
:::

### 字符串数组

文件列表也可以是简单的 URL 字符串数组。

:::demo 传入字符串数组，文件名会从 URL 中自动提取。
```html
<template>
  <el-file-preview :file-list="urlList"></el-file-preview>
</template>

<script>
  export default {
    data() {
      return {
        urlList: [
          'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
          'https://example.com/document.pdf'
        ]
      };
    }
  }
</script>
```
:::

### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| file-list | 文件列表 | array | — | [] |
| url-key | 文件对象中 URL 的字段名 | string | — | url |
| name-key | 文件对象中文件名的字段名 | string | — | name |
| preview-enabled | 是否启用图片预览 | boolean | — | true |
| video-snapshot-handler | 视频快照处理函数，接收视频 URL，返回封面图 URL | function(url) | — | — |
| video-dialog-title | 视频播放对话框的标题 | string | — | 视频预览 |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| download | 点击文件下载时触发 | file: 文件对象 |
| video-play | 点击播放视频时触发 | file: 视频文件对象 |
| video-close | 关闭视频播放对话框时触发 | — |

### 支持的文件类型

组件会根据文件扩展名自动识别并显示相应的图标：

- **图片**: jpg, jpeg, png, gif, bmp, webp, svg
- **视频**: mp4, avi, mkv, mov, wmv, flv, webm
- **音频**: mp3, wav, flac, aac, m4a, ogg
- **Word**: doc, docx
- **Excel**: xls, xlsx, csv
- **PPT**: ppt, pptx
- **PDF**: pdf
- **压缩包**: zip, rar, 7z, tar, gz
- **其他**: 使用默认文件图标

