import Vue from "vue";
import VueRouter from "vue-router";
import SignUp from "../views/auth/SignUp.vue";
import WallPage from "../views/wall/WallPage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/app/wall",
    name: "Wall",
    component: WallPage,
  },
  {
    path: "/",
    name: "Signup",
    meta: { layout: "nosidebar" },
    component: SignUp,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
