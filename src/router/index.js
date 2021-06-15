import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Desk from "../views/Desk.vue";
import Order from "../views/Order.vue";
import Checkout from "../views/Checkout.vue";
import Auth from "../views/Auth.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: "/desk/:id",
    name: "Desk",
    component: Desk,
    meta: { requiresAuth: true },
  },
  {
    path: "/desk/:id/order",
    name: "Order",
    component: Order,
    meta: { requiresAuth: true },
  },
  {
    path: "/checkout",
    name: "Checkout",
    component: Checkout,
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "Login",
    component: Auth,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
