import { reactive, toRefs, computed } from "vue"
import { sortArray, bSearch } from "./Utils"

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

const filters = reactive({
	showAuthor: false,
	showRejected: false,
	showProcessed: false,
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
			if(!filters.query) return records.fetchedRecords
			let q = String(filters.query.toLowerCase().trim())
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
	
	const setRating = rating => records.selectedRecord.rating = rating

	return {
		...toRefs(store),
		...toRefs(records),
		fetchRecords,
		filteredRecords,
		selectedRecordIndex,
		selectRecord,
		rejectRecord,
		nextRecord,
		setRating,
		filters
	}

}