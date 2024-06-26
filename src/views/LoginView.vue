<script setup>
import { ref } from 'vue'
import { login } from "@/scripts/auth/login.js";
import { useRouter } from "vue-router";
import {checkAuthentication} from "@/scripts/auth/checkAuthentication.js";

const router = useRouter()
const username = ref('')
const password = ref('')

checkAuthentication().then(data => {
  if (data.isAuthenticated) {
    router.push('/')
  }
}).catch(error => {
  console.error(error)
})

const loginClick = async () => {
  const user = {
    username: username.value,
    password: password.value
  }

  try {
    await login(user)
    router.push('/').then(
      () => {
        location.reload()
      }
    )
  } catch (error) {
    if (error.response.status === 400) {
      alert('Invalid username or password')
    } else {
      console.error(error)
    }
  }
}
</script>

<template>
  <main>
    <h1>Log in</h1>
    <form @submit.prevent="loginClick">
      <input type="text" placeholder="Username" required v-model="username">
      <input type="password" placeholder="Password" required v-model="password">
      <button>Log In</button>
    </form>
  </main>
</template>

<style scoped>
main {
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1 {
  text-align: center;
  margin: 20px 0;
}

form {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
}

input {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #f0f0f0;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #e0e0e0;
}
</style>