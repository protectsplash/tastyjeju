<template>
  <form
    class="search"
    :class="{'search-btn--clicked': $store.state.isSearchBtnClicked}"
  >
    <!-- 위치 인풋 -->
    <div
      class="search__item location"
      :class="{'experience--clicked': navigationType}"
      tabindex="1"
    >
      <label class="search__item__label">
        <div class="search__item__label__text">
          <p>위치</p>
          <input
            @click.self="handlePopUp('location')"
            @keyup="handleLocation"
            @input="handleLocation"
            :value="$store.state.location"
            type="text"
            placeholder="어디로 여행가세요?"
            required
            autocomplete="off">
        </div>
      </label>
    </div>

    <!-- 위치 팝업   -->
    <v-card v-if="$store.state.popup[0]" class="location-popup rounded-xl">
      <v-list dense>
        <v-list-item-group>
          <v-list-item class="location-popup-list-item pl-8" :ripple="false">
            <v-list-item-icon class="ma-0 pt-2 pb-2 mr-2" :style="{width: '50px', height: '100%'}">
              <img class="rounded-lg"
                   src="https://a0.muscache.com/im/pictures/fc42dde0-36a7-460e-af89-10b5e44e48d8.jpg?im_w=240&im_q=lowq"
                   alt="">
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="subtitle-1 font-weight-regular">가까운 여행지 둘러보기</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>

    <!-- 체크인 인풋   -->
    <div
      class="search__item check-in"
      v-if="!navigationType"
      tabindex="2"
      @click="handlePopUp('date')"
    >
      <label class="search__item__label">
        <div class="search__item__label__text">
          <p>체크인</p>
          <span v-if="$store.state.checkIn">{{ $store.state.checkIn }}</span>
          <span v-else>날짜입력</span>
        </div>
      </label>
    </div>

    <!-- 체크 아웃 인풋   -->
    <div
      class="search__item check-out"
      v-if="!navigationType"
      tabindex="3"
      @click="handlePopUp('date')"
    >
      <label class="search__item__label">
        <div class="search__item__label__text">
          <p>체크아웃</p>
          <span v-if="$store.state.checkOut">{{ $store.state.checkOut }}</span>
          <span v-else>날짜입력</span>
        </div>
      </label>
    </div>

    <!-- 날짜 팝업   -->
    <v-card v-if="$store.state.popup[1]" class="date-popup rounded-xl">
      <v-col>
        <v-row align="center" justify="center" class="pb-8 pt-4">
          <v-chip class="date-picker-main-chip" color="#EBEBEB" :ripple="false" pill>
            <v-chip class="date-picker-main-chip__select mr-1 font-weight-bold" color="white">달력</v-chip>
            <v-chip class="date-picker-main-chip__select font-weight-bold" color="#EBEBEB">자유로운 일정</v-chip>
          </v-chip>
        </v-row>
        <date-pickers
          :now="nowToStr"
          :nextMonth="nextMonth"
          :getDay="getDay"
        />
      </v-col>
    </v-card>

    <!-- 인원 인풋  -->
    <div
      class="search__item guest"
      v-if="!navigationType"
      tabindex="4"
    >
      <label class="search__item__label" @click="handlePopUp('guest')">
        <div class="search__item__label__text">
          <p>인원</p>
          <span>게스트 추가</span>
        </div>
      </label>
      <v-btn class="pink search-btn" depressed fab small @click="handleSearch">
        <v-icon color="white">search</v-icon>
      </v-btn>
    </div>

    <!-- 인원 팝업   -->
    <v-card
      class="guest-popup rounded-xl pa-7"
      v-if="$store.state.popup[2]"
    >
      <ul class="list-item-group">
        <li class="list-item" v-for="(guest, index) in guests" :key="index">
          <div class="description">
            <span class="font-weight-bold">{{ guest.title }}</span>
            <span class="body-2">{{ guest.ageLimit }}</span>
          </div>
          <div class="quantity">
            <v-btn fab outlined x-small class="mr-4"
                   :disabled="$store.state.guests[index] === 0"
                   @click="$store.state.guests[index] !== 0 ? $set($store.state.guests, index, $store.state.guests[index]-= 1) : ''">
              <v-icon>remove</v-icon>
            </v-btn>
            {{ $store.state.guests[index] }}
            <v-btn fab outlined x-small class="ml-4"
                   @click="$set($store.state.guests, index, $store.state.guests[index] += 1)">
              <v-icon>add</v-icon>
            </v-btn>
          </div>
        </li>
      </ul>
    </v-card>

    <!-- 체험 네이게이션 클릭 시 날짜 인풋   -->
    <div
      class="search__item date"
      v-if="navigationType"
      tabindex="2"
    >
      <label class="search__item__label" @click="handlePopUp('date')">
        <div class="search__item__label__text">
          <p>날짜</p>
          <span>원하는 날짜를 입력하세요.</span>
        </div>
      </label>
      <v-btn class="pink search-btn" depressed fab small @click="handlePopUp('date')">
        <v-icon color="white">search</v-icon>
      </v-btn>
    </div>
  </form>
