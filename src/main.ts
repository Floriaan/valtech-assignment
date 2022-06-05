import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { key, store } from "./store";
import VueClickAwayPlugin from "vue3-click-away";
import { VueMasonryPlugin } from "vue-masonry";

import "./assets/scss/index.scss";

createApp(App)
  .use(store, key)
  .use(VueClickAwayPlugin)
  .use(VueMasonryPlugin)
  .use(router)
  .mount("#app");
