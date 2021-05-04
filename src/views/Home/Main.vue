<template>
  <v-main>
    <v-container fluid class="pa-0">
      <!--     맨 윗 부분      -->
      <v-row>
        <v-col class="pa-0">
          <section class="first-section">
            <!-- airbnb 는 picture tag 로 viewport 별 사진을 관리하고 있음   -->
            <div class="first-section__img"/>
            <heading-4 class="first-section__title">호스트 분들이 있기에 가능합니다</heading-4>
          </section>
        </v-col>
      </v-row>

      <v-container>
        <!--     가까운 여행지 둘러보기      -->
        <v-row class="mt-16">
          <v-col class="pa-0">
            <v-row class="pb-5">
              <heading-4 class="font-weight-bold">가까운 여행지 둘러보기</heading-4>
            </v-row>
            <v-row>
              <v-col class="pa-0" cols="12" sm="3" v-for="(item, index) in nearestItems" :key="index">
                <v-card elevation="0" height="65" class="nearest-destination-item mb-5">
                  <v-img :src="item.url" class="rounded-lg"></v-img>
                  <div class="nearest-destination-item__place">
                    <subtitle-1 class="font-weight-bold">{{ item.name }}</subtitle-1>
                    <body-1>{{ item.distance }}</body-1>
                  </div>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <!--     숙소 카테고리       -->
        <v-row class="mt-16">
          <v-col class="pa-0">
            <v-row>
              <v-col class="pa-0 pb-5">
                <heading-4 class="font-weight-bold">어디에서나, 여행은 살아보는 거야!</heading-4>
              </v-col>
              <v-row>
                <v-col class="lodging-category" cols="3" md="3" v-for="item in lodgingCategories" :key="item.name">
                  <img class="rounded-lg" :src="item.url" alt="#">
                  <heading-6>{{ item.name }}</heading-6>
                </v-col>
              </v-row>
            </v-row>
          </v-col>
        </v-row>

        <!--   호스팅 시작하기     -->
        <v-row class="mt-16">
          <v-col class="pa-0">
            <v-row>
              <v-col class="rounded-xl start-hosting">
                <div style="width: 400px">
                  <heading-3 class="text--white font-weight-bold mb-4" tag="div">호스트가 되어보세요</heading-3>
                  <subtitle-1>남는 공간을 활용해 새로운 기회를 만들어 보세요.</subtitle-1>
                  <btn-2 class="mt-6">호스팅 시작하기</btn-2>
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <!--    체험 둘러보기    -->
        <v-row class="my-16 mt-16">
          <v-row class="pa-0">
            <v-col class="pa-0 mb-5">
              <heading-4 class="font-weight-bold">체험 둘러보기</heading-4>
              <heading-5 tag="div">현지 전문가와 함께하는 독특한 액티비티에 오프라인이나 온라인으로 참여해 보세요.</heading-5>
            </v-col>
            <v-row>
              <v-col class="online-experience-categories" v-for="(item) in experienceCategories" :key="item.name"
                     cols="4">
                <img :src="item.url" alt="#" class="rounded-lg mb-2">
                <heading-6 tag="div">{{ item.name }}</heading-6>
                <subtitle-1>{{ item.subtitle }}</subtitle-1>
              </v-col>
            </v-row>
          </v-row>
        </v-row>

      </v-container>
    </v-container>
  </v-main>
</template>

<script>
import {
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Subtitle1,
  Body1,
  Btn2,
} from '@/components'
import Header from "@/views/Header";
import Footer from "@/views/Footer";

