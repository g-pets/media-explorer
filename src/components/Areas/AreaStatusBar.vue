<template lang="pug">
footer.area.area-status-bar
	a.github-link(href="https://github.com/g-pets/media-explorer" rel="noopener" target="_blank")
		icon(name="github")
		span v.1.0.0.alpha3
</template>

<style lang="stylus" scoped>
footer.area.area-status-bar
	font-size: 0.7em
	line-height: 1
	padding: 0.5em 1vw
	.github-link
		color: #aaa
		cursor: pointer
		transition: 0.2s color
		svg.icon
			width: 1.3em
			height: 1.3em
			fill: #aaa
			transition: 0.2s fill
			margin-right: 0.5em
		span
			font-size: 0.9em
		&:hover
			color: #fff
			svg.icon
				fill: #fff
</style>