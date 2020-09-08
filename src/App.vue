<template>
  <div id="app">
    <b-container fluid="md">
      <nav-bar />
      <router-view />
    </b-container>
    <chat></chat>
  </div>
</template>

<script>
//import Home from "./components/Home.vue";
import NavBar from "./Navbar.vue";
import Chat from "./components/Chat.vue";

export default {
  name: "App",
  components: {
    NavBar,
    Chat,
  },
};
</script>

<style>
.view-route {
  margin: 6px;
}
</style>
