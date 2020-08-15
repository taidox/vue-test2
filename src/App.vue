<template>
  <div id="app">
    <b-container fluid="md">
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
.view-route {
  margin: 6px;
}
</style>
