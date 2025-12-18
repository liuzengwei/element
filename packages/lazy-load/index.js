import LazyLoad from './src/main';

/* istanbul ignore next */
LazyLoad.install = function(Vue) {
  Vue.component(LazyLoad.name, LazyLoad);
};

export default LazyLoad;
