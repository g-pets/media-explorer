<template lang="pug">
svg.icon(:class="`icon-${name}`")
	use(:xlink:href="`#icon_${name}`")
</template>

<script>
	export default {
		props: {
			name: String
		}
	}
</script>

<style lang="stylus" scoped>
svg.icon
	height: 1em
	width: auto
	fill: #777
</style>