<script setup>
import {ref, defineProps} from 'vue'
import {fetchProducts} from "@/scripts/products/fetchProducts.js";
import {newCart} from "@/scripts/cart/newCart.js";
import WishButton from "@/components/WishButton.vue";

const props = defineProps(['category'])
const category = ref(props.category)
const products = ref([])
const loaded = ref(false)


fetchProducts({
  category: category.value.id,
}).then(data => {
  products.value = data
  loaded.value = true
}).catch(error => {
  console.error(error)
})

function buy(product) {
  newCart({
    product_id: product.id,
    quantity: 1
  }).catch(error => {
    console.error(error)
  })
}

</script>

<template>
  <div class="category-header">
    <h2>{{ category.name }}</h2>
    <router-link :to="'/category/' + category.id" class="to-category">To category</router-link>
  </div>
  <div class="products" v-if="loaded">
    <div v-for="product in products.slice(-5)" :key="product.id">
      <div class="product">
        <router-link :to="'/product/' + product.id">
          <div class="product-image">
            <img :src="product.image" alt="product.name" class="product-img">
          </div>
        </router-link>
        <div class="product-info">
          <router-link :to="'/product/' + product.id">
            <div class="product-name">
              {{ product.name }}
            </div>
          </router-link>
          <WishButton :product="product" :small="true" v-if="product.id"></WishButton>
          <div class="price-buy">
            <div class="product-price">
              {{ product.price }}₴
            </div>
            <div class="buy-button" @click="buy(product)">
              Buy
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.products {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.product-image {
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.product-img {
  height: 100%;
}

.product-info {
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: space-between;
  flex-grow: 1;
}

.product {
  display: flex;
  gap: 20px;
  padding: 10px;
  border: 1px solid #f0f0f0;
  border-radius: 5px;
}

.price-buy {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

a {
  text-decoration: none;
  color: black;
}

.product a:hover {
  color: blue;
}

.buy-button {
  padding: 5px 10px;
  background-color: #f0f0f0;
  border-radius: 5px;
  cursor: pointer;
}

.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.to-category {
  padding: 5px 10px;
  background-color: #f0f0f0;
  border-radius: 5px;
  cursor: pointer;
}
</style>