<template lang="pug">
icons-set
template(v-if="isError") {{errorMessage}}
template(v-else-if="isLoading") Loading...
.app-container(v-else)
	.top-bar
		.api
			label API:
				input(type="text" v-model="editor.api")
			button(@click="fetchVideos()") Fetch
	main.content
		.video-container
			code {{fetchedVideos}}
		//- .video-container(:class="{rejected: currentVideo.data.rejected}")
			video(:src="currentVideo.data.link" controls muted autoplay)
			icon(v-if="currentVideo.data.rejected" name="rejected")
	
	//- aside.tool-bar
		.section
			h3 Rating:
			star-rating(v-model:rating="currentVideo.data.rating" :star-size="20" inactive-color="#444" active-color="#bda522" :show-rating="false" :padding="5")
		.section
			h3 Tempo:
			switcher(id="tempo" :options="editor.tempo" v-model="currentVideo.data.tempo")
		.section.checkers(v-for="(section, key) in editor.tags")
			h3 {{key}}:
			label.checker.tag(v-for="tag in sortedTags(section)")
				input(type="checkbox" :value="tag" v-model="currentVideo.data[key]")
				.box {{ tag }}
		.section.buttons
			button.back(@click="nextVideo(-1)") Back
			button.next(@click="nextVideo(1)") Next
			button.reject(v-if="!currentVideo.data.rejected" @click="rejectVideo()") Reject
			button.restore(v-else @click="rejectVideo()") Restore
	
	//- footer.status-bar
		.counter Video: {{editor.index+1}} of {{videosCount}}. Author: <b>{{currentVideo.data.author[0]}}</b>
		.sort.checkers
		.filters.checkers
			span Filters:
			label.showRejected.checker(title="Show all videos of this author")
				input(type="checkbox" v-model="editor.showAuthor")
				icon(name="author")
			label.showRejected.checker(title="Show rejected videos")
				input(type="checkbox" v-model="editor.showRejected")
				icon(name="show-rejected")
			label.showProcessed.checker(title="Show processed videos")
				input(type="checkbox" v-model="editor.showProcessed")
				icon(name="show-processed")

</template>

<script>
import { reactive, onMounted, computed, toRefs } from "vue"
import IconsSet from "~/components/Icons/IconsSet.vue"
import Switcher from "~/components/Controls/Switcher.vue"
import StarRating from 'vue-star-rating'
export default {
	components: { IconsSet, Switcher, StarRating },
	setup() {
		const state = reactive({
			isLoading: true,
			isError: false,
			errorMessage: '',
			fetchedVideos: null,
			currentVideo: null,
		})
		// let fetchedVideos = reactive({})
		// const filteredVideos = reactive({})
		// const currentVideo = reactive({})
		let editor = reactive({
			api: "/test.json",
			// api: "http://localhost:82/v1/videos",
			index: 0,
			showAuthor: false,
			showRejected: false,
			showProcessed: false,
			tempo: ['slow', 'normal', 'fast'],
			tags: {
				type: ['aero', 'static', 'timelapse'],
				tags: ['nature', 'stars', 'space', 'moon', 'mountains', 'relax', 'abstract', 'blur', 'texture', 'sky', 'clouds', 'sunset', 'forest', 'landscape', 'night', 'rain', 'snow', 'waves', 'water', 'ocean', 'storm', 'lightning', 'people', 'city', 'flowers', 'animals', 'car', 'road'],
			}
		})

		
		
		const fetchVideos = async () => {
			console.group("⬇️ Fetching Videos from API...")
			try {
				let response = await fetch(editor.api);
				if(!response.ok) throw new Error(`Fetching from API: ${response.statusText}`)
				let parsed = await response.json();
				let data = parsed.data
				console.log(`· Fetched ${data.length} videos.`);
				const mapped = {}
				data.forEach(video => {
					mapped[video.id] = video
				});
				state.fetchedVideos = mapped;
				console.log(`· Mapped ${Object.keys(mapped).length} videos.`);
			} catch(error) {
				console.error(`‼️ Fetched: ${error}`)
				state.isError = true
				state.errorMessage = error.message
			} finally {
				console.groupEnd();
				state.isLoading = false;
			}
		}


		
		// const updateVideo = async () => await fetch(
		// 	`http://localhost:82/v1/videos/${currentVideo.data._id}`, {
		// 		method: 'PUT',
		// 		headers: {'Content-Type':'application/json'},
		// 		body: JSON.stringify(currentVideo.data)
		// 	}
		// )

		// const updateVideo = async () => console.log(currentVideo.data.id)
		
	

		// filteredVideos.data = computed(() => {
		// 	let videos = fetchedVideos
		// 	videos = videos.filter(video => !video.rejected && !video.processed)
		// 	if(editor.showAuthor) videos = videos.filter(video => video.author[0] == currentVideo.data.author[0])
		// 	// if(!editor.showRejected) videos = videos.filter(video => !video.rejected)
		// 	// if(!editor.showProcessed) videos = videos.filter(video => !video.processed)
		// 	return videos
		// })
		
		// currentVideo.data = computed(() => reactive(filteredVideos.data[editor.index]))
		
		// const videosCount = computed(() => filteredVideos.data.length)
		
		// const setRating = r => currentVideo.data.rating = r;
		// const sortedTags = tags => tags.sort();
		// const nextVideo = async (n = 1) => {
		// 	if(editor.index + n > videosCount.value - 1 || editor.index + n < 0) return
		// 	currentVideo.data.processed = true;
		// 	await updateVideo();
		// 	editor.index += n;
		// }
		// const rejectVideo = () => {
		// 	currentVideo.data.rejected = !currentVideo.data.rejected;
		// 	nextVideo();
		// }


		// const hotKeysListner = () => {
		// 	window.addEventListener('keydown', event => {
		// 		// console.log(event.key)
		// 		// event.preventDefault();
		// 		if (event.key === "p" || event.key === "Backspace") rejectVideo();
		// 		if (event.key === "ArrowLeft") nextVideo(-1);
		// 		if (event.key === "ArrowRight") nextVideo(1);
		// 		if (event.key === "ArrowUp") nextVideo(-10);
		// 		if (event.key === "ArrowDown") nextVideo(10);
		// 		if (event.key === "1") setRating(1)
		// 		if (event.key === "2") setRating(2)
		// 		if (event.key === "3") setRating(3)
		// 		if (event.key === "4") setRating(4)
		// 		if (event.key === "5") setRating(5)
		// 	})
		// }
		

		

		onMounted(() => {
			fetchVideos();
			// hotKeysListner();
		})

		// return { editor, appState, sortedTags, fetchVideos, fetchedVideos, videosCount, currentVideo, nextVideo, rejectVideo }
		return { editor, ...toRefs(state), fetchVideos }

	}
};
</script>

