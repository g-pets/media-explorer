<template lang="pug">
aside.area.area-tool-bar
	.section(v-if="selectedRecord")
		div ID: {{selectedRecord.id}}
		div Duration: {{selectedRecord.duration}}
	//- .section
		h3 Rating:
		star-rating(v-model:rating="currentVideo.data.rating" :star-size="20" inactive-color="#444" active-color="#bda522" :show-rating="false" :padding="5")
	.section
		h3 Tempo:
		g-switcher(id="tempo" :data="tempo")
	.section
		h3 Type:
		g-checkers(:data="type")
	.section
		h3 Tags:
		g-checkers(:data="tags")
	//- .section.buttons
		g-button(text="Back")
		g-button(text="Next")
		g-button(text="Reject" danger)	
	

</template>

<script>
import Store from "~/store/Store.js"
import gSwitcher from "~/components/Controls/gSwitcher.vue"
import gCheckers from "~/components/Controls/gCheckers.vue"
import gButton from "~/components/Controls/gButton.vue"
export default {
	components: { gSwitcher, gCheckers, gButton },
	setup() {
		const { selectedRecord } = Store()
		const tempo = ['slow', 'normal', 'fast']
		const type = ['aero', 'static', 'timelapse']
		const tags = ['nature', 'stars', 'space', 'moon', 'mountains', 'relax', 'abstract', 'blur', 'texture', 'sky', 'clouds', 'sunset', 'forest', 'landscape', 'night', 'rain', 'snow', 'waves', 'water', 'ocean', 'storm', 'lightning', 'people', 'city', 'flowers', 'animals', 'car', 'road']
		return { selectedRecord, tempo, type, tags }
	}
};
</script>

<style lang="stylus" scoped>
aside.area.area-tool-bar
	background: #242528
	padding: 1em
	font-size: 0.8em
	display: flex
	flex-direction: column
	.vue-star-rating
		justify-content: center
	.section
		// margin-bottom: 2em
		border-radius: 0.7em
		font-size: 0.9em
		+ .section
			margin-top: 3em
		h3
			width: 100%
			flex: 1 0 auto
			font-size: 1.1em
			line-height: 1
			margin-bottom: 0.8em
			text-transform: capitalize
		&.buttons
			margin-top: auto
			display: flex
			gap: 1em
			justify-content: space-between
</style>