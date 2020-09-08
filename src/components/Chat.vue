<template>
  <div>
    <b-button
      class="chat-button btn-outline-none"
      v-show="showButton"
      size="lg"
      v-on:click="onButtonClick"
    >聊天</b-button>
    <transition name="chat-scale">
      <div class="chat-main-container" v-show="!showButton">
        <div class="chat-title-container">
          <div class="mini-button" @click="onMinimizeChat"></div>
        </div>
        <div class="center-container">
          <div class="chat-content" ref="chatContentDiv">
            <div
              class="chat-list"
              :class="[content.me?'my-list':'other-list']"
              v-for="content in chatContent"
              :key="content.id"
            >
              <div :class="[content.me?'my-text':'other-text', 'chat-text']">{{content.text}}</div>
            </div>
          </div>
          <select v-model="talkTo" class="chat-users" id="chat-users" size="2" ref="selectUser">
            <option class="user" v-for="u in userList" :value="u" :key="u">{{u}}</option>
          </select>
        </div>
        <div class="chat-input-container">
          <input v-model="outputMsg" id="chat-input" @keyup.13="sendMessage" />
          <button v-on:click="sendMessage">Send</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import io from "socket.io-client";

export default {
  name: "Chat",
  data() {
    return {
      showButton: true,
      miniIcon: require("../assets/minimize.svg"),
      fullChatContent: { All: [] },
      chatContent: [],
      talkTo: "",
      counter: 1,
      socket: null,
      myUserData: null,
      outputMsg: "",
      userList: [],
    };
  },
  methods: {
    onButtonClick() {
      this.showButton = !this.showButton;
      this.scrollChat();
    },
    onMinimizeChat() {
      this.showButton = !this.showButton;
    },
    sendMessage() {
      if (this.socket.connected && this.outputMsg.length > 0) {
        console.log("sending meeesag:", this.outputMsg);
        this.addChatContent(this.myUserData, this.talkTo, this.outputMsg, true);
        this.socket.emit("message", {
          to: this.talkTo,
          text: this.outputMsg,
        });
        this.outputMsg = "";
      }
    },
    addChatContent(from, to, text, me) {
      let user = me ? to : to !== "All" ? from : "All";
      console.log("addChatContent user:", user);
      this.fullChatContent[user].push({
        text: text,
        id: this.counter++,
        me: me,
      });
      console.log("addChat:", this.fullChatContent[user]);
      this.scrollChat();
    },
    scrollChat() {
      if (!this.showButton) {
        this.$nextTick(() => {
          this.$refs.chatContentDiv.scrollTop = this.$refs.chatContentDiv.scrollHeight;
        });
      }
    },
    switchUser() {},
  },
  watch: {
    talkTo: function () {
      this.chatContent = this.fullChatContent[this.talkTo];
      console.log("talkTo change:", this.talkTo);
      this.scrollChat();
    },
  },
  mounted: function () {
    this.socket = io("http://localhost:5000");
    this.socket.on("connect", () => {
      console.log("chat socket connected.", this.socket.connected);
    });
    console.log(this);
    this.socket.on("message", (msg) => {
      console.log("Received message :", msg);
      this.addChatContent(msg.from, msg.to, msg.text, false);
    });

    this.socket.on("Update self", (name) => {
      this.myUserData = name;
      console.log("UPdate self:", this.myUserData);
    });

    this.socket.on("Update users", (userData) => {
      console.log("Update user list:" + userData);
      let idx = userData.findIndex((ele) => ele === this.myUserData);
      if (idx >= 0) {
        userData.splice(idx, 1);
      }
      this.userList = userData;
      this.userList.forEach((userName) => {
        if (this.fullChatContent[userName] === undefined) {
          this.$set(this.fullChatContent, userName, []);
        }
      });
      this.$nextTick(() => {
        if (
          this.$refs.selectUser.selectedIndex == -1 &&
          this.userList.length > 0
        ) {
          this.talkTo = this.userList[0];
        }
      });
    });
  },
};
</script>

<style scoped>
.chat-button {
  position: fixed;
  background-color: orangered;
  border-color: transparent;
  right: 30px;
  bottom: 0px;
  width: 90px;
  z-index: 2;
}

.chat-button:hover {
  background-color: rgb(253, 82, 2);
  border: solid 1px black;
}

.chat-main-container {
  position: fixed;
  right: 30px;
  bottom: 0px;
  display: flex;
  flex-direction: column;
  background-color: white;
  border: 1px solid lightgray;
  width: 350px;
  height: 350px;
  z-index: 3;
}

.chat-title-container {
  background-color: white;
  display: flex;
  flex-grow: 0;
  flex-direction: row-reverse;
  border-bottom: 1px solid lightgray;
  width: 100%;
  height: 30px;
}

.mini-button {
  background-image: url("~@/assets/minimize.svg");
  background-color: white;
  background-repeat: no-repeat;
  background-position: center;
  background-clip: content-box;
  background-size: 16px;
  width: 16px;
  margin-right: 10px;
}

.center-container {
  display: flex;
  flex-direction: row;
  flex-grow: 9;
  overflow: auto;
}
.chat-content {
  flex-grow: 2;
  width: 70%;
  font-size: 14px;
  overflow: auto;
}

.chat-list {
  display: flex;
  overflow-wrap: anywhere;
  padding: 5px;
  min-width: 1%;
}

.my-list {
  display: flex;
  flex-direction: row-reverse;
}

.chat-text {
  max-width: 80%;
  padding: 3px 10px 5px 10px;
  border-radius: 4px;
}

.my-text {
  background-color: #d7e4ff;
  justify-content: flex-end;
}

.other-text {
  background-color: #f5f6f8;
}

select:focus {
  outline: 0;
}

.chat-users {
  overflow: auto;
  border: lightgray solid 1px;
  width: 30%;
}

.user {
  font-size: 10px;
  font-weight: bold;
  padding: 5px;
  overflow-wrap: anywhere;
}

.chat-input-container {
  flex-grow: 0;
  display: flex;
  width: 100%;
  height: 25px;
  font-size: 10px;
}

#chat-input {
  border: solid 1px black;
  flex-grow: 1;
}

.chat-scale-enter-active,
.chat-scale-leave-active {
  transition: all 0.2s;
}

.chat-scale-enter,
.chat-scale-leave-to {
  width: 90px;
  height: 48px;
}
</style>