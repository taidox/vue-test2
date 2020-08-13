<template>
  <div class="todo-item">
    <!--<p>
       <input type="checkbox" v-bind:checked="todo.isCompleted" v-on:change="markCompleted" />
      <span v-bind:class="{isDone:todo.isCompleted}">{{todo.todoContent}}</span>
      <butto n type="button" v-on:click="delTodo">Del</button>
    </p>-->
    <b-input-group>
      <b-input-group-prepend is-text>
        <input type="checkbox" v-bind:checked="todo.isCompleted" @change="markCompleted" />
      </b-input-group-prepend>
      <b-input-group-text style="width: 75%" :class="{isDone:todo.isCompleted}">{{todo.todoContent}}</b-input-group-text>
      <b-button variant="success" @click="delTodo">Delete</b-button>
    </b-input-group>
  </div>
</template>

<script>
export default {
  name: "TodoItem",
  props: {
    todo: Object,
  },
  methods: {
    delTodo() {
      console.log("click Del");
      this.$emit("del-todo", this.todo);
    },
    markCompleted() {
      console.log("checkbox change:", this.todo.isCompleted);
      this.todo.isCompleted = !this.todo.isCompleted;
    },
  },
};
</script>

<style scoped>
.isDone {
  text-decoration: line-through;
}
</style>