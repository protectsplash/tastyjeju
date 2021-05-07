<template>
	<v-main>
		<v-container class="pa-0 mt-4" fluid>
			<v-col class="px-12" sm="12" md="6">
				<v-layout justify-end> Hello {{ meData.username }}! </v-layout>
			</v-col>
			<v-row style="position: relative">
				<!--    리스트 결과 column      -->
				<v-col class="py-10" sm="12" md="6">
					<v-row class="px-12">
						<v-tabs v-model="tab">
							<v-tab>전체 식당 소개</v-tab>
							<v-tab>선택한 식당 소개</v-tab>
							<v-tab>내가 가본 식당</v-tab>
							<v-tab>내가 좋아하는 식당</v-tab>
						</v-tabs>
					</v-row>
					<!--    타이틀 및 필터      -->
					<v-row class="flex-column px-12 py-5">
						<heading-4 class="font-weight-bold mt-2">제주도 식당 소개</heading-4>
					</v-row>
					<!--    숙소 결과 리스트     -->
					<div class="layout-set px-12">
						<v-row class="px-0 pb-3 pt-5" :class="$style.hotelContainer" v-for="item in resList" :key="item.recordid">
							<v-col class="pa-0" cols="5">
								<v-img
									v-if="
										item.comment
											.map(x => x.img)
											.filter(y => y !== null)
											.map(z => z.url)[
											item.comment
												.map(x => x.img)
												.filter(y => y !== null)
												.map(z => z.url).length - 1
										]
									"
									lazy-src="http://news.samsungdisplay.com/wp-content/uploads/2018/08/8.jpg"
									:src="
										'http://localhost:1337' +
											item.comment
												.map(x => x.img)
												.filter(y => y !== null)
												.map(z => z.url)[
												item.comment
													.map(x => x.img)
													.filter(y => y !== null)
													.map(z => z.url).length - 1
											]
									"
									class="rounded-xl"
									alt
									style="width: 100%; height: 200px;"
								/>
								<v-img
									v-else
									src="http://news.samsungdisplay.com/wp-content/uploads/2018/08/8.jpg"
									class="rounded-xl"
									alt
									style="width: 100%; height: 200px;"
								/>
								<!-- <v-sheet v-else class="rounded-xl" color="#cccccc" style="width: 100%; height: 100%" /> -->
							</v-col>
							<v-col class="pl-4 py-0" cols="7">
								<div class="text-body-2 text--disabled" :style="{ width: '100%', position: 'relative' }">
									<span>{{ item.type }}</span>
									<v-btn
										v-if="likes.map(x => x.adress).indexOf(item.adress) === -1"
										fab
										icon
										small
										:style="{ position: 'absolute', right: '-22px', top: '-7px' }"
										@click="createLike(item.adress)"
									>
										<v-icon>favorite_border</v-icon>
									</v-btn>
									<v-btn
										v-else
										color="pink"
										fab
										icon
										small
										:style="{ position: 'absolute', right: '-22px', top: '-7px' }"
										@click="deleteLike(likes[likes.map(x => x.adress).indexOf(item.adress)])"
									>
										<v-icon>favorite</v-icon>
									</v-btn>
								</div>
								<div class="text-h6">{{ item.title }}</div>
								<v-divider class="my-2" width="30">
									inset
								</v-divider>
								<div class="text-body-2 pb-0" :class="$style.hotelDescription">
									{{ item.adress }}
								</div>
								<div class="text-body-2 pb-2" :class="$style.hotelDescription">
									{{ item.food }}
								</div>
								<!-- <div class="text-body-2 mt-1 mb-2" :class="$style.hotelDescription">
								여기에 뭐가 있음
							</div> -->
								<div :style="{ position: 'relative', width: '100%' }">
									<v-layout>
										<v-icon color="yellow darken-3" size="19">star</v-icon>
										<div v-if="item.comment.map(x => x.rate).length !== 0">
											{{ rates(item.comment.map(x => x.rate)) }}
										</div>
										<div v-else>
											0
										</div>
									</v-layout>
									<div>후기 {{ item.comment.length }} 개</div>
									<v-layout>
										<div>
											평균 지불 가격
										</div>
										<div v-if="item.comment.map(x => x.price).length !== 0">
											<strong> - {{ rates(item.comment.map(x => x.price)) }} </strong> 원
										</div>
										<div v-else>
											<strong>
												- 후기를 통해 측정
											</strong>
										</div>
									</v-layout>
									<div class="text-right">
										<v-btn
											v-if="item.comment.length > 0"
											@click=";(dialog1 = true), (marketName = item.title), (desserts = item.comment)"
											class="mr-4"
											color="success"
											>후기 보기</v-btn
										>
										<v-btn @click=";(dialog = true), (marketName = item.title), (adress = item.adress)">인증</v-btn>
									</div>
								</div>
							</v-col>
						</v-row>
					</div>
				</v-col>

				<!--     지도 column     -->
				<v-col cols="6" class="pa-0" :style="{ position: !mapPosition ? 'fixed' : 'static', top: '0', right: '0' }">
					<div id="map" ref="map" :class="$style.map">
						<!--      마커 컴퍼넌트 반복문 올 곳      -->
					</div>
				</v-col>
			</v-row>
		</v-container>
		<v-dialog v-model="dialog1" max-width="900px">
			<v-card>
				<v-card-title>
					<span class="headline">
						<strong class="blue--text"> {{ marketName }}</strong> 매장의 후기 입니다.
					</span>
				</v-card-title>
				<v-card-text>
					<v-container>
						<v-row>
							<v-col cols="12">
								<v-data-table :headers="headers" :items="desserts" :items-per-page="5" class="elevation-1"></v-data-table>
							</v-col>
						</v-row>
					</v-container>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="blue darken-1" text @click="dialog1 = false">
						Close
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
		<v-dialog v-model="dialog" max-width="600px">
			<v-card>
				<v-card-title>
					<span class="headline">
						내가 방문한 매장은 <strong class="blue--text"> {{ marketName }}</strong> 입니다.
					</span>
				</v-card-title>
				<v-card-text>
					<v-container>
						<v-row>
							<v-col cols="12">
								<v-text-field v-model="comment" label="Comment"></v-text-field>
							</v-col>
							<v-col cols="12">
								<v-text-field v-model="price" label="Price" type="Number"></v-text-field>
							</v-col>
							<v-col cols="12">
								<v-rating
									v-model="rating"
									color="yellow darken-3"
									background-color="grey darken-1"
									empty-icon="$ratingFull"
									half-increments
									hover
									large
								></v-rating>
							</v-col>
							<v-col cols="12">
								<v-file-input v-model="file" truncate-length="15"></v-file-input>
							</v-col>
						</v-row>
					</v-container>
					<small>*indicates required field</small>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="blue darken-1" text @click="dialog = false">
						Close
					</v-btn>
					<v-btn color="blue darken-1" text @click="createComment">
						Save
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-main>
</template>
<script>
import { throttle } from 'lodash'
import { Heading4 } from '@/components'
import list from '@/dummy/list.json'
export default {
	data: () => ({
		likes: [],
		headers: [
			{
				text: '평점',
				value: 'rate',
				width: '80px',
			},
			{ text: '가격', value: 'price', width: '80px' },
			{ text: '후기', value: 'comment' },
			{ text: '작성일', value: 'updated_at', width: '300px' },
		],
		desserts: [],
		comment: '',
		price: 0,
		file: null,
		rating: 0,
		adress: '',
		marketName: '',
		dialog: false,
		dialog1: false,
		tab: 0,
		filterBtnGroup: ['유연한 환불 정책', '숙소 유형', '요금', '즉시 예약', '필터 추가하기'],
		map: null,
		mapPosition: false,
		infoWindow: '',
		pos: {},
		meData: '',
		resList: [],
		commentLists: [],
	}),
	watch: {
		tab(val) {
			if (val === 0) {
				this.searchComment()
			} else if (val === 1) {
				this.selectComment()
			} else if (val === 2) {
				this.myComment()
			} else if (val === 3) {
				this.likesComment()
			}
		},
	},
	mounted() {
		this.searchLike()
		this.searchComment()
		this.$store
			.dispatch('meData')
			.then(({ data }) => {
				this.meData = data
			})
			.catch(err => {
				console.log(err)
			})
	},
	methods: {
		selectComment() {},
		likesComment() {
			this.$store
				.dispatch('searchComment')
				.then(res => {
					this.resList = []
					const dataSet = list
					dataSet.forEach(list => {
						list.comment = []
						res.data.forEach(element => {
							if (element.adress === list.adress) {
								list.comment.push(element)
							}
						})
					})
					dataSet.forEach(list => {
						this.likes.forEach(element => {
							if (list.adress === element.adress) {
								if (this.resList.indexOf(list) === -1) {
									this.resList.push(list)
								}
							}
						})
					})
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
					this.resList.forEach(element => {
						const marker = new window.google.maps.Marker({
							map: this.map,
							position: {
								lat: element.lat,
								lng: element.lng,
							},
						})
						this.attachSecretMessage(marker, element)
					})
					// 스크롤 이벤트 등록
					window.addEventListener('scroll', throttle(this.onScroll, 100))
				})
				.catch(err => {
					console.log({ err })
				})
		},
		createLike(val) {
			const data = {
				adress: val,
				users_permissions_user: this.meData.id,
			}
			this.$store
				.dispatch('createLike', data)
				.then(() => {
					this.searchLike()
				})
				.catch(err => {
					console.log({ err })
				})
		},
		deleteLike(val) {
			const data = {
				id: val.id,
			}
			this.$store
				.dispatch('deleteLike', data)
				.then(() => {
					this.searchLike()
				})
				.catch(err => {
					console.log({ err })
				})
		},
		searchLike() {
			this.$store
				.dispatch('searchLike')
				.then(res => {
					this.likes = res.data
					console.log(res)
				})
				.catch(err => {
					console.log({ err })
				})
		},
		rates(data) {
			const result = data.reduce(function add(sum, currValue) {
				return sum + currValue
			}, 0)
			const average = result / data.length
			return average
		},
		myComment() {
			this.$store
				.dispatch('searchComment')
				.then(res => {
					console.log(res.data)
					this.resList = []
					const dataSet = list
					dataSet.forEach(list => {
						list.comment = []
						res.data.forEach(element => {
							if (element.adress === list.adress) {
								list.comment.push(element)
							}
						})
					})
					dataSet.forEach(list => {
						res.data.forEach(element => {
							if (list.adress === element.adress) {
								if (this.resList.indexOf(list) === -1) {
									this.resList.push(list)
								}
							}
						})
					})
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
					this.resList.forEach(element => {
						const marker = new window.google.maps.Marker({
							map: this.map,
							position: {
								lat: element.lat,
								lng: element.lng,
							},
						})
						this.attachSecretMessage(marker, element)
					})
					// 스크롤 이벤트 등록
					window.addEventListener('scroll', throttle(this.onScroll, 100))
				})
				.catch(err => {
					console.log({ err })
				})
		},
		searchComment() {
			this.$store
				.dispatch('searchComment')
				.then(res => {
					this.commentLists = res.data
					this.resList = list
					this.resList.forEach(list => {
						list.comment = []
						res.data.forEach(element => {
							if (element.adress === list.adress) {
								list.comment.push(element)
							}
						})
					})
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
					// 스크롤 이벤트 등록
					window.addEventListener('scroll', throttle(this.onScroll, 100))
				})
				.catch(err => {
					console.log({ err })
				})
		},
		createComment() {
			if (this.file) {
				const file = new FormData()
				file.append('files', this.file)
				this.$store
					.dispatch('upload', file)
					.then(({ data }) => {
						const datas = {
							comment: this.comment,
							rate: Number(this.rating),
							price: String(this.price),
							adress: this.adress,
							users_permissions_user: this.meData.id,
							img: data[0].id,
						}
						this.$store
							.dispatch('createComment', datas)
							.then(() => {
								this.dialog = false
								this.comment = ''
								this.rating = 0
								this.price = 0
								this.file = null
								this.searchComment()
							})
							.catch(err => {
								console.log({ err })
							})
					})
					.catch(err => {
						console.log({ err })
					})
			} else {
				const data = {
					comment: this.comment,
					rate: Number(this.rating),
					price: String(this.price),
					adress: this.adress,
					users_permissions_user: this.meData.id,
					// img: val,
				}
				this.$store
					.dispatch('createComment', data)
					.then(res => {
						this.dialog = false
						this.comment = ''
						this.rating = 0
						this.price = 0
						this.file = null
						console.log(res)
					})
					.catch(err => {
						console.log({ err })
					})
			}
		},
		attachSecretMessage(marker, selData) {
			marker.addListener('click', () => {
				this.tab = 1
				this.resList = []
				const dataSet = list
				dataSet.forEach(list => {
					list.comment = []
					this.commentLists.forEach(element => {
						if (element.adress === list.adress) {
							list.comment.push(element)
						}
					})
				})
				dataSet.forEach(list => {
					if (selData.adress === list.adress) {
						this.resList.push(list)
					}
				})
				console.log(dataSet)
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
				this.resList.forEach(element => {
					const marker = new window.google.maps.Marker({
						map: this.map,
						position: {
							lat: element.lat,
							lng: element.lng,
						},
					})
					this.attachSecretMessage(marker, element)
				})
				// 스크롤 이벤트 등록
				window.addEventListener('scroll', throttle(this.onScroll, 100))
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
<style>
.layout-set {
	height: 600px;
	overflow: auto;
}
</style>
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
