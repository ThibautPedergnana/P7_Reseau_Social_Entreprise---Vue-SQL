<template>
  <div id="signup-page">
    <div class="icon">
      <img
        src="../../assets/icon-left-font-monochrome-black.png"
        alt="Icon Entreprise"
        class="icon-name"
      />
    </div>
    <div class="wrapper">
      <div id="form-container">
        <div class="form-header">
          Bienvenue sur votre réseau social d'entreprise
        </div>
        <div class="form-content">
          <div>
            <h2 v-show="showLogin" class="active">Login</h2>
            <h2 v-show="!showLogin" class="active">Sign Up</h2>
          </div>
          <form>
            <input
              v-show="!showLogin"
              class="input-form input-signup lastname-signup"
              type="text"
              id="lastname"
              name="lastname"
              placeholder="Votre nom"
              v-model="name"
              required
            />
            <p v-if="errorNom" v-show="!showLogin" class="red">
              Votre nom doit contenir au moins 3 caractères
            </p>
            <input
              v-show="!showLogin"
              class="input-form input-signup firstname-signup"
              type="text"
              id="firstname"
              name="firstname"
              placeholder="Votre prenom"
              v-model="firstname"
              required
            />
            <p v-if="errorNom" v-show="!showLogin" class="red">
              Votre prénom doit contenir au moins 3 caractères
            </p>
            <input
              v-show="!showLogin"
              class="input-form input-signup email-signup"
              type="text"
              id="email"
              name="email"
              placeholder="Votre email"
              v-model="emailRegister"
              required
            />
            <p v-if="errorNom" v-show="!showLogin" class="red">
              Email invalide
            </p>
            <!-- <p v-if="errorNom" v-show="!showLogin" class="red">
              Cet Email est déja utilisé.
            </p> -->
            <input
              v-show="!showLogin"
              class="input-form input-signup password-signup"
              type="password"
              id="password"
              name="password"
              v-model="passwordRegister"
              placeholder="Mot de passe"
              required
            />
            <input
              v-show="showLogin"
              class="input-form email-login"
              type="text"
              name="mail"
              v-model="email"
              placeholder="Votre email"
              required
            />
            <input
              v-show="showLogin"
              class="input-form password-login"
              type="password"
              name="pass"
              v-model="password"
              placeholder="Mot de passe"
              required
            />
            <input
              v-show="!showLogin"
              type="submit"
              class="btn-inscription"
              value="INSCRIPTION"
              @click="signup"
            />
            <input
              v-show="showLogin"
              type="submit"
              class="btn-connection"
              value="CONNEXION"
              @click="login"
            />
          </form>
          <p v-show="!showLogin" class="switch-menu">
            Déjà inscrit ?
            <button @click="switchToSignup" class="btn-form btn-signup">
              Se connecter
            </button>
          </p>
          <p v-show="showLogin" class="switch-menu">
            Pas de compte ?
            <button @click="switchToSignup" class="btn-form btn-login">
              S'inscrire
            </button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login, signup } from "../../services/authService";

export default {
  data() {
    return {
      sameEmail: false,
      emailRegister: "",
      email: "",
      errorEmail: false,
      password: "",
      passwordRegister: "",
      errorMdp: false,
      name: "",
      errorNom: false,
      firstname: "",
      errorPrenom: false,
      incorrect: false,
      showLogin: true,
    };
  },
  mounted() {
    const token = localStorage.auth;
    if (token) {
      this.$router.push("/app/wall");
    }
  },
  methods: {
    switchToSignup() {
      this.showLogin = !this.showLogin;
    },

    validation() {
      let validEmail = new RegExp(
        /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
      let validName = new RegExp(
        /^[a-zA-Z]+[a-zA-Z]+[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*){3,}$/
      );
      // let validPassword = new RegExp(
      //   /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*.]).{8,}$/
      // );
      validEmail.test(this.emailRegister)
        ? (this.errorEmail = false)
        : (this.errorEmail = true);
      validName.test(this.name)
        ? (this.errorNom = false)
        : (this.errorNom = true);
      validName.test(this.firstname)
        ? (this.errorPrenom = false)
        : (this.errorPrenom = true);
      // validPassword.test(this.passwordRegister)
      //   ? (this.errorMdp = false)
      //   : (this.errorMdp = true);
      // console.log(validPassword.test(this.passwordRegister));
      return (
        validEmail.test(this.emailRegister) &&
        validName.test(this.name) &&
        validName.test(this.firstname)
        // validPassword.test(this.passwordRegister)
      );
    },
    async signup() {
      if (this.validation()) {
        await signup({
          lastname: this.name,
          firstname: this.firstname,
          email: this.emailRegister,
          password: this.passwordRegister,
        });

        const resp = await login({
          email: this.emailRegister,
          password: this.passwordRegister,
        });

        const token = resp.data.token;
        localStorage.auth = token;

        this.$router.push("/app/wall");
        // this.$store.commit('setUser', 2)
      }
    },

    async login() {
      const response = await login({
        email: this.email,
        password: this.password,
      });
      const token = response.data.token;
      localStorage.auth = token;
      this.$router.push("/app/wall");
    },
  },
};
</script>

<style lang="scss" scoped>
.red {
  color: red;
  background-color: white;
}
.error {
  color: red;
  background-color: white;
}
.icon {
  display: flex;
  justify-content: center;
  height: 225px;
}
.icon-name {
  height: 250px;
}
form {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.form-header {
  padding: 25px;
  background-color: #f6f6f6;
  border-top: 1px solid f6f6f6;
  text-align: center;
  -webkit-border-radius: 0 0 10px 10px;
  border-radius: 10px 10px 0 0;
}
.form-content {
  border-radius: 0 0 10px 10px;
}
.switch-menu {
  display: flex;
  margin: 0 0 20px 20px;
}
.btn-form {
  background: #fff;
  border: 0;
  color: #1d9bf0;
  font-size: 1rem;
  cursor: pointer;
}
h2 {
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  display: inline-block;
  margin: 20px 8px 10px 8px;
  color: #cccccc;
}
.login {
  margin-right: 20px;
}
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
.password-login,
.email-login {
  margin: 15px 6px 5px 6px;
  padding: 15px;
}
.btn-connection,
.btn-inscription {
  font-size: 0.9rem;
  margin: 20px 0 20px 0;
  padding: 10px 30px 10px 30px;
  background-color: #1d9bf0;
  border: none;
  border-radius: 5px;
  color: white;
}
.wrapper {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  min-height: 100%;
}
#form-container {
  border-radius: 10px;
  background: #fff;
  width: 90%;
  max-width: 450px;
  position: relative;
  padding: 0px;
  box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
  text-align: center;
}
h2.inactive {
  color: #cccccc;
}
h2.active {
  color: #0d0d0d;
  border-bottom: 2px solid #1d9bf0;
}
</style>
