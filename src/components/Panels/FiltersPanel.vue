<template lang="pug">
.panel.filters-panel.section-fixed
	.counter {{selectedRecordIndex + 1}} of {{filteredRecords.length}}
	g-search(v-model="filters.query")
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
</template>

<script>
import useStore from "~/store/Store"
import useApp from "~/store/App"
import gSearch from "~/components/Controls/gSearch.vue"
export default {
	components: { gSearch },
	setup() {
		const { selectedRecordIndex, filteredRecords } = useStore()
		const { filters } = useApp()
		return { selectedRecordIndex, filteredRecords, filters }
	}
};
</script>

<style lang="stylus" scoped>
.panel.filters-panel
	background: var(--c-content-panel-bg)
	display: flex
	font-size: 0.8em
	justify-content: space-between
	align-items: center
	line-height: 1
	padding: 0.5em 1vw
	// position: sticky
	// top: 0
	// z-index: 10
	color: #aaa
	box-shadow: 0 0.1em 0.4em rgba(#000,0.2)
	input
		border: none
		background: #333
</style>