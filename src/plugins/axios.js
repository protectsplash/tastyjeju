import Vue from 'vue'
import axios from 'axios'

let _config = {
	timeout: 60 * 1000,
}

const _axios = axios.create(_config)

_axios.interceptors.request.use(
	function(config) {
		// Do something before request is sent
		// let ctx = null;
		// let d = null;
		try {
			// config.timeout = 60 * 1000; // Timeout
			// config.withCredentials = true; // Check cross-site Access-Control
			// if (Vue.appcnf.ls.getItem('ctx') !== null) {
			//   ctx = Vue.appcnf.ls.getItem('ctx');
			//   d = Vue.appcrypt.fn.de(JSON.parse(ctx), 'brity-works-2019');
			//   config.headers.sdskey = d.t;
			// }
		} catch (e) {
			console.error(e)
			config = _config
		}
		// console.log(config)
		return config
	},
	function(error) {
		// Do something with request error
		return Promise.reject(error)
	},
)
// Add a response interceptor
_axios.interceptors.response.use(
	function(response) {
		// Do something with response data
		try {
			// if (Vue.apputil.fn.isNull(response.data)) {
			//   return response;
			// }
			// method, url, data
			//Vue.appdbg.tlog(`${response.config.method} ${response.config.url}\ndata: ${response.config.data}\nres: ${JSON.stringify(response.data, 0, 2)}`);
		} catch (e) {
			console.error(e)
		}
		return response
	},
	function(error) {
		// Do something with response error
		return Promise.reject(error)
	},
)

Plugin.install = function(Vue) {
	// console.log(options)
	Vue.axios = _axios
	window.axios = _axios
	Object.defineProperties(Vue.prototype, {
		axios: {
			get() {
				return _axios
			},
		},
		$axios: {
			get() {
				return _axios
			},
		},
	})
}

Vue.use(Plugin)

export default Plugin
