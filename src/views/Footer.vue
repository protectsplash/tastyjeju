<template>
  <v-container fluid class="footer" tag="footer">
    <v-container class="pa-0">
      <v-row class="footer__above pb-10 mt-10" justify-sm="end">
        <v-col class="pa-0" tag="ul" cols="12" sm="6" md="3" v-for="(category, index) in footerCategories" :key="index">
          <li class="mb-3"><subtitle-2>{{ category.categoryName }}</subtitle-2></li>
          <li class="mb-3" v-for="item in category.items" :key="item"><body-2>{{ item }}</body-2></li>
        </v-col>
      </v-row>
      <v-row class="footer__lower" justify="space-between">
        <v-col class="pa-0">
          <v-row tag="ul">
            <li class="mr-3" v-for="(item, index) in footerLower1" :key="index">
              <body-2>{{ item }}</body-2>
            </li>
          </v-row>
        </v-col>
        <v-col class="pa-0">
          <v-row tag="ul" justify="end">
            <li class="ml-3" v-for="(item, index) in footerLower2" :key="index">
              <body-2>{{ item }}</body-2>
            </li>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import {Body2,Subtitle2} from "@/components";

export default {
  name: 'Footer',
  components: {Body2,Subtitle2},
  data: () => ({
    footerCategories: [
      {
        categoryName: "소개",
        items: ["에어비앤비 이용 방법", "뉴스룸", "투자자 정보", "에어비앤비 플러스", "에어비앤비 Luxe", "호텔투나잇", "에어비앤비 비즈니스 프로그램", "호스트 분들이 있기에 가능합니다", "채용정보", "창립자 편지"]
      },
      {
        categoryName: "커뮤니티",
        items: ["다양성 및 소속감", "차별 반대", "접근성", "에어비앤비 어소시에이트", "구호 인력을 위한 숙소", "게스트 추천", "기프트 카드", "Airbnb.org"]
      },
      {
        categoryName: "호스팅 하기",
        items: ["숙소 호스팅", "온라인 체험 호스팅하기", "체험 호스팅하기", "책임감 있는 호스팅", "자료 센터", "커뮤니티 센터"]
      },
      {
        categoryName: "에어비엔비 지원",
        items: ["에어비앤비의 코로나19 대응 방안", "도움말 센터", "예약 취소 옵션", "에어비앤비 이웃 민원 지원", "신뢰와 안전"]
      }
    ],
    footerLower1: ["© 2021 Airbnb, Inc.", "개인정보 처리방침", "이용약관", "사이트맵"],
    footerLower2: ["한국어", "USD"]
  })
}
</script>

<style scoped lang="scss">
@import '../assets/styles/lib/variables';

.footer {
  border-top: 1px solid #d3d6db;
  bacground: #F7F7F7;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    @media screen and (max-width: $pad-lg) {
      text-align: center;
    }
  }

  &__lower {
    border-top: 1px solid #d3d6db;
    padding: 20px 0 20px 0;
  }
}
</style>
