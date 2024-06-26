<script setup>
import {ref} from 'vue'
import {signUp} from "@/scripts/auth/signUp.js";
import {useRouter} from "vue-router";

const router = useRouter()

const username = ref('')
const password = ref('')

const signUpClick = async () => {
  const newUser = {
    username: username.value,
    password: password.value
  }

  try {
    await signUp(newUser)
    await router.push('/login')
  } catch (error) {
    console.error(error)
    if (error.response.status === 400) {
      alert('User with this username already exists')
    }
  }
}
</script>

<template>
  <main>
    <h1>
      Sign Up
    </h1>
    <form @submit.prevent="signUpClick">
      <input type="text" placeholder="Username" v-model="username" required>
      <input type="password" placeholder="Password" v-model="password" required>
      <button>Sign Up</button>
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