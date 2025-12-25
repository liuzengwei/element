<template>
  <div class="el-file-preview">
    <div class="el-file-preview__list">
      <template v-for="(item, index) in fileList">
        <!-- 图片预览 -->
        <div
          v-if="isImage(item)"
          :key="`image-${index}`"
          class="el-file-preview__item el-file-preview__item--image"
        >
          <el-image
            :src="getFileUrl(item)"
            :preview-src-list="previewEnabled ? imageList : []"
            fit="cover"
            class="el-file-preview__image"
          >
            <div slot="error" class="el-file-preview__error">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
        </div>

        <!-- 视频预览 -->
        <div
          v-else-if="isVideo(item)"
          :key="`video-${index}`"
          class="el-file-preview__item el-file-preview__item--video"
          @click="handlePlayVideo(item)"
        >
          <el-image
            :src="getVideoSnapshot(item)"
            fit="cover"
            class="el-file-preview__image"
          >
            <div slot="error" class="el-file-preview__error">
              <i class="el-icon-video-camera"></i>
            </div>
          </el-image>
          <div class="el-file-preview__play-icon">
            <i class="el-icon-video-play"></i>
          </div>
        </div>

        <!-- 音频文件 -->
        <div
          v-else-if="isAudio(item)"
          :key="`audio-${index}`"
          class="el-file-preview__item el-file-preview__item--file"
          @click="handleDownload(item)"
        >
          <img :src="audioIcon" class="el-file-preview__icon" />
          <p class="el-file-preview__name" :title="getFileName(item)">
            <span class="el-file-preview__name-main">{{ getFileBaseName(item) }}</span>
            <span class="el-file-preview__name-ext">{{ getFileExt(item) }}</span>
          </p>
        </div>

        <!-- 其他文件 -->
        <div
          v-else
          :key="`file-${index}`"
          class="el-file-preview__item el-file-preview__item--file"
          @click="handleDownload(item)"
        >
          <img :src="getFileIcon(item)" class="el-file-preview__icon" />
          <p class="el-file-preview__name" :title="getFileName(item)">
            <span class="el-file-preview__name-main">{{ getFileBaseName(item) }}</span>
            <span class="el-file-preview__name-ext">{{ getFileExt(item) }}</span>
          </p>
        </div>
      </template>
    </div>

    <!-- 视频播放对话框 -->
    <el-dialog
      :title="videoDialogTitle"
      :visible.sync="videoDialogVisible"
      width="640px"
      :before-close="handleCloseVideo"
      append-to-body
    >
      <div class="el-file-preview__video-wrapper">
        <video
          ref="videoPlayer"
          class="el-file-preview__video"
          controls
          :src="currentVideoUrl"
        ></video>
      </div>
      <div slot="footer">
        <el-button @click="handleCloseVideo">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import wordIcon from './icons/word.svg';
import excelIcon from './icons/excel.svg';
import pptIcon from './icons/ppt.svg';
import pdfIcon from './icons/pdf.svg';
import zipIcon from './icons/zip.svg';
import audioIcon from './icons/audio.svg';
import videoIcon from './icons/video.svg';
import imageIcon from './icons/image.svg';

