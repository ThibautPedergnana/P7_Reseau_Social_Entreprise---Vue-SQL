<template>
  <div class="news-card-container">
    <v-card class="mx-auto news-card" color="#26c6da" dark>
      <v-card-title>
        <v-list-item-avatar color="grey darken-3">
          <v-img
            class="elevation-6"
            alt=""
            src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
          ></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{
            `${postData.nom} ${postData.prenom}`
          }}</v-list-item-title>
        </v-list-item-content>
      </v-card-title>

      <v-card-text class="text-h5 font-weight-bold">
        {{ postData.text }}
      </v-card-text>

      <v-card-actions>
        <v-list-item class="grow">
          {{ postData.date | formatDate }}

          <v-btn
            v-show="user.id === postData.authorId"
            color="error"
            @click="deleteMyPost()"
          >
            Supprimer
          </v-btn>
        </v-list-item>
      </v-card-actions>
    </v-card>
    <div class="comments-container">
      <div class="icons-container">
        <div class="icon-block" @click="applyLike">
          <v-icon class="mr-1" v-show="!alreadyLiked">
            mdi-heart-outline
          </v-icon>
          <v-icon class="mr-1" v-show="alreadyLiked"> mdi-heart </v-icon>
          <span>{{ postData.like }}</span>
        </div>
        <div class="icon-block">
          <v-icon class="mr-1"> mdi-comment-outline </v-icon>
          <span>{{ postData.comment }}</span>
        </div>
      </div>
      <div class="comments-section">
        <div
          class="card-comment"
          v-for="item in comments"
          :key="item.commentsId"
        >
          <span>{{ item.comment }}</span>
          <v-btn
            class="btn-del-comment"
            v-show="user.id === postData.authorId"
            color="error"
            @click="deleteMyPost()"
          >
            Supprimer
          </v-btn>
        </div>
        <v-textarea
          v-model="commentToAdd"
          solo
          name="input-7-4"
          label="Ajouter un commentaire..."
          v-on:keyup.enter="submit"
        ></v-textarea>
      </div>
    </div>
  </div>
</template>

<script>
import { deletePost, getOnePost } from "../../services/postService";
import { getPostComments, createComment } from "../../services/commentService";
import { getLikeStatus, postLike } from "../../services/likeService";

export default {
  name: "NewsCard",
  data() {
    return {
      user: {},
      comments: [],
      commentToAdd: "",
      alreadyLiked: false,
      postData: this.post,
    };
  },
  props: {
    post: Object,
  },
  async mounted() {
    this.user = this.$store.state.user;
    this.getComments();
    const res = await getLikeStatus(this.postData.postId);
    this.alreadyLiked = res.alreadyLiked;
  },
  methods: {
    async deleteMyPost() {
      try {
        await deletePost(this.postData.postId);
        this.refreshPosts();
      } catch (error) {
        console.log(error);
      }
    },
    async submit() {
      try {
        await createComment({
          comment: this.commentToAdd,
          postId: this.postData.postId,
        });
        this.getComments();
        this.commentToAdd = "";
      } catch (error) {
        console.log(error);
      }
    },
    refreshPosts() {
      this.$emit("refresh");
    },
    async getComments() {
      this.comments = await getPostComments(this.postData.postId);
      this.getPost();
    },
    async applyLike() {
      await postLike({
        postId: this.postData.postId,
      });
      this.getPost();

      const res = await getLikeStatus(this.postData.postId);
      this.alreadyLiked = res.alreadyLiked;
    },

    async getPost() {
      this.postData = await getOnePost(this.postData.postId);
    },
  },
};
</script>

<style lang="scss" scoped>
.news-card-container {
  .news-card {
    margin-top: 30px;
    height: 200px;
    .content-input {
      display: flex;
      justify-content: center;
    }
  }
  .comments-container {
    padding: 10px 20px 0 20px;
    display: flex;
    flex-direction: column;
    background-color: white;
    .icons-container {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      .icon-block {
        display: flex;
        span {
          margin-left: 7px;
        }
      }
    }
    .comments-section {
      display: flex;
      flex-direction: column;
      .card-comment {
        display: flex;
        flex-direction: row;
        background-color: #f3f3f3;
        border-radius: 8px;
        padding: 10px 0;
        text-indent: 10px;
        margin-bottom: 10px;
        justify-content: space-between;
      }
      .btn-del-comment {
        margin-right: 10px;
      }
    }
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
