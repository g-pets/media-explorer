<template lang="pug">
.control.control-g-range
	icon(v-if="icons" :name="icons[0]")
	input(type="range" :min="min" :max="max" step=1 :value="modelValue" @input="$emit('update:modelValue', $event.target.value)")
	icon(v-if="icons" :name="icons[1]")
</template>

<script>
export default {
	emits: ['update:modelValue'],
	props: {
		icons: Array,
		min: Number,
		max: Number,
		step: Number,
		modelValue: Number,
	}
}
</script>


<style lang="stylus" scoped>
.control.control-g-range
	display: flex
	align-items: center
	width: 12em
	svg.icon
		width: 1.4em
		height: 1.4em
		fill: #aaa
		flex: 1 0 auto
	input
		margin: 0 0.5em
	
	// Reset
	input[type=range]
		-webkit-appearance: none // Hides the slider so that custom slider can be made
		width: 100% // Specific width is required for Firefox
		background: transparent // Otherwise white in Chrome

	input[type=range]::-webkit-slider-thumb
		-webkit-appearance: none

	input[type=range]:focus
		outline: none // Removes the blue border. You should probably do some kind of focus styling for accessibility reasons though

	
	
	
	// Track
	input[type=range]
		&::-webkit-slider-runnable-track
			width: 100%
			height: 0.5em
			cursor: pointer
			background: var(--c-blue)
		&:focus::-webkit-slider-runnable-track
			background: var(--c-blue)
	input[type=range]::-moz-range-track
		width: 100%
		height: 0.5em
		cursor: pointer
		background: var(--c-blue)
		animate: 0.2s
	
	// Thumb
	input[type=range]
		&::-webkit-slider-thumb
			border: none
			height: 1em
			width: 1em
			border-radius: 50%
			background: #eee
			cursor: pointer
			margin-top: -0.2em
			-webkit-appearance: none
		&::-moz-range-thumb	
			border: none
			height: 1em
			width: 1em
			border-radius: 50%
			background: #eee
			cursor: pointer	

	
</style>