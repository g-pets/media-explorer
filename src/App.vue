<template lang="pug">
icons-set
.app-container(v-if="!fetchStatus.isLoading")
	router-view
</template>

<script>
import { onBeforeMount } from "vue"
import IconsSet from "~/components/Icons/IconsSet.vue"
import Store from "~/store/Store.js"
export default {
	components: { IconsSet },
	setup() {
		const { fetchRecords, fetchStatus } = Store()
		onBeforeMount(() => fetchRecords())
		return { fetchStatus }
	}
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