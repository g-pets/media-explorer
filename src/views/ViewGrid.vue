<template lang="pug">
.media-container
	
	.info-panel(v-if="selectedRecord")
		.counter 1 of {{filtered.length}}
		g-search(v-model="query")
	
	.item-active(v-if="editor.expanded")
		video(:src="selectedRecord.video_files[1].url" controls muted autoplay loop)
	
	.items-list(:style="gridStyle" :class="[editor.expanded ? 'strip-view' : 'grid-view']")
		media-item(
			v-for="(item, id) in filtered"
			:item="item"
			:class="{selected: selectedRecord.id == id}"
			@click="recordClick(id)"
			@click.meta="checkRecord(id)"
			@click.alt="rejectRecord(id)")
	
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
import MediaItem from "~/components/Media/MediaItem.vue"
export default {
	components: { gSearch, gRange, MediaItem },
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
				if (event.key === "p" || event.key === "Backspace") rejectRecord();
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

		

		onMounted(() => {
			hotKeysListner();
		})

		return {
			editor,
			fetchedRecords,
			selectRecord,
			checkRecord,
			rejectRecord,
			
			recordClick,
			gridStyle,
			query,
			filtered,
			selectRecord,
			selectedRecord
		}
	}
};
</script>

<style lang="stylus">
.media-container
	display: flex
	flex-direction: column
	min-height: 100%

	.info-panel
		background: var(--c-content-panel-bg)
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
		box-shadow: 0 0.1em 0.4em rgba(#000,0.2)
		input
			border: none
			background: #333
	
	.item-active
		margin: auto
		width: 90%
		video
			width: 100%
	
	.items-list
		&.strip-view
			display: flex
			width: 100%
			gap: 1vw
			overflow scroll
			// background: #222
			padding: 1em 0.5em
			.media-item
				flex: 1 0 auto
				width: 7em
		&.grid-view
			display: grid
			grid-template-columns: repeat( auto-fill, minmax(var(--media-grid-cell-size), 1fr) )
			// grid-template-rows: repeat(auto-fill, 8vw)
			width: 100%
			min-height: 100%
			gap: 1vw
			padding: 1vw

.view-control
	font-size: 0.8em
	width: 100%
	bottom: 0
	position: sticky
	background: var(--c-content-panel-bg)
	z-index: 10
	padding: 0.5em 1vw
	box-shadow: 0 -0.1em 0.4em rgba(#000,0.2)

</style>