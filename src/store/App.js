import { reactive, toRefs } from "vue"

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
	}
})


export default function useApp() {
	const toggleSettings = () => appSettings.overlays.settings = !appSettings.overlays.settings;
	const toggleHelp = () => appSettings.overlays.help = !appSettings.overlays.help;

	const closeToolbarSections = () => console.log("close")
	const openToolbarSections = () => console.log("open")
	const soloToolbarSections = () => console.log("solo")

	return {
		...toRefs(appSettings),
		toggleSettings,
		toggleHelp,
		closeToolbarSections,
		openToolbarSections,
		soloToolbarSections
	}
}