import { createWebHistory, createRouter } from "vue-router";

// layouts
import LayoutGallery from "~/layouts/LayoutGallery.vue"

// views
const ViewGrid = () => import( "~/views/ViewGrid.vue" );

// routes
const routes = [
	// {
	// 	path: "/not-supported/",
	// 	name: "NotSupportedLayer",
	// 	component: NotSupportedLayer
	// },
	// { path: '/', redirect: { name: 'LockScreen' } },
	{
		path: "/",
		component: LayoutGallery,
		namе: "LayoutGallery",
		children: [
			{
				path: "/",
				name: "ViewGrid",
				component: ViewGrid
			},
			{
				path: "",
				redirect: { name: "ViewGrid" },
			}
		]
	},
	{
	"path": "/:pathMatch(.*)*",
	"redirect": { "name": "Main" }
}];

export default createRouter({
	"history": createWebHistory(),
	routes
});
