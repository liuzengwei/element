import AreaPicker from './src/main';

/* istanbul ignore next */
AreaPicker.install = function(Vue) {
  Vue.component(AreaPicker.name, AreaPicker);
};

export default AreaPicker;
