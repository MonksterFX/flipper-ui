<template>
  <div class="grid">
    <div class="menu">
      <h3 class="text-center">This is the alpha version for flipper-ui</h3>
      <div class="flipper-bar">
        <div class="logo"></div>
        <div class="flipper-last-flip">{{ lastEmailCreated }}</div>
        <button class="button" v-on:click="createInbox">
          FLIP MAIL
        </button>
      </div>
      <p class="text-center">
        More Information at:
        <a href="https://github.com/MonksterFX/flipper-ui">GITHUB</a>
      </p>
      <p class="small-text text-center">
      Icon made by <a href="https://freeicons.io/profile/722">Fasil</a> from
      www.freeicons.io
      </p>
    </div>

    <div class="left">
      <Inbox
        v-for="inbox in inboxes"
        v-bind:inbox="inbox"
        v-bind:key="inbox.id"
        v-on:activate="activateInbox"
      />
    </div>
    <div class="main">
      <p class="text-center">inbox created</p>
      <Message
        v-for="message in messages"
        v-bind:message="message"
        v-bind:key="message.recived"
      />
    </div>
  </div>
  
</template>

<script>
import Inbox from './components/Inbox';
import Message from './components/Message';
import axios from 'axios';

const API = process.env.VUE_APP_API_URL || 'http://localhost:3000'

// important for sessions!
// https://medium.com/zero-equals-false/using-cors-in-express-cac7e29b005b
const transport = axios.create({
  withCredentials: true,
});

export default {
  name: 'App',
  components: { Inbox, Message },
  data: function() {
    return {
      inboxes: [],
      messages: [],
      activeInbox: '',
      lastEmailCreated: 'create new email',
    };
  },
  mounted() {
    transport
      .get(API + '/mails')
      .then((res) => {
        if (res.data.length > 0) {
          this.inboxes = res.data.map((v) => {
            return { mail: v };
          });
          this.activateInbox(this.inboxes[0].mail)
        }
      })
      .catch((err) => {
        console.error(err);
      });

    setInterval(this.pullMessages, 3000)
  },
  methods: {
    pullMessages(){
      transport
        .get(API + `/mail/${this.activeInbox}`)
        .then((res) => {
          this.messages = res.data;
          console.log('pullMessages')
        })
        .catch((err) => {
          console.error(err);
        });
    },
    activateInbox(mail) {
      // load data for messages
      this.messages = [];
      transport
        .get(API + `/mail/${mail}`)
        .then((res) => {
          this.messages = res.data;
          this.activeInbox = mail;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    createInbox() {
      transport
        .post(API + `/mail`)
        .then((res) => {
          this.lastEmailCreated = res.data;
          this.inboxes.push({ mail: res.data });
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
</script>

<style>
html {
  height: 100%;
}

body {
  height: 100%;
  margin: 0px;
  font-family: sans-serif;
}

.grid {
  height: 100%;
  display: grid;
  grid-template-columns: 350px 1fr;
  grid-template-rows: 200px 1fr;
  grid-template-areas:
    'menu menu'
    'left main';
}

.left {
  grid-area: left;
  /* background-color: blue; */
}

.logo{
  background-image: url("assets/logo.svg");
  background-size: contain;
  height: 50px;
  width: 50px;
  margin-right: 20px;
  transform: rotate(-15deg);
}

button {
  justify-self: center;

  background-color: rgb(211, 255, 53);
  border: none;
  height: 50px;
  padding-left: 20px;
  padding-right: 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}

.main {
  grid-area: main;
  background-color: white;
  overflow-y: scroll;
}

.menu {
  grid-area: menu;
  background-color: grey;
  display: grid;
}

.text-center {
  text-align: center;
}

.flipper-last-flip {
  display: grid;
  justify-content: center;
  align-content: center;

  background-color: white;

  height: 50px;
  padding-left: 20px;
  padding-right: 20px;
}

.flipper-bar {
  display: flex;
  align-self: center;
  justify-self: center;
}

.small-text{
  font-size: 10px;
}
</style>
