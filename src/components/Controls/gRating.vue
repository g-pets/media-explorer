<template lang="pug">
.control.control-g-rating(:class="{hovered: hoveredStar}")
	icon(v-for="(star, index) in max" name="star" :class="{hovered: hoveredStar > index, active: modelValue > index}" @click="setRating(index+1)" @mouseover="previewRating(index+1)" @mouseleave="hoveredStar = null")
</template>

<script>
import { ref } from "vue"
export default {
	emits: ['update:modelValue'],
	props: {
		max: Number,
		modelValue: Number,
	},
	setup(props, context) {
		const hoveredStar = ref(null)
		const previewRating = rating => hoveredStar.value = rating
		
		const setRating = rating => {
			if( rating === 1 && props.modelValue === 1 ) {
				context.emit('update:modelValue', 0);
			} else {
				context.emit('update:modelValue', rating);
				hoveredStar.value = null;
			}
		}
		
		return { setRating, previewRating, hoveredStar }
	}
}
</script>


<style lang="stylus" scoped>
.control.control-g-rating
	display: flex
	align-items: center
	justify-content: center
	svg.icon
		width: 2.2em
		height: 2.2em
		fill: rgba(#fff,0.15)
		cursor: pointer
		padding: 0 0.2em
		transition: fill 0.15s
		&.active
			fill: yellow	
	&.hovered
		svg.icon
			&.active
				fill: rgba(#fff,0.15)
			&.hovered
				fill: yellow
</style>