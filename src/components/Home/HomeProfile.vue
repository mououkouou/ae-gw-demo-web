<template>
  <div class="home-profile">
    <div class="hi-name-wrap">
      <span class="main-color">안녕하세요, </span>
      <span>
        {{
          this.user_info.userName.lastName + this.user_info.userName.firstName
        }}님</span
      >
    </div>
    <div class="profile-wrap blue-box">
      <profile-image />
      <div class="profile-text-wrap">
        <div class="profile-text-name">
          {{
            this.user_info.userName.lastName + this.user_info.userName.firstName
          }}
          {{ this.user_info.organizations[0].levelName }}
        </div>
        <div class="profile-text-team">
          {{ this.user_info.organizations[0].orgUnits[0].orgUnitName }}

          · {{ this.user_info.task }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ProfileImage from "../Profile/ProfileImage.vue";
export default {
  name: "home-profile",
  components: { ProfileImage },
  computed: {
    ...mapState("userStore", ["user_info", "user_profile_image"]),
    ...mapState("boardStore", ["board_posts"]),
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/text.scss";
@import "@/assets/styles/box.scss";

.home-profile {
  width: 100%;
  .hi-name-wrap {
    padding-top: 30px;
    font-size: 25px;
  }

  .profile-wrap {
    margin-top: 19px;
    font-size: 14px;
    line-height: 17px;
    color: #000000;
    .profile-text-wrap {
      padding: 9px 14px;
      .profile-text-name {
        color: $text_blue;
        font-weight: 700;
      }
      .profile-text-team {
        padding-top: 10px;
      }
    }
  }
}
</style>
