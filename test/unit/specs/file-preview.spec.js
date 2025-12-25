import { createTest, createVue, destroyVM } from '../util';
import FilePreview from 'packages/file-preview';

describe('FilePreview', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(FilePreview, true);
    expect(vm.$el).to.exist;
  });

  it('render file list', () => {
    vm = createVue({
      template: `
        <el-file-preview :file-list="fileList"></el-file-preview>
      `,
      data() {
        return {
          fileList: [
            { url: 'test.jpg', name: 'test.jpg' },
            { url: 'test.pdf', name: 'test.pdf' }
          ]
        };
      }
    }, true);
    expect(vm.$el.querySelectorAll('.el-file-preview__item').length).to.equal(2);
  });

  it('custom url and name key', () => {
    vm = createVue({
      template: `
        <el-file-preview 
          :file-list="fileList" 
          url-key="fileUrl" 
          name-key="fileName">
        </el-file-preview>
      `,
      data() {
        return {
          fileList: [
            { fileUrl: 'test.jpg', fileName: 'test.jpg' }
          ]
        };
      }
    }, true);
    expect(vm.$el.querySelector('.el-file-preview__item')).to.exist;
  });

  it('image preview', () => {
    vm = createVue({
      template: `
        <el-file-preview :file-list="fileList"></el-file-preview>
      `,
      data() {
        return {
          fileList: [
            { url: 'test.jpg', name: 'test.jpg' },
            { url: 'test.png', name: 'test.png' }
          ]
        };
      }
    }, true);
    expect(vm.$el.querySelectorAll('.el-file-preview__item--image').length).to.equal(2);
  });

  it('video item', () => {
    vm = createVue({
      template: `
        <el-file-preview :file-list="fileList"></el-file-preview>
      `,
      data() {
        return {
          fileList: [
            { url: 'test.mp4', name: 'test.mp4' }
          ]
        };
      }
    }, true);
    expect(vm.$el.querySelector('.el-file-preview__item--video')).to.exist;
    expect(vm.$el.querySelector('.el-file-preview__play-icon')).to.exist;
  });

  it('file item', () => {
    vm = createVue({
      template: `
        <el-file-preview :file-list="fileList"></el-file-preview>
      `,
      data() {
        return {
          fileList: [
            { url: 'test.pdf', name: 'test.pdf' },
            { url: 'test.docx', name: 'test.docx' }
          ]
        };
      }
    }, true);
    expect(vm.$el.querySelectorAll('.el-file-preview__item--file').length).to.equal(2);
  });

  it('disable preview', () => {
    vm = createVue({
      template: `
        <el-file-preview :file-list="fileList" :preview-enabled="false"></el-file-preview>
      `,
      data() {
        return {
          fileList: [
            { url: 'test.jpg', name: 'test.jpg' }
          ]
        };
      }
    }, true);
    const imageComponent = vm.$children[0].$children[0];
    expect(imageComponent.previewSrcList.length).to.equal(0);
  });

  it('video dialog', done => {
    vm = createVue({
      template: `
        <el-file-preview :file-list="fileList" @video-play="handleVideoPlay"></el-file-preview>
      `,
      data() {
        return {
          fileList: [
            { url: 'test.mp4', name: 'test.mp4' }
          ],
          playFired: false
        };
      },
      methods: {
        handleVideoPlay() {
          this.playFired = true;
        }
      }
    }, true);

    const videoItem = vm.$el.querySelector('.el-file-preview__item--video');
    videoItem.click();

    setTimeout(() => {
      expect(vm.playFired).to.be.true;
      const previewComponent = vm.$children[0];
      expect(previewComponent.videoDialogVisible).to.be.true;
      done();
    }, 100);
  });

  it('download event', done => {
    vm = createVue({
      template: `
        <el-file-preview :file-list="fileList" @download="handleDownload"></el-file-preview>
      `,
      data() {
        return {
          fileList: [
            { url: 'test.pdf', name: 'test.pdf' }
          ],
          downloadFired: false
        };
      },
      methods: {
        handleDownload() {
          this.downloadFired = true;
        }
      }
    }, true);

    const fileItem = vm.$el.querySelector('.el-file-preview__item--file');
    fileItem.click();

    setTimeout(() => {
      expect(vm.downloadFired).to.be.true;
      done();
    }, 100);
  });

  it('custom video snapshot handler', () => {
    const snapshotHandler = (url) => `${url}?snapshot`;
    vm = createVue({
      template: `
        <el-file-preview 
          :file-list="fileList" 
          :video-snapshot-handler="handler">
        </el-file-preview>
      `,
      data() {
        return {
          fileList: [
            { url: 'test.mp4', name: 'test.mp4' }
          ],
          handler: snapshotHandler
        };
      }
    }, true);

    const previewComponent = vm.$children[0];
    const snapshot = previewComponent.getVideoSnapshot(vm.fileList[0]);
    expect(snapshot).to.equal('test.mp4?snapshot');
  });
});

