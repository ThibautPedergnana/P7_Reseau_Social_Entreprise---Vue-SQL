<template>
  <v-card class="mx-auto post-card">
    <v-card-text class="text-area">
      <div class="content-input">
        <v-avatar>
          <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
        </v-avatar>
        <v-textarea
          v-model="text"
          solo
          name="input-7-4"
          rows="2"
          label="Quoi de neuf ?"
          clearable
          no-resize
        ></v-textarea>
      </div>
      <v-card-actions class="btn-container">
        <v-btn class="btn" text @click="submit"> Publier </v-btn>
      </v-card-actions>
    </v-card-text>
  </v-card>
</template>

<script>
import { createPost } from "../../services/postService";
// import axios from "axios";

export default {
  name: "PostCard",
  data() {
    return {
      text: "",
    };
  },
  methods: {
    async submit() {
      try {
        await createPost({ text: this.text });
        this.text = "";
        this.refresh();
      } catch (error) {
        console.log(error);
      }
    },
    refresh() {
      this.$emit("refresh");
    },
  },
};
</script>

<style lang="scss" scoped>
.post-card {
  .text-area {
    padding-bottom: 0;
    .content-input {
      display: flex;
      justify-content: center;
      border-bottom: solid 1px #0000002f;
    }
  }
  .btn-container {
    display: flex;
    justify-content: right;
    .btn {
      color: #fff;
      background: #5fbae9;
    }
  }
}
.v-text-field.v-text-field--enclosed {
  padding-left: 20px;
}
.v-input__control {
  min-height: 30px !important;
  height: 30px !important;
}
</style>
