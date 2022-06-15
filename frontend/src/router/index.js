import Vue from "vue";
import VueRouter from "vue-router";
import SignUp from "../views/auth/SignUp.vue";
import WallPage from "../views/wall/WallPage.vue";
import userProfile from "../views/user-profile/userProfile.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/app/wall",
    name: "Wall",
    component: WallPage,
  },
  {
    path: "/app/user-profile/:id",
    name: "userProfile",
    component: userProfile,
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
