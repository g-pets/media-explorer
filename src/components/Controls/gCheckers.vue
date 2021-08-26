<template lang="pug">
.control.control-g-checkers
	label.g-checker(v-for="checker in data")
		input(type="checkbox" :value="checker")
		.box {{ checker }}
</template>

<script>
export default {
	props: {
		data: Array
	},
	setup() {}
};
</script>

<style lang="stylus" scoped>
.control.control-g-checkers
	display: flex
	flex-wrap: wrap
	align-items: center
	gap: 0.5em
	label.g-checker
		line-height: 1
		display: block
		cursor: pointer
		flex: 1 0 auto
		input
			height: 0
			width: 0
			visibility: hidden
			display: none
		.box
			background: #222
			text-align: center
			padding: 0.5em 0.7em
			color: #ccc
			border-radius: 0.4em
			letter-spacing: 0.04em
			transition: color 0.2s, background 0.2s
			&:hover
				color: #fff
				background: #444
		.icon
			fill: #666
			width: 1.5em
			height: 1.5em
		input:checked + .box
			color: #fff
			background: var(--c-purple)
</style>