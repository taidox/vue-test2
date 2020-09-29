<template>
  <div>
    <div :class="['chat-main-layout', { minimized: minimize }]">
      <b-badge
        pill
        :class="['total-unread', { minimized: minimize }]"
        v-show="totalUnread > 0"
        >{{ totalUnread }}</b-badge
      >
      <div class="chat-title-layout">
        <div class="chat-title-left">
          <div
            :class="['chat-button', { minimized: minimize }]"
            v-on:click="onChatButtonClick"
          >
            <strong>聊天</strong>
          </div>
        </div>
        <div class="chat-title-right">
          <div
            :class="['mini-button', { minimized: minimize }]"
            @click="onMinimizeChat"
          ></div>
        </div>
      </div>
      <div :class="['chat-windows-layout', { minimized: minimize }]">
        <div class="chat-content-layout">
          <div class="chat-conversation-laout" ref="chatContentDiv">
            <div
              v-for="content in chatContent"
              :key="content.id"
              class="chat-item-layout"
              :class="
                content.from === myUserData ? 'sent-item' : 'received-item'
              "
            >
              <div class="message-time">
                {{ new Date(content.time).toLocaleString() }}
              </div>
              <p v-if="content.from !== myUserData" class="chat-from">
                {{ content.from === "All" ? "管理員" : content.from }}:
              </p>
              <p
                :class="[
                  'chat-text',
                  content.from === myUserData ? 'sent-text' : 'received-text',
                ]"
              >
                {{ content.text }}
              </p>
            </div>
          </div>
          <b-list-group class="chat-user-list">
            <b-list-group-item
              class="chat-user"
              v-for="user in userList"
              :key="user.name"
              :value="user.name"
              @click="onClickUser"
              :class="{ 'selected-user': user.name === talkTo }"
            >
              {{ user.name === "All" ? "大廳" : user.name }}
              <b-badge class="unread" v-if="user.unread > 0">{{
                user.unread
              }}</b-badge>
            </b-list-group-item>
          </b-list-group>
        </div>
        <div class="chat-input-layout">
          <input
            v-model="outputMsg"
            class="chat-input"
            @keyup.13="sendMessage"
          />
          <button class="chat-send" v-on:click="sendMessage">Send</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";

export default {
  name: "Chat",
  data() {
    return {
      showButton: true,
      minimize: true,
      miniIcon: require("../assets/minimize.svg"),
      fullChatContent: {},
      chatContent: [],
      talkTo: "",
      counter: 1,
      socket: null,
      myUserData: null,
      outputMsg: "",
      stylePopout: {
        width: "350px",
        height: "350px",
      },
    };
  },
  computed: {
    userList: function () {
      let temp = [];
      Object.keys(this.fullChatContent).forEach((name) => {
        temp.push({
          name: name,
          unread: this.fullChatContent[name].unread,
          latestMsgTime: this.fullChatContent[name].latestMsgTime,
        });
      });
      let sorted = temp.sort((a, b) => {
        return a.name === "All"
          ? -1
          : b.name === "All"
          ? 1
          : b.latestMsgTime - a.latestMsgTime;
      });
      console.log("Sorted :", sorted);
      return sorted;
    },
    totalUnread() {
      let total = 0;
      Object.keys(this.fullChatContent).forEach((name) => {
        total += this.fullChatContent[name].unread;
      });
      return total;
    },
  },
  methods: {
    onChatButtonClick() {
      this.minimize = !this.minimize;
      this.scrollChat();
    },
    onMinimizeChat() {
      this.minimize = !this.minimize;
    },
    onClickUser(event) {
      this.talkTo = event.target.getAttribute("value");
      this.fullChatContent[this.talkTo].unread = 0;
      /* this.$nextTick(() => {
        if (!event.target.classList.contains("selected-user")) {
          document.querySelectorAll(".chat-user").forEach((e) => {
            e.classList.remove("selected-user");
          });
          event.target.classList.add("selected-user");
          this.talkTo = event.target.getAttribute("value");
        }
        this.fullChatContent[event.target.getAttribute("value")].unread = 0;
      }); */
    },
    sendMessage() {
      if (this.socket.connected && this.outputMsg.length > 0) {
        //this.addChatContent(this.myUserData, this.talkTo, this.outputMsg, true);
        this.socket.emit("message", {
          to: this.talkTo,
          text: this.outputMsg,
        });
        this.outputMsg = "";
      }
    },
    addChatContent(msgData) {
      console.log("addChatContent msgData:", msgData);
      let channel =
        msgData.from === "All" || msgData.to === "All"
          ? "All"
          : msgData.from === this.myUserData
          ? msgData.to
          : msgData.from;
      console.log("Add chat to channel:", channel);
      this.fullChatContent[channel].content.push({
        from: msgData.from,
        to: msgData.to,
        text: msgData.text,
        time: msgData.time,
        id: this.counter++,
      });

      /* let user = isSent ? to : to !== "All" ? from : "All";
      this.fullChatContent[user].content.push({
        from: from,
        to: to,
        text: text,
        isSent: isSent,
        id: this.counter++,
      }); */
      this.fullChatContent[channel].latestMsgTime = msgData.time;
      if (msgData.from !== this.myUserData) {
        this.fullChatContent[channel].unread += 1;
      }
      this.scrollChat();
    },
    scrollChat() {
      this.$nextTick(() => {
        this.$refs.chatContentDiv.scrollTop = this.$refs.chatContentDiv.scrollHeight;
      });
    },

    switchUser() {},
  },
  watch: {
    talkTo: function () {
      this.chatContent = this.fullChatContent[this.talkTo].content;
      console.log("watch talkTo change:", this.talkTo);
      this.scrollChat();
    },
  },
  mounted: function () {
    //const HEROKU_SERVER = "https://chat4tiny.herokuapp.com/";
    //this.socket = io(HEROKU_SERVER);
    this.socket = io("http://localhost:5000");
    this.socket.on("connect", () => {
      console.log("chat socket connected.", this.socket.connected);
    });
    this.socket.on("message", (msg) => {
      console.log("Received message :", msg);
      this.addChatContent(msg);
    });

    this.socket.on("Update self", (name) => {
      this.myUserData = name;
    });

    this.socket.on("Update users", (userData) => {
      let idx = userData.findIndex((ele) => ele === this.myUserData);
      if (idx >= 0) {
        userData.splice(idx, 1);
      }
      userData.forEach((userName) => {
        if (this.fullChatContent[userName] === undefined) {
          this.$set(this.fullChatContent, userName, {
            unread: 0,
            latestMsgTime: new Date(),
            content: [],
          });
        }
      });
      this.$nextTick(() => {
        if (this.talkTo === "") {
          this.talkTo = "All";
        }
      });
    });
  },
};
</script>

