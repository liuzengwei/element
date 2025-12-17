import Trigger from './src/main';

/* istanbul ignore next */
Trigger.install = function(Vue) {
  Vue.component(Trigger.name, Trigger);
};

export default Trigger;
