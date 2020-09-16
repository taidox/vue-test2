<template>
  <b-container fluid="lg">
    <div>
      <!-- <carousel></carousel> -->

      <t-bike-status></t-bike-status>
    </div>
  </b-container>
</template>

<script>
/* import Carousel from "./Carousel.vue"; */
import TBikeStatus from "./TBikeStatus.vue";

export default {
  name: "Home",
  components: {
    /* Carousel, */
    TBikeStatus,
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