<style scoped>
.chat-main-layout {
  position: fixed;
  right: 30px;
  bottom: 0px;
  display: flex;
  flex-direction: column;
  background-color: white;
  border: 1px solid lightgray;
  opacity: 1;
  z-index: 999;
}

.minimized.total-unread {
  display: flex;
  position: absolute;
  right: -1em;
  top: -1em;
  background-color: orangered;
  font-size: 0.4em;

  color: white;
}

.total-unread {
  display: none;
}

.chat-title-layout {
  background-color: white;
  display: flex;
  flex-grow: 0;
  border-bottom: 1px solid lightgray;
  width: 100%;
}

.chat-title-left {
  display: flex;
  flex-direction: row;
}

.chat-title-right {
  display: flex;
  flex-direction: row-reverse;
  flex-grow: 1;
}

.chat-button {
  color: orangered;
  padding: 8px 16px 8px 16px;
  pointer-events: none;
  box-shadow: none;
}

.minimized.chat-button {
  color: orangered;
  border-color: transparent;
  border-radius: 3px;
  padding: 8px 16px 8px 16px;
  pointer-events: auto;
  box-shadow: 5px 0px 3px lightgray;
}

.minimized.chat-button:hover {
  border: 1px solid rgba(0, 0, 0, 0.185);
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

.minimized.chat-windows-layout,
.minimized.mini-button {
  width: 0px;
  height: 0px;
  opacity: 0;
  transform: scale(0);
  margin-right: 0;
}

.chat-windows-layout {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 450px;
  height: 370px;
  transition: all 0.25s;
  transform-origin: right bottom;
  transform: scale(1);
}

.chat-content-layout {
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  overflow: auto;
}

.chat-conversation-laout {
  display: flex;
  flex-direction: column;
  background-color: #f2f2f2;
  font-size: 14px;
  overflow: auto;
  width: 70%;
}

.chat-item-layout {
  display: flex;
  flex-direction: column;
  width: auto;
}

.message-time {
  align-self: center;
  font-size: 60%;
}

.sent-item {
  align-items: flex-end;
}

.received-item {
  align-items: flex-start;
}

.chat-from {
  margin-bottom: 0;
  font-size: 0.8em;
  overflow-wrap: break-word;
}

.chat-text {
  flex-grow: 0;
  overflow-wrap: break-word;
  padding: 3px 10px 5px 10px;
  margin: 5px 9px;
  max-width: 90%;
}

.sent-text {
  color: white;
  background-color: #1877f2;
  border-radius: 8px 0 8px 8px;
  position: relative;
}

.sent-text::after {
  content: "";
  top: 0px;
  right: -7px;
  position: absolute;
  border: 0px solid;
  display: block;
  width: 0;
  height: 0;
  background-color: transparent;
  border-top: 6px solid #1877f2;
  border-bottom: 6px solid transparent;
  border-left: 6px solid #1877f2;
  border-right: 6px solid transparent;
}

.received-text {
  background-color: white;
  border-radius: 0 8px 8px 8px;
  position: relative;
}

.received-text::before {
  content: "";
  top: 0px;
  left: -7px;
  position: absolute;
  border: 0px solid;
  display: block;
  width: 0;
  height: 0;
  background-color: transparent;
  border-top: 6px solid white;
  border-bottom: 6px solid transparent;
  border-left: 6px solid transparent;
  border-right: 6px solid white;
}

.received-text::before {
  border-radius: 0px;
}

select:focus {
  outline: 0;
}

.chat-user-list {
  display: flex;
  overflow: auto;
  border-left: 1px solid lightgray;
  width: 30%;
}

.chat-user {
  font-size: 0.8px;
  font-weight: bold;
  padding: 5px;
  overflow-wrap: anywhere;
}

.chat-user:hover {
  background-color: rgb(245, 245, 245);
}

.chat-user-list > .selected-user {
  background-color: gainsboro;
}

.chat-user .unread {
  background-color: orangered;
  float: right;
}

.chat-input-layout {
  display: flex;
  width: 100%;
  height: 25px;
}

.chat-input {
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