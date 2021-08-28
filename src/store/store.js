import { reactive, toRefs, computed } from "vue"
import { formatData, sortArray, bSearch } from "./Utils"

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



export default function useStore() {

	const fetchRecords = async () => {
		console.group("⬇️ Fetching Items from API...")
		try {
			let response = await fetch(store.fetchUrl);
			if(!response.ok) throw new Error(`Fetching from API: ${response.statusText}`)
			let parsed = await response.json();
			let data = parsed;
			data = sortArray("id", data);
			console.log(`· Fetched ${data.length} items.`);
			records.fetchedRecords = data;
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
	
	const selectedRecordIndex = computed(() => bSearch(records.selectedRecord.id, filteredRecords.value))
	
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