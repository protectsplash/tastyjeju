<template>
	<v-main>
		<v-container class="pa-0 mt-4" fluid>
			<v-row class="pt-16" style="position: relative">
				<!--    리스트 결과 column      -->
				<v-col class="px-12 py-16" sm="12" md="6">
					<heading-4 class="font-weight-bold mt-2">제주도 식당 소개 </heading-4>
					<v-tabs v-model="tab" background-color="transparent" color="basil" grow>
						<v-tab v-for="item in items" :key="item">
							{{ item }}
						</v-tab>
					</v-tabs>

					<v-tabs-items v-model="tab">
						<v-tab-item v-for="item in items" :key="item">
							<list></list>
							<v-pagination v-model="page" :length="4" prev-icon="mdi-menu-left" next-icon="mdi-menu-right"></v-pagination>
						</v-tab-item>
					</v-tabs-items>
				</v-col>

				<!--     지도 column     -->
				<v-col cols="6" class="pa-0" :style="{ position: !mapPosition ? 'fixed' : 'static', top: '0', right: '0' }">
					<div id="map" ref="map" :class="$style.map">
						<!--      마커 컴퍼넌트 반복문 올 곳      -->
					</div>
				</v-col>
			</v-row>
		</v-container>
	</v-main>
</template>
<script>
import { throttle } from 'lodash'
import { list, Heading4 } from '@/components'
import listJson from '../dummy/list'
export default {
	name: 'Main',
	components: { list, Heading4 },
	data: () => ({
		filterBtnGroup: ['유연한 환불 정책', '숙소 유형', '요금', '즉시 예약', '필터 추가하기'],
		map: null,
		mapPosition: false,
		infoWindow: '',
		pos: {},
		tabs: [{ title: '찾기' }, { title: '내가 간 식장들' }],
		tab: null,
		items: ['매장찾기', '내가 간 식장들'],
		listPage: 1,
		itemPerPage: 3,
		markers: [],
	}),
	mounted() {
		this.infoWindow = new window.google.maps.InfoWindow()
		navigator.geolocation.getCurrentPosition(position => {
			const pos = {
				lat: position.coords.latitude,
				lng: position.coords.longitude,
			}
			this.infoWindow.setPosition(pos)
			this.infoWindow.setContent('여기가 현제 위치입니다.')
			this.infoWindow.open(this.map)
			this.map.setCenter(pos)
		})
		// 구글 맵 초기화
		this.map = new window.google.maps.Map(document.getElementById('map'), {
			center: {
				lat: 33.499630594600944,
				lng: 126.52379968270131,
			},
			zoom: 13,
		})
		let index = this.itemPerPage * (this.page - 1)
		for (let i = index; i < this.itemPerPage * this.page; i++) {
			// console.log(listJson[i])
			const marker = new window.google.maps.Marker({
				map: this.map,
				position: {
					lat: listJson[i].lat,
					lng: listJson[i].lng,
				},
			})
			this.markers.push(marker)
		}

		window.addEventListener('scroll', throttle(this.onScroll, 100))
	},
	updated() {},
	destroyed() {
		window.removeEventListener('scroll', this.onScroll)
	},

	computed: {
		page: {
			get() {
				return this.$store.state.pagination
			},
			set(page) {
				this.$store.state.pagination = page
			},
		},
	},
	methods: {
		attachSecretMessage(marker, secretMessage) {
			marker.addListener('click', () => {
				console.log(secretMessage)
			})
		},
		splitString(str, index) {
			if (str) return str.split(',')[index]
		},
		convertRating(value) {
			if (value) return value / 25 + 1
		},
		totalPage() {
			return Math.floor(this.$store.state.totalLists / 20)
		},
		onScroll() {
			window.pageYOffset < 4400 ? (this.mapPosition = false) : (this.mapPosition = true)
		},
	},
	watch: {
		page() {
			for (let i = 0; i < this.markers.length; i++) {
				this.markers[i].setMap(null)
			}
			console.log(this.page)
			let index = this.itemPerPage * (this.page - 1)
			for (let i = index; i < this.itemPerPage * this.page; i++) {
				// console.log(listJson[i])
				const marker = new window.google.maps.Marker({
					map: this.map,
					position: {
						lat: listJson[i].lat,
						lng: listJson[i].lng,
					},
				})
				this.markers.push(marker)
			}
		},
	},
}
</script>
<style module lang="scss">
.filterDescription {
	display: flex;
	flex-direction: row;
	align-items: center;
}

.hotelContainer {
	border-bottom: 1px solid #ebebeb;
}

.hotelDescription {
	color: #8c8c8c;
}

.review {
	display: flex;
	flex-direction: row;
	align-items: center;
}
.map {
	width: 100%;
	height: 100vh;
	max-height: 100vh;
	z-index: 0;
}
</style>
