import { reactive, toRefs, computed, onBeforeMount, watchEffect } from "vue"

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
		table: 5,
		grid: 8,
		strip: 5,
		style: []
	}
})


export default function useApp() {

	// Temp Local Storage method
	if(localStorage.getItem("appSettings")) {
		let userSettings = JSON.parse(localStorage.getItem("appSettings"))
		appSettings.view = userSettings.view
	}
	const saveToLocalStorage = data => localStorage.setItem("appSettings", JSON.stringify(data))
	watchEffect(() => saveToLocalStorage(appSettings))


	const toggleSettings = () => appSettings.overlays.settings = !appSettings.overlays.settings;
	const toggleHelp = () => appSettings.overlays.help = !appSettings.overlays.help;

	const closeToolbarSections = () => console.log("close")
	const openToolbarSections = () => console.log("open")
	const soloToolbarSections = () => console.log("solo")

	const switchLayout = layout => appSettings.view.layout = layout

	const layoutStyle = computed(() => {
		return {
			'--media-cell-size': appSettings.view[appSettings.view.layout] + 'em'
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