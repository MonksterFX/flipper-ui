import Vue from 'vue';
import App from './App.vue';
import dayjs from 'dayjs';

Vue.config.productionTip = false;

Vue.filter('formatDate', function(value) {
  if (value) {
    return dayjs(String(value)).format('DD.MM.YYYY HH:mm:ss');
  }
});

new Vue({
  render: (h) => h(App),
}).$mount('#app');
