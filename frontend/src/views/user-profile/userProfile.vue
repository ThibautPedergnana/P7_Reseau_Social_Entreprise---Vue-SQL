<template>
  <div class="wall-container">
    <div class="profile-container">
      <v-avatar>
        <div class="own" v-if="userId === currentUser.id">
          <label for="image">
            <img class="ppChange" v-bind:src="user.pp" alt="pp" srcset="" />
            <img
              class="file"
              src="../../assets/file-image-regular.svg"
              alt=""
              srcset=""
            />
          </label>
          <input
            @change="modifPP"
            type="file"
            name="image"
            id="image"
            style="display: none"
          />
        </div>
        <div v-else>
          <img class="ppFirst" :src="user.pp" alt="pp" srcset="" />
        </div>
      </v-avatar>
      <div class="infos-container">
        <span class="fullname">{{
          `${this.user.firstname} ${this.user.lastname}`
        }}</span>
        <v-btn
          class="modify-btn"
          v-show="userId === currentUser.id"
          @click="isOpenModal = true"
          @click.stop="dialog = false"
          color="#1d9bf0"
        >
          Modifier
        </v-btn>
      </div>
    </div>
    <div v-for="item in posts" :key="item.postId">
      <NewsCard :post="item" @refresh="refreshPosts" />
    </div>
    <ModalEditAccount
      v-if="isOpenModal && user"
      titleBtn="Modifier"
      :user="user"
      @onClose="isOpenModal = false"
      @refresh="refreshUser"
    />
  </div>
</template>

<script>
import NewsCard from "../../components/news-card/NewsCard.vue";
import { currentUser } from "../../services/authService";
import { getUserPosts } from "../../services/postService";
import { getUser, patchImage } from "../../services/userService";
import ModalEditAccount from "./Modal/ModalEditAccount.vue";

export default {
  name: "userProfile",
  components: {
    NewsCard,
    ModalEditAccount,
  },
  data() {
    return {
      posts: [],
      user: {},
      userId: null,
      currentUser: this.$store.state.user,
      isOpenModal: false,
      route: window.location,
    };
  },
  async mounted() {
    this.userId = +this.$route.params.id;
    this.refreshPosts();
    this.refreshUser();
  },
  methods: {
    async refreshPosts() {
      const res = await getUserPosts(this.userId);
      this.posts = res;
    },
    async refreshUser() {
      const res = await getUser(this.userId);
      this.user = res;
    },
    async modifPP(event) {
      const image = event.target.files[0];
      const fd = new FormData();
      if (image) {
        fd.append("image", image, "image");
      }
      await patchImage(fd);
      this.refreshUser();
      this.refreshPosts();
      const response = await currentUser();
      this.$store.commit("setUser", response.data);
    },
  },
};
</script>

<style lang="scss" scoped>
button {
  color: white !important;
}
.profile-container {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  .v-avatar {
    height: 150px !important;
    min-width: 150px !important;
    width: 150px !important;
    .own {
      position: relative;
      .file {
        height: 35px;
        position: absolute;
        left: 60px;
        top: 60px;
        display: none;
      }
      .ppChange {
        height: 150px;
        width: 150px;
        border-radius: 50%;
        object-fit: cover;
        cursor: pointer;
        &:hover {
          filter: brightness(40%);
          ~ .file {
            display: block;
          }
        }
      }
    }
  }
  .infos-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    .fullname {
      font-size: 22px;
      font-weight: 400;
      color: #444;
    }
    .update {
      margin-top: 15px;
    }
  }
}
</style>
