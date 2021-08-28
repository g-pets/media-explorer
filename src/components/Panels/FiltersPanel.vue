<template lang="pug">
.panel.filters-panel.section-fixed
	.counter {{selectedRecordIndex + 1}} of {{filteredRecords.length}}
	//- .sorting-control
	//- g-switcher(id="filters" :options="filtersList")

	.filters-control
		gChecker(icon="show-rejected" v-model="filters.showRejected" tooltip="Show Rejected files")
		gChecker(icon="check" v-model="filters.showProcessed" tooltip="Show Processed files")
		gChecker(icon="author" v-model="filters.showAuthor" tooltip="Show all files by current author")

	g-search(v-model="filters.query")
</template>

<script>
import useRecords from "~/store/Records"
import gChecker from "~/components/Controls/gChecker.vue"
import gSearch from "~/components/Controls/gSearch.vue"
export default {
	components: { gChecker, gSearch },
	setup() {
		const { selectedRecordIndex, filteredRecords, filters } = useRecords()
		return { selectedRecordIndex, filteredRecords, filters }
	}
};
</script>

<style lang="stylus" scoped>
.panel.filters-panel
	background: var(--c-content-panel-bg)
	display: flex
	font-size: 0.8em
	gap: 1em
	justify-content: space-between
	align-items: center
	line-height: 1
	padding: 0.5em 1vw
	color: #aaa
	box-shadow: 0 0.1em 0.4em rgba(#000,0.2)
	.counter
		margin-right: auto
	.filters-control
		display: flex
		gap: 0.4em
</style>