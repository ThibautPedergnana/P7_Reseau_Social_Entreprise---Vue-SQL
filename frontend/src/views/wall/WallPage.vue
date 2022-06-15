<template>
  <div class="wall-container">
    <div class="title">ACCUEIL</div>
    <PostCard @refresh="refreshPosts" />
    <div v-for="item in posts" :key="item.postId">
      <NewsCard :post="item" @refresh="refreshPosts" />
    </div>
  </div>
</template>

<script>
import PostCard from "../../components/post-card/PostCard.vue";
import NewsCard from "../../components/news-card/NewsCard.vue";
import { getPosts } from "../../services/postService";

export default {
  name: "WallPage",
  components: {
    PostCard,
    NewsCard,
  },
  async mounted() {
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
