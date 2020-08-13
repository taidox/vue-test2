<template>
  <b-container fluid="lg">
    <div>
      <carousel></carousel>
      <add-todo v-on:add-todo="addTodo"></add-todo>
      <div v-for="todo in todos" v-bind:key="todo.id">
        <b-row>
          <b-col>
            <todo-item v-bind:todo="todo" v-on:del-todo="delTodo"></todo-item>
          </b-col>
        </b-row>
      </div>
    </div>
  </b-container>
</template>

<script>
import TodoItem from "./TodoItem.vue";
import AddTodo from "./AddTodo.vue";
import Carousel from "./Carousel.vue";

export default {
  name: "Home",
  components: {
    TodoItem,
    AddTodo,
    Carousel,
  },
  data() {
    return {
      nextId: 3,
      todos: [
        {
          id: 1,
          todoContent: "Clean house.",
          isCompleted: true,
        },
        {
          id: 2,
          todoContent: "Feed dogs~",
          isCompleted: false,
        },
      ],
      slotText: "",
      inputText: "",
      isChecked: true,
      checkedArray: ["multiCheck1x"],
    };
  },
  methods: {
    delTodo(todoItem) {
      console.log("in delTodo()", todoItem.id);
      this.todos = this.todos.filter((v) => v.id != todoItem.id);
    },
    addTodo(newTodo) {
      console.log("Add todo:", newTodo);
      this.todos.push({
        id: this.nextId++,
        todoContent: newTodo,
        isCompleted: false,
      });
    },
    listenEvt(event) {
      console.log("listen ", event);
    },
    listenSlot(event) {
      event;
      console.log("listen slot:", this.slotText, "<");
    },
  },
};
</script>

<style>
.HomeDiv {
  margin: 20px;
}
</style>
