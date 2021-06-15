<template>
  <router-view />
</template>

<script>
export default {
  name: "App",
  created() {
    this.$store.commit("initializeApp");
  },
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  font-size: large;
}
* div {
  user-select: none;
}
body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
