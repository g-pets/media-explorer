<template lang="pug">
.layout.layout-media-explorer
	area-top-bar

	.loading(v-if="fetchStatus.isLoading")
		loading-indicator
		.status-message
			template(v-if="fetchStatus.isError") {{fetchStatus.errorMessage}}
			template(v-else) Loading...
	
	template(v-else)
		area-content
			router-view
		area-tool-bar

	area-status-bar
</template>


<script>
import { onBeforeMount } from "vue"
import useRecords from "~/store/Records.js"
import AreaTopBar from "~/components/Areas/AreaTopBar.vue"
import AreaContent from "~/components/Areas/AreaContent.vue"
import AreaToolBar from "~/components/Areas/AreaToolBar.vue"
import AreaStatusBar from "~/components/Areas/AreaStatusBar.vue"
import LoadingIndicator from  "~/components/Misc/LoadingIndicator.vue"
export default {
	components: { AreaTopBar, AreaContent, AreaToolBar, AreaStatusBar, LoadingIndicator },
	setup() {
		const { fetchRecords, fetchStatus } = useRecords()
		onBeforeMount(() => fetchRecords())
		return { fetchStatus }
	}
}
</script>

<style lang="stylus" scoped>
.layout.layout-media-explorer
	width: 100%
	height: 100%
	background: #000
	color: #fff
	display: grid
	grid-template-columns: auto 15em
	grid-template-rows: max-content auto max-content
	position: relative
	header.area.area-top-bar
		background: var(--c-top-bar-bg)
		grid-column: 1/-1
		box-shadow: 0 0.1em 0.4em rgba(#000,0.2)
		position: sticky
		top: 0
		z-index: 3
	main.area.area-content
		background: var(--c-content-bg)
		z-index: 1
		max-height: 100%
		overflow-y: scroll
		overflow-x: hidden
		// padding: 1vw
	aside.area.area-tool-bar
		background: var(--c-tool-bar-bg)
		box-shadow: 0.1em 0 0.4em rgba(#000,0.2)
		z-index: 2
		max-height: 100%
		overflow-y: scroll
		overflow-x: hidden
	footer.area.area-status-bar
		background: var(--c-status-bar-bg)
		box-shadow: 0 -0.1em 0.4em rgba(#000,0.2)
		grid-column: 1 / -1
		width: 100%
		position: sticky
		bottom: 0
		z-index: 3
	.loading
		// height: 100%
		grid-column: 1/-1
		background: var(--c-tool-bar-bg)
		display: flex
		flex-direction: column
		justify-content: center
		align-items: center

</style>