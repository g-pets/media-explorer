
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
	let init = performance.now()
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
		console.log(`%cBinary Search time: ${performance.now() - init} ms`, 'color: #1e8a44; font-weight: bold')
	}
}


const aFind = ( id, array ) => {
	let init = performance.now()
	try {
		return array.find(record => record.id == id)
	} catch(error) {
		console.log(error)
	} finally {
		console.log(`%cArray Find: ${performance.now() - init} ms`, 'color: #1e8a44; font-weight: bold')
	}
}

const aFindIndex = ( id, array ) => {
	let init = performance.now()
	try {
		return array.findIndex(record => record.id == id)
	} catch(error) {
		console.log(error)
	} finally {
		console.log(`%cArray Find Index: ${performance.now() - init} ms`, 'color: #1e8a44; font-weight: bold')
	}
}

// Random Number
const randomNumber = ( minimum = 0, maximum = 100 ) => Math.round( Math.random() * ( maximum - minimum ) + minimum );

const generateData = q => {
	let init = performance.now()
	try {
		let data = []
		for(let i = 0; i < q; i++) {
			let video = {
				id: randomNumber(1e10, 1e12),
				title: "Test",
				width: 1920,
				height: 1080,
				duration: 10,
				url: "item.url",
				image: "item.image",
				author: "item.user",
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
			data.push(video)
		}
		let video = {
			id: 59000471636,
			title: "Key Record"
		}
		data.push(video)
		let jsonData = JSON.stringify(data, null, "\t")
		return jsonData
	} catch(error) {
		console.log(error)
	} finally {
		console.log(`%cGenerate Data time: ${performance.now() - init} ms`, 'color: #1e8a44; font-weight: bold')
	}
}


export { formatData, sortArray, bSearch }