<template>
  <div>
    <b-row :class="{'d-none':!isShow}">
      <div>This is About page.</div>
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