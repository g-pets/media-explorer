<template lang="pug">
label.control.control-g-search(:class="{fullwidth}")
	icon(v-if="icon" :name="icon")
	input(type="search" :placeholder="placeholder" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)")
</template>

<script>
export default {
	emits: ['update:modelValue'],
	props: {
		icon: {
			type: String,
			default: "search"
		},
		placeholder: {
			type: String,
			default: "Search..."
		},
		modelValue: {
			type: String,
			default: ""
		},
		fullwidth: Boolean
	}
}
</script>


<style lang="stylus" scoped>
.control.control-g-search
	background: rgba(#fff,0.05)
	border: none
	border-radius: 1em
	overflow: hidden
	display: flex
	align-items: center
	line-height: 1
	padding: 0.2em 0.5em
	svg.icon
		width: 1.5em
		height: 1.5em
		fill: #aaa
	input
		background: transparent
		text-indent: 0.3em
		border: none
		color: #fff
	&.fullwidth
		width: 100%
		
		
		
</style>