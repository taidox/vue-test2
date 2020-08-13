<template>
  <div>
    <h1>I am the first component!!</h1>
    <p>prop1: {{prop1}}</p>
  </div>
</template>

<script>
export default {
  props: ["prop1"],
};
</script>

<style scoped>
h1 {
  color: red;
}
p {
  color: orange;
}
</style>