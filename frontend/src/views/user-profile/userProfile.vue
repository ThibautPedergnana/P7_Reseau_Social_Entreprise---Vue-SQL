<template>
  <div class="wall-container">
    <div class="profile-container">
      <v-avatar>
        <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
      </v-avatar>
      <div class="infos-container">
        <span class="fullname">{{
          `${this.user.firstname} ${this.user.lastname}`
        }}</span>
        <v-btn
          v-show="userId === currentUserId"
          color="primary"
          @click="isOpenModal = true"
          @click.stop="dialog = false"
        >
          Modifier
        </v-btn>
      </div>
    </div>
    <div v-for="item in posts" :key="item.postId">
      <NewsCard :post="item" @refresh="refreshPosts" />
    </div>
    <ModalEditAccount
      v-if="isOpenModal && user"
      titleBtn="Modifier"
      :user="user"
      @onClose="isOpenModal = false"
      @refresh="refreshUser"
    />
  </div>
</template>

<script>
import NewsCard from "../../components/news-card/NewsCard.vue";
import { getUserPosts } from "../../services/postService";
import { getUser } from "../../services/userService";
import ModalEditAccount from "./Modal/ModalEditAccount.vue";

export default {
  name: "userProfile",
  components: {
    NewsCard,
    ModalEditAccount,
  },
  data() {
    return {
      posts: [],
      user: {},
      userId: null,
      currentUserId: this.$store.state.user.id,
      isOpenModal: false,
      route: window.location,
    };
  },

  async mounted() {
    this.userId = +this.$route.params.id;
    this.refreshPosts();
    this.refreshUser();
  },
  methods: {
    async refreshPosts() {
      const res = await getUserPosts(this.userId);
      this.posts = res;
    },
    async refreshUser() {
      const res = await getUser(this.userId);
      this.user = res;
    },
  },
};
</script>

<style lang="scss" scoped>
.profile-container {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  .v-avatar {
    height: 150px !important;
    min-width: 150px !important;
    width: 150px !important;
  }
  .infos-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    .fullname {
      font-size: 22px;
      font-weight: 400;
      color: #444;
    }
    .update {
      margin-top: 15px;
    }
  }
}
</style>
