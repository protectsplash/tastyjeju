<template>
  <header class="header"
          :style="{
            height: headerHeight,
            background: header.background || '',
            border: header.border || '',
            boxShadow: header.boxShadow || '',
            position: header.position || '',
            padding: header.padding || '',
          }"
  >
    <!--  팝업 창 제거 투명 오버레이  -->
    <overlay v-if="$store.state.overlay" @click="handleOverlay"/>
    <!--  로고  -->
    <router-link
      to="/"
      class="logo"
      :style="{
        color: header.color || ''
      }"
      @click.native="logoClick"
    >
      <svg
        aria-hidden="true"
        focusable="false"
        data-prefix="fab"
        data-icon="airbnb"
        class="svg-inline--fa fa-airbnb fa-w-14"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512">
        <path
          fill="currentColor"
          d="M224 373.12c-25.24-31.67-40.08-59.43-45-83.18-22.55-88 112.61-88 90.06 0-5.45 24.25-20.29 52-45 83.18zm138.15 73.23c-42.06 18.31-83.67-10.88-119.3-50.47 103.9-130.07 46.11-200-18.85-200-54.92 0-85.16 46.51-73.28 100.5 6.93 29.19 25.23 62.39 54.43 99.5-32.53 36.05-60.55 52.69-85.15 54.92-50 7.43-89.11-41.06-71.3-91.09 15.1-39.16 111.72-231.18 115.87-241.56 15.75-30.07 25.56-57.4 59.38-57.4 32.34 0 43.4 25.94 60.37 59.87 36 70.62 89.35 177.48 114.84 239.09 13.17 33.07-1.37 71.29-37.01 86.64zm47-136.12C280.27 35.93 273.13 32 224 32c-45.52 0-64.87 31.67-84.66 72.79C33.18 317.1 22.89 347.19 22 349.81-3.22 419.14 48.74 480 111.63 480c21.71 0 60.61-6.06 112.37-62.4 58.68 63.78 101.26 62.4 112.37 62.4 62.89.05 114.85-60.86 89.61-130.19.02-3.89-16.82-38.9-16.82-39.58z"
        />
      </svg>
      <h1 :style="{color: header.color || ''}">airbnb</h1>
    </router-link>
    <!--  네이게이션 메뉴  -->
    <div
      class="header__search-container"
      :style="{
        animationName: header.animationName || '',
        }"
    >
      <nav class="tabs" :class="{'top': header.top}">
        <ul class="tabs__header">
          <li class="tabs__header-item" v-for="tab in taps" @click="selectTab(tab.id)"
              :class="{active: $store.state.activeTab == tab.id}" :key="tab.id">{{ tab.name }}
          </li>
        </ul>
      </nav>
      <search-form />
    </div>
    <!--  스크롤 내릴 시 서치 버튼  -->
    <!--  클릭 이벤트 시 서치 바 등장  -->
    <v-btn
      class="search-btn rounded-xl"
      text
      outlined
      large
      :ripple="false"
      :style="{
        display: header.display || '',
        paddingLeft: '30px',
        height: '50px',
        letterSpacing: '.3px'
      }"
      @click="searchBtnClick"
    >
      검색 시작하기
      <div class="search-btn__icon-wrapper">
        <v-icon color="white">search</v-icon>
      </div>
    </v-btn>
    <!--  헤더 우측 버튼 그룹(호스트되기, 언어, 메뉴)  -->
    <div class="h-button-group">
      <v-btn
        rounded
        text
        large
        style="padding: 10px;letter-spacing: 0.5px;"
        :ripple="false"
        :style="{
          color: header.btnColor || '',
          }"
      >호스트 되기
      </v-btn>
      <v-btn
        text
        large
        class="rounded-xl"
        :ripple="false"
        min-width="0"
        width="45"
        :style="{
          color: header.btnColor || '',
        }"
      >
        <v-icon size="20">language</v-icon>
      </v-btn>
      <v-btn
        class="h-button-group__menu ml-1"
        :class="{'h-button-group__menu--scroll-top': $store.state.isScrollTop}"
        :ripple="false"
        rounded
        large
        outlined
        elevation="0"
        min-width="0"
        width="72"
        style="padding:0;"
      >
        <v-icon size="20" color="gray">menu</v-icon>
        <v-icon style="font-size: 30px; color: gray">account_circle</v-icon>
      </v-btn>
    </div>
  </header>
</template>

<script>
import {throttle} from 'lodash';
import {Overlay} from "@/components";
import SearchForm from "@/views/Search-Form";

