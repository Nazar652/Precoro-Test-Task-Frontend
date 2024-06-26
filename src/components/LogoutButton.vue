<script setup>
import { logout } from "@/scripts/auth/logout.js"
import { defineEmits } from 'vue'

const emit = defineEmits(['logout'])

const logoutUser = async () => {
  await logout()
  emit('logout')
}
</script>

<template>
  <button @click="logoutUser">Logout</button>
</template>

<style scoped>
button {
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #cecece;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #afafaf;
}
</style>