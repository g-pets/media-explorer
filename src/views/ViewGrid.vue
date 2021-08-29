<template lang="pug">

filters-panel
	
.media-container.section-scrolled(:class="`${view.layout}-layout`" :style="layoutStyle")
	.item-active(v-if="view.layout === 'strip'")
		video(:src="selectedRecord.video_files[3].url" controls muted autoplay loop)

	.items-list
		media-item(
			v-for="(item, index) in filteredRecords"
			:id="`media-item-${item.id}`"
			:item="item"
			:class="{selected: selectedRecord.id == item.id}"
			@click="recordClick(item.id)"
			@click.alt="rejectRecord(item.id)")

view-control

</template>

<script>
import { onMounted } from "vue"
import useRecords from "~/store/Records.js"
import useApp from "~/store/App"
import gSearch from "~/components/Controls/gSearch.vue"
import MediaItem from "~/components/Media/MediaItem.vue"
import FiltersPanel from "~/components/Panels/FiltersPanel.vue"
import ViewControl from "~/components/Panels/ViewControl.vue"
export default {
	components: { gSearch, MediaItem, FiltersPanel, ViewControl },
	setup() {
		const { selectRecord, selectedRecord, rejectRecord, nextRecord, setRating, filteredRecords } = useRecords()
		const { layoutStyle, view, switchLayout } = useApp()
		let timer
		let clicks = 0

		const recordClick = id => {
			selectRecord(id)
			clicks++
			if (clicks === 1) timer = setTimeout(() => clicks = 0, 200);
			else {
				clearTimeout(timer);  
				switchLayout('strip');
				clicks = 0;
			}
        }

		const hotKeysListner = () => {
			window.addEventListener('keydown', event => {
				// event.preventDefault();
				if (event.key === "Escape") switchLayout('grid')
				if (event.key === "Enter") switchLayout('strip')
				if (event.key === "p") rejectRecord();
				if (event.key === "ArrowLeft") nextRecord(-1);
				if (event.key === "ArrowRight") nextRecord(1);
				// if (event.key === "ArrowUp") nextRecord(-10);
				// if (event.key === "ArrowDown") nextRecord(10);
				if (event.key === "0") setRating(0)
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
			recordClick,
			view,
			rejectRecord,
			filteredRecords,
			selectedRecord,
			layoutStyle
		}
	}
};
</script>

<style lang="stylus">	
.media-container
	&.table-layout
		.items-list
			display: flex
			flex-direction: column
			.media-item
				height: 5em
	&.grid-layout
		.items-list
			display: grid
			grid-template-columns: repeat( auto-fill, minmax(var(--media-cell-size), 1fr) )
			gap: 1vw
			padding: 1vw
	&.strip-layout
		display: flex
		flex-direction: column
		.item-active
			margin: auto
			width: 90%
			// flex: 0 1 min-content
			video
				width: 100%
		.items-list
			// flex: 0 1 max-content
			display: flex
			width: 100%
			gap: calc(var(--media-cell-size) * 0.1)
			overflow scroll
			background: #222
			padding: calc(var(--media-cell-size) * 0.1) 0.5em
			.media-item
				flex: 1 0 auto
				width: var(--media-cell-size)
				min-width: 3em



</style>