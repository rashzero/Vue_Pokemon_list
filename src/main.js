import Vue from "vue";
import App from "./App.vue";
//import Vuetify from "vuetify";
import vuetify from "@/plugins/vuetify";
import router from "./router";
import store from "./store";

//Vue.use(Vuetify);
Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  vuetify,
  store,
  icons: {
    iconfont: "mdiSvg"
  },
  components: { App },
  template: "<App/>"
});
