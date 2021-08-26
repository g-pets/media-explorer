<template lang="pug">
.control.control-g-switcher
	.switches
		label.switch(v-for="option in options")
			input(type="radio" :name="`radio_group_${id}`" :checked="checked(option)" @click="update(option)")
			.content
				.name {{option}}
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
		const checked = option => props.modelValue === option
		const update = (option) => context.emit('update:modelValue', option)
		return { checked, update }
	}
}
</script>


<style lang="stylus" scoped>
.control.control-g-switcher
	line-height: 1
	.switches
		display: flex
		border-radius: 0.4em
		overflow: hidden
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
				.name
					text-align: center
			input:checked + .content
				background: var(--c-blue)
				color: #fff
			+ .switch
				border-left: 1px solid #333
				
</style>