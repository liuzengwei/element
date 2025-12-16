import SelectableTag from './src/selectable-tag.vue';

/* istanbul ignore next */
SelectableTag.install = function(Vue) {
  Vue.component(SelectableTag.name, SelectableTag);
};

export default SelectableTag;
