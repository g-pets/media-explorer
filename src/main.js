import { createApp } from "vue";
import vueApp from "./App.vue";
import router from "./router";
import Icon from "~/components/Icons/Icon.vue";


createApp( vueApp )
	.use( router )
	.component('Icon', Icon)
	.mount( "#app" );
	