import Vue from 'vue'
import App from './App.vue'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
import routes from "./router"
import VueRouter from 'vue-router'
import axios from "axios"
import Api from './utils/axios.js';
import ipfs from "ipfs-http-client";

Vue.use(ipfs);


Vue.use(axios)
Vue.use(VueRouter);
Vue.use(ViewUI);
Vue.prototype.$axios=axios;
Vue.prototype.$api = Api;
Vue.config.productionTip = false
const router = new VueRouter({
  mode: 'history',
  routes,
})

new Vue({
  el: '#app',
  router,
  render: h => h(App),
})

Vue.prototype.$axios = axios

Vue.prototype.$addStorageEvent = function (type, key, data) {
  if (type === 1) {
    // 创建一个StorageEvent事件
    var newStorageEvent = document.createEvent('StorageEvent');
    const storage = {
      setItem: function (k, val) {
        sessionStorage.setItem(k, val);
        // 初始化创建的事件
        newStorageEvent.initStorageEvent('setItem', false, false, k, null, val, null, null);
        // 派发对象
        window.dispatchEvent(newStorageEvent);
      }
    }
    return storage.setItem(key, data);
  }
}
Vue.prototype.$removeStorageEvent = function (type, key) {
  if (type === 1) {
    // 创建一个StorageEvent事件
    var newStorageEvent = document.createEvent('StorageEvent');
    const storage = {
      removeItem: function (k) {
        var val = sessionStorage.getItem(k);
        sessionStorage.removeItem(k);
        // 初始化创建的事件
        newStorageEvent.initStorageEvent('removeItem', false, false, k, val, null, null, null);
        // 派发对象
        window.dispatchEvent(newStorageEvent);
      }
    }
    return storage.removeItem(key);
  }
}
Vue.prototype.$clearStorageEvent = function (type) {
  if (type === 1) {
    // 创建一个StorageEvent事件
    var newStorageEvent = document.createEvent('StorageEvent');
    const storage = {
      clearItem: function () {
        sessionStorage.clear();
        // 初始化创建的事件
        newStorageEvent.initStorageEvent('clearItem', false, false, null, null, null, null, null);
        // 派发对象
        window.dispatchEvent(newStorageEvent);
      }
    }
    return storage.clearItem();
  }
}
