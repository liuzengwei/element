import ElTable from './src/table';

/* istanbul ignore next */
ElTable.install = function(Vue) {
  console.log('🚀 ~ ElTable.name:', ElTable.name);
  Vue.component(ElTable.name, ElTable);
};

export default ElTable;
