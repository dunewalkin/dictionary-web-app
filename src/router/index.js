import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/:word",
    name: "WordDetails",
    component: Home, // Используем тот же компонент для отображения результатов
    props: true,     // Передаём параметр как пропс
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