</template>

<script>
import DatePickers from "@/views/Date-Pickers";

export default {
  name: 'Search-Form',
  components: {
    DatePickers
  },
  computed: {
    navigationType() {
      return this.$store.state.activeTab === 2;
    },
    nowToStr() {
      return this.now.toISOString().substr(0, 7);
    },
    nextMonth() {
      return new Date(this.now.getFullYear(), this.now.getMonth() + 2)
        .toISOString().substr(0, 7)
    },
  },
  methods: {
    getDay(date) {
      let i = new Date(date).getDay(date);
      return this.daysOfWeek[i];
    },
    handlePopUp(value) { // 위치, 체크인, 체크아웃, 인원 팝업
      this.$store.state.overlay = true;
      switch (value) {
        case "location":
          this.$store.state.popup = [1, 0, 0];
          break;
        case "date":
          this.$store.state.popup = [0, 1, 0];
          break;
        case "guest":
          this.$store.state.popup = [0, 0, 1];
          break;
      }
    },
    handleLocation(event) { // 위치 검색 인풋 이벤트
      this.$store.state.location = event.target.value;
    },
    handleSearch(){ // 검색 버튼
      // 숙소 페이지로 이동하는 검색 트리거 메소드
      // 1. submit.location 유효성을 검사한다.
      // 2. 값이 없을 경우 location input 에 팝업을 열면서 포커스를 준다. (다만 refs 가 동작은 안한다)
      // 3. location 값만 있고 체크인이나 체크아웃 그리고 인원 값이 없더라도 라우터로 쿼리 데이터를 푸싱한다.
      // 4. 서치 페이지에서 라우터 쿼리 값으로 데이터 fetching 을 한다.

      this.$router.push(
        {
          name: 'Search',
          query: {
            location: this.$store.state.location,
            checkin: this.$store.state.checkIn,
            checkout: this.$store.state.checkOut,
            adults: String(this.$store.state.guests[0]),
            children: String(this.$store.state.guests[1]),
            infants: String(this.$store.state.guests[2])
          }
        }
      )
    },
  },
  data: function () {
    return {
      now: new Date(), // 현재 날짜 객체 생성
      daysOfWeek: ['일', '월', '화', '수', '목', '금', '토'], // 데이트 픽커에 한국어 날짜 데이터
      guests: [ // 인원 팝업 컴퍼넌트
        {title: '성인', ageLimit: '만 13세 이상'},
        {title: '어린이', ageLimit: '만 2~12세'},
        {title: '유아', ageLimit: '만 2세 미만'},
      ]
    }
  },
}
</script>

<style scoped lang="scss">
@import '../assets/styles/lib/variables';

