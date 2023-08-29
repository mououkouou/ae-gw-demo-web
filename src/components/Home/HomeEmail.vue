<template>
  <section class="home-email">
    <div class="text-wrap">
      <span> 메일 ({{ unread_mail_count }})</span>
    </div>
    <div>
      <swiper :options="swiperOption">
        <swiper-slide
          class="email-box"
          v-for="mail in unread_mails"
          :key="mail.mailId"
        >
          <a href="https://naver.worksmobile.com/mail?version=26"
            ><div class="subject">{{ mail.subject }}</div></a
          >
          <div class="bottom-text-wrap">
            <div class="bottom-text">
              {{ mail.from.name !== "" ? mail.from.name : mail.from.email }}
            </div>
            <div class="bottom-text">{{ formatDate(mail.receivedTime) }}</div>
          </div>
        </swiper-slide>
      </swiper>
      <div class="empty-messsage" v-if="unread_mails.length === 0">
        메일을 모두 읽었습니다
      </div>
    </div>
    <common-modal v-if="modal_state" :head_title="modal_info.head_title">
      <template v-slot:body>
        <p v-html="modal_info.terms_detail" class="modal-detail"></p>
      </template>
      <template v-slot:foot>
        <button class="btn fill large" @click="modal_off">확인</button>
      </template>
    </common-modal>
  </section>
</template>

<script>
import { mapState } from "vuex";
import CommonModal from "../Common/CommonModal.vue";

export default {
  name: "home-email",
  components: { CommonModal },
  data: () => ({
    swiperOption: {
      slidesPerView: "auto",
      freeMode: true,
      modal_info: null,
      modal_state: false,
    },
  }),
  computed: {
    ...mapState("mailStore", [
      "unread_mail_count",
      "unread_mails",
      "mail_detail",
    ]),
  },
  methods: {
    formatDate(inputDate) {
      const date = new Date(inputDate);
      const year = date.getFullYear().toString().slice(-2);
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const day = ("0" + date.getDate()).slice(-2);
      const hours = ("0" + date.getHours()).slice(-2);
      const minutes = ("0" + date.getMinutes()).slice(-2);

      return `${year}.${month}.${day} ${hours}:${minutes}`;
    },
    set_modal_on(mail) {
      const modal_info = {
        id: mail.mailId,
        head_title: mail.subject,
        terms_detail: this.terms_list[ID].detail,
      };

      this.modal_info = modal_info;
      this.config_modal_state(true);
    },
    modal_off() {
      this.config_modal_state(false);
    },
    goEmailMenu() {
      console.log("clcik");
      window.open("https://naver.worksmobile.com/mail?version=26", "_blank");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/box.scss";
@import "@/assets/styles/text.scss";
.home-email {
  .email-box {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 45% !important;
    height: 100px;
    margin-right: 10px;
    background-color: $green_blur;
    border-radius: 10px;
    font-size: 14px;
    padding: 15px;
    .subject {
      display: -webkit-box;
      word-wrap: break-word;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .bottom-text-wrap {
      text-align: right;
      .bottom-text {
        font-size: 12px;
        color: $dark_gray;
      }
    }
  }
  .empty-messsage {
    text-align: center;
    font-size: 14px;
    color: $text_blue;
  }
}
</style>
