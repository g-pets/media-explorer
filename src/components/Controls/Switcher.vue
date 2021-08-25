<template lang="pug">
.control.control-switcher
	.switches
		label.switch(v-for="option in options")
			input(type="radio" :name="`radio_group_${id}`" :checked="modelValue == option" @click="selectOption(option)")
			.content
				.name {{option}}
</template>

<script>
	export default {
		name: "VInputSwitcher",
		emits: ['update:modelValue'],
		props: {
			modelValue: String,
			id: String,
			options: Array
		},
		methods: {
			selectOption(option) {
				this.$emit('update:modelValue', option)
			}
		}
	}
</script>


<style lang="stylus" scoped>
// V-Input-Switcher
.control.control-switcher
	line-height: 1
	margin-top: 0.5em
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