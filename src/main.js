import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebaseApp from "./firebaseApp";

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const isAuthenticated = firebaseApp.auth().currentUser;

  if (requiresAuth && !isAuthenticated) {
    next("/login");
  } else {
    next();
  }
});

let app;

firebaseApp.auth().onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App).use(store).use(router).mount("#app");
  }
});
