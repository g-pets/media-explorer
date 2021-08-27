import { reactive, toRefs, computed } from "vue"

const store = reactive({
	fetchUrl: "/localShort.json",
	// fetchUrl: "/databaseFullShort.json",
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
	expanded: false,
	query: ""
})

// Temp (format data)
const formatData= (data) => {
	const formatted = []
	data.forEach(item => {
		let video = {
			id: item.id,
			title: "",
			width: item.width,
			height: item.height,
			duration: item.duration,
			url: item.url,
			image: item.image,
			author: item.user,
			keywords: [],
			tags: [],
			type: [],
			rating: 0,
			processed: false,
			rejected: false,
			tempo: "normal",
			video_files: [],
			screenshots: []
		}

		// Generate Title
		video.title = item.url.split("/video/").pop().replace(`-${item.id}/`, '').replaceAll('-', ' ')

		// Generate Keywords
		let keywords = video.title.split(" ")
		video.keywords = keywords.filter(keyword => keyword.length >= 4);

		// UpperCase title
		video.title = video.title.charAt(0).toUpperCase() + video.title.slice(1);
		
		// Generate Video Files
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

		
		
		// Generate Screenshots
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
			// const mapped = {}
			// data.forEach(item => {
			// 	mapped[item.id] = item
			// });

			// formatData(data)

			records.fetchedRecords = data;
			// records.selectedRecord = Object.values(mapped)[0]
			records.selectedRecord = records.fetchedRecords[0]
		} catch(error) {
			console.error(`‼️ Fetched: ${error}`)
			store.fetchStatus.isError = true
			store.fetchStatus.errorMessage = error.message
		} finally {
			console.groupEnd();
			store.fetchStatus.isLoading = false;
		}
	}

	const filteredRecords = computed(() => {
		try {
			if(!editor.query) return records.fetchedRecords
			let q = String(editor.query.toLowerCase().trim())
			const result = records.fetchedRecords.filter(item => {
				let data = [...item.tags, ...item.keywords, ...item.type, item.tempo, item.rating]
				data = data.join(" ")
				if(data.includes(q)) return true
			})
			return result
		} catch(error) {
			console.log(error)
		}
	})

	


	const selectRecord = id => records.selectedRecord = filteredRecords.value.find(record => record.id == id)
	
	const selectedRecordIndex = computed(() => filteredRecords.value.findIndex(record => record.id == records.selectedRecord.id))
	
	const rejectRecord = (id = records.selectedRecord.id) => {
		let record = filteredRecords.value.find(record => record.id == id)
		record.rejected = !record.rejected
	}

	const nextRecord = n => {
		let nextIndex = selectedRecordIndex.value + n
		records.selectedRecord = filteredRecords.value[nextIndex]
	}

	
	// const checkRecord = id => records.fetchedRecords[id].checked = !records.fetchedRecords[id].checked
	const setRating = rating => records.selectedRecord.rating = rating
	const expandRecord = () => editor.expanded = true
	const collapseRecord = () => editor.expanded = false

	return {
		...toRefs(store),
		...toRefs(records),
		fetchRecords,
		filteredRecords,
		selectedRecordIndex,
		selectRecord,
		rejectRecord,
		expandRecord,
		collapseRecord,
		nextRecord,
		setRating,
		editor
	}

}