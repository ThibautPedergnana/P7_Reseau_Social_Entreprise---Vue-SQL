<template>
  <div class="wall-container">
    <div class="title">TITRE</div>
    <PostCard @refresh="refreshPosts" />
    <div v-for="item in posts" :key="item.postId">
      <NewsCard :post="item" @refresh="refreshPosts" />
    </div>
  </div>
</template>

<script>
import PostCard from "../../components/post-card/PostCard.vue";
import NewsCard from "../../components/news-card/NewsCard.vue";
import {
  currentUser,
  getAuthToken,
  updateAxiosAuthorization,
  updateAxiosInterceptors,
  logout,
} from "../../services/authService";
import { getPosts } from "../../services/postService";

export default {
  name: "WallPage",
  components: {
    PostCard,
    NewsCard,
  },
  async mounted() {
    if (!getAuthToken()) {
      logout();
      return;
    }
    updateAxiosAuthorization();
    updateAxiosInterceptors();
    const response = await currentUser();
    this.$store.commit("setUser", response.data);

    this.refreshPosts();
  },

  data() {
    return {
      posts: [],
    };
  },
  methods: {
    async refreshPosts() {
      const res = await getPosts();
      this.posts = res;
    },
  },
};
</script>

<style lang="scss" scoped></style>
