import { store } from "@/store";
import { Album } from "@/types";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "Login",
    meta: {
      requiresAuth: false,
    },
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/LoginPage.vue"),
  },
  {
    path: "/",
    name: "Dashboard",
    meta: {
      requiresAuth: true,
    },
    component: () =>
      import(/* webpackChunkName: "dashboard" */ "../views/DashboardPage.vue"),
  },
  {
    path: "/image-details/:id",
    name: "ImageDetails",
    meta: {
      requiresAuth: true,
    },
    component: () =>
      import(
        /* webpackChunkName: "image-details" */ "../views/ImageDetailsPage.vue"
      ),
  },
  {
    path: "/album-details/:id",
    name: "AlbumDetails",
    meta: {
      requiresAuth: true,
    },
    component: () =>
      import(
        /* webpackChunkName: "album-details" */ "../views/AlbumDetailsPage.vue"
      ),
  },
  { path: "/:pathMatch(.*)", redirect: "/" },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !localStorage.getItem("token")) {
    store.commit("setIsLogged", false);
    next({ name: "Login" });
  } else if (to.name === "Login" && localStorage.getItem("token")) {
    next({ name: "Dashboard" });
  } else {
    // Checks whether there is any albums with that id, to prevent app from crashing.
    if (to.name === "AlbumDetails") {
      const albumExists = store.getters.albums.some(
        (album: Album) => album.id === to.params.id
      );
      if (albumExists) {
        next();
      } else {
        next({ name: "Dashboard" });
      }
    } else {
      next();
    }
  }
});

export default router;
