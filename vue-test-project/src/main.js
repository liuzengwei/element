import Vue from 'vue';
import ElementUI from '@liuzengwei/element-ui';
import '@liuzengwei/element-ui/lib/theme-chalk/index.css';
import App from './App.vue';

// 使用 Element UI
Vue.use(ElementUI);

// 创建 Vue 实例
new Vue({
  el: '#app',
  render: h => h(App)
});
