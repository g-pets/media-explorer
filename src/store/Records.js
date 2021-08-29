import { reactive, toRefs, computed, watchEffect } from "vue"
import { sortArray, bSearch } from "./Utils"

const store = reactive({
	fetchUrl: "/localShort.json",
	// fetchUrl: "/localFull.json",
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
	showRejected: false,
	showProcessed: true,
	showAuthor: false,
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
			if(!data.length) throw new Error(`No data...`)
			data = sortArray("id", data);
			console.log(`· Fetched ${data.length} items.`);
			records.fetchedRecords = data;
			records.selectedRecord = data[0];
			store.fetchStatus.isLoading = false;
		} catch(error) {
			console.error(`‼️ Fetched: ${error}`)
			store.fetchStatus.isError = true
			store.fetchStatus.errorMessage = error.message
		} finally {
			console.groupEnd();
		}
	}

	const preFiltered = computed(() => {
		try {
			let result = records.fetchedRecords
			if(!filters.showRejected) result = result.filter(item => !item.rejected)
			if(!filters.showProcessed) result = result.filter(item => !item.processed)
			if(filters.showAuthor) result = result.filter(item => item.author.id == records.selectedRecord.author.id)
			if(result[0]) records.selectedRecord = result[0]
			return result
		} catch(error) {
			console.log(error)
		}
	})

	const filteredRecords = computed(() => {
		try {
			if(!filters.query) return preFiltered.value
			let q = String(filters.query.toLowerCase().trim())
			const result = preFiltered.value.filter(item => {
				let data = [...item.tags, ...item.keywords, ...item.type, item.tempo, item.rating, item.author.name, item.note]
				data = data.join(" ")
				if(data.includes(q)) return true
			})
			if(result[0]) records.selectedRecord = result[0]
			console.log('filteredRecords')
			return result
		} catch(error) {
			console.log(error)
		}
	})
	

	const selectRecord = id => records.selectedRecord = filteredRecords.value.find(record => record.id == id)
	const selectedRecordIndex = computed(() => bSearch(records.selectedRecord.id, filteredRecords.value))
	
	

	const nextRecord = n => {
		if( selectedRecordIndex.value + n < 0 || selectedRecordIndex.value + n >= filteredRecords.value.length ) return // return, if out of index
		let nextIndex = selectedRecordIndex.value + n
		records.selectedRecord = filteredRecords.value[nextIndex]
		document.getElementById(`media-item-${records.selectedRecord.id}`).scrollIntoView({behavior: "smooth", block: "center", inline: "center"})
		console.log(`Next: ${n}`)
	}

	const rejectRecord = (id = records.selectedRecord.id) => {
		let record = filteredRecords.value.find(record => record.id == id)		
		record.rejected = !record.rejected
		if(record.rejected) nextRecord(1)
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