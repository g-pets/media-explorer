import { reactive, toRefs } from "vue"

const store = reactive({
	fetchUrl: "/databaseFullShort.json",
	fetchStatus: {
		isLoading: true,
		isError: false,
		errorMessage: ''
	}
})

const records = reactive({
	fetchedRecords: null,
	selectedRecord: null
})

const editor = reactive({
	cellSize: 8,
	showAuthor: false,
	showRejected: false,
	showProcessed: false,
	expanded: false
})

// Temp (format data)
const formatData= (data) => {
	const formatted = []
	data.forEach(item => {
		let video = {
			id: item.id,
			width: item.width,
			height: item.height,
			duration: item.duration,
			url: item.url,
			image: item.image,
			author: item.user,
			tags: [],
			type: [],
			rating: 0,
			processed: false,
			rejected: false,
			tempo: "normal",
			video_files: [],
			screenshots: []
		}

		item.video_files.forEach(videoItem => {
			video.video_files.push({
				width: videoItem.width,
				height: videoItem.height,
				url: videoItem.link
			})
		})

		video.video_files.sort((a, b) => {
			return a.width - b.width;
		});

		item.video_pictures.forEach(screenshotItem => {
			video.screenshots.push(screenshotItem.picture)
		})
		formatted.push(video)
	});
	let jsonData = JSON.stringify(formatted, null, "\t")
	console.log(jsonData)
}



export default function useStore() {

	
	const fetchRecords = async () => {
		console.group("⬇️ Fetching Items from API...")
		try {
			let response = await fetch(store.fetchUrl);
			if(!response.ok) throw new Error(`Fetching from API: ${response.statusText}`)
			let parsed = await response.json();
			let data = parsed
			console.log(`· Fetched ${data.length} items.`);
			const mapped = {}
			data.forEach(item => {
				mapped[item.id] = item
			});


			// formatData(data)

			

			records.fetchedRecords = mapped;
		} catch(error) {
			console.error(`‼️ Fetched: ${error}`)
			store.fetchStatus.isError = true
			store.fetchStatus.errorMessage = error.message
		} finally {
			console.groupEnd();
			store.fetchStatus.isLoading = false;
		}
	}


	const selectRecord = id => records.selectedRecord = records.fetchedRecords[id]
	const rejectRecord = id => records.fetchedRecords[id].rejected = !records.fetchedRecords[id].rejected
	const checkRecord = id => records.fetchedRecords[id].checked = !records.fetchedRecords[id].checked

	const expandRecord = () => editor.expanded = true
	const collapseRecord = () => editor.expanded = false

	return {
		...toRefs(store),
		...toRefs(records),
		fetchRecords,
		selectRecord,
		rejectRecord,
		checkRecord,
		expandRecord,
		collapseRecord,
		editor
	}

}