export default {
  name: "Main",
  components: {
    Heading3,
    Heading4,
    Heading5,
    Heading6,
    Subtitle1,
    Body1,
    Btn2,
  },
  data: () => ({
    nearestItems: [
      {
        name: 'Ruskeala',
        distance: '차로 5시간 거리',
        url: 'https://a0.muscache.com/im/pictures/be4d3ba5-08d7-4afe-95a7-f2da6453886a.jpg?im_q=medq&im_w=240'
      },
      {
        name: '프스코프',
        distance: '차로 5시간 거리',
        url: 'https://a0.muscache.com/im/pictures/7253e011-7c22-48fd-b75d-d0da35372397.jpg?im_q=medq&im_w=240'
      },
      {
        name: '트베르',
        distance: '차로 5시간 거리',
        url: 'https://a0.muscache.com/im/pictures/52e8083e-2de2-446d-a860-534eab250541.jpg?im_q=medq&im_w=240'
      },
      {
        name: 'Murino',
        distance: '차로 5시간 거리',
        url: 'https://a0.muscache.com/im/pictures/20e74de0-0eb8-4fca-afb8-b111875acdf5.jpg?im_q=medq&im_w=240'
      },
      {
        name: '비보르크',
        distance: '차로 5시간 거리',
        url: 'https://a0.muscache.com/im/pictures/e639b7ab-aee3-48ee-9743-216684a51319.jpg?im_q=medq&im_w=240'
      },
      {
        name: '벨리키 노브고로드',
        distance: '차로 5시간 거리',
        url: 'https://a0.muscache.com/im/pictures/ca3737ef-0faf-46ba-b055-b4a2d99e2cea.jpg?im_q=medq&im_w=240'
      },
      {
        name: '상트페테르부르크',
        distance: '차로 5시간 거리',
        url: 'https://a0.muscache.com/im/pictures/585d1e53-e2e1-4baf-a34e-36301dd1e2da.jpg?im_q=medq&im_w=240'
      },
      {
        name: 'Kudrovo',
        distance: '차로 5시간 거리',
        url: 'https://a0.muscache.com/im/pictures/7c309a70-bc93-4603-8d3b-9d4cd9bf75b2.jpg?im_q=medq&im_w=240'
      },
    ],
    lodgingCategories: [
      {name: '집 전체', url: 'https://a0.muscache.com/im/pictures/7d82ca14-56e5-4465-8218-dcfa7d69b6ac.jpg?im_w=480'},
      {name: '독특한 공간', url: 'https://a0.muscache.com/im/pictures/36f53e61-db8d-403c-9122-5b761c0e4264.jpg?im_w=480'},
      {name: '농장 및 자연', url: 'https://a0.muscache.com/im/pictures/7f254627-3922-4880-b8fa-545b8551117e.jpg?im_w=480'},
      {
        name: '반려동물 동반 가능',
        url: 'https://a0.muscache.com/im/pictures/10a638e1-6aff-4313-8033-1275cec83987.jpg?im_w=480'
      }
    ],
    experienceCategories: [
      {
        name: '체험',
        subtitle: '어디서든 세계 각지의 매력을 만나실 수 있습닏다.',
        url: 'https://a0.muscache.com/im/pictures/ad109d56-2421-40cd-98e6-e114160dc85b.jpg?im_w=1200'
      },
      {
        name: '온라인 체험',
        subtitle: '호스트와 실시간으로 소통하면서 액티비티를 즐겨보세요.',
        url: 'https://a0.muscache.com/im/pictures/a6b08861-feb8-4a01-a76d-b33d2867b441.jpg?im_w=1200'
      },
      {
        name: '추천 컬렉션: 여행 본능을 깨우는 체험',
        subtitle: '온라인 체험으로 집에서 랜선 여행을 즐기세요',
        url: 'https://a0.muscache.com/im/pictures/247a1ea3-946d-4eb8-a6ab-e8b9a66846f4.jpg?im_w=1200'
      }
    ],
  })
}
</script>

<style scoped lang="scss">
// 맨 윗 부분 섹션
.first-section {
  min-height: 550px;
  background: black;
  padding-top: 127px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  align-items: center;

  &__img {
    width: 95%;
    max-width: 1696px;
    height: 500px;
    background: url('https://a0.muscache.com/im/pictures/166791ff-bc82-4b88-ba3d-49be1d462dce.jpg?im_w=2560') no-repeat center center;
    background-size: cover;
  }

  &__title {
    padding: 40px 0;
    color: white;
  }
}

// 가까운 여행지 둘러보기
.nearest-destination-item {
  width: 100%;
  display: grid;
  grid-template-columns: 65px auto;
  grid-column-gap: 20px;

  &__place {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}

.lodging-category {
  width: 100%;

  img {
    width: 100%
  }
}

// 호스팅 시작하기
.start-hosting {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  padding: 0 80px;
  background: url('https://a0.muscache.com/im/pictures/2595054e-d1d9-4fde-8046-58d51fcb3164.jpg?im_w=1680') no-repeat center center;
  background-size: cover;
  height: 500px;
  color: white;
  width: 100%;
}

// 체험 둘러보기
.online-experience-categories {
  img {
    width: 100%
  }
}
</style>
