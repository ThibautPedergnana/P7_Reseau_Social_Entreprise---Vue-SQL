<template>
  <v-app>
    <div id="app" :is="layout">
      <router-view />
    </div>
  </v-app>
</template>

<script>
const layout_default = "default";

export default {
  name: "App",
  data: () => ({
    //
  }),
  computed: {
    layout() {
      return (this.$route.meta?.layout || layout_default) + "-layout";
    },
  },
};
</script>
