<template>
  <section class="home-board">
    <div class="text-wrap">
      <span> 공지사항 </span>
    </div>
    <div class="board-wrap">
      <div class="board-item" v-for="board in board_posts" :key="board.boardId">
        <div class="title">{{ board.title }}</div>
        <div class="bottom_text_wrap">
          <div class="name">
            {{ board.userName }}
          </div>
          <div class="time">
            {{ formatDate(board.createdTime) }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "home-board",
  data: () => ({}),
  computed: {
    ...mapState("boardStore", ["board_posts"]),
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
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/box.scss";
@import "@/assets/styles/text.scss";
.home-board {
  .board-wrap {
    background-color: $white_blur;
    padding: 5px 10px;
    border-radius: 10px;
    box-shadow: 0 0 20px rgba(167, 176, 251, 0.5);
    font-size: 14px;
    line-height: 20px;

    .board-item {
      padding: 5px 0;
    }
    .board-item:not(:last-child) {
      border-bottom: 2px solid $text_blue;
    }

    .title {
      display: -webkit-box;
      word-wrap: break-word;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .bottom_text_wrap {
      display: flex;
      justify-content: end;
      padding-right: 10px;
      font-size: 12px;
      color: $dark_gray;
      .name {
        padding-right: 10px;
      }
    }
  }
}
</style>
