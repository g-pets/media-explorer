<template lang="pug">
aside.area.area-tool-bar(v-if="selectedRecord")
	//- .section
		h3 Rating:
		star-rating(v-model:rating="currentVideo.data.rating" :star-size="20" inactive-color="#444" active-color="#bda522" :show-rating="false" :padding="5")
	.section
		h3 Tempo:
		g-switcher(id="tempo" :options="tempo" v-model="selectedRecord.tempo")
	.section
		h3 Type:
		g-checkers(:options="type" v-model="selectedRecord.type")
	.section
		h3 Tags:
		input(type="search" v-model="query")
		g-checkers(:options="tags" v-model="selectedRecord.tags")
	//- .section.buttons
		g-button(text="Back")
		g-button(text="Next")
		g-button(text="Reject" danger)	
	

</template>

<script>
import { ref, computed } from "vue"
import Store from "~/store/Store.js"
import gSwitcher from "~/components/Controls/gSwitcher.vue"
import gCheckers from "~/components/Controls/gCheckers.vue"
import gButton from "~/components/Controls/gButton.vue"
export default {
	components: { gSwitcher, gCheckers, gButton },
	setup() {
		const { selectedRecord } = Store();
		const tempo = ['slow', 'normal', 'fast']
		const type = ['aero', 'static', 'timelapse']
		const query = ref(null)
		const tagsList = ['nature', 'stars', 'space', 'moon', 'mountains', 'relax', 'abstract', 'blur', 'texture', 'sky', 'clouds', 'sunset', 'forest', 'landscape', 'night', 'rain', 'snow', 'waves', 'water', 'ocean', 'storm', 'lightning', 'people', 'city', 'flowers', 'animals', 'car', 'road']
		
		
		const tags = computed(() => {
			try {
				if(!query.value) return tagsList.sort()
				let q = String(query.value.toLowerCase().trim())
				const result = tagsList.filter(item => item.toLowerCase().includes(q))
				return result
			} catch(error) {
				console.log(error)
			}
		})

		return {selectedRecord, tempo, type, tags, query}
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
		input
			background: #333
			border: none
			width: 100%
			margin-bottom: 1em
			padding: 0.5em 1em
		&.buttons
			margin-top: auto
			display: flex
			gap: 1em
			justify-content: space-between
</style>