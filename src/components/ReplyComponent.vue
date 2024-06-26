<script setup>
import {ref, defineProps} from 'vue'

const props = defineProps(['reply'])
const reply = ref(props.reply)
</script>

<template>
  <div class="reply-body">
    <div class="reply-info">
      <div class="reply-author">
        {{ reply.user.username }}
      </div>
      <div class="reply-time">
        {{ reply.created_at.replace('T', ' ').slice(0, -8) }}
      </div>
    </div>
    <div class="reply-text">
      {{ reply.text }}
    </div>
  </div>
</template>

<style scoped>
.reply-body {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 10px;
  margin-left: 20px;
}

.reply-author {
  font-weight: bold;
}

.reply-time {
  font-size: 12px;
  color: #666;
}

.reply-text {
  margin-top: 10px;
}
</style>