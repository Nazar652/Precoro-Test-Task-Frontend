<script setup>
import {ref, defineProps} from 'vue'
import {fetchSingleProduct} from "@/scripts/products/fetchSingleProduct.js";
import {newCart} from "@/scripts/cart/newCart.js";
import WishButton from "@/components/WishButton.vue";
import CommentsSection from "@/components/CommentsSection.vue";

const props = defineProps(['id'])
const product = ref({})
const quantity = ref(1)

fetchSingleProduct(props.id).then(data => {
  product.value = data
}).catch(error => {
  console.error(error)
})

function buy() {
  newCart({
    product_id: product.value.id,
    quantity: quantity.value
  })
}
</script>

<template>
  <div class="to-category-outer">
    <router-link :to="{ name: 'category', params: { id: product.category } }" class="to-category">Back to category</router-link>
  </div>
  <div class="product-view">
    <div class="product-image">
      <img :src="product.image" alt="product.name" class="product-img">
    </div>
    <div class="product-info">
      <div class="product-name">
        {{ product.name }}
      </div>
      <div class="product-description">
        {{ product.description }}
      </div>
      <div class="product-price">
        {{ product.price }}₴
      </div>
      <WishButton :product="product" :small="false" v-if="product.id"></WishButton>
      <div class="product-quantity">
        <label for="quantity">Quantity:</label>
        <input id="quantity" type="number" v-model="quantity" min="1">
      </div>
      <div class="total-price">
        Total: {{ product.price * quantity }}₴
      </div>
      <div class="buy-button" @click="buy">
        Buy
      </div>
    </div>
  </div>
  <div class="comment-section">
    <CommentsSection :product="product" v-if="product.id"></CommentsSection>
  </div>
</template>

<style scoped>
.product-view {
  display: flex;
  gap: 20px;
  align-items: flex-start;
  margin-top: 50px;
}

.product-image {
  flex: 1;
  max-width: 300px;
}

.product-image img {
  width: 100%;
  border-radius: 5px;
}

.product-info {
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.product-name {
  font-size: 24px;
  font-weight: bold;
}

.product-description {
  font-size: 16px;
  color: #666;
}

.product-price {
  font-size: 20px;
  color: #333;
}

.product-quantity {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
}

.product-quantity input {
  width: 60px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.buy-button {
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

.to-category-outer {
  padding-top: 20px;
}

.to-category {
  color: blue;
  text-decoration: none;
}
.comment-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
}
</style>