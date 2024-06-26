<script setup>
import {ref, watch} from 'vue'
import { checkAuthentication } from "@/scripts/auth/checkAuthentication.js";
import LogoutButton from "@/components/LogoutButton.vue";
import { useRouter } from "vue-router";
import eventBus from "@/scripts/global/eventBus.js";
import {fetchCart} from "@/scripts/cart/fetchCart.js";

const router = useRouter()

const isAuthenticated = ref(false)
const userData = ref({})
const cartAmount = ref(0)


async function checkAuth() {
  try {
    userData.value = await checkAuthentication()
    isAuthenticated.value = userData.value.isAuthenticated
  } catch (error) {
    console.error(error)
  }
}
await checkAuth()

function logout() {
  isAuthenticated.value = false
  router.push('/')
}

watch(router.currentRoute, async () => {
  await checkAuth()
})
function updateCartAmount() {
  fetchCart().then(data => {
    cartAmount.value = data.reduce((acc, item) => {
      return acc + item.quantity
    }, 0)
  }).catch(error => {
    console.error(error)
  })
}

if (isAuthenticated.value) {
  updateCartAmount()
}

watch(() => eventBus.eventName,  (newValue) => {
  updateCartAmount()
})
</script>

<template>
<header>
  <div class="left-header">
    <div class="shop-name">
      Shop
    </div>
    <router-link to="/">Home</router-link>
  </div>
  <div class="right-header">
    <router-link v-if="!isAuthenticated" to="/sign-up">Sign Up</router-link>
    <router-link v-if="!isAuthenticated" to="/login">Log In</router-link>
    <p v-if="isAuthenticated">User: {{ userData.username }}</p>
    <router-link v-if="isAuthenticated" to="/wishlist">Wish List</router-link>
    <router-link v-if="isAuthenticated" to="/cart">Cart ({{cartAmount}})</router-link>
    <router-link v-if="isAuthenticated" to="/orders">Orders</router-link>
    <LogoutButton @logout="logout()" v-if="isAuthenticated" />
  </div>
</header>
</template>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  padding: 20px 40px;
  background-color: #f0f0f0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 20px;
}

.left-header,
.right-header {
  display: flex;
  align-items: center;
  gap: 20px;
}

.shop-name {
  font-weight: bold;
}

a {
  text-decoration: none;
  color: #333;
  transition: color 0.3s;
}

a:hover {
  color: #666;
}

p {
  margin: 0;
}
</style>