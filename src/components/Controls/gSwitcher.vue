<template lang="pug">
.control.control-g-switcher
	label.switch(v-for="option in options" :title="option.tooltip")
		input(type="radio" :name="`radio_group_${id}`" :checked="checked(option)" @click="update(option)")
		.content
			icon(v-if="option.icon" :name="option.icon")
			.title(v-if="option.title") {{option.title}}
</template>

<script>
export default {
	emits: ['update:modelValue'],
	props: {
		id: String,
		options: Array,
		modelValue: {
			type: String,
			default: ""
		},
	},
	setup(props, context) {
		const checked = option => props.modelValue === option.key
		const update = (option) => context.emit('update:modelValue', option.key)
		return { checked, update }
	}
}
</script>


<style lang="stylus" scoped>
.control.control-g-switcher
	line-height: 1
	display: flex
	border-radius: 0.4em
	overflow: hidden
	background: rgba(#fff,0.04)
	border-radius: 0.5em
	.switch
		flex: 1 0 auto
		display: flex
		input
			height: 0
			width: 0
			visibility: hidden
			display: none
		.content
			transition: background .2s, color .2s
			line-height: 1
			cursor: pointer
			display: flex
			width: 100%
			justify-content: center
			background: #222
			color: #ccc
			padding: 0.5em 0.7em
			letter-spacing: 0.04em
			svg.icon
				width: 1em
				height: 1em
			.title
				text-align: center
		input:checked + .content
			background: var(--c-blue)
			color: #fff
			svg.icon
				fill: #fff
		+ .switch
			border-left: 1px solid #333			
</style>