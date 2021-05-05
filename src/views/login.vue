<template>
	<div>
		<!--  Header  -->
		<div style="margin-top:200px">
			<v-text-field v-model="email" label="email"></v-text-field>
			<v-text-field v-model="password" label="password"></v-text-field>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Home',
	computed: {
		header() {
			return {
				// header
				background: this.$store.state.isScrollTop ? 'transparent' : 'white',
				border: this.$store.state.isScrollTop ? 'none' : '1px solid #DDDDDD',
				boxShadow: this.$store.state.isScrollTop ? 'none' : `0px 1px 4px rgba(0,0,0,0.1)`,
				position: 'fixed',
				padding: '20px 80px 15px 80px',
				// logo
				color: this.$store.state.isScrollTop ? 'white' : '#FF385C',
				// navigation
				animationName: this.$store.state.isScrollTop || this.$store.state.isSearchBtnClicked ? 'slide_down' : 'slide_up',
				top: this.$store.state.isScrollTop,
				// search button
				display: this.$store.state.isScrollTop || this.$store.state.isSearchBtnClicked ? 'none' : '',
				// 호스트 되기, 언어 버튼
				btnColor: this.$store.state.isScrollTop ? 'white' : 'black',
			}
		},
	},
	// data: () => ({
	// 	tabs: [
	// 		{ id: 1, name: '숙소' },
	// 		{ id: 2, name: '체험' },
	// 		{ id: 3, name: '온라인 체험' },
	// 	],
	// 	email: '',
	// 	password: '',
	// }),
	data() {
		return {
			tabs: [
				{ id: 1, name: '숙소' },
				{ id: 2, name: '체험' },
				{ id: 3, name: '온라인 체험' },
			],
			email: '',
			password: '',
		}
	},
}
</script>
