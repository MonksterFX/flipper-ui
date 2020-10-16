<template>
  <div class="inbox" v-on:click="activate()">
    <h4>{{ inbox.mail }}</h4>
    <p>{{ inbox.lastMessageSubject }}</p>
  </div>
</template>

<script>
export default {
  props: ['inbox'],
  name: 'Inbox',
  methods: {
    activate() {
      this.$emit('activate', this.inbox.mail);
    },
  },
};
</script>

<style scoped>
.inbox {
  background-color: rgb(211, 255, 53);
  border: 2px solid rgb(211, 255, 53);
  border-radius: 5px;
  /* width: 100%; */
  padding: 0px 20px;
  margin: 10px;
}
</style>
