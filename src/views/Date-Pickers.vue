<template>
  <v-row class="pb-2">
    <v-col cols="6" class="px-7 py-0">
      <v-date-picker
        class="picker"
        v-model="checkIn"
        flat
        no-title
        :show-current="now"
        :weekday-format="getDay"
        show-adjacent-months
        prev-icon="arrow_back_ios"
        next-icon="arrow_forward_ios"
        full-width
      />
    </v-col>
    <v-col cols="6" class="px-7 py-0">
      <v-date-picker
        class="picker"
        v-model="checkOut"
        flat
        no-title
        :show-current="nextMonth"
        :weekday-format="getDay"
        show-adjacent-months
        prev-icon="arrow_back_ios"
        next-icon="arrow_forward_ios"
        full-width
      />
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "Date-Pickers",
  props: {
    now: String,
    nextMonth: String,
    getDay: Function
  },
  computed: {
    checkIn: {
      get(){
        return this.$store.state.checkIn;
      },
      set(date) {
        this.$store.state.checkIn = date;
      }
    },
    checkOut: {
      get(){
        return this.$store.state.checkOut;
      },
      set(date) {
        this.$store.state.checkOut = date
      }
    }
  },
}
</script>

<style lang="scss">
.v-date-picker-table {
  height: 100% !important;
}

.v-date-picker-table--date {
  td {
    height: 40px !important;
  }
}
</style>
