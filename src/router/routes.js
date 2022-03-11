const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    meta: { requireAuth: true },
    component: () =>
      import(/* webpackChunkName: "dashboard" */ "../views/Dashboard.vue"),
  },
  {
    path: "/",
    name: "Home",
    meta: { requireAuth: true },
    component: () =>
      import(/* webpackChunkName: "home" */ "../views/Dashboard.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue"),
  },
  {
    path: "/user",
    name: "User",
    meta: { requireAuth: true },
    component: () => import(/* webpackChunkName: "user" */ "../views/User.vue"),
  },
];

export default routes;
