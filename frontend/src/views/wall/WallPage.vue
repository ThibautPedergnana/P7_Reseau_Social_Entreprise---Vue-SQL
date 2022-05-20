<template>
  <div class="wall-container">
    <div class="title">TITRE</div>
    <PostCard />
    <NewsCard />
  </div>
</template>

<script>
import PostCard from "../../components/post-card/PostCard.vue";
import NewsCard from "../../components/news-card/NewsCard.vue";
// import axios from "axios";
import getBaseUrl from "../../services/config";

export default {
  name: "WallPage",
  components: {
    PostCard,
    NewsCard,
  },
  mounted() {
    // axios.get("")
    console.log(getBaseUrl());
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped></style>
