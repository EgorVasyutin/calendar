import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: async () => import("@/pages/IndexPage.vue") },
    {
      path: "/authorization",
      name: "authorization",
      component: async () => import("@/pages/UserAuthorization.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: async () => import("@/pages/UserLogin.vue"),
    },
  ],
});

export default router;
