<script setup>
import {ref, defineProps} from 'vue'
import {fetchProducts} from "@/scripts/products/fetchProducts.js";
import {fetchSingleCategory} from "@/scripts/categories/fetchSingleCategory.js";
import {useRouter} from "vue-router";
import {newCart} from "@/scripts/cart/newCart.js";
import WishButton from "@/components/WishButton.vue";

const router = useRouter()

const props = defineProps(['id'])
const category = ref(props.id)
const products = ref([])
const loaded = ref(false)
const filters = ref({
  ordering: 'id',
  priceGt: '',
  priceLt: ''
})

fetchSingleCategory(category.value).then(data => {
  category.value = data
  fetchProducts({
    category: category.value.id,
  }).then(data => {
    products.value = data
    loaded.value = true
  }).catch(error => {
    console.error(error)
  })
}).catch(error => {
  console.error(error)
  router.push({path: '/not-found'})
})

function selectChange(event) {
  filters.value.ordering = event.target.value
  applyFilters()
}

function applyFilters() {
  fetchProducts({
    category: category.value.id,
    ordering: filters.value.ordering,
    price_gt: filters.value.priceGt,
    price_lt: filters.value.priceLt
  }).then(data => {
    products.value = data
  }).catch(error => {
    console.error(error)
  })
}

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
  <div class="category">
    <h1>{{ category.name }}</h1>
    <div class="description">
      {{ category.description }}
    </div>
    <div class="filters">
      <label for="ordering">Order by:</label>
      <select id="ordering" @input="selectChange">
        <option value="id">ID</option>
        <option value="price">Price Ascending</option>
        <option value="-price">Price Descending</option>
      </select>

      <label for="price-gt">Price Greater Than:</label>
      <input id="price-gt" type="number" v-model="filters.priceGt" @change="applyFilters">

      <label for="price-lt">Price Less Than:</label>
      <input id="price-lt" type="number" v-model="filters.priceLt" @change="applyFilters">
    </div>
    <div v-if="loaded">
      <div class="products" v-if="products.length">
        <div v-for="product in products" :key="product.id">
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
                  ${{ product.price }}
                </div>
                <div class="buy-button" @click="buy(product)">
                  Buy
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="no-matches" v-else>
        No matches found
      </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  text-align: center;
}

.description {
  text-align: center;
  margin: 20px 0;
}

.category {
  padding: 50px;
  margin-top: 50px;
}

.products {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
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

.filters {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.no-matches {
  text-align: center;
  font-weight: 600;
  font-size: 25px;
}

.product a:hover {
  color: blue;
}
</style>