<template>
	<div id="app">
		<v-app id="inspire">
			<v-app id="inspire">
				<v-main>
					<v-container class="fill-height" fluid>
						<v-row align="center" justify="center">
							<v-col cols="12" sm="8" md="4">
								<v-card class="elevation-12">
									<v-toolbar color="primary" dark flat>
										<v-toolbar-title>Login form</v-toolbar-title>
									</v-toolbar>
									<v-card-text>
										<v-form>
											<v-text-field
												v-model="email"
												label="Login"
												name="login"
												prepend-icon="mdi-account"
												type="text"
												@keyup.enter="focusPwd()"
											></v-text-field>

											<v-text-field
												v-model="password"
												id="password"
												label="Password"
												name="password"
												prepend-icon="mdi-lock"
												type="password"
												@keyup.enter="login"
											></v-text-field>
										</v-form>
									</v-card-text>
									<v-card-actions>
										<v-spacer></v-spacer>
										<v-btn color="primary" @click="login">Login</v-btn>
									</v-card-actions>
								</v-card>
							</v-col>
						</v-row>
					</v-container>
				</v-main>
			</v-app>
		</v-app>
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
	methods: {
		focusPwd() {
			document.getElementById('password').click()
		},
		login() {
			const data = {
				identifier: this.email,
				password: this.password,
			}
			this.$store
				.dispatch('login', data)
				.then(({ data }) => {
					sessionStorage.setItem('protect-t', data.jwt)
					this.$router.push({ name: 'Search' })
				})
				.catch(err => {
					console.log(err)
				})
		},
	},
}
</script>
