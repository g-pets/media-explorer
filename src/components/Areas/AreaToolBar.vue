<template lang="pug">
aside.area.area-tool-bar(v-if="selectedRecord")
	
	.options
		.option(@click="closeToolbarSections()")
			icon(name="sections-close")
		.option(@click="openToolbarSections()")
			icon(name="sections-open")
		.option(@click="soloToolbarSections()")
			icon(name="sections-solo")
	
	.sections
		section.section-preview
			img(:src="selectedRecord.image")
		section.section-type
			h3 Rating:
			g-rating(:max="5" v-model="selectedRecord.rating")
		section.section-tempo
			h3 Tempo:
			g-switcher(id="tempo" :options="tempo" v-model="selectedRecord.tempo")
		section.section-type
			h3 Type:
			g-checkers(:options="type" v-model="selectedRecord.type")
		section.section-tags
			h3 Tags:
			g-checkers(:options="tags" v-model="selectedRecord.tags" filter)
</template>

<script>
import useStore from "~/store/Store.js"
import useApp from "~/store/App.js"
import gRating from "~/components/Controls/gRating.vue"
import gSwitcher from "~/components/Controls/gSwitcher.vue"
import gCheckers from "~/components/Controls/gCheckers.vue"
export default {
	components: { gRating, gSwitcher, gCheckers },
	setup() {
		const { selectedRecord } = useStore();
		const { closeToolbarSections, openToolbarSections, soloToolbarSections } = useApp();
		const tempo = [
			{key: "slow", title: "slow"},
			{key: "normal", title: "normal"},
			{key: "fast", title: "fast"}
		]
		const type = ['aerial', 'static', 'timelapse']
		const tags = ['nature', 'stars', 'space', 'moon', 'mountains', 'relax', 'abstract', 'blur', 'texture', 'sky', 'clouds', 'sunset', 'forest', 'landscape', 'night', 'rain', 'snow', 'waves', 'water', 'ocean', 'storm', 'lightning', 'people', 'city', 'flowers', 'animals', 'car', 'road']
		
		return {
			selectedRecord, tempo, type, tags,
			closeToolbarSections,
			openToolbarSections,
			soloToolbarSections
		}
	}
};
</script>

<style lang="stylus" scoped>
aside.area.area-tool-bar
	background: #242528
	font-size: 1em
	.options
		background: #222
		position: sticky
		top: 0
		z-index: 8
		font-size: 0.7em
		display: flex
		justify-content: space-between
		padding: 0 1em
		.option
			cursor: pointer
			padding: 0.5em 1em
			svg
				width: 1.5em
				height: 1.5em
				margin-right: 0.3em
				transition: fill 0.3s
	
	.sections
		font-size: 0.7em
		padding: 1em
		section + section
			margin-top: 2em
		section
			h3
				font-size: 1.1em
				line-height: 1
				margin-bottom: 0.8em
		.section-preview
			background: #222
			width: 100%
			height: 10em
			img
				width: 100%
				height: 100%
				object-fit: cover
</style>