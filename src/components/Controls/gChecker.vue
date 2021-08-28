<template lang="pug">
label.control.control-g-checker(:title="tooltip")
	input(type="checkbox" :checked="modelValue" @change="update")
	.content
		icon(v-if="icon" :name="icon")
		.title(v-if="title") {{title}}
</template>

<script>
export default {
	emits: ['update:modelValue'],
	props: {
		icon: String,
		title: String,
		tooltip: String,
		modelValue: Boolean
	},
	setup(props, context) {
		const update = event => context.emit('update:modelValue', event.target.checked)
		return { update }
	}
}
</script>

<style lang="stylus" scoped>
.control.control-g-checker
	line-height: 1
	display: block
	cursor: pointer
	flex: 1 0 auto
	font-size: 1em
	input
		height: 0
		width: 0
		visibility: hidden
		display: none

	.content
		background: #222
		text-align: center
		padding: 0.5em 0.7em
		color: #ccc
		border-radius: 0.4em
		letter-spacing: 0.04em
		transition: color 0.2s, background 0.2s
		&:hover, &:focus
			color: #fff
			background: #444

	svg.icon
		fill: #666
		width: 1.2em
		height: 1.2em
	
	&:hover
		.icon
			fill: #bbb

	input:checked + .content
		.title
			color: #fff
			background: var(--c-purple)
		.icon
			fill: #fff

</style>