<template>
  <div id="app">
    <b-container fluid="lg">
      <nav-bar />
      <router-view />
    </b-container>
  </div>
</template>

<script>
//import Home from "./components/Home.vue";
import NavBar from "./Navbar.vue";

export default {
  name: "App",
  components: {
    NavBar,
  },
};
</script>

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
}
.view-route {
  margin: 6px;
}
</style>
