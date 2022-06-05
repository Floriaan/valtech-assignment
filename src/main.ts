import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { key, store } from "./store";
import "./assets/scss/index.scss";

createApp(App).use(store, key).use(router).mount("#app");
