<template>
  <div class="header-app">
    <v-app-bar color="accent-4" dense>
      <v-toolbar-title class="title" @click="goToHome">
        <v-img
          class="groupomania"
          src="@/assets/icon-left-font-monochrome-white.png"
          alt="Logo du site"
        >
        </v-img>
        <v-img
          class="groupomania-logo"
          src="@/assets/icon.png"
          alt="Logo du site"
        >
        </v-img>
      </v-toolbar-title>

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
            dark
          ></v-text-field>
        </div>
        <div class="search-results">
          <div
            class="search-item"
            v-for="user in users"
            :key="user.id"
            @click="goToProfile(user.id)"
          >
            <img class="img-item" :src="user.pp" :alt="user.pseudo" />
            <span>{{ `${user.firstname} ${user.lastname}` }}</span>
          </div>
        </div>
      </div>
      <v-btn icon @click="goToAccount" class="account-btn">
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>

      <v-btn icon @click="logout" class="logout-btn">
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
.header-app {
  header {
    background-color: #15202b !important;
  }
}
.title {
  cursor: pointer;
  width: 15%;
  .groupomania-logo {
    display: none;
  }
}

.search-container {
  position: relative;
  margin-right: 40px;
  .searchbar {
    display: flex;
    .search {
      margin-top: 20px;
      max-width: 230px;
    }
  }
  .search-results {
    width: 230px;
    background-color: #15202b;
    color: white;
    position: absolute;
    top: 75px;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    .search-item {
      display: flex;
      align-items: center;
      padding: 10px 20px;
      .img-item {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-right: 10px;
      }
      span {
        color: white;
        font-size: 14px;
      }
      &:hover {
        background-color: #314a63;
        cursor: pointer;
      }
      &:not(:last-child) {
        border-bottom: 1px solid rgb(196, 196, 196);
      }
    }
  }
}
i.v-icon.v-icon {
  color: white;
}
@media (max-width: 1000px) {
  .title {
    width: 20%;
  }
}
@media (max-width: 900px) {
  .title {
    width: 25%;
  }
}
@media (max-width: 560px) {
  .title {
    width: 10%;
    min-width: 50px;
    .groupomania {
      display: none;
    }
    .groupomania-logo {
      display: block;
      color: white;
    }
  }
}
</style>
