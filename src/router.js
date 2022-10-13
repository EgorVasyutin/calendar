import App from "@/App";
import UserAuthorization from "@/components/UserAuthorization";
import UserLogin from "@/components/UserLogin";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: App },
    {
      path: "/authorization",
      name: "authorization",
      component: UserAuthorization,
    },
    { path: "/login", component: UserLogin },
  ],
});

export default router;
