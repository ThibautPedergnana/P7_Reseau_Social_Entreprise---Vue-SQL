<template>
  <v-card class="mx-auto post-card">
    <v-card-text class="text-area">
      <div class="content-input">
        <v-avatar>
          <img :src="user.pp" :alt="user.pseudo" />
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
        <input
          @change="addPicture"
          class="file-btn"
          type="file"
          name="image"
          id="image"
        />
        <v-btn class="btn" text @click="submit"> Publier </v-btn>
      </v-card-actions>
    </v-card-text>
  </v-card>
</template>

<script>
import { createPost } from "../../services/postService";

export default {
  name: "PostCard",
  data() {
    return {
      text: "",
      user: this.$store.state.user,
      image: "",
      fileElem: null,
    };
  },
  methods: {
    async submit() {
      try {
        const fd = new FormData();
        if (this.text != "") {
          fd.append("text", this.text);
        }
        if (this.image) {
          fd.append("image", this.image, "image");
        }
        await createPost(fd);
        this.text = "";
        this.image = "";
        if (this.fileElem) this.fileElem.value = null;
        this.refresh();
      } catch (error) {
        console.log(error);
      }
    },
    refresh() {
      this.$emit("refresh");
    },
    async addPicture(event) {
      this.image = event.target.files[0];
      this.fileElem = event.currentTarget;
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
      .textarea-section {
        display: flex;
        flex-direction: column;
        .file-btn {
          margin-bottom: 15px;
        }
      }
    }
  }
  .btn-container {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    .btn {
      color: #fff;
      background: #1d9bf0;
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
