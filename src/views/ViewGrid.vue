<template lang="pug">
template(v-if="isError") {{errorMessage}}
template(v-else-if="isLoading") Loading...
.media-grid(v-else :style="gridStyle")
	template(v-for="(item, id) in fetchedItems")
		.media-item(
			
			@click.meta="selectItem(id)"
			@click.alt="rejectItem(id)")
			icon(v-if="item.rejected" name="reject")
			icon(v-if="item.selected" name="check")
			.cover(:class="{selected:item.selected, rejected:item.rejected}")
				img(
					@mouseover="preloadSlideshow(id)"
					@mousemove="startSlideshow(id, $event)"
					@mouseleave="stopSlideshow(id, $event)"
					:src="item.image" loading="lazy")
//- .view-control
	.filters Filters:
		label.showRejected.checker(title="Show all videos of this author")
			//- input(type="checkbox" v-model="editor.showAuthor")
			icon(name="author")
		label.showRejected.checker(title="Show rejected videos")
			//- input(type="checkbox" v-model="editor.showRejected")
			icon(name="show-rejected")
		label.showProcessed.checker(title="Show processed videos")
			//- input(type="checkbox" v-model="editor.showProcessed")
			icon(name="show-processed")
	input(type="range" min=1 max=20 step=1 v-model="editor.cellSize")
			
		
</template>

<script>
import { reactive, onMounted, computed, toRefs } from "vue"
export default {
	setup() {
		const state = reactive({
			isLoading: true,
			isError: false,
			errorMessage: '',
			fetchedItems: null,
			currentItems: null,
		})
		// let fetchedVideos = reactive({})
		// const filteredVideos = reactive({})
		// const currentVideo = reactive({})
		let editor = reactive({
			api: "/databaseFullShort.json",
			// api: "http://localhost:82/v1/videos",
			index: 0,
			cellSize: 8,
			showAuthor: false,
			showRejected: false,
			showProcessed: false
		})


		const gridStyle = computed(() => {
			return {
				'--media-grid-cell-size': editor.cellSize + 'em'
			}
		})
		
		
		const fetchItems = async () => {
			console.group("⬇️ Fetching Items from API...")
			try {
				let response = await fetch(editor.api);
				if(!response.ok) throw new Error(`Fetching from API: ${response.statusText}`)
				let parsed = await response.json();
				let data = parsed
				console.log(`· Fetched ${data.length} items.`);
				const mapped = {}
				data.forEach(item => {
					mapped[item.id] = item
				});
				state.fetchedItems = mapped;
			} catch(error) {
				console.error(`‼️ Fetched: ${error}`)
				state.isError = true
				state.errorMessage = error.message
			} finally {
				console.groupEnd();
				state.isLoading = false;
			}
		}


		const activeItem = id => state.fetchedItems[id].selected = !state.fetchedItems[id].selected
		const selectItem = id => state.fetchedItems[id].selected = !state.fetchedItems[id].selected
		const rejectItem = id => state.fetchedItems[id].rejected = !state.fetchedItems[id].rejected
		

		// Slideshow (optimization needed)
		const preloadSlideshow = id => {
			const previews = state.fetchedItems[id].video_pictures.map(item => item.picture)
			previews.forEach(image => {
				let img = new Image();
				img.src = image;
			})
		}
		const startSlideshow = (id, event) => {
			const previews = state.fetchedItems[id].video_pictures.map(item => item.picture)
			const itemWidth = event.target.clientWidth
			let frameWidth = Math.round(itemWidth / previews.length)
			let mousePosition = event.layerX;
			let imageIndex = Math.round(mousePosition/frameWidth)
			event.target.src = previews[imageIndex]
			// console.log()
		}
		const stopSlideshow = (id, event) => {
			const preview = state.fetchedItems[id].image
			event.target.src = preview
		}

		onMounted(() => fetchItems())

		return { editor, ...toRefs(state), fetchItems, rejectItem, selectItem, gridStyle, activeItem, preloadSlideshow, startSlideshow, stopSlideshow }

	}
};
</script>

<style lang="stylus">
.view-control
	font-size: 0.8em
	width: 100%
	bottom: 0
	position: sticky
	background: #222
	z-index: 10
	box-shadow: 0 -0.1em 0.4em rgba(#000,0.2)
.media-grid
	display: grid
	grid-template-columns: repeat( auto-fill, minmax(var(--media-grid-cell-size), 1fr) )
	grid-template-rows: repeat(auto-fill, 5em) 20%
	width: 100%
	min-height: 100%
	gap: 1vw
	background: #111
	padding: 1vw
	.media-item
		cursor: pointer
		position: relative
		overflow: hidden
		// border-radius: 0.3em
		transition: 0.25s box-shadow
		&:hover
			transition: 0s box-shadow
			box-shadow: 0 0 0 0.15em var(--c-light-blue)
			// transform: scale(1.2)
			// z-index: 2
		svg.icon
			width: 1.5em
			height: 1.5em
			position: absolute
			z-index: 1
			&.icon-reject
				fill: red
				top: 0.5em
				left: 0.5em
			&.icon-check
				fill: #fff
				top: 0.5em
				right: 0.5em
		.cover
			transition: filter 0.2s
			height: 100%
			img
				display: block
				max-width: 100%
				height: 100%
				object-fit: cover
			&.selected
				position: relative
				filter: contrast(150%)
				&:after
					content: ""
					position: absolute
					top: 0
					left: 0
					width: 100%
					height: 100%
					background: #48a1ff
					opacity: 0.5
			&.rejected
				filter: saturate(0%) contrast(70%) brightness(40%)


.view.grid-view
	.top-bar
		font-size: 0.8em
		display: flex
		align-items: center
		justify-content: space-between
		padding: 0.5em 1em
		.api
			display: flex
			align-items: center
			input
				margin: 0 0.3em
				background: #333
				border: none
				outline: none
				padding: 0.5em 0.5em
				border-radius: 0.5em
	.content
		display: flex
		.video-container
			margin: auto
			width: 90%
			position: relative
			video
				width: 100%
				width: 100%
				transition: opacity .2s
			&.rejected
				video
					filter: saturate(0%)
					opacity: 0.7
			svg.icon-rejected
				width: 5vw
				height: 5vw
				fill: red
				position: absolute
				z-index: 1
				top: 0.5em
				left: 0.5em	
</style>