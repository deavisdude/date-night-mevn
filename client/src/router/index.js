import { createRouter, createWebHistory } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { resolve } from "core-js/fn/promise";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { 
            path: "/",
            component: () => import("../views/MyList.vue"),
            meta: {
                requiresAuth: true,
            }
        },
        { 
            path: "/global-list",
            component: () => import("../views/GlobalList.vue"),
            meta: {
                requiresAuth: true,
            }
        },
        { path: "/register", component: () => import("../views/SignUp.vue") },
        { path: "/sign-in", component: () => import("../views/SignIn.vue") },
        { path: "/visits", component: () => import("../views/MyVisits.vue") },
    ],
});

const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const removeListener = onAuthStateChanged(
            getAuth(),
            (user) => {
                removeListener();
                resolve(user);
            },
            reject
        );
    });
};

router.beforeEach(async (to, from, next) => {
    if(to.matched.some((record) => record.meta.requiresAuth)) {
        if(await getCurrentUser()) {
            next();
        } else {
            alert("You don't have access!");
            next("sign-in");
        }
    } else {
        next();
    }
});

export default router;