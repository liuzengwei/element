import Vue from 'vue';
import ElementUI from '@liuzengwei/element-ui';
import '@liuzengwei/element-ui/lib/theme-chalk/index.css';
import 'normalize.css/normalize.css';
import App from './App.vue';
import router from './router';
import store from './store';

// 使用 Element UI
Vue.use(ElementUI);

// 全局配置
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
