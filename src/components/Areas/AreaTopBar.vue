<template lang="pug">
header.area.area-top-bar
	h1
		icon(name="logo")
		span.title Explorer
	.controls
		icon(name="help" @click="toggleHelp()")
		icon(name="fullscreen" @click="toggleFullscreen()")
	
//- .help help
</template>

<script>
export default {
	setup() {
		const toggleHelp = () => {}
		const toggleFullscreen = () => {
			if (!document.fullscreenElement) document.documentElement.requestFullscreen();
			else document.exitFullscreen();
		}

		return { toggleHelp, toggleFullscreen }
	}
};
</script>

<style lang="stylus" scoped>
header.area.area-top-bar
	padding: 0.5em 1vw
	display: flex
	align-items: center
	h1
		display: flex
		align-items: center
		line-height: 1
		svg.icon-logo
			fill: #fff
			width: 1.5em
			height: 1.5em
			margin-right: 0.3em
		span.title
			margin-top: 0.2em
			font-weight: bold
	.controls
		margin-left: auto
		svg
			fill: #fff
			width: 1.5em
			height: 1.5em	
.help
	position: absolute
	top: 0
	left: 0
	width: 50%
	background: #333		
</style>