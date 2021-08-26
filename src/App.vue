<template lang="pug">
icons-set
.app-container
	router-view
</template>

<script>
import IconsSet from "~/components/Icons/IconsSet.vue"
export default {
	components: { IconsSet }
};
</script>

<style lang="stylus">
@import "./assets/styles/index.styl"
.app-container
	--c-blue: #324873
	--c-light-blue: #48a1ff
	--c-purple: #4c3273
	--c-red: #9e2c2c
	--c-green: #227a59
</style>