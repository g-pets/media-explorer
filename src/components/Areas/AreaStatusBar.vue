<template lang="pug">
footer.area.area-status-bar
	.build v.1.0.0
	.status
		.status-network Network
			.indicator
		.status-api API
			.indicator
		.status-db DB
			.indicator
</template>

<script>
export default {
	setup() {}
};
</script>

<style lang="stylus" scoped>
footer.area.area-status-bar		
	font-size: 0.7em
	line-height: 1
	padding: 0.5em 1vw
	display: flex
	color: #ccc
	.status
		display: flex
		margin-left: auto
		> div
			margin-right: 1em
		.indicator
			display: inline-block
			width: 0.7em
			height: 0.7em
			background: #0c8f0c
			border-radius: 50%
			margin-left: 0.5em
</style>