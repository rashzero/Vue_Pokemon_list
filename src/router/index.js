import Vue from "vue";
import Router from "vue-router";
import Main from "../container/Main";
import Pokemon from "../components/Pokemon";

Vue.use(Router);

export default new Router({
  mode: "history",

  routes: [
    {
      path: "/",
      redirect: "/main"
    },

    {
      path: "/main",
      component: Main,
      props: route => ({ list: route.query.list })
    },

    {
      path: "/pokemon",
      component: Pokemon,
      props: route => ({ name: route.query.name })
    }
  ]
});
