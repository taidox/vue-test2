<template>
  <div>
    <b-form class="AddTodo">
      <b-row>
        <b-col cols="10" class="p-1">
          <b-form-input type="text" v-model="newTodo" placeholder="Add todo here..."></b-form-input>
        </b-col>
        <b-col align-h="start" class="p-1">
          <b-button pill type="button" variant="primary" v-on:click="addTodo">Add</b-button>
        </b-col>
      </b-row>
    </b-form>
  </div>
</template>

<script>
export default {
  name: "AddTodo",
  data() {
    return {
      newTodo: "",
    };
  },
  methods: {
    addTodo() {
      console.log("addTodoItem click:", this.newTodo);
      this.$emit("add-todo", this.newTodo);
      this.newTodo = "";
    },
  },
};
</script>

<style scoped>
 {
}
</style>