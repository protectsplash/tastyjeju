<template>
	<v-main>
		<v-container class="pa-0 mt-4" fluid>
			<v-row class="pt-16" style="position: relative">
				<!--    리스트 결과 column      -->
				<v-col class="px-12 py-16" sm="12" md="6">
					<!--    타이틀 및 필터      -->
					<v-row class="flex-column pa-0">
						<span class="body-2">300개 이상의 숙소 &middot; 4월 30일 - 5월 22일 &middot; 게스트 1명</span>
						<heading-4 class="font-weight-bold mt-2">파리의 숙소</heading-4>
						<div class="mt-4 pa-0">
							<btn-1 class="mr-2" v-for="(text, index) in filterBtnGroup" :key="index">{{ text }}</btn-1>
						</div>
						<div class="my-6 text-body-2" :class="$style.filterDescription">
							<img width="40" height="40" alt src="https://a0.muscache.com/airbnb/static/packages/icon-uc-suitcase.2b1ee4bb.gif" />
							<span class="ml-3"
								><strong>여행이 2일 남았습니다.</strong> 지금 바로 예약할 수 있는 숙소를 보려면 즉시 예약 필터를 사용하세요.</span
							>
						</div>
						<v-divider>
							inset
						</v-divider>
					</v-row>
					<!--    숙소 결과 리스트     -->
					<v-row class="px-0 pb-3 pt-5" :class="$style.hotelContainer" v-for="item in $store.state.airBnbLists" :key="item.recordid">
						<v-col class="pa-0" cols="5">
							<img
								v-if="item.fields.thumbnail_url"
								:src="item.fields.thumbnail_url"
								class="rounded-xl"
								alt
								style="width: 100%; height: 100%"
							/>
							<v-sheet v-else class="rounded-xl" color="#cccccc" style="width: 100%; height: 100%" />
						</v-col>
						<v-col class="pl-4 py-0" cols="7">
							<div class="text-body-2 text--disabled" :style="{ width: '100%', position: 'relative' }">
								<span>{{ item.fields.neighbourhood_cleansed }} 의 {{ item.fields.room_type }}</span>
								<v-btn fab icon small :style="{ position: 'absolute', right: '-22px', top: '-7px' }">
									<v-icon>favorite_border</v-icon>
								</v-btn>
							</div>
							<div class="text-h6">{{ item.fields.name }}</div>
							<v-divider class="my-2" width="30">
								inset
							</v-divider>
							<div class="text-body-2" :class="$style.hotelDescription">
								최대 인원 {{ item.fields.guests_included }}명 &middot; 침실 {{ item.fields.bedrooms }}개 &middot; 침대
								{{ item.fields.beds }}개 &middot; 욕실 {{ item.fields.bathrooms }}개
							</div>
							<div class="text-body-2 mt-1 mb-2" :class="$style.hotelDescription">
								{{ splitString(item.fields.amenities, 0) }} &middot; {{ splitString(item.fields.amenities, 1) }} &middot;
								{{ splitString(item.fields.amenities, 2) }}
							</div>
							<div class="mt-16" :style="{ position: 'relative', width: '100%' }">
								<v-icon color="pink" size="19">star</v-icon>
								<span class="text-body-2 font-weight-bold"> {{ convertRating(item.fields.review_scores_rating) }} </span>
								<span class="text-body-2" :class="$style.hotelDescription">(후기 {{ item.fields.number_of_reviews }}개)</span>
								<div :style="{ position: 'absolute', right: '-10px', top: '1px' }">
									<span class="font-weight-bold text-body-1">$ {{ item.fields.price }} </span>/ 1박
								</div>
							</div>
						</v-col>
					</v-row>
					<!--    페이지네이션      -->
					<v-row class="pa-0 mt-16 flex-column" justify="center">
						<div class="text-center">
							<v-pagination v-model="page" :length="4" prev-icon="mdi-menu-left" next-icon="mdi-menu-right"></v-pagination>
						</div>
						<div class="text-body-2 text-center mt-5">숙소 300개 이상 중 1 - 20</div>
						<div class="text-caption text-center mt-6" :class="$style.hotelDescription">
							추가 수수료가 부과됩니다. 세금도 부과될 수 있습니다.
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
import { Heading4, Btn1 } from '@/components'

export default {
	name: 'Main',
	components: { Heading4, Btn1 },
	mounted() {
		const data = {
			loc: '제주특별자치도 제주시 수목원길 3-1',
		}
		this.$store
			.dispatch('getLoc', data)
			.then(data => {
				console.log(data.latt)
				console.log(data.longt)
			})
			.catch(err => {
				console.log(err)
			})

		// 서치 데이터 페칭
		this.$store
			.dispatch('getSearchForm', this.$route.query)
			.then(res => {
				console.log(res.data) // 이거로 요청 데이터 확일할 수 있음.
				let { facet_groups, nhits, parameters, records } = res.data
				this.$store.state.totalLists = nhits
				this.$store.state.airBnbLists = records

				// 구글 맵 초기화
				this.map = new window.google.maps.Map(document.getElementById('map'), {
					center: {
						lat: this.$store.state.airBnbLists[0].fields.geolocation[0],
						lng: this.$store.state.airBnbLists[0].fields.geolocation[1],
					},
					zoom: 13,
				})
				// 마커
				this.$store.state.airBnbLists.map(item => {
					const marker = new window.google.maps.Marker({
						map: this.map,
						position: {
							lat: item.fields.geolocation[0],
							lng: item.fields.geolocation[1],
						},
					})
					marker.addListener('click', data => {
						console.log(data.domEvent.path)
					})
				})
			})
			.catch(err => {
				console.log(err)
			})
		// 스크롤 이벤트 등록
		window.addEventListener('scroll', throttle(this.onScroll, 100))
	},
	updated() {},
	destroyed() {
		window.removeEventListener('scroll', this.onScroll)
	},
	data: () => ({
		filterBtnGroup: ['유연한 환불 정책', '숙소 유형', '요금', '즉시 예약', '필터 추가하기'],
		map: null,
		mapPosition: false,
	}),
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
