<template>
  <div>
    <span>
      <slot name="lab"></slot>
    </span>
    <button type="button">
      <slot name="top"></slot>
    </button>
    <br />
    <label for="someInput">Slot input text:</label>
    <input
      id="someInput"
      type="text"
      :value="value"
      v-on:input="$emit('input', $event.target.value)"
    />
    <p>{{value}}</p>
  </div>
</template>

<script>
export default {
  name: "SlotComp",
  /* model: {
    prop: "code",
    event: "input",
  }, */
  props: ["value"],
  data: function () {
    return {
      inputVal: "",
    };
  },
  methods: {
    listenEvt(evt) {
      console.log("Slot comp listen: ", evt);
      this.$emit("input", evt);
    },
  },
};
</script>