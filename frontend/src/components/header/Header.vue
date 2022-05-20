<template>
  <div class="header-app">
    <v-app-bar color="accent-4" dense dark>
      <!-- INSEREZ L'IMAGE -->
      <v-toolbar-title>Groupomania</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-cog</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
// import axios from "axios";

export default {
  name: "HeaderComponent",
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped></style>
