<template>
	<div style="margin:12px">
		<!--    숙소 결과 리스트     -->
		<v-row class="res_list px-0 pb-3 pt-5 " :class="$style.hotelContainer" v-for="item in 3" :key="item.recordid" @click="clickList()">
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
				<div v-if="item === 1">asd</div>
				<div class="text-body-2 text--disabled" :style="{ width: '100%', position: 'relative' }">
					<span>neighbourhood_cleansed 의 room_type</span>
					<v-btn fab icon small :style="{ position: 'absolute', right: '-22px', top: '-7px' }">
						<v-icon>favorite_border</v-icon>
					</v-btn>
				</div>
				<div class="text-h6">name</div>
				<v-divider class="my-2" width="30"> inset </v-divider>
				<div class="text-body-2" :class="$style.hotelDescription">
					최대 인원 guests_included}명 &middot; 침실 bedrooms개 &middot; 침대 beds개 &middot; 욕실 bathrooms개
				</div>
				<div class="text-body-2 mt-1 mb-2" :class="$style.hotelDescription">
					<!-- {{ splitString(item.fields.amenities, 0) }} &middot; {{ splitString(item.fields.amenities, 1) }} &middot;
								{{ splitString(item.fields.amenities, 2) }} -->
					여기에 뭐가 있음
				</div>
				<div class="mt-16" :style="{ position: 'relative', width: '100%' }">
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
		<!-- <v-row class="pa-0 mt-16 flex-column" justify="center">
			<div class="text-center">
				<v-pagination v-model="page" :length="4" prev-icon="mdi-menu-left" next-icon="mdi-menu-right"></v-pagination>
			</div>
		</v-row> -->
	</div>
</template>

<script>
export default {
	data() {
		return {}
	},
	methods: {
		clickList() {
			console.log('asdasd')
		},
	},
	props: {
		page: Number,
	},
}
</script>

<style>
.res_list {
	cursor: pointer;
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

// .map {
// 	width: 100%;
// 	height: 100vh;
// 	max-height: 100vh;
// 	z-index: 0;
// }
</style>
