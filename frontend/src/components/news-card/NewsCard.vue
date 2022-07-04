<template>
  <div class="news-card-container">
    <v-card class="mx-auto news-card" dark>
      <v-card-title class="top-part">
        <v-list-item-avatar color="grey darken-3">
          <v-img
            class="elevation-6"
            :alt="postData.pseudo"
            :src="post.pp"
          ></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{
            `${postData.lastname} ${postData.firstname}`
          }}</v-list-item-title>
        </v-list-item-content>
        <div class="delete-post-btn">
          <v-icon
            role="img"
            aria-hidden="false"
            class="btn-cancel"
            v-show="user.id === postData.authorId || user.admin"
            color="error"
            @click="deleteMyPost()"
          >
            {{ icons.mdiDelete }}
          </v-icon>
        </div>
      </v-card-title>

      <div class="content-card">
        <v-card-text class="text-h5 font-weight-bold">
          {{ postData.text }}
        </v-card-text>
        <img v-if="postData.imageUrl !== ''" :src="postData.imageUrl" />
      </div>

      <v-card-actions>
        <v-list-item class="grow content-input">
          {{ postData.date | formatDate }}
        </v-list-item>
      </v-card-actions>
    </v-card>
    <div class="comments-container">
      <div class="icons-container">
        <div class="icon-block" @click="applyLike">
          <v-icon class="mr-1 heart" v-show="!alreadyLiked">
            mdi-heart-outline
          </v-icon>
          <v-icon
            class="mr-1 heart"
            v-show="alreadyLiked"
            style="color: #f91880"
          >
            mdi-heart
          </v-icon>
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
          <div class="card-top-section">
            <div class="img-section">
              <img class="img-comment" :src="item.pp" />
            </div>
            <div class="user-section">
              <span class="username"
                >{{ item.lastname }} {{ item.firstname }}</span
              >
            </div>
            <div class="delete-section">
              <v-btn
                class="btn-del-comment"
                v-show="user.id === item.authorId || user.admin"
                color="error"
                @click="deleteComment(item.idComment)"
              >
                <v-icon role="img" aria-hidden="false">
                  {{ icons.mdiDelete }}
                </v-icon>
              </v-btn>
            </div>
          </div>
          <div class="text-section">
            <p class="text-comment">{{ item.comment }}</p>
          </div>
        </div>
        <v-textarea
          v-model="commentToAdd"
          solo
          name="input-7-4"
          placeholder="Ajouter un commentaire..."
          rows="1"
          clearable
          no-resize
          v-on:keyup.enter="submit"
        ></v-textarea>
      </div>
    </div>
  </div>
</template>

<script>
import { deletePost, getOnePost } from "../../services/postService";
import {
  getPostComments,
  createComment,
  deleteComment,
} from "../../services/commentService";
import { getLikeStatus, postLike } from "../../services/likeService";
import { mdiDelete } from "@mdi/js";

export default {
  name: "NewsCard",
  data() {
    return {
      user: {},
      comments: [],
      commentToAdd: "",
      alreadyLiked: false,
      postData: this.post,
      icons: {
        mdiDelete,
      },
    };
  },
  computed: {
    fullName() {
      return this.user.lastname + " " + this.user.firstname;
    },
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
    async deleteComment(id) {
      try {
        await deleteComment(id);
        this.getComments();
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
    height: fit-content;
    background-color: #15202b;
    .top-part {
      padding: 5px;
      .delete-post-btn {
        .btn-cancel {
          font-size: 18px;
          color: gray !important;
          top: -12px;
          right: 3px;
          &:hover {
            color: #ff5252 !important;
          }
        }
      }
    }
    .content-card {
      img {
        width: 100%;
        height: 300px;
        object-fit: cover;
      }
    }
    .elevation-6 {
      margin-right: 5px;
    }
  }
  .comments-container {
    padding: 10px 15px 0 15px;
    display: flex;
    flex-direction: column;
    background-color: white;
    .icons-container {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      .icon-block {
        display: flex;
        .heart {
          cursor: pointer;
        }
        span {
          margin-left: 7px;
        }
      }
    }
    .comments-section {
      display: flex;
      flex-direction: column;
      .card-comment {
        background-color: #f3f3f3;
        border-radius: 8px;
        margin-bottom: 10px;
        .card-top-section {
          border-radius: 8px 8px 0 0;
          padding: 5px;
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          grid-gap: 5px;
          grid-auto-rows: minmax(10px, auto);
          background-color: #15202b;
          .img-section {
            grid-column: 1;
            grid-row: 1;
            .img-comment {
              width: 35px;
              height: 35px;
              border-radius: 50%;
              object-fit: cover;
              margin-left: 5px;
            }
          }
          .user-section {
            display: flex;
            align-items: center;
            .username {
              grid-column: 2 / 11;
              grid-row: 1;
              white-space: nowrap;
              color: white;
            }
          }
          .delete-section {
            grid-column: 12;
            grid-row: 1;
            display: flex;
            align-items: center;
            .btn-del-comment {
              background-color: #15202b !important;
              border-color: #15202b !important;
              color: gray;
              box-shadow: none;
              margin-right: 0;
              padding: 0;
              min-width: 0;
              &:hover {
                color: #ff5252 !important;
              }
            }
          }
        }
        .text-section {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          grid-auto-rows: minmax(10px, auto);
          grid-auto-columns: minmax(15px, 10px);
          grid-gap: 5px;
          margin-top: 5px;
          .text-comment {
            grid-column: 1 / 12;
            grid-row: 1;
            display: block;
            align-items: center;
            flex-grow: 1;
            word-break: break-word;
            white-space: pre-wrap;
            margin: 0 5px 5px 15px;
          }
        }
      }
    }
  }
}
.v-textarea {
  .v-input__controlr {
    height: 100px;
  }
}
.v-input__control {
  min-height: 30px !important;
  height: 30px !important;
}
textarea {
  margin: 0;
}
</style>
