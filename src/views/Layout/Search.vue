<template>
	<div>
		<Header :header="header" :taps="tabs" />
		<Main />
	</div>
</template>

<script>
import Header from '@/views/Header'
import Main from '@/views/Search/Main'

export default {
	name: 'Search',
	components: {
		Header,
		Main,
	},
	computed: {
		header() {
			return {
				// header
				background: 'white',
				border: '1px solid #DDDDDD',
				boxShadow: '0px 1px 4px rgba(0,0,0,0.1)',
				position: 'fixed',
				padding: '20px 20px 15px 20px',
				// logo
				color: '#FF385C',
				// navigation
				animationName: this.$store.state.isSearchBtnClicked ? 'slide_down' : 'slide_up',
				top: '',
				// search button
				display: this.$store.state.isSearchBtnClicked ? 'none' : '',
				// 호스트 되기, 언어 버튼
				btnColor: 'black',
			}
		},
	},
	data: () => ({
		tabs: [
			{ id: 1, name: '숙소' },
			{ id: 2, name: '체험' },
		],
	}),
}
</script>
