import { reactive, toRefs, computed } from "vue"

const appSettings = reactive({
	fetchUrl: "/localShort.json",
	fetchStatus: {
		isLoading: true,
		isError: false,
		errorMessage: ''
	},
	overlays: {
		settings: false,
		help: false
	},
	view: {
		layout: 'grid',
		tableCell: 5,
		gridCell: 5,
		stripCell: 5,
		style: []
	},
	filters: {
		query: ""
	}
})


export default function useApp() {
	const toggleSettings = () => appSettings.overlays.settings = !appSettings.overlays.settings;
	const toggleHelp = () => appSettings.overlays.help = !appSettings.overlays.help;

	const closeToolbarSections = () => console.log("close")
	const openToolbarSections = () => console.log("open")
	const soloToolbarSections = () => console.log("solo")

	const switchLayout = layout => appSettings.view.layout = layout

	const layoutStyle = computed(() => {
		return {
			'--media-cell-size': appSettings.view.gridCell + 'em'
		}
	})

	return {
		...toRefs(appSettings),
		layoutStyle,
		toggleSettings,
		toggleHelp,
		closeToolbarSections,
		openToolbarSections,
		soloToolbarSections,
		switchLayout
	}
}