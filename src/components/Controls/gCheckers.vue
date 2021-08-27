<template lang="pug">
.control.control-g-checkers
	g-search(v-if="filter" v-model="query" icon="filter" placeholder="Filter..." fullwidth)
	label.g-checker(v-for="option in filtered")
		input(type="checkbox" :checked="checked(option)" @change="update(option, $event.target.checked)")
		.box {{ option }}
</template>

<script>
import { ref, computed } from "vue"
import gSearch from "~/components/Controls/gSearch.vue"
export default {
	components: { gSearch },
	emits: ['update:modelValue'],
	props: {
		options: Array,
		filter: Boolean,
		modelValue: {
			type: Array,
			default: []
		}
	},
	setup(props, context) {
		const query = ref(null)
		const checked = option => props.modelValue.includes(option)
		const update = (option, checked) => {
			let update = [...props.modelValue]
			if (checked) update.push(option)
			else update.splice(update.indexOf(option), 1)
			context.emit('update:modelValue', update)
			query.value = null
		}
		const filtered = computed(() => {
			try {
				if(!query.value) return props.options.sort()
				let q = String(query.value.toLowerCase().trim())
				const result = props.options.filter(item => item.toLowerCase().includes(q))
				return result
			} catch(error) {
				console.log(error)
			}
		})
		return { checked, update, query, filtered }
	}
}
</script>

<style lang="stylus" scoped>
.control.control-g-checkers
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	gap: 0.5em;

	label.g-checker
		line-height: 1;
		display: block;
		cursor: pointer;
		flex: 1 0 auto

		input
			height: 0;
			width: 0;
			visibility: hidden;
			display: none;

		.box
			background: #222;
			text-align: center;
			padding: 0.5em 0.7em;
			color: #ccc;
			border-radius: 0.4em;
			letter-spacing: 0.04em;
			transition: color 0.2s, background 0.2s;
			&:hover, &:focus
				color: #fff;
				background: #444;

		.icon
			fill: #666;
			width: 1.5em;
			height: 1.5em;

		input:checked + .box
			color: #fff;
			background: var(--c-purple);

</style>