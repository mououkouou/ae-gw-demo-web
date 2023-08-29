<template>
  <section class="calendar-content">
    <div @click="toggle" class="toggle">
      <img
        v-if="showContent"
        :src="require('@/assets/images/toggle.png')"
        alt="펼치기 아이콘"
      />
      <img
        v-if="!showContent"
        :src="require('@/assets/images/toggle_up.png')"
        alt="접기 아이콘"
      />
    </div>
    <div v-if="showContent">
      <div
        class="content-wrap"
        v-for="content in calendar_events"
        :key="content.eventComponents[0].eventId"
      >
        <a
          :href="content.eventComponents[0].videoMeeting.url"
          v-if="content.eventComponents[0].videoMeeting !== undefined"
          class="meeting-icon"
        >
          <img
            :src="require('@/assets/images/video_meeting.png')"
            alt="화상 회의 아이콘"
          />
        </a>
        <div class="summary">{{ content.eventComponents[0].summary }}</div>

        <div class="time-text">
          {{ transformDateTime(content.eventComponents[0].start.dateTime) }} ~
          {{ transformDateTime(content.eventComponents[0].end.dateTime) }}
        </div>
      </div>
      <div class="empty-messsage" v-if="calendar_events.length === 0">
        일정이 없습니다
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "calendar-content",
  data: () => ({
    showContent: true,
  }),
  computed: {
    ...mapState("calendarStore", ["calendar_events"]),
  },
  methods: {
    transformDateTime(dateTime) {
      const timeArray = dateTime.split("T")[1].split(":");
      return timeArray[0] + ":" + timeArray[1];
    },
    toggle() {
      this.showContent = !this.showContent;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/box.scss";
.calendar-content {
  .toggle {
    width: 100%;
    text-align: right;
    margin-right: 50px;
    img {
      width: 15px;
      padding-right: 10px;
    }
  }

  .content-wrap {
    display: flex;
    margin-bottom: 6px;
    padding: 12px 18px;
    border-radius: 10px;
    background-color: $yellow_blur;
    font-size: 14px;
    color: $text_blue;
    justify-content: space-between;

    .meeting-icon {
      display: flex;
      margin-right: 8px;
      vertical-align: middle;
      justify-content: center;
      align-items: center;
    }
    .summary {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      margin-right: 8px;
      line-height: 30px;
    }
    .time-text {
      white-space: nowrap;
      font-size: 12px;
      line-height: 30px;
      color: $dark_gray;
    }
  }

  .empty-messsage {
    text-align: center;
    font-size: 14px;
    color: $text_blue;
  }
}
</style>
