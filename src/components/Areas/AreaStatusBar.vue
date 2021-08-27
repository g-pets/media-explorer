<template lang="pug">
footer.area.area-status-bar
	.build Build: v.1.0.0
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
			width: 0.8em
			height: 0.8em
			background: #28d228
			border-radius: 50%
			margin-left: 0.4em
</style>