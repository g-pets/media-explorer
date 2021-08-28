<template lang="pug">
icons-set
.app-container(v-if="!fetchStatus.isLoading")
	router-view

.overlay.overlay-settings(v-if="overlays.settings")
	h2 Settings
	label API:
		input(type="text" v-model="fetchUrl")
.overlay.overlay-help(v-if="overlays.help")
	h2 Help
	ul
		li Alt + Click: Reject item;
		li Esc: Back to grid view;
		li Enter: Go to strip view;
		li Double Clock: Go to strip view;
</template>

<script>
import { onBeforeMount } from "vue"
import IconsSet from "~/components/Icons/IconsSet.vue"
import useRecords from "~/store/Records.js"
import useApp from "~/store/App"
export default {
	components: { IconsSet },
	setup() {
		const { fetchRecords, fetchStatus, fetchUrl } = useRecords()
		const { overlays } = useApp()
		onBeforeMount(() => fetchRecords())
		return { fetchStatus, overlays, fetchUrl }
	}
};
</script>

<style lang="stylus">
@import "./assets/styles/index.styl"
.app-container
	--c-blue: #324873
	--c-light-blue: #48a1ff
	--c-purple: #4c3273
	--c-red: #9e2c2c
	--c-green: #227a59

	--c-top-bar-bg: #242528
	--c-content-bg: #111
	--c-content-panel-bg: #191919
	--c-tool-bar-bg: #1a1b1d
	--c-tool-bar-panel-bg: #222222
	--c-status-bar-bg: #242528
.overlay
	position: absolute
	margin: auto
	top: 0
	left: 0
	right: 0
	bottom: 0
	width: 50%
	height: 50%
	background: #333
	border-radius: 0.5em
	padding: 1em
	z-index: 100
	color: #fff
	input
		background: #222
		border: none
		outline: none
		margin-left: 0.4em
		padding: 0.5em
		width: 100%
		line-height: 1
</style>