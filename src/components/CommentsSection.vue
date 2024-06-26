<script setup>
import {ref, defineProps} from 'vue'
import {fetchComments} from "@/scripts/comments/fetchComments.js";
import CommentComponent from "@/components/CommentComponent.vue";
import {checkAuthentication} from "@/scripts/auth/checkAuthentication.js";
import {newComment} from "@/scripts/comments/newComment.js";

const props = defineProps(['product'])
const product = ref(props.product)
const comments = ref([])
const commentText = ref('')
const isAuthenticated = ref(false)

fetchComments(product.value.id).then(data => {
  comments.value = data
}).catch(error => {
  console.error(error)
})

function sendComment(){
  newComment(product.value.id, commentText.value).then(data => {
    comments.value.unshift(data)
    commentText.value = ''
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
  <div class="new-comment" v-if="isAuthenticated">
    <textarea placeholder="Write your comment here" v-model="commentText"></textarea>
    <button @click.prevent="sendComment">Send</button>
  </div>
  <div class="comments" v-if="comments.length > 0">
    <div class="comment" v-for="comment in comments" :key="comment.id">
      <CommentComponent :comment="comment" />
    </div>
  </div>
</template>

<style scoped>
.new-comment {
  margin: 20px 0;
  width: 50%;
}

.new-comment textarea {
  width: 100%;
  height: 100px;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.new-comment button {
  padding: 10px 20px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.new-comment button:hover {
  background-color: #e0e0f0;
}

.comments {
  margin-top: 20px;
}
</style>