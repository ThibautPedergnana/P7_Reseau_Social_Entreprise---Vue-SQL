<template>
  <div class="header-app">
    <v-app-bar color="accent-4" dense dark>
      <!-- INSEREZ L'IMAGE -->
      <v-toolbar-title class="title" @click="goToHome"
        >Groupomania</v-toolbar-title
      >
      <v-spacer></v-spacer>

      <div class="search-container">
        <div class="searchbar">
          <v-text-field
            @keyup="handleSearch"
            class="search"
            label="Rechercher..."
            v-model="text"
            filled
            dense
          ></v-text-field>
        </div>
        <div class="search-results">
          <div
            class="search-item"
            v-for="user in users"
            :key="user.id"
            @click="goToProfile(user.id)"
          >
            <!-- <img src="" alt=""> -->
            <span>{{ `${user.firstname} ${user.lastname}` }}</span>
          </div>
        </div>
      </div>
      <v-btn icon @click="goToAccount">
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>

      <v-btn @click="logout" icon>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
import { search } from "../../services/userService";
// import axios from "axios";

export default {
  name: "HeaderComponent",
  data() {
    return {
      text: "",
      users: [],
    };
  },
  methods: {
    goToHome() {
      this.$router.push("/app/wall");
    },
    goToAccount() {
      this.$router.push("/app/user-profile/" + this.$store.state.user.id);
    },
    logout() {
      const resultat = window.confirm(
        "Etes-vous sur de vouloir vous déconnecter ?"
      );
      if (resultat) {
        localStorage.removeItem("auth");
        this.$router.push("/");
      }
    },
    async handleSearch() {
      const res = await search(this.text);
      this.users = res;
    },
    goToProfile(userId) {
      this.$router.push("/app/user-profile/" + userId);
      this.users = [];
      this.text = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  cursor: pointer;
}
.search-container {
  position: relative;
  margin-right: 40px;
  .searchbar {
    display: flex;
    .search {
      margin-top: 20px;
      width: 230px;
    }
  }
  .search-results {
    width: 230px;
    background-color: white;
    position: absolute;
    border-radius: 5px;
    top: 75px;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    .search-item {
      display: flex;
      align-items: center;
      padding: 10px 20px;
      span {
        color: black;
        font-size: 14px;
      }
      &:hover {
        background-color: #e4e4e4;
        cursor: pointer;
      }
      &:not(:last-child) {
        border-bottom: 1px solid rgb(196, 196, 196);
      }
    }
  }
}
</style>
