import { createApp } from "vue";
import App from "./App.vue";
import MyLibrary from "app-my-library";
import "app-my-library/dist/style.css";
import router from "@/router";

createApp(App).use(router).use(MyLibrary).mount("#app");
