// Sort Array
const sortArray = ( key, array ) => {
	let init = performance.now()
	try {
		return array.sort((a, b) => {
			return a[key] - b[key];
		});
	} catch(error) {
		console.log(error)
	} finally {
		console.log(`%cSort Array time: ${performance.now() - init} ms`, 'color: #1e8a44; font-weight: bold')
	}
}

// Binary Search
const bSearch = ( id, array ) => {
	// let init = performance.now()
	try {
		let first = 0,
			last = array.length - 1,
			position = -1,
			found = false,
			middle
			
		while (found === false && first <= last) {
			middle = Math.floor((first + last)/2)
			if (array[middle].id == id) {
				found = true
				position = middle
			} else if (array[middle].id > id) {
				last = middle - 1
			} else {
				first = middle + 1
			}
		}
		return position
	} catch(error) {
		console.log(error)
	} finally {
		// console.log(`%cBinary Search time: ${performance.now() - init} ms`, 'color: #1e8a44; font-weight: bold')
	}
}

export { sortArray, bSearch }