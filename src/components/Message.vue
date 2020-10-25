<template>
  <div class="message card">
    <h1>{{ message.subject }}</h1>
    <p>{{ message.from }} - {{ message.recived | formatDate }}</p>
    <hr/>
    <span v-if="message.htmlBody.length" v-html="message.htmlBody"></span>
    <span v-if="!message.htmlBody.length">{{ message.body }}</span>
  </div>
</template>

<script>
export default {
  props: ['message'],
};
</script>

<style scoped>
.message {
  /* background-color: purple; */
  /* width: 100%; */
  min-height: 100px;
  padding: 20px;
  margin: 20px;
}

.card {
  /* Add shadows to create the "card" effect */
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
}

/* On mouse-over, add a deeper shadow */
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}
</style>
