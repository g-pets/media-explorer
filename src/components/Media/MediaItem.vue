<template lang="pug">
.media-item(tabindex="0")
	icon(v-if="item.rejected" name="reject")
	icon(v-if="item.selected" name="check")
	img.cover(
		:src="item.image"
		loading="lazy"
		:class="{selected:item.selected, rejected:item.rejected}"
		@mouseover="preloadSlideshow"
		@mousemove="startSlideshow"
		@mouseleave="stopSlideshow")
</template>

<script>
export default {
	props: {
		item: Object
	},
	setup( props ) {


		const preloadSlideshow = () => {
			const previews = props.item.screenshots
			previews.forEach(image => {
				let img = new Image();
				img.src = image;
			})
		}

		const startSlideshow = event => {
			const previews = props.item.screenshots
			const itemWidth = event.target.clientWidth
			let frameWidth = Math.round(itemWidth / previews.length + 1)
			let mousePosition = event.layerX;
			let imageIndex = Math.round(mousePosition/frameWidth)
			event.target.src = previews[imageIndex]
		}

		const stopSlideshow = event => {
			const preview = props.item.image
			event.target.src = preview
		}

		return {
			preloadSlideshow,
			startSlideshow,
			stopSlideshow
		}
	}
};
</script>

<style lang="stylus" scoped>
.media-item
	cursor: pointer
	position: relative
	overflow: hidden
	width: 100%
	height: 100%
	aspect-ratio: 1.7 / 1
	transition: 0.25s box-shadow
	&:focus
		border: none
		outline: none
	&:hover, &:focus
		transition: 0.1s box-shadow
		box-shadow: 0 0 0 0.4vw #555
		z-index: 10
	&.selected
		box-shadow: 0 0 0 0.4vw var(--c-light-blue)
		z-index: 10
	svg.icon
		width: 1.2em
		height: 1.2em
		position: absolute
		z-index: 1
		&.icon-reject
			fill: #d62f2f
			top: 0.3em
			left: 0.3em
		&.icon-check
			fill: #fff
			top: 0.5em
			right: 0.5em
	img.cover
		transition: filter 0.2s
		width: 100%
		height: 100%
		overflow: hidden
		background: #222
		object-fit: cover
	
		&.selected
			box-shadow: 0 0 0 0.3em var(--c-light-blue)
			
		// &.selected
		// 	position: relative
		// 	filter: contrast(150%)
		// 	&:after
		// 		content: ""
		// 		position: absolute
		// 		top: 0
		// 		left: 0
		// 		width: 100%
		// 		height: 100%
		// 		background: #48a1ff
		// 		opacity: 0.5
		&.rejected
			filter: saturate(0%) contrast(70%) brightness(40%)
</style>