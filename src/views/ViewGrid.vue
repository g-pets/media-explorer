<template lang="pug">
.media-container
	//- p(v-for="(item, index) in filtered") {{item}}

	
	.info-panel(v-if="selectedRecord")
		.counter 1 of {{filtered.length}}
		g-search(v-model="query")
	.item-active(v-if="editor.expanded")
		video(:src="selectedRecord.video_files[1].url" controls muted autoplay loop)
	
	.items-list(:style="gridStyle" :class="[editor.expanded ? 'strip-view' : 'grid-view']")
		template(v-for="(item, id) in filtered")
			.media-item(
				@click="recordClick(id)"
				@click.meta="checkRecord(id)"
				@click.alt="rejectRecord(id)")
				icon(v-if="item.rejected" name="reject")
				icon(v-if="item.selected" name="check")
				.cover(:class="{selected:item.selected, rejected:item.rejected}")
					//- img(
						@mouseover="preloadSlideshow(id)"
						@mousemove="startSlideshow(id, $event)"
						@mouseleave="stopSlideshow(id, $event)"
						:src="item.image" loading="lazy")
					img(:src="item.image" loading="lazy")
	
	.view-control
		//- .filters Filters:
			label.showRejected.checker(title="Show all videos of this author")
				//- input(type="checkbox" v-model="editor.showAuthor")
				icon(name="author")
			label.showRejected.checker(title="Show rejected videos")
				//- input(type="checkbox" v-model="editor.showRejected")
				icon(name="show-rejected")
			label.showProcessed.checker(title="Show processed videos")
				//- input(type="checkbox" v-model="editor.showProcessed")
				icon(name="show-processed")
		g-range(:min="1" :max="20" v-model="editor.cellSize" :icons="['small-cell', 'large-cell']")
				
		
</template>

<script>
import { ref, computed, onMounted } from "vue"
import Store from "~/store/Store.js"
import gSearch from "~/components/Controls/gSearch.vue"
import gRange from "~/components/Controls/gRange.vue"
export default {
	components: { gSearch, gRange },
	setup() {
		const {
			fetchedRecords,
			selectRecord,
			selectedRecord,
			checkRecord,
			rejectRecord,
			expandRecord,
			collapseRecord,
			editor } = Store()
		
		const query = ref(null)

		const filtered = computed(() => {
			try {
				if(!query.value) return fetchedRecords.value
				let q = String(query.value.toLowerCase().trim())
				const result = fetchedRecords.value.filter(item => {
					let data = [...item.tags, ...item.keywords, ...item.type, item.tempo]
					data = data.join(" ")
					if(data.includes(q)) return true
				})
				return result
			} catch(error) {
				console.log(error)
			}
		})

		

		

		const gridStyle = computed(() => {
			return {
				'--media-grid-cell-size': editor.cellSize + 'em'
			}
		})

		// Slideshow (optimization needed)
		const preloadSlideshow = id => {
			const previews = fetchedRecords[id].video_pictures.map(item => item.picture)
			previews.forEach(image => {
				let img = new Image();
				img.src = image;
			})
		}
		const startSlideshow = (id, event) => {
			const previews = fetchedRecords[id].screenshots
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

		
		


		let timer
		let clicks = 0
		const recordClick = id => {
			selectRecord(id)
			clicks++
			if (clicks === 1) timer = setTimeout(() => clicks = 0, 200);
			else {
				clearTimeout(timer);  
				expandRecord(id);
				clicks = 0;
			}
        }


		const hotKeysListner = () => {
			window.addEventListener('keydown', event => {
				// event.preventDefault();
				if (event.key === "Escape") collapseRecord()
				if (event.key === "Enter") expandRecord()
				if (event.key === "p" || event.key === "Backspace") rejectVideo();
				if (event.key === "ArrowLeft") nextVideo(-1);
				if (event.key === "ArrowRight") nextVideo(1);
				if (event.key === "ArrowUp") nextVideo(-10);
				if (event.key === "ArrowDown") nextVideo(10);
				if (event.key === "1") setRating(1)
				if (event.key === "2") setRating(2)
				if (event.key === "3") setRating(3)
				if (event.key === "4") setRating(4)
				if (event.key === "5") setRating(5)
			})
		}

		// onMounted(() => {
		// 	hotKeysListner();
		// })

		return {
			editor,
			fetchedRecords,
			selectRecord,
			checkRecord,
			rejectRecord,
			selectedRecord,
			recordClick,
			preloadSlideshow,
			startSlideshow,
			stopSlideshow,
			gridStyle,
			query,
			filtered
			}

		// return {
		// 	fetchedRecords,
		// 	itemClick, editor, ...toRefs(state), rejectItem, selectItem, gridStyle, activeItem, preloadSlideshow, startSlideshow, stopSlideshow }

	}
};
</script>

<style lang="stylus">
.media-container
	display: flex
	flex-direction: column
	min-height: 100%

	.info-panel
		background: #1e1e21
		display: flex
		font-size: 0.8em
		justify-content: space-between
		align-items: center
		line-height: 1
		padding: 0.5em 1vw
		position: sticky
		top: 0
		z-index: 10
		color: #aaa
		input
			border: none
			background: #333
	
	.item-active
		margin: auto
		width: 90%
		video
			width: 100%
	
	.items-list
		.media-item
			cursor: pointer
			position: relative
			overflow: hidden
			// transition: 0.25s transform, 0.25s box-shadow
			&:hover
				box-shadow: 0 0 0 0.15em var(--c-light-blue)
				// transform: scale(1.2)
				z-index: 2
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
		&.strip-view
			display: flex
			width: 100%
			gap: 1vw
			overflow scroll
			background: #222
			padding: 1em 0.5em
			.media-item
				flex: 1 0 auto
				width: 7em
		&.grid-view
			display: grid
			grid-template-columns: repeat( auto-fill, minmax(var(--media-grid-cell-size), 1fr) )
			grid-template-rows: repeat(auto-fill, 5em) 20%
			width: 100%
			min-height: 100%
			gap: 1vw
			background: #111
			padding: 1vw

.view-control
	font-size: 0.8em
	width: 100%
	bottom: 0
	position: sticky
	background: #222
	z-index: 10
	box-shadow: 0 -0.1em 0.4em rgba(#000,0.2)

</style>