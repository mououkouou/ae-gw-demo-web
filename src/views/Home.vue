<template>
  <div class="home view">
    <div class="background"></div>
    <top-bar :topbar_type="'main'" />
    <div role="main">
      <home-profile />
      <home-quick-menu />
      <home-calendar />
      <home-calendar-contents />
      <home-email />
      <home-board />
    </div>
  </div>
</template>

<script>
import TopBar from "@/components/Common/TopBar.vue";
import HomeCalendarContents from "@/components/Home/HomeCaledarContents.vue";
import HomeCalendar from "@/components/Home/HomeCalendar.vue";
import HomeProfile from "@/components/Home/HomeProfile.vue";
import HomeQuickMenu from "@/components/Home/HomeQuickMenu.vue";
import HomeEmail from "@/components/Home/HomeEmail.vue";
import HomeBoard from "@/components/Home/HomeBoard.vue";

export default {
  name: "home",
  components: {
    TopBar,
    HomeProfile,
    HomeQuickMenu,
    HomeCalendar,
    HomeCalendarContents,
    HomeEmail,
    HomeBoard,
  },
};
</script>

<style lang="scss" scoped>
.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-image: url("~@/assets/images/background_v3.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  z-index: -1;
}
</style>
