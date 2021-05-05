import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import qs from 'qs' // params 를 serialize 해주는 라이브러리

// axios.interceptors.request.use(config => {
//   window.console.log(config);
//
//   config.paramsSerializer = params => {
//     return Qs.stringify(params, {
//       arrayFormat: "brackets",
//       encode: false
//     })
//   }
//   return config;
// })

Vue.use(Vuex)

// 에어비엔비 mock 데이터 API
// 아래 API 도큐멘테이션 주소
// https://public.opendatasoft.com/explore/dataset/airbnb-listings/information/?disjunctive.host_verifications&disjunctive.amenities&disjunctive.features&rows=5&dataChart=eyJxdWVyaWVzIjpbeyJjaGFydHMiOlt7InR5cGUiOiJjb2x1bW4iLCJmdW5jIjoiQ09VTlQiLCJ5QXhpcyI6Imhvc3RfbGlzdGluZ3NfY291bnQiLCJzY2llbnRpZmljRGlzcGxheSI6dHJ1ZSwiY29sb3IiOiJyYW5nZS1jdXN0b20ifV0sInhBeGlzIjoiYXZhaWxhYmlsaXR5XzMwIiwibWF4cG9pbnRzIjoiIiwidGltZXNjYWxlIjoiIiwic29ydCI6IiIsInNlcmllc0JyZWFrZG93biI6InJvb21fdHlwZSIsImNvbmZpZyI6eyJkYXRhc2V0IjoiYWlyYm5iLWxpc3RpbmdzIiwib3B0aW9ucyI6eyJkaXNqdW5jdGl2ZS5ob3N0X3ZlcmlmaWNhdGlvbnMiOnRydWUsImRpc2p1bmN0aXZlLmFtZW5pdGllcyI6dHJ1ZSwiZGlzanVuY3RpdmUuZmVhdHVyZXMiOnRydWUsInJvd3MiOiIyMCIsImJhc2VtYXAiOiJqYXdnLnN0cmVldHMiLCJsb2NhdGlvbiI6IjIsMTMuMTE3MDcsMTUuMjA5NTYifX19XSwidGltZXNjYWxlIjoiIiwiZGlzcGxheUxlZ2VuZCI6dHJ1ZSwiYWxpZ25Nb250aCI6dHJ1ZX0%3D&location=2,13.11707,12.0455&basemap=jawg.streets
const BASE_API = 'https://public.opendatasoft.com/api/records/1.0/search'

export default new Vuex.Store({
	state: {
		// Header
		initAnimation: false,
		isScrollTop: window.pageYOffset < 40,
		isSearchBtnClicked: false,
		navigation: 1,
		popup: [0, 0, 0],
		overlay: false,
		location: '',
		checkIn: '',
		checkOut: '',
		guests: [0, 0, 0],
		activeTab: 1,
		// Search
		totalLists: 0,
		airBnbLists: null,
		pagination: 1,
	},
	mutations: {},
	actions: {
		getSearchForm({}, query) {
			let { location, checkin, checkout, adults, children, infants } = query // 인자로 받은 URL 쿼리를 구조분해
			const params = {
				// param 이 너무 길기에 변수로 먼저 정의
				dataset: 'airbnb-listings', // 데이터베이스 이름
				rows: 20, // 한번에 불러오는 아이템 갯수 제한
				start: () => (this.$store.state.pagination !== 0 ? this.$store.state.pagination * 10 + 1 : null), // 페이지네이션 파라미터
				facet: [
					// 숙소 필터 파라미터
					'host_response_time',
					'host_response_rate',
					'host_verifications',
					'city',
					'country',
					'property_type',
					'room_type',
					'bed_type',
					'amenities',
					'availability_365',
					'cancellation_policy',
					'features',
					'review_scores_rating',
					'number_of_reviews',
				].join(','),
				refine: {
					city: location.toLowerCase() || 'paris', // 위치
				},
			}
			return new Promise((resolve, reject) => {
				axios
					.get(BASE_API, {
						params, // 위에 파람스 변수 정의
						paramsSerializer: params => {
							return qs.stringify(params, { allowDots: true }) // refine.city 같이 URL 요청되게 . 허용
						},
					})
					.then(res => resolve(res))
					.catch(err => reject(err))
			})
		},
		// eslint-disable-next-line no-empty-pattern
		getLoc({}, input) {
			return new Promise((resolve, reject) => {
				let config = {
					headers: {
						'Access-Control-Allow-Origin': '*',
						'X-NCP-APIGW-API-KEY-ID': '5alq9vyc06',
						'X-NCP-APIGW-API-KEY': '7f24wafxAeIE6nEeDN9t7nXFGG13hnW3PDSXOVwp',
					},
				}
				axios
					.get(`https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${input.loc}`, config)
					.then(({ data }) => {
						console.log(data)
						resolve(data)
					})
					.catch(err => {
						reject(err)
					})
			})
		},
	},
	modules: {},
	strict: false,
	// strict: process.env.NODE_ENV !== 'production'
})
