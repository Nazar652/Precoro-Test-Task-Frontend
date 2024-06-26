<script setup>
import {ref} from 'vue'
import {fetchWishList} from "@/scripts/wishlist/fetchWishList.js";
import {useRouter} from "vue-router";
import {checkAuthentication} from "@/scripts/auth/checkAuthentication.js";
import {removeFromWishList} from "@/scripts/wishlist/removeFromWishList.js";

const router = useRouter()

checkAuthentication().then(data => {
  if (!data.isAuthenticated) {
    router.push('/login')
  }
}).catch(error => {
  console.error(error)
})

const wishList = ref([])

fetchWishList().then(data => {
  wishList.value = data
}).catch(error => {
  console.error(error)
})

function removeFromWishlist(index, item) {
  removeFromWishList(item.id).then(() => {
    wishList.value.splice(index, 1)
  }).catch(error => {
    console.error(error)
  })
}
</script>

<template>
  <main>
    <h1>Wish List</h1>
    <div class="products" v-if="wishList.length > 0">
      <div v-for="(product, index) in wishList" :key="product.id" class="product">
        <router-link :to="'/product/' + product.product.id">
          <div class="product-image">
            <img :src="product.product.image" alt="product.name" class="product-img">
          </div>
        </router-link>
        <div class="product-info">
          <router-link :to="'/product/' + product.product.id">
            <div class="product-name">
              {{ product.product.name }}
            </div>
          </router-link>
          <div class="remove-button" @click="removeFromWishlist(index, product)">
            Remove from wishlist
          </div>
          <div class="price-buy">
            <div class="product-price">
              {{ product.product.price }}₴
            </div>
            <router-link :to="{ name: 'product', params: { id: product.product.id } }">
            <div class="buy-button">
                Buy
            </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="no-products" v-else>
      No products in wishlist
    </div>
  </main>
</template>

<style scoped>
main {
  width: 80%;
  margin: auto;
  padding: 20px 0;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.products {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.product {
  border: 1px solid #f0f0f0;
  border-radius: 5px;
  overflow: hidden;
}

.product-image {
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.product-img {
  height: 100%;
}

.product-info {
  padding: 10px;
}

.product-name {
  margin-bottom: 10px;
}

.price-buy {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product-price {
  color: #333;
  font-size: 18px;
  font-weight: bold;
}

.buy-button {
  padding: 10px 20px;
  background-color: #f0f0f0;
  cursor: pointer;
  transition: background-color 0.3s;
  border-radius: 5px;
}

.buy-button:hover {
  background-color: #e0e0e0;
}

a {
  text-decoration: none;
  color: black;
}

a:hover {
  color: blue;
}

.remove-button {
  padding: 5px 10px;
  background-color: #f0f0f0;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  width: fit-content;
  margin: 10px 0;
}

.no-products {
  text-align: center;
  margin-top: 20px;
  font-size: 24px;
  color: #666;
}
</style>