<style lang="stylus">
@import "./assets/styles/index.styl"

// Colors
.app-container
	--c-blue: #324873
	--c-light-blue: #48a1ff
	--c-purple: #4c3273
	--c-red: #9e2c2c
	--c-green: #227a59
// Layouts
.app-container
	width: 100%
	height: 100%
	background: #000
	color: #fff
	display: grid
	grid-template-columns: auto 15em
	grid-template-rows: max-content auto max-content
	position: relative
	.top-bar
		background: #242528
		grid-column: 1/-1
		box-shadow: 0 0.1em 0.4em rgba(#000,0.2)
		z-index: 3
	.content
		background: #0c0c0c
		z-index: 1
	.tool-bar
		background: #1a1b1d
		box-shadow: 0.1em 0 0.4em rgba(#000,0.2)
		z-index: 2
	.status-bar
		background: #242528
		box-shadow: 0 -0.1em 0.4em rgba(#000,0.2)
		grid-column: 1 / -1
		z-index: 3

.app-container
	.top-bar
		font-size: 0.8em
		display: flex
		align-items: center
		justify-content: space-between
		padding: 0.5em 1em
		.api
			display: flex
			align-items: center
			input
				margin: 0 0.3em
				background: #333
				border: none
				outline: none
				padding: 0.5em 0.5em
				border-radius: 0.5em
	.content
		display: flex
		.video-container
			margin: auto
			width: 90%
			position: relative
			video
				width: 100%
				width: 100%
				transition: opacity .2s
			&.rejected
				video
					filter: saturate(0%)
					opacity: 0.7
			svg.icon-rejected
				width: 5vw
				height: 5vw
				fill: red
				position: absolute
				z-index: 1
				top: 0.5em
				left: 0.5em
				
	.status-bar
		font-size: 0.8em
		display: flex
		align-items: center
		justify-content: space-between
		padding: 0.5em 1em
	.tool-bar
		padding: 1em
		font-size: 0.8em
		display: flex
		flex-direction: column
		.vue-star-rating
			justify-content: center
		.section
			margin-bottom: 2em
			// background: #161719
			// padding: 1em
			border-radius: 0.7em
			font-size: 0.9em
			h3
				width: 100%
				flex: 1 0 auto
				font-size: 1.1em
				line-height: 1
				margin-bottom: 0.3em
				text-transform: capitalize
			&.buttons
				margin-top: auto
				background: transparent
				display: flex
	.checkers
		display: flex
		flex-wrap: wrap
		align-items: center
		gap: 0.5em
		label.checker
			line-height: 1
			display: block
			cursor: pointer
			flex: 1 0 auto
			input
				height: 0
				width: 0
				visibility: hidden
				display: none
			.box
				background: #222
				text-align: center
				padding: 0.5em 0.7em
				color: #ccc
				border-radius: 0.4em
				letter-spacing: 0.04em
				transition: color 0.2s, background 0.2s
				&:hover
					color: #fff
					background: #444
			.icon
				fill: #666
				width: 1.5em
				height: 1.5em
			input:checked + .box
				color: #fff
				background: var(--c-purple)
			input:checked + .icon
				fill: var(--c-light-blue)
	button
		cursor: pointer
		background: #313136
		padding: 0.5em
		border-radius: 0.5em
		text-align: center
		min-width: 5em
		flex: 1 0 auto
		line-height: 1
		color: #fff
		transition: color 0.2s, background 0.2s, box-shadow 0.2s
		&:hover, &:focus
			color: #fff
			background: #444
		&:active
			background: #555
		&.reject
			background: #9e2c2c
			&:hover, &:focus
				background: red
			&:focus
				box-shadow: 0 0 1em 0.1em red
				outline: none
		&.restore
			background: #227a59
			&:hover, &:focus
				background: #078d5b
		+ button
			margin-left: 0.5em

					
</style>