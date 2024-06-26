<script setup>
import {ref, defineProps} from 'vue'
import {checkWishList} from "@/scripts/wishlist/checkWishList.js";
import {addToWishList} from "@/scripts/wishlist/addToWishList.js";
import {removeFromWishList} from "@/scripts/wishlist/removeFromWishList.js";
import {checkAuthentication} from "@/scripts/auth/checkAuthentication.js";


const props = defineProps(['product', 'small'])
const inWishList = ref(false)
const wishId = ref(0)
const product = ref(props.product)
const small = ref(props.small)
const isAuthenticated = ref(false)

checkAuthentication().then(data => {
  isAuthenticated.value = data.isAuthenticated
  if (isAuthenticated.value) {
    checkWishList(product.value.id).then(data => {
      inWishList.value = Boolean(data)
      wishId.value = data
    }).catch(error => {
      console.error(error)
    })
  }
}).catch(error => {
  console.error(error)
})


function addToWishlist() {
  addToWishList(product.value.id).then(data => {
    inWishList.value = true
    wishId.value = data.id
  }).catch(error => {
    console.error(error)
  })
}

function removeFromWishlist() {
  removeFromWishList(wishId.value).then(() => {
    inWishList.value = false
    wishId.value = 0
  }).catch(error => {
    console.error(error)
  })
}
</script>

<template>
  <div class="wish-button" :class="{ small: small}" v-if="isAuthenticated">
    <p v-if="inWishList" @click="removeFromWishlist">
      Remove from wishlist
    </p>
    <p v-else @click="addToWishlist">
      Add to wishlist
    </p>
  </div>
</template>

<style scoped>
.wish-button p {
  display: inline-block;
  padding: 10px 20px;
  margin: 0;
  border: none;
  border-radius: 5px;
  background-color: #f0f0f0;
  cursor: pointer;
  transition: background-color 0.3s;
  text-align: center;
}

.wish-button p:hover {
  background-color: #e0e0e0;
}

.wish-button.small p {
  display: inline-block;
  padding: 5px 10px;
  margin: 0;
  border: none;
  border-radius: 3px;
  background-color: #f0f0f0;
  cursor: pointer;
  transition: background-color 0.3s;
  text-align: center;
  font-size: 14px;
}

.wish-button.small p:hover {
  background-color: #e0e0e0;
}
</style>