export default {
  name: 'Header',
  components: {
    SearchForm,
    Overlay
  },
  props:{
    header: {
      // header
      background: String,
      border: String,
      boxShadow: String,
      position: String,
      padding: String,
      // logo
      color: String,
      // navigation
      animationName: String,
      top: String,
      // search button
      display: String,
      // 호스트 되기, 언어 버튼
      btnColor: String,
    },
    taps: Array
  },
  computed: {
    headerHeight() {
      if (window.innerWidth > 768) return this.$store.state.isSearchBtnClicked ? '180px' : '80px';
      else return this.$store.state.isSearchBtnClicked ? '230px' : '80px';
    },
  },
  methods: {
    selectTab(id) { // 숙소, 체험, 온라인 네비게이션 바에 따른 서치바 변경 여부
      this.$store.state.activeTab = id;
    },
    handleOverlay(){ // 오버레이 클릭 이벤트
      this.$store.state.overlay = false;
      this.$store.state.popup = [0,0,0];
      this.$store.state.isSearchBtnClicked = false;
    },
    onScroll() { // scroll 이벤트
      this.$store.state.isScrollTop = window.pageYOffset < 40;
      this.$store.state.isSearchBtnClicked = false;
    },
    setInitAnimation(value){ // 스크롤 내릴 시 서치바 에니메이션 여부 값
      this.$store.state.initAnimation = value;
    },
    searchBtnClick(){ // 스크롤 내렸을 때 나타나는 서치 버튼 클릭 여부
      this.$store.state.isSearchBtnClicked = true;
      this.$store.state.overlay = true;
    },
    logoClick() { // 로고 클릭 이벤트
      window.scrollTo({top: 0, behavior: 'smooth'});
    }
  },
  mounted() {
    window.addEventListener('scroll', throttle(this.onScroll, 150));
  },
  updated() {
    if (this.$store.state.initAnimation && window.pageYOffset > 40) this.setInitAnimation(true);
  },
  destroyed() {
    window.removeEventListener('scroll', this.onScroll);
  },
}
</script>

<style scoped lang="scss">
@import '../assets/styles/lib/variables';

.header {
  box-sizing: border-box;
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin: 0;
  z-index: 1;
  @media screen and (max-width: $pad) {
    padding: 20px 40px 15px 40px;
  }

  &__search-container {
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: calc(50vw - 425px);
    width: 850px;
    display: flex;
    flex-direction: column;
    z-index: 10;
    animation-duration: .2s;
    animation-timing-function: ease-out;
    animation-fill-mode: forwards;

    @media screen and (max-width: $medium) {
      width: 76%;
      top: 0;
      left: calc(50vw - 38%);
    }

    @media screen and (max-width: $pad) {
      width: 90%;
      top: 50px;
      left: calc(50vw - 45%);
    }
  }
}

// logo style
.logo {
  cursor: pointer;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  text-decoration: none;
  color: white;
  z-index: 10;

  &--top {
    color: #FF385C;
  }

  & svg {
    width: 35px;
    height: 35px;
    margin-right: 5px;
  }

  & h1 {
    font-size: 25px;
    font-width: bold;
  }
}

// tabs style
.tabs {
  display: flex;
  justify-content: center;
  width: 100%;
  color: black;
  padding: 20px;

  &__header {
    display: flex;
    margin: 0;
    padding: 0;
    min-width: 160px;
    flex-direction: row;
    list-style: none;
    justify-content: space-between;

    &-item {
      cursor: pointer;
      text-align: center;
      padding: 10px 12px;
      position: relative;

      &:hover {
        color: #cccccc;

        &:after {
          width: 10px;
        }
      }

      &::after {
        content: "";
        width: 0%;
        height: 2px;
        bottom: 0;
        left: 50%;
        border-radius: 1px;
        position: absolute;
        transform: translate(-50%, 0%);
        background: black;
        transition: width 0.3s ease;
      }

      &.active {
        &::after {
          width: 18px;
        }
      }
    }
  }
}

.tabs.top {
  color: white;

  .tabs__header-item::after {
    background: white;
  }
}

//
.search-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: black;
  width: 300px;
  z-index: 10;
  background: white;

  &:hover {
    transition: box-shadow 0.2s ease;
    box-shadow: 2px 2px 4px 0px rgba(168, 168, 168, 0.5);
  }

  &:hover::before {
    background-color: transparent !important;
  }

  &__icon-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #FF385C;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-left: 160px;

    i {
      font-size: 18px;
      font-weight: bold;
    }
  }
}

.h-button-group {
  display: flex;
  align-items: start;

  button {
    z-index: 10;
  }

  &__menu {
    border: 1px solid gray;

    &--scroll-top {
      background: white;
      border: 1px solid #cccccc;
    }
  }
}
</style>
