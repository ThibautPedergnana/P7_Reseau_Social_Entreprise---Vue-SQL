<template>
  <v-row justify="space-around">
    <v-col cols="auto">
      <v-dialog
        v-model="dialog"
        transition="dialog-top-transition"
        max-width="600"
        persistent="false"
      >
        <v-card>
          <v-toolbar color="primary" dark>Modifier votre profil</v-toolbar>
          <v-card-text>
            <input
              v-show="action === 'account'"
              class="input-form input-signup firstname-signup"
              type="text"
              id="firstname"
              name="firstname"
              placeholder="Votre prenom"
              v-model="formData.firstname"
              required
            />

            <input
              v-show="action === 'account'"
              class="input-form input-signup lastname-signup"
              type="text"
              id="lastname"
              name="lastname"
              placeholder="Votre nom"
              v-model="formData.lastname"
              required
            />
            <input
              v-show="action === 'account'"
              class="input-form input-signup email-signup"
              type="text"
              id="email"
              name="email"
              placeholder="Votre email"
              v-model="formData.email"
              required
            />

            <input
              v-show="action === 'password'"
              class="input-form"
              type="password"
              name="oldPassword"
              v-model="passwordData.oldPassword"
              placeholder="Ancien mot de passe"
              required
            />
            <input
              v-show="action === 'password'"
              class="input-form"
              type="password"
              name="password"
              v-model="passwordData.password"
              placeholder="Nouveau mot de passe"
              required
            />
            <input
              v-show="action === 'delete'"
              class="input-form"
              type="password"
              name="passwordDelete"
              v-model="passwordDelete"
              placeholder="Mot de passe"
              required
            />
            <div class="confirm-password-container">
              <input
                v-show="action === 'password'"
                class="input-form"
                type="password"
                name="confirmPassword"
                v-model="passwordData.confirmPassword"
                placeholder="Confirmation du mot de passe"
                required
              />
              <div
                v-show="isValidPassword && action === 'password'"
                class="circle valid"
              ></div>
              <div
                v-show="!isValidPassword && action === 'password'"
                class="circle invalid"
              ></div>
              <span class="error-password" v-if="showErrorPassword"
                >Votre mot de passe actuel est incorrect !</span
              >
            </div>
          </v-card-text>
          <v-card-actions class="justify-end">
            <div class="btn-section">
              <v-btn text color="error" @click="action = 'delete'"
                >Supprimer</v-btn
              >
              <v-btn text @click="closeModal">Retour</v-btn>
              <v-btn
                color="success"
                text
                type="submit"
                @click="
                  action =
                    action === 'password' || action === 'delete'
                      ? 'account'
                      : 'password'
                "
                >{{ getTitleBtn }}</v-btn
              >
              <v-btn
                color="success"
                text
                type="submit"
                @click="validate"
                :disabled="!isValidPassword && action === 'password'"
                >Valider</v-btn
              >
            </div>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script>
import { logout } from "../../../services/authService";
import {
  updateAccount,
  updatePassword,
  deleteUser,
} from "../../../services/userService";

export default {
  name: "ModalEditAccount",
  data() {
    return {
      formData: {
        firstname: "",
        lastname: "",
        email: "",
      },
      passwordData: {
        password: "",
        confirmPassword: "",
        oldPassword: "",
      },
      passwordDelete: "",
      dialog: true,
      action: "account",
      isValidPassword: false,
      showErrorPassword: false,
    };
  },
  mounted() {
    this.formData.firstname = this.user.firstname;
    this.formData.lastname = this.user.lastname;
    this.formData.email = this.user.email;
  },
  props: {
    titleBtn: String,
    user: Object,
  },
  methods: {
    closeModal() {
      this.$emit("onClose");
    },
    async validate() {
      try {
        if (this.action === "password") {
          await updatePassword(this.passwordData);
          this.$emit("refresh");
          window.confirm("Mot de passe modifié !");
        } else if (this.action === "account") {
          await updateAccount(this.formData);
          this.$emit("refresh");
          window.confirm("Compte modifié !");
        } else {
          const accept = window.confirm(
            "Attention vos données seront supprimées définitivement !"
          );
          if (accept) {
            await deleteUser({ data: { password: this.passwordDelete } });
            logout();
          }
        }
        this.showErrorPassword = false;
      } catch (error) {
        this.showErrorPassword = this.action === "password";
      }
    },
  },
  watch: {
    passwordData: {
      handler() {
        const { password, confirmPassword } = this.passwordData;
        this.isValidPassword =
          confirmPassword === password &&
          confirmPassword !== "" &&
          password !== "";
      },
      deep: true,
    },
  },
  computed: {
    getTitleBtn() {
      return this.action === "password" || this.action === "delete"
        ? "Modifier mon compte"
        : "Modifier Mot de passe";
    },
  },
};
</script>

<style lang="scss" scoped>
.input-form {
  background: #cccccc;
  border: none;
  border-radius: 5px;
  margin: 15px 6px 5px 6px;
  padding: 15px;
  width: 50%;
}
.input-form:focus {
  background: #fff;
}

.confirm-password-container {
  position: relative;
  .circle {
    width: 15px;
    height: 15px;
    position: absolute;
    bottom: 20px;
    left: -20px;
    border-radius: 50%;
    &.invalid {
      background-color: indianred;
    }
    &.valid {
      background-color: greenyellow;
    }
  }
  .error-password {
    position: absolute;
    bottom: -20px;
    left: 6px;
    color: indianred;
  }
}
</style>