.search {
  position: relative;
  background: white;
  width: 100%;
  height: 66px;
  border-radius: 34px;
  display: flex;
  color: black;
  border: 1px solid transparent;

  &__item {
    position: relative;
    height: 68px;
    margin-top: -2px;
    outline: none;
    z-index: 10;

    &:not(:first-child) .search__item__label__text::after {
      content: '';
      position: absolute;
      top: 0;
      // 여기 search-label에 패딩 준 만큼
      left: -28px;
      display: block;
      height: 100%;
      width: 1px;
      background: #EBEBEB;

      @media screen and (max-width: 950px) {
        left: -17px;
      }
    }

    &:focus-within {
      background: white;
      border-radius: 34px;
      height: 66px;
      margin-top: -1px;
      box-shadow: 0px 0px 15px 3px rgba(0, 0, 0, .2);

      .search__item__label__text::after {
        display: none;
      }

      button {
        display: inline-flex;
      }

      .search-btn {
        margin-top: -1px;
      }
    }

    &:focus-within + & {
      .search__item__label__text::after {
        display: none;
      }
    }

    &__label {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      padding-left: 28px;
      cursor: pointer;

      &:hover {
        border-radius: 34px;
        background: #EBEBEB;
        height: 96%;
      }

      &:focus-within {
        background: white;
        border-radius: 34px;

        & .search__item__label__text::after {
          display: none;
        }
      }
    }
  }
}

// 위치 팝업
.location-popup {
  position: absolute;
  top: 80px;
  z-index: 10;
  padding-top: 15px;
  width: 500px;
  height: 104px;
}

.location-popup-list-item {
  height: 60px;
  width: 100%;
}

.search-btn--clicked {
  border: 1px solid #DDDDDD;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 16px 32px, rgba(0, 0, 0, 0.1) 0px 3px 8px;
}

.location,
.check-in,
.check-out,
.guest,
.date {
  display: flex;
  align-items: center;
  cursor: pointer;
  @media screen and(max-width: $pad-lg) {
    padding-left: 17px;
  }
}

.location,
.guest {
  width: 30%;
}

.check-in,
.check-out {
  width: 20%;
}

.date {
  width: 50%;
}

.experience--clicked {
  width: 50%;
}

.search__item__label__text {
  position: relative;
  width: 100%;
  height: 36px;

  p {
    font-size: 12px;
    line-height: 18px;
    font-weight: bold;
    margin: 0;
  }

  input {
    position: relative;
    top: -2px;
    background: transparent;
    width: 80%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 14px;
    line-height: 18px;
    margin-top: -10px;
    padding: 0;
    outline: none;
    border: none;
    font-weight: 500;

    &::-webkit-input-placeholder {
      color: #717171;
    }

    &::-moz-placeholder {
      color: #717171;
    }

    &::-ms-input-placeholder {
      color: #717171;
    }

    &::placeholder {
      color: #717171;
    }

    @media screen and(max-width: $pad-lg) {
      font-size: 12px;
      width: 100px;
    }
  }

  span {
    font-size: 14px;
    line-height: 18px;
    color: #717171;
    font-weight: 500;
    @media screen and (max-width: $pad) {
      font-size: 12px;
      width: 75px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    @media screen and (max-width: $pad-lg) {
      font-size: 12px;
      width: 75px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}

// 게스트 팝업
.guest-popup {
  position: absolute;
  top: 80px;
  right: 0;
  z-index: 10;
  width: 394px;
  height: 244px;

  .list-item-group {
    list-style: none;
    padding: 0;
    margin: 0;

    .list-item {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding-bottom: 15px;

      &:not(:first-child) {
        padding-top: 15px;
      }

      &:not(:last-child) {
        border-bottom: 1px solid #EBEBEB;
      }

      .description {
        display: flex;
        flex-direction: column;

        span:nth-child(2) {
          color: #717171;
        }
      }

      .quantity {
        display: flex;
        flex-direction: row;
        align-items: center;
      }
    }
  }
}

.search-btn {
  position: absolute;
  top: 14px;
  right: 10px;
  z-index: 10;
}

// 날짜 팝업
.date-popup {
  position: absolute;
  top: 80px;
  z-index: 10;
  width: 100%;
  height: 479px;
  padding: 16px 32px;
}

.date-picker-main-chip {
  width: 161.917px;
  height: 36px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 1px 1px;

  & .date-picker-main-chip__select {
    height: 28px;
    margin: 4px 0;
  }
}
</style>
