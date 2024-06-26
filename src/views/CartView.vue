<script setup>
import {ref} from 'vue'
import {fetchCart} from "@/scripts/cart/fetchCart.js";
import {updateCart} from "@/scripts/cart/updateCart.js";
import {deleteFromCart} from "@/scripts/cart/deleteFromCart.js";
import {makeOrder} from "@/scripts/orders/makeOrder.js";
import {useRouter} from "vue-router";
import {checkAuthentication} from "@/scripts/auth/checkAuthentication.js";

const router = useRouter()

const cart = ref([])
const loaded = ref(false)
const totalPrice = ref(0)

checkAuthentication().then(data => {
  if (!data.isAuthenticated) {
    router.push('/login')
  }
}).catch(error => {
  console.error(error)
})
function calculateTotalPrice() {
  totalPrice.value = cart.value.reduce((acc, item) => {
    return acc + item.product.price * item.quantity
  }, 0)
}

fetchCart().then(data => {
  cart.value = data
  loaded.value = true
  calculateTotalPrice()
}).catch(error => {
  console.error(error)
})

function updateQuantity(index, item, quantity) {
  cart.value[index].quantity = quantity
  calculateTotalPrice()
  updateCart(item.id, {
    quantity: quantity
  })
}

function removeItem(index, item) {
  deleteFromCart(item.id).then(() => {
    cart.value.splice(index, 1)
    calculateTotalPrice()
  }).catch(error => {
    console.error(error)
  })
}

function buyCart(){
  makeOrder().then(() => {
    router.push('/orders')
  }).catch(error => {
    console.error(error)
  })
}
</script>

<template>
  <div class="cart" v-if="loaded">
    <h1>Cart</h1>
    <div class="cart-items" v-if="cart.length > 0">
      <div v-for="(item, index) in cart" :key="item.id" class="cart-item">
        <router-link :to="{ name: 'product', params: { id: item.product.id } }">
          <div class="cart-item-image">
            <img :src="item.product.image" alt="item.name" class="cart-item-img">
          </div>
        </router-link>
        <div class="cart-item-info">
          <router-link :to="{ name: 'product', params: { id: item.product.id } }">
            <div class="cart-item-name">
              {{ item.product.name }}
            </div>
          </router-link>
          <div class="cart-item-price">
            {{ item.product.price }}₴
          </div>
          <div class="cart-item-quantity">
            Quantity:
            <input type="number" v-model="item.quantity" min="1"
                   @change="updateQuantity(index, item, $event.target.value)">
          </div>
          <div class="total-price">
            Total: {{ item.product.price * item.quantity }}₴
          </div>
          <div class="remove-button" @click="removeItem(index, item)">
            Remove
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Your cart is empty</p>
    </div>
    <div class="buy-button" v-if="cart.length > 0" @click="buyCart">
      Buy for {{ totalPrice }}₴
    </div>
  </div>
</template>

<style scoped>
.cart {
  margin: 0 auto;
}

.cart h1 {
  text-align: center;
  margin: 20px 0;
}

.cart-items {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.cart-item {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  height: 500px;
}

.cart-item-image {
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.cart-item-img {
  height: 100%;
}

.cart-item-info {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
}

.cart-item-name {
  font-size: 18px;
  font-weight: bold;
}

.cart-item-price {
  color: #333;
  margin-top: 5px;
}

.cart-item-quantity {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: auto;
}

.cart-item-quantity input {
  width: 60px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.total-price {
  margin-top: 10px;
}

.remove-button {
  margin-top: 10px;
  padding: 5px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  transition: background-color 0.3s;
}

.remove-button:hover {
  background-color: #e0e0e0;
}

.buy-button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  font-size: 16px;
  transition: background-color 0.3s;
}

.buy-button:hover {
  background-color: #e0e0e0;
}

a {
  text-decoration: none;
  color: #333;
}

a:hover {
  color: blue;
}
</style>