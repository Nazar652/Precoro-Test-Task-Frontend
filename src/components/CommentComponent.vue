<script setup>
import {ref, defineProps} from 'vue'
import {fetchReplies} from "@/scripts/replies/fetchReplies.js";
import ReplyComponent from "@/components/ReplyComponent.vue";
import {checkAuthentication} from "@/scripts/auth/checkAuthentication.js";
import {newReply} from "@/scripts/replies/newReply.js";

const props = defineProps(['comment'])
const comment = ref(props.comment)
const replies = ref([])
const replyText = ref('')
const isAuthenticated = ref(false)

fetchReplies(comment.value.id).then(data => {
  replies.value = data
}).catch(error => {
  console.error(error)
})

function sendReply(){
  newReply(comment.value.id, replyText.value).then(data => {
    replies.value.unshift(data)
    replyText.value = ''
  }).catch(error => {
    console.error(error)
  })
}

checkAuthentication().then(data => {
  isAuthenticated.value = data.isAuthenticated
}).catch(error => {
  console.error(error)
})
</script>

<template>
  <div class="comment-body">
    <div class="comment-info">
      <div class="comment-author">
        {{ comment.user.username }}
      </div>
      <div class="comment-time">
        {{ comment.created_at.replace('T', ' ').slice(0, -8) }}
      </div>
    </div>
    <div class="comment-text">
      {{ comment.text }}
    </div>
    <div class="new-reply" v-if="isAuthenticated">
      <textarea placeholder="Write your reply here" v-model="replyText"></textarea>
      <button @click.prevent="sendReply">Send</button>
    </div>
    <div class="replies" v-if="replies.length > 0">
      <div class="reply" v-for="reply in replies" :key="reply.id">
        <ReplyComponent :reply="reply" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.comment-body {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
}

.comment-author {
  font-weight: bold;
}

.comment-time {
  font-size: 12px;
  color: #666;
}

.comment-text {
  margin-top: 10px;
}

.replies {
  margin-top: 10px;
  padding-left: 20px;
}

.new-reply {
  margin-top: 10px;
}

.new-reply textarea {
  width: 100%;
  height: 50px;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.new-reply button {
  padding: 10px 20px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.new-reply button:hover {
  background-color: #e0e0f0;
}
</style>