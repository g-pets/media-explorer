<template lang="pug">
button.control.control-g-button(:class="{danger}") {{text}}
</template>

<script>
export default {
	props: {
		text: String,
		danger: Boolean
	}
};
</script>

<style lang="stylus" scoped>
button.control.control-g-button
	cursor: pointer
	background: #313136
	padding: 0.5em
	border-radius: 0.5em
	text-align: center
	flex: 1 0 auto
	line-height: 1
	color: #fff
	transition: color 0.2s, background 0.2s, box-shadow 0.2s
	&:hover, &:focus
		color: #fff
		background: #444
	&:active
		background: #555
	&.danger
		background: #9e2c2c
		&:hover, &:focus
			background: red
		&:focus
			box-shadow: 0 0 1em 0.1em red
			outline: none
	&.restore
		background: #227a59
		&:hover, &:focus
			background: #078d5b		
</style>