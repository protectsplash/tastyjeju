<template>
	<v-main>
		<v-container class="pa-0 mt-4" fluid>
			<v-col class="px-12" sm="12" md="6">
				<v-layout justify-end> Hello {{ meData.username }}! </v-layout>
			</v-col>
			<v-row style="position: relative">
				<!--    리스트 결과 column      -->
				<v-col class="px-12 py-16" sm="12" md="6">
					<!--    타이틀 및 필터      -->
					<v-row class="flex-column pa-0">
						<heading-4 class="font-weight-bold mt-2">제주도 식당 소개</heading-4>
					</v-row>
					<!--    숙소 결과 리스트     -->
					<v-row class="px-0 pb-3 pt-5" :class="$style.hotelContainer" v-for="item in this.resList" :key="item.recordid">
						<v-col class="pa-0" cols="5">
							<img
								src="http://news.samsungdisplay.com/wp-content/uploads/2018/08/8.jpg"
								class="rounded-xl"
								alt
								style="width: 100%; height: 100%"
							/>
							<!-- <v-sheet v-else class="rounded-xl" color="#cccccc" style="width: 100%; height: 100%" /> -->
						</v-col>
						<v-col class="pl-4 py-0" cols="7">
							<div class="text-body-2 text--disabled" :style="{ width: '100%', position: 'relative' }">
								<span>{{ item.type }}</span>
								<v-btn fab icon small :style="{ position: 'absolute', right: '-22px', top: '-7px' }">
									<v-icon>favorite_border</v-icon>
								</v-btn>
							</div>
							<div class="text-h6">{{ item.title }}</div>
							<v-divider class="my-2" width="30">
								inset
							</v-divider>
							<div class="text-body-2 pb-13" :class="$style.hotelDescription">
								{{ item.food }}
							</div>
							<!-- <div class="text-body-2 mt-1 mb-2" :class="$style.hotelDescription">
								여기에 뭐가 있음
							</div> -->
							<div :style="{ position: 'relative', width: '100%' }">
								<v-icon color="pink" size="19">star</v-icon>
								<div>점수</div>
								<div>후기</div>
								<!-- <span class="text-body-2 font-weight-bold"> {{ convertRating(item.fields.review_scores_rating) }} </span> -->
								<!-- <span class="text-body-2" :class="$style.hotelDescription">(후기 {{ item.fields.number_of_reviews }}개)</span> -->
								<div :style="{ position: 'absolute', right: '-10px', top: '1px' }">
									<!-- <span class="font-weight-bold text-body-1">$ {{ item.fields.price }} </span>/ 1박 -->
									가격
								</div>
							</div>
						</v-col>
					</v-row>
					<!--    페이지네이션      -->
					<v-row class="pa-0 mt-16 flex-column" justify="center">
						<div class="text-center">
							<v-pagination v-model="page" :length="4" prev-icon="mdi-menu-left" next-icon="mdi-menu-right"></v-pagination>
						</div>
					</v-row>
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
import { Heading4 } from '@/components'
import list from '@/dummy/list.json'
export default {
	data: () => ({
		filterBtnGroup: ['유연한 환불 정책', '숙소 유형', '요금', '즉시 예약', '필터 추가하기'],
		map: null,
		mapPosition: false,
		infoWindow: '',
		pos: {},
		meData: '',
		resList: '',
	}),

	mounted() {
		this.$store
			.dispatch('meData')
			.then(({ data }) => {
				// console.log(data)
				this.meData = data
			})
			.catch(err => {
				console.log(err)
			})
		this.resList = list
		this.infoWindow = new window.google.maps.InfoWindow()
		// Try HTML5 geolocation.
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

		// this.$store.state.airBnbLists.map(item => {
		list.forEach(element => {
			const marker = new window.google.maps.Marker({
				map: this.map,
				position: {
					lat: element.lat,
					lng: element.lng,
				},
			})
			this.attachSecretMessage(marker, element)
		})

		// 	this.attachSecretMessage(marker, item)
		// 	// marker.addListener('click', data => {
		// 	// 	console.log(data)
		// 	// 	this.map.setCenter(marker.getPosition());
		// 	// })
		// })

		// // 서치 데이터 페칭
		// this.$store
		// 	.dispatch('getSearchForm', this.$route.query)
		// 	.then(res => {
		// 		let { nhits, records } = res.data
		// 		this.$store.state.totalLists = nhits
		// 		this.$store.state.airBnbLists = records

		// 		// 구글 맵 초기화
		// 		this.map = new window.google.maps.Map(document.getElementById('map'), {
		// 			center: {
		// 				lat: this.$store.state.airBnbLists[0].fields.geolocation[0],
		// 				lng: this.$store.state.airBnbLists[0].fields.geolocation[1],
		// 			},
		// 			zoom: 13,
		// 		})
		// 		console.log(this.$store.state.airBnbLists)
		// 		// 마커
		// 		this.$store.state.airBnbLists.map(item => {
		// 			const marker = new window.google.maps.Marker({
		// 				map: this.map,
		// 				position: {
		// 					lat: item.fields.geolocation[0],
		// 					lng: item.fields.geolocation[1],
		// 				},
		// 			})
		// 			this.attachSecretMessage(marker, item)
		// 			// marker.addListener('click', data => {
		// 			// 	console.log(data)
		// 			// 	this.map.setCenter(marker.getPosition());
		// 			// })
		// 		})
		// 	})
		// 	.catch(err => {
		// 		console.log(err)
		// 	})
		// 스크롤 이벤트 등록
		window.addEventListener('scroll', throttle(this.onScroll, 100))
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

	components: { Heading4 },
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
