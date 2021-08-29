<template lang="pug">
.panel.view-control.section-fixed
	g-switcher(id="layout" :options="layouts" v-model="view.layout")
	g-range(:min="1" :max="20" v-model.number="view[view.layout]" :icons="[`${view.layout}-view-compact`, `${view.layout}-view-wide`]")
</template>

<script>
import useApp from "~/store/App"
import gSwitcher from "~/components/Controls/gSwitcher.vue"
import gRange from "~/components/Controls/gRange.vue"
export default {
	components: { gSwitcher, gRange },
	setup() {
		const layouts = [
			// {key: "table", icon: "table-view", tooltip: "Switch to Table view"},
			{key: "grid", icon: "grid-view", tooltip: "Switch to Grid view"},
			{key: "strip", icon: "strip-view", tooltip: "Switch to Strip view"},
		]
		const { view } = useApp()
		return { layouts, view }
	}
};
</script>

<style lang="stylus" scoped>
.panel.view-control
	font-size: 1em
	width: 100%
	background: var(--c-content-panel-bg)
	padding: 0.5em 1vw
	box-shadow: 0 -0.1em 0.4em rgba(#000,0.2)
	display: flex
	// justify-content: space-between
	.control.control-g-range
		margin-left: auto
</style>