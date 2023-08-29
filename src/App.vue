<template>
  <div id="app" class="app">
    <router-view />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import moment from "moment-timezone";
export default {
  name: "app",
  data: () => ({
    auth: {
      code: "",
      client_id: "CEiHmXiEc3RQP8ZGcVBN",
      client_secret: "k6ihMufkfw",
      redirect_uri: "http://61.111.8.151:80",
      scope:
        "audit,audit.read,board,board.read,bot,bot.read,calendar,calendar.read,contact,contact.read,directory,directory.read,file,file.read,group,group.folder,group.folder.read,group.read,mail,mail.read,orgunit,orgunit.read,security.external-browser,security.external-browser.read,user,user.email.read,user.profile.read,user.read",
      state: "test",
      domain: "aekyung.kr",
    },
    recent_generation_files: null,
    recent_connection_files: null,
    notice_board_id: "4070000000118317251",
    board_posts_count: "5",
  }),
  computed: {
    ...mapState("userStore", ["auth_token"]),
    ...mapState("calendarStore", [
      "calendar_events",
      "search_year",
      "search_month",
      "search_day",
    ]),
    ...mapState("driveStore", ["drive_files"]),
  },
  methods: {
    ...mapActions("userStore", ["api_auth_token", "api_user_info"]),
    ...mapActions("mailStore", ["api_unread_mails"]),
    ...mapActions("calendarStore", ["api_calendar_events"]),
    ...mapActions("driveStore", ["api_drive_files"]),
    ...mapActions("boardStore", ["api_board_posts"]),

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
    async call_api_get_unread_mails() {
      await this.api_unread_mails();
    },
    async call_api_get_calendar_events() {
      await this.api_calendar_events(this.getFromAndUtilTimes());
    },
    async call_api_drive_files() {
      let orderBy = "createdTime";
      const count = "5";
      this.recent_generation_files = await this.api_drive_files({
        orderBy,
        count,
      });

      orderBy = "accessedTime";
      this.recent_connection_files = await this.api_drive_files({
        orderBy,
        count,
      });
    },
    async call_api_get_board_posts() {
      const boardId = this.notice_board_id;
      const count = this.board_posts_count;
      await this.api_board_posts({
        boardId,
        count,
      });
    },
  },
  async created() {
    if (!this.$route.query.code) {
      location.href = `https://auth.worksmobile.com/oauth2/v2.0/authorize?client_id=${this.auth.client_id}&redirect_uri=${this.auth.redirect_uri}&scope=${this.auth.scope}&response_type=code&state=${this.auth.state}&domain=${this.auth.domain}`;
    } else {
      this.auth.code = this.$route.query.code;
      await this.api_auth_token(this.auth);
      this.$router.push("/");
      //this.$router.push("/nw/dist/index.html");
      this.api_user_info();
      this.call_api_get_unread_mails();
      this.call_api_get_calendar_events();
      this.call_api_drive_files();
      this.call_api_get_board_posts();
    }
  },
};
</script>

<style lang="scss">
@import "./App.scss";
</style>