export default {
  name: 'ElFilePreview',

  componentName: 'ElFilePreview',

  props: {
    // 文件列表
    fileList: {
      type: Array,
      default() {
        return [];
      }
    },
    // URL 字段名
    urlKey: {
      type: String,
      default: 'url'
    },
    // 文件名字段名
    nameKey: {
      type: String,
      default: 'name'
    },
    // 是否启用图片预览
    previewEnabled: {
      type: Boolean,
      default: true
    },
    // 视频快照处理函数（用于生成视频封面）
    videoSnapshotHandler: {
      type: Function,
      default: null
    },
    // 视频对话框标题
    videoDialogTitle: {
      type: String,
      default: '视频预览'
    }
  },

  data() {
    return {
      videoDialogVisible: false,
      currentVideoUrl: '',
      audioIcon
    };
  },

  computed: {
    // 获取所有图片 URL 列表（用于预览）
    imageList() {
      return this.fileList
        .filter(item => this.isImage(item))
        .map(item => this.getFileUrl(item));
    }
  },

  watch: {
    videoDialogVisible(val) {
      if (!val) {
        this.pauseVideo();
      }
    }
  },

  methods: {
    // 获取文件 URL
    getFileUrl(file) {
      if (typeof file === 'string') {
        return file;
      }
      return file[this.urlKey] || '';
    },

    // 获取文件名
    getFileName(file) {
      if (typeof file === 'string') {
        return file.split('/').pop();
      }
      return file[this.nameKey] || '';
    },

    // 判断是否为图片
    isImage(file) {
      const url = this.getFileUrl(file);
      const imageExts = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg'];
      const ext = this.getExtFromUrl(url);
      return imageExts.includes(ext);
    },

    // 判断是否为视频
    isVideo(file) {
      const url = this.getFileUrl(file);
      const videoExts = ['mp4', 'avi', 'mkv', 'mov', 'wmv', 'flv', 'webm'];
      const ext = this.getExtFromUrl(url);
      return videoExts.includes(ext);
    },

    // 判断是否为音频
    isAudio(file) {
      const url = this.getFileUrl(file);
      const audioExts = ['mp3', 'wav', 'flac', 'aac', 'm4a', 'ogg'];
      const ext = this.getExtFromUrl(url);
      return audioExts.includes(ext);
    },

    // 从 URL 获取扩展名
    getExtFromUrl(url) {
      if (!url) return '';
      const fileName = url.split('?')[0].split('#')[0];
      const ext = fileName.toLowerCase().split('.').pop();
      return ext;
    },

    // 获取文件扩展名（带点）
    getFileExt(file) {
      const fileName = this.getFileName(file);
      if (!fileName) return '';
      const lastDotIndex = fileName.lastIndexOf('.');
      if (lastDotIndex === -1) return '';
      return fileName.substring(lastDotIndex);
    },

    // 获取文件基础名（不带扩展名）
    getFileBaseName(file) {
      const fileName = this.getFileName(file);
      if (!fileName) return '';
      const lastDotIndex = fileName.lastIndexOf('.');
      if (lastDotIndex === -1) return fileName;
      return fileName.substring(0, lastDotIndex);
    },

    // 获取文件图标
    getFileIcon(file) {
      const ext = this.getExtFromUrl(this.getFileUrl(file));

      // Word 文档
      if (['doc', 'docx'].includes(ext)) {
        return wordIcon;
      }
      // Excel 表格
      if (['xls', 'xlsx', 'csv'].includes(ext)) {
        return excelIcon;
      }
      // PPT 演示文稿
      if (['ppt', 'pptx'].includes(ext)) {
        return pptIcon;
      }
      // PDF
      if (ext === 'pdf') {
        return pdfIcon;
      }
      // 压缩文件
      if (['zip', 'rar', '7z', 'tar', 'gz'].includes(ext)) {
        return zipIcon;
      }
      // 音频文件
      if (['mp3', 'wav', 'flac', 'aac', 'm4a', 'ogg'].includes(ext)) {
        return audioIcon;
      }
      // 视频文件
      if (['mp4', 'avi', 'mkv', 'mov', 'wmv', 'flv', 'webm'].includes(ext)) {
        return videoIcon;
      }
      // 图片文件
      if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg'].includes(ext)) {
        return imageIcon;
      }

      // 默认图标
      return zipIcon;
    },

    // 获取视频快照
    getVideoSnapshot(file) {
      const url = this.getFileUrl(file);
      if (this.videoSnapshotHandler) {
        return this.videoSnapshotHandler(url);
      }
      // 默认使用 OSS 视频截帧（适用于阿里云 OSS）
      return `${url}?x-oss-process=video/snapshot,t_0,f_jpg,w_0,h_0,m_fast,ar_auto`;
    },

    // 播放视频
    handlePlayVideo(file) {
      this.currentVideoUrl = this.getFileUrl(file);
      this.videoDialogVisible = true;
      this.$emit('video-play', file);
    },

    // 关闭视频
    handleCloseVideo() {
      this.videoDialogVisible = false;
      this.$emit('video-close');
    },

    // 暂停视频
    pauseVideo() {
      if (this.$refs.videoPlayer) {
        this.$refs.videoPlayer.pause();
      }
    },

    // 下载文件
    handleDownload(file) {
      const url = this.getFileUrl(file);
      const fileName = this.getFileName(file);

      // 触发下载事件
      this.$emit('download', file);

      // 执行下载
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      link.style.display = 'none';
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
};
</script>
