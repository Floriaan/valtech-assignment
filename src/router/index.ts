import { store } from "@/store";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/LoginPage.vue"),
  },
  {
    path: "/",
    name: "Dashboard",
    component: () =>
      import(/* webpackChunkName: "dashboard" */ "../views/DashboardPage.vue"),
  },
  {
    path: "/image-details/:id",
    name: "ImageDetails",
    component: () =>
      import(
        /* webpackChunkName: "image-details" */ "../views/ImageDetailsPage.vue"
      ),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name !== "Login" && !localStorage.getItem("token")) {
    store.commit("setIsLogged", false);
    next({ name: "Login" });
  } else if (to.name === "Login" && localStorage.getItem("token")) {
    next({ name: "Dashboard" });
  } else {
    next();
  }
});

export default router;
