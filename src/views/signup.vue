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
										<v-toolbar-title>SignUp form</v-toolbar-title>
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
												@keyup.enter="focusPwdAgain()"
											></v-text-field>

											<v-text-field
												v-model="passwordAgain"
												id="passwordAgain"
												label="Password Again"
												name="passwordAgain"
												prepend-icon="mdi-lock"
												type="password"
												@keyup.enter="signUp"
											></v-text-field>
										</v-form>
									</v-card-text>
									<v-card-actions>
										<v-spacer></v-spacer>
										<v-btn color="primary" @click="signUp">Sign In</v-btn>
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
			email: '',
			password: '',
			passwordAgain: '',
		}
	},
	methods: {
		focusPwd() {
			document.getElementById('password').click()
		},
		focusPwdAgain() {
			document.getElementById('passwordAgain').click()
		},
		signUp() {
			const data = {
				username: 'yunseasdasdasd',
				email: 'asasdasdd@gmail.com',
				password: 'asasdasdasdd',
				// email: this.email,
				// password: this.password,
			}
			this.$store
				.dispatch('signUp', data)
				.then(({ data }) => {
					console.log(data)
				})
				.catch(err => {
					console.log(err)
				})
		},
	},
}
</script>
