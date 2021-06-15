<template>
  <div class="login-form">
    <div class="row">
      <label for="email">Email</label>
      <input type="email" id="email" v-model="email" />
    </div>
    <div class="row">
      <label for="password">Password</label>
      <input type="password" id="password" v-model="password" />
    </div>
    <div class="row">
      <div class="button" @click="login">Giriş</div>
    </div>
  </div>
</template>

<script>
import firebaseApp from "../firebaseApp";

export default {
  name: "Auth",
  data: () => ({
    email: "",
    password: "",
  }),
  methods: {
    async login() {
      try {
        await firebaseApp
          .auth()
          .signInWithEmailAndPassword(this.email, this.password);
        this.$router.replace("/");
      } catch (error) {
        alert(error.message);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.login-form {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .row {
    display: flex;
    flex-direction: column;
    margin: 0.5em 0;
    input {
      padding: 0.5em;
      font-size: larger;
    }
  }
  .button {
    padding: 1em;
    background-color: blue;
    border: 1px solid blue;
    border-radius: 25%;
    color: white;
    cursor: pointer;
  }
}
</style>
