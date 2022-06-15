<template>
  <v-app>
    <div id="app" :is="layout" v-if="!isLoading">
      <router-view :key="$route.fullPath" />
    </div>
    <div class="loader" v-else>
      <v-progress-circular
        :width="3"
        :size="80"
        indeterminate
      ></v-progress-circular>
    </div>
  </v-app>
</template>

<script>
const layout_default = "default";
import {
  currentUser,
  getAuthToken,
  updateAxiosAuthorization,
  updateAxiosInterceptors,
  logout,
} from "./services/authService";

export default {
  name: "App",
  data: () => ({
    isLoading: false,
  }),
  async created() {
    this.refresh();
  },
  methods: {
    async refresh() {
      if (this.$route.path.includes("/app")) {
        if (!getAuthToken()) {
          logout();
          return;
        }
        this.isLoading = true;
        updateAxiosAuthorization();
        updateAxiosInterceptors();
        const response = await currentUser();
        this.$store.commit("setUser", response.data);
        this.isLoading = false;
      }
    },
  },
  computed: {
    layout() {
      return (this.$route.meta?.layout || layout_default) + "-layout";
    },
  },
  watch: {
    $route(to, from) {
      if (from.name === "Signup" && to.name === "Wall") this.refresh();
    },
  },
};
</script>

<style scoped>
.loader {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>
