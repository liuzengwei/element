import Amount from './src/main';

/* istanbul ignore next */
Amount.install = function(Vue) {
  Vue.component(Amount.name, Amount);
};

export default Amount;
