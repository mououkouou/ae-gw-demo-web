<template>
  <section class="caldendar-date-picker">
    <div class="text-wrap">
      <span> 일정 </span>
    </div>
    <div class="calendar-wrap">
      <swiper :options="swiperOption">
        <swiper-slide
          v-for="(day, dayIndex) in this_month_days"
          v-bind:key="dayIndex"
          class="day-card-wrap"
        >
          <div
            class="day-card"
            :class="{ active: start_date === Number(day.date) }"
            @click="change_search_day(day.date)"
          >
            <span class="date-number not-kr">
              {{ day.date }}
            </span>
            <span v-if="is_this_month" class="date-info">
              {{ dayIndex == 0 ? "오늘" : day.day }}
            </span>
            <span v-else class="date-info">{{ day.day }}</span>
            <div class="active-bar"></div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </section>
</template>

<script>
import moment from "moment-timezone";

import { mapActions, mapGetters, mapMutations, mapState } from "vuex";

export default {
  name: "caldendar-date-picker",
  computed: {
    ...mapGetters("calendarStore", ["search_month_year"]),
    ...mapState("calendarStore", ["search_year", "search_month", "search_day"]),
    start_date() {
      return this.search_day * 1;
    },
    is_this_month() {
      return (
        this.search_month === moment().format("MM") &&
        this.search_year === moment().format("YYYY")
      );
    },
    end_date() {
      return moment().endOf("month").format("D") * 1;
    },
  },
  data: () => ({
    swiperOption: {
      slidesPerView: "auto",
      freeMode: true,
    },
    this_month_days: [],
    dDots: ["일", "월", "화", "수", "목", "금", "토"],
  }),
  watch: {
    search_month_year(new_val) {
      const search_year = new_val.split("-")[0];
      const search_month = new_val.split("-")[1];

      this.this_month_days = [];

      // 이번 달이 아닌 경우
      if (search_month !== moment().format("MM")) {
        let day = moment(`${search_year}-${this.search_month}-01`).day();

        this.set_date_range(1, day);
        this.change_search_day(1);
      } else {
        // 이번 달로 바뀐 경우
        // 이번 년도가 아닐 경우
        if (search_year !== moment().format("YYYY")) {
          let day = moment(`${search_year}-${this.search_month}-01`).day();

          this.set_date_range(1, day);
          this.change_search_day(1);
        } else {
          this.set_search_day(moment().format("DD"));
          this.set_date_range(this.start_date, moment().day());
          this.change_search_day(this.start_date);
        }
      }
      this.api_calendar_events(this.getFromAndUtilTimes());
    },
  },
  methods: {
    ...mapMutations("calendarStore", ["set_search_day"]),
    ...mapActions("calendarStore", ["api_calendar_events"]),
    change_search_day(date) {
      let starting_date = "";
      if (date < 10) starting_date = "0" + date;
      else starting_date = String(date);
      this.set_search_day(starting_date);
      this.api_calendar_events(this.getFromAndUtilTimes());
    },

    set_date_range(start_date, start_day) {
      for (let i = start_date; i <= this.end_date; i++) {
        this.this_month_days.push({
          date: i,
          day: this.dDots[start_day % 7],
        });
        start_day++;
      }
    },

    getFromAndUtilTimes() {
      const pickDay = moment()
        .year(this.search_year)
        .month(this.search_month - 1)
        .date(this.search_day);
      const userTimezone = pickDay.tz("Asia/Seoul");

      const fromDateTime =
        userTimezone.startOf("day").format("YYYY-MM-DDTHH:mm:ss") +
        userTimezone.format("Z").replace("+", "%2B");
      const untilDateTime =
        userTimezone.endOf("day").format("YYYY-MM-DDTHH:mm:ss") +
        userTimezone.format("Z").replace("+", "%2B");

      return { fromDateTime, untilDateTime };
    },
  },
  created() {
    if (this.search_month !== moment().format("MM")) {
      // 이번 달이 아닌 경우 -> 1일 부터
      let year = moment().format("YYYY");
      let day = moment(`${year}-${this.search_month}-01`).day();
      this.set_date_range(1, day);
    } else {
      this.set_date_range(moment().format("DD") * 1, moment().day());
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/text.scss";
.caldendar-date-picker {
  .calendar-wrap {
    background-color: $white_blur;
    padding: 0 10px;
    border-radius: 10px;
    box-shadow: 0 0 20px rgba(167, 176, 251, 0.5);
    .day-card-wrap {
      width: 52px !important;
      height: 65px;
      .day-card {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        padding-top: 10px;

        color: $gray;
        font-size: 14px;
        font-weight: 500;
        letter-spacing: -0.48px;
        .date-number {
          line-height: 17px;
          padding-bottom: 5px;
        }

        .date-info {
          margin-bottom: 2px;
          font-weight: normal;
          letter-spacing: -0.72px;
          line-height: 18px;
        }
        .active-bar {
          width: 25px;
          height: 2px;

          background-color: $main_blue;
        }

        &.active {
          color: $text_blue;
          .active-bar {
            background-color: $text_blue;
          }
        }
      }
    }
  }
}
</style>
