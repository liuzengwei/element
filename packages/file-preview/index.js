import FilePreview from './src/main';

/* istanbul ignore next */
FilePreview.install = function(Vue) {
  Vue.component(FilePreview.name, FilePreview);
};

export default FilePreview;
