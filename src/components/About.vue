<template>
  <div>
    <b-row :class="{'d-none':!isShow}">
      <p>This is About page</p>
    </b-row>
    <button type="button" @click="toggle">Toggle</button>
  </div>
</template>

<script>
export default {
  name: "About",
  data() {
    return {
      isShow: true,
    };
  },
  methods: {
    toggle() {
      this.isShow = !this.isShow;
    },
  },
};
</script>