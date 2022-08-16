import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", component: () => import("../views/MyList.vue") },
        { path: "/register", component: () => import("../views/SignUp.vue") },
        { path: "/sign-in", component: () => import("../views/SignIn.vue") },
        { path: "/ratings", component: () => import("../views/MyRatings.vue") },
    ],
});

export default router;