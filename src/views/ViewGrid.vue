<template lang="pug">
.content

	.item-active(v-if="editor.expanded")
		video(:src="currentItem.video_files[0].link" controls muted autoplay loop)

	.items-list(:style="gridStyle" :class="[editor.expanded ? 'strip-view' : 'grid-view']")
		template(v-for="(item, id) in fetchedRecords")
			.media-item(
				@click="recordClick(id)"
				@click.meta="selectRecord(id)"
				@click.alt="rejectRecord(id)")
				icon(v-if="item.rejected" name="reject")
				icon(v-if="item.selected" name="check")
				.cover(:class="{selected:item.selected, rejected:item.rejected}")
					//- img(
					//- 	@mouseover="preloadSlideshow(id)"
					//- 	@mousemove="startSlideshow(id, $event)"
					//- 	@mouseleave="stopSlideshow(id, $event)"
					//- 	:src="item.image" loading="lazy")
					img(
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
import Store from "~/store/store.js"
export default {
	setup() {
		const {
			fetchedRecords,
			selectRecord,
			rejectRecord } = Store()
		
		const state = reactive({
			isLoading: true,
			isError: false,
			errorMessage: '',
			fetchedItems: null,
			currentItems: null,
			currentItem: null
		})
		let editor = reactive({
			api: "/databaseFullShort.json",
			index: 0,
			cellSize: 8,
			showAuthor: false,
			showRejected: false,
			showProcessed: false,
			expanded: false
		})


		const gridStyle = computed(() => {
			return {
				'--media-grid-cell-size': editor.cellSize + 'em'
			}
		})
		

		const expandVideo = () => editor.expanded = true
		const activeItem = id => state.fetchedItems[id].selected = !state.fetchedItems[id].selected
		

		// Slideshow (optimization needed)
		const preloadSlideshow = id => {
			const previews = fetchedRecords[id].video_pictures.map(item => item.picture)
			previews.forEach(image => {
				let img = new Image();
				img.src = image;
			})
		}
		const startSlideshow = (id, event) => {
			const previews = fetchedRecords[id].video_pictures.map(item => item.picture)
			const itemWidth = event.target.clientWidth
			let frameWidth = Math.round(itemWidth / previews.length)
			let mousePosition = event.layerX;
			let imageIndex = Math.round(mousePosition/frameWidth)
			event.target.src = previews[imageIndex]
			// console.log()
		}
		const stopSlideshow = (id, event) => {
			const preview = fetchedRecords[id].image
			event.target.src = preview
		}

		
		const closeVideo = id => state.currentItem = null


		let timer
		let clicks = 0
		const recordClick = id => {
			clicks++
			if (clicks === 1) {
				timer = setTimeout(() => {
					console.log("Single")
					selectRecord(id)
					clicks = 0
				}, 200);
			} else {
				clearTimeout(timer);  
				selectRecord(id);
				expandVideo(id);
				console.log("Double")
				clicks = 0;
			}
        }

		return {
			editor,
			fetchedRecords,
			selectRecord,
			rejectRecord,
			recordClick,
			preloadSlideshow,
			startSlideshow,
			stopSlideshow
			}

		// return {
		// 	fetchedRecords,
		// 	itemClick, editor, ...toRefs(state), rejectItem, selectItem, gridStyle, activeItem, preloadSlideshow, startSlideshow, stopSlideshow }

	}
};
</script>

<style lang="stylus">

.item-active
	video
		width: 100%
.view-control
	font-size: 0.8em
	width: 100%
	bottom: 0
	position: sticky
	background: #222
	z-index: 10
	box-shadow: 0 -0.1em 0.4em rgba(#000,0.2)

.items-list
	&.strip-view
		display: flex
		width: 100%

	&.grid-view
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

</style>