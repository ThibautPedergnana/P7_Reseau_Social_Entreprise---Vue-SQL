<template>
  <v-card class="mx-auto post-card">
    <v-card-text>
      <div class="content-input">
        <v-avatar>
          <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
        </v-avatar>
        <v-textarea solo name="input-7-4" label="Quoi de neuf ?"></v-textarea>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn text color="teal accent-4" @click="reveal = true"> Publier </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
// import axios from "axios";

export default {
  name: "PostCard",
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.post-card {
  height: 200px;
  .content-input {
    display: flex;
    justify-content: center;
  }
}
.v-textarea {
  .v-input__control {
    height: 100px;
  }
}
.v-text-field.v-text-field--enclosed {
  padding-left: 20px;
}
.v-input__control {
  min-height: 30px !important;
  height: 30px !important;
}
.v-text-field.v-text-field--enclosed {
  padding-left: 20px;
}
.v-input__control {
  min-height: 30px !important;
  height: 30px !important;
}
</style>
