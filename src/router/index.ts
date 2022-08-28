import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/dashboard/Index.vue";
import AddSpend from "../views/spend-form/Index.vue"
import EditSpend from "../views/spend-form/Edit.vue"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/add",
    name: "Add",
    component: AddSpend,
  },
  {
    path: "/edit",
    name: "Edit",
    component: EditSpend,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
