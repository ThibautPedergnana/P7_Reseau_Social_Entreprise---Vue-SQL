import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import vuetify from "./plugins/vuetify";
import NoSideBar from "./layouts/NoSideBar.vue";
import DefaultLayout from "./layouts/DefaultLayout.vue";

Vue.component("nosidebar-layout", NoSideBar);
Vue.component("default-layout", DefaultLayout);

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
