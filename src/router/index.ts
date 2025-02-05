import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
   {
      path: "/",
      name: "Home",
      component: Home,
   },
   {
      path: "/:word",
      name: "WordDetails",
      component: Home, 
      props: true,
   },
];

const router = createRouter({
   history: createWebHistory(),
   routes,
});

export default router;
