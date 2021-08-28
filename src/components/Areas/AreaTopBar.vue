<template lang="pug">
header.area.area-top-bar
	.app-title
		icon.app-logo(name="logo")
		h1 Explorer
		sup.app-version &alpha;
	.controls
		//- icon(name="settings" @click="toggleSettings()")
		//- icon(name="help" @click="toggleHelp()")
		icon(name="fullscreen" @click="toggleFullscreen()")
</template>

<script>
import useApp from "~/store/App"
export default {
	setup() {
		const { toggleSettings, toggleHelp } = useApp();
		const toggleFullscreen = () => {
			if (!document.fullscreenElement) document.documentElement.requestFullscreen();
			else document.exitFullscreen();
		}

		return { toggleSettings, toggleHelp, toggleFullscreen }
	}
};
</script>

<style lang="stylus" scoped>
header.area.area-top-bar
	padding: 0.5em 1vw
	display: flex
	align-items: center
	.app-title
		display: flex
		align-items: center
		line-height: 1
		.app-logo
			fill: #fff
			width: 1.5em
			height: 1.5em
			margin-right: 0.3em
		h1
			margin-top: 0.2em
			font-weight: bold
		.app-version
			color: #bbb
			margin-left: 0.2em
	.controls
		margin-left: auto
		svg.icon
			cursor: pointer
			fill: #aaa
			width: 1.2em
			height: 1.2em	
			&:hover
				fill: #fff
			&.icon-fullscreen
				width: 1.5em
				height: 1.5em
			+ svg.icon
				margin-left: 0.5em
</style>