import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import { Views } from "../views";

const routes: Array<RouteRecordRaw> = [
  { path: "/", name: "Home", component: Views.Home },
  { path: "/computer/register", name: "ComputerRegister", component: Views.ComputerForm },
  { path: "/computer/edit/:id", name: "ComputerEdit", component: Views.ComputerForm },
  { path: "/computer", name: "Computer", component: Views.Computer },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;