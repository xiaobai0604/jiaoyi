<template>
  <div>
    <h2>消息</h2>
    <ul>
      <li v-for="user in users" :key="user.id" @click="startConversation(user)">
        <img :src="user.img" :alt="user.name" class="chat-avatar"/>
        {{ user.name }}
      </li>
    </ul>
    <div v-if="activeUser">
      <h4>{{ activeUser.name }}的聊天窗口</h4>
      <div class="chat-container">
        <div v-for="(message, index) in conversation" :key="index" class="chat-message" :class="{'message-sent': message.from === 'me', 'message-received': message.from !== 'me'}">
          <div class="chat-message-content">
            <div class="chat-text">{{ message.text }}</div>
          </div>
          <div class="chat-message-avatar-box">  
            <span class="chat-name">{{ message.from }}</span>
            <img :src="message.from === 'me' ? 'https://tse3-mm.cn.bing.net/th/id/OIP-C.7GLMYPqMlt2LgkbPsOnDIAAAAA?w=200&h=198&c=7&r=0&o=5&dpr=1.3&pid=1.7' : activeUser.img" :alt="message.from === 'me' ? 'Me' : activeUser.name" class="chat-avatar chat-avatar-edge"/></div>
          </div>
      </div>
      <input type="text" v-model="newMessage" @keyup.enter="sendMessage" placeholder="Type a message..." class="message-input"/>
    </div>
  </div>
</template>




<script>
export default {
  data() {
    return {
      users: [
        {id:1,name:'Alice',img:'https://tse3-mm.cn.bing.net/th/id/OIP-C.7GLMYPqMlt2LgkbPsOnDIAAAAA?w=200&h=198&c=7&r=0&o=5&dpr=1.3&pid=1.7'},
        {id:2,name:'Bob',img:'https://tse3-mm.cn.bing.net/th/id/OIP-C.7GLMYPqMlt2LgkbPsOnDIAAAAA?w=200&h=198&c=7&r=0&o=5&dpr=1.3&pid=1.7'},
        {id:3,name:'Charlie',img:'https://tse3-mm.cn.bing.net/th/id/OIP-C.7GLMYPqMlt2LgkbPsOnDIAAAAA?w=200&h=198&c=7&r=0&o=5&dpr=1.3&pid=1.7'},
        {id:4,name:'David',img:'https://tse3-mm.cn.bing.net/th/id/OIP-C.7GLMYPqMlt2LgkbPsOnDIAAAAA?w=200&h=198&c=7&r=0&o=5&dpr=1.3&pid=1.7'},
      ],
      activeUser:null,
      conversation:[], 
      newMessage: ''
    };
  }, 
  methods: {
    startConversation(user) {
      this.activeUser = user;
      this.conversation = [];//重置聊天内容
    },
    sendMessage() {
      if (this.newMessage.trim()) {
        this.conversation.push({
          text: this.newMessage,
          from:'me',
          img: 'https://tse3-mm.cn.bing.net/th/id/OIP-C.7GLMYPqMlt2LgkbPsOnDIAAAAA?w=200&h=198&c=7&r=0&o=5&dpr=1.3&pid=1.7'
        });
        this.newMessage = '';//清空输入框
      }
    }
  }
}
</script>

<style scoped>

.chat-container {
  border: 1px solid #ccc;
  border-radius: 10px;
  margin-top: 10px;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  margin-right: 15px;
  width: 600px; /* 根据需要调整 */
  max-width: 900px; /* 移除最大宽度限制，如果不需要限制宽度的话 */
  background-color: #e6e6e6;
  overflow-y: auto;
  height: calc(60vh - 50px); /* Adjust as needed */
}

/* 当添加 reversed 类时，反转聊天容器的方向 */
.reversed .chat-container {
  flex-direction: column-reverse;
}

.chat-user {
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
}

/* 聊天消息容器 */
.chat-message-container {
  display: flex;
  flex-direction: column;
}

/* 聊天头像样式 */
.chat-avatar {
  width: 40px; /* 调整头像的宽度 */
  height: 40px; /* 调整头像的高度 */
  border-radius: 50%;
  margin-right: 10px;
}

.chat-avatar-edge {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.chat-text {
  font-size: 16px;
}

.chat-name {
  font-weight: bold;
  margin-right: 10px;
}

.chat-message {
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
}

.chat-message-avatar-box {
  position: right; 
}

/* 聊天消息内容盒子 */
.chat-message-content {
  align-items: center;
  padding: 10px;
  background-color: #6aa6ec;
  border-radius: 5px;
  margin-left: 60px; /* 根据头像大小进行调整 */
}


/* 发送者消息样式 */
.message-sent .chat-message-content {
  justify-content: flex-end;
}

.message-sent {
  border: 0px solid #ccc;
  color: rgb(0, 0, 0);
  align-self: flex-end;
}

.message-sent::before {
  content: "";
  position: absolute;
  top: 10px;
  left: 100%;
  margin-left: 10px;
  border: medium solid transparent;
  border-left-color: #2279de;
  border-width: 15px 0 15px 15px;
  border-color: transparent #ffffff transparent transparent;
}

.message-received::before {
  content: "";
  position: absolute;
  top: -15px;
  width: 0;
  height: 0;
  border-style: solid;
}

.message-received .chat-message-content {
  background-color: #e9ecef;
}

.message-received {
  background-color: #ffffff;
  color: rgb(0, 0, 0);
  align-self: flex-start;
}

.message-input {
  width: 100%; 
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 25px;
  margin-top: 10px;
}
</style>