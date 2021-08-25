import { createApp } from "vue";
import vueApp from "./App.vue";
import Icon from "~/components/Icons/Icon.vue";

createApp( vueApp )
	.component('Icon', Icon)
	.mount( "#app" );
