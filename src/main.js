// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './styles/base.less';
import Vue from 'vue'
import App from './App'
import router from './router'
//网络请求组件
import Resource from 'vue-resource'
Vue.use(Resource);

//引入第三方组件（vendor组件）
//提示组件
import {Confirm, Alert, Toast, Notify, Loading} from './components/vendor/dialog';
Vue.prototype.$dialog = {
    confirm: Confirm,
    alert: Alert,
    toast: Toast,
    notify: Notify,
    loading: Loading
};

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
