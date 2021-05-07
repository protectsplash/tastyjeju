import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

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
const BASE_API = 'http://192.168.0.38:1337'

export default new Vuex.Store({
	state: {
		// Search
		totalLists: 0,
		airBnbLists: null,
		pagination: 1,
	},
	mutations: {},
	actions: {
		// eslint-disable-next-line no-empty-pattern
		login({}, input) {
			return new Promise((resolve, reject) => {
				axios
					.post(BASE_API + '/auth/local', input)
					.then(data => resolve(data))
					.catch(err => reject(err))
			})
		},
		// eslint-disable-next-line no-empty-pattern
		signUp({}, input) {
			return new Promise((resolve, reject) => {
				axios
					.post(BASE_API + '/auth/local/register', input)
					.then(data => resolve(data))
					.catch(err => reject(err))
			})
		},
		// eslint-disable-next-line no-empty-pattern
		meData({}) {
			return new Promise((resolve, reject) => {
				axios
					.get(BASE_API + '/users/me', {
						headers: {
							Authorization: 'Bearer ' + `${sessionStorage.getItem('protect-t')}`,
						},
					})
					.then(data => resolve(data))
					.catch(err => reject(err))
			})
		},
		// eslint-disable-next-line no-empty-pattern
		createComment({}, input) {
			return new Promise((resolve, reject) => {
				axios
					.post(BASE_API + '/comments', input, {
						headers: {
							Authorization: 'Bearer ' + `${sessionStorage.getItem('protect-t')}`,
						},
					})
					.then(data => resolve(data))
					.catch(err => reject(err))
			})
		},
		// eslint-disable-next-line no-empty-pattern
		searchComment({}) {
			return new Promise((resolve, reject) => {
				axios
					.get(BASE_API + '/comments', {
						headers: {
							Authorization: 'Bearer ' + `${sessionStorage.getItem('protect-t')}`,
						},
					})
					.then(data => resolve(data))
					.catch(err => reject(err))
			})
		},
		// eslint-disable-next-line no-empty-pattern
		createLike({}, input) {
			return new Promise((resolve, reject) => {
				axios
					.post(BASE_API + '/likes', input, {
						headers: {
							Authorization: 'Bearer ' + `${sessionStorage.getItem('protect-t')}`,
						},
					})
					.then(data => resolve(data))
					.catch(err => reject(err))
			})
		},
		// eslint-disable-next-line no-empty-pattern
		searchLike({}) {
			return new Promise((resolve, reject) => {
				axios
					.get(BASE_API + '/likes', {
						headers: {
							Authorization: 'Bearer ' + `${sessionStorage.getItem('protect-t')}`,
						},
					})
					.then(data => resolve(data))
					.catch(err => reject(err))
			})
		},
		// eslint-disable-next-line no-empty-pattern
		deleteLike({}, input) {
			console.log(input)
			return new Promise((resolve, reject) => {
				axios
					.delete(BASE_API + `/likes/${input.id}`, {
						headers: {
							Authorization: 'Bearer ' + `${sessionStorage.getItem('protect-t')}`,
						},
					})
					.then(data => resolve(data))
					.catch(err => reject(err))
			})
		},
		// eslint-disable-next-line no-empty-pattern
		upload({}, input) {
			return new Promise((resolve, reject) => {
				axios
					.post(BASE_API + '/upload', input, {
						headers: {
							Authorization: 'Bearer ' + `${sessionStorage.getItem('protect-t')}`,
							'content-type': 'multipart/form-data',
						},
					})
					.then(data => resolve(data))
					.catch(err => reject(err))
			})
		},
	},
	modules: {},
	strict: false,
	// strict: process.env.NODE_ENV !== 'production'
})
