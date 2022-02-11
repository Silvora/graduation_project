import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home/Home.vue";
Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "Home",
		component: Home,
	},
	{
		path: "/login",
		name: "Login",
		component: () => import("../views/Login/Login.vue"),
	},
	{
		path: "/register",
		name: "Register",
		component: () => import("../views/Register/Register.vue"),
	},
];

const router = new VueRouter({
	mode: "history",
	// eslint-disable-next-line no-undef
	base: process.env.BASE_URL,
	routes,
});

export default router;
