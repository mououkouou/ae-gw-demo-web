<template>
  <div class="home-quick-menu">
    <div class="icon-box-wrap">
      <a href="https://naver.worksmobile.com/mail?version=26">
        <div class="white-box icon-box">
          <div class="icon-box">
            <img
              class="icon"
              :src="require('@/assets/images/mail.png')"
              alt="메일 아이콘"
            />
          </div>
        </div>
      </a>
      <a href="https://naver.worksmobile.com/calendar?version=26">
        <div class="white-box icon-box">
          <div class="icon-box">
            <img
              class="icon"
              :src="require('@/assets/images/calendar.png')"
              alt="일정 아이콘"
            />
          </div>
        </div>
      </a>
      <a href="https://naver.worksmobile.com/message?version=26">
        <div class="white-box icon-box">
          <div class="icon-box">
            <img
              class="icon"
              :src="require('@/assets/images/message.png')"
              alt="메세지 아이콘"
            />
          </div>
        </div>
      </a>
      <a href="https://naver.worksmobile.com/contact?version=26">
        <div class="white-box icon-box">
          <div class="icon-box">
            <img
              class="icon"
              :src="require('@/assets/images/address_book.png')"
              alt="주소록 아이콘"
            />
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "home-quick-menu",
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/box.scss";
@import "@/assets/styles/text.scss";
.icon-box-wrap {
  display: flex;
  justify-content: space-between;
  margin-top: 19px;
  .icon-box {
    width: 40px;
    .icon {
      width: 100%;
    }
  }
}
</style>
