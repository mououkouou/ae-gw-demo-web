<template>
  <div class="profile-image">
    <router-link to="/">
      <div class="profile-img-wrap">
        <img class="profile-img" :src="profile_img_url" alt="프로필 이미지" />
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "profile-image",
  data: () => ({
    profile_img_url: require("@/assets/images/profile_default_ill@3x.png"),
  }),
};
</script>

<style lang="scss" scoped>
.profile-img-wrap {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  .profile-img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
}
</style>
