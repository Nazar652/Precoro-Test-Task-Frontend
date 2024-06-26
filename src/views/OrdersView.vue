<script setup>
import {ref} from 'vue'
import {fetchOrders} from "@/scripts/orders/fetchOrders.js";
import {checkAuthentication} from "@/scripts/auth/checkAuthentication.js";
import {useRouter} from "vue-router";

const router = useRouter()

checkAuthentication().then(data => {
  if (!data.isAuthenticated) {
    router.push('/login')
  }
}).catch(error => {
  console.error(error)
})
const orders = ref([])

fetchOrders().then(data => {
  orders.value = data
}).catch(error => {
  console.error(error)
})

</script>

<template>
  <h1>
    Orders
  </h1>
  <div class="orders" v-if="orders.length > 0">
    <div class="order" v-for="order in orders">
      <div class="order-info">
        <div class="order-id">
          Order ID: {{ order.id }}
        </div>
        <div class="order-time">
          Time: {{ order.created_at.replace('T', ' ').slice(0, -8) }}
        </div>
        <div class="total-price">
          Total price: {{ order.total_price }}₴
        </div>
      </div>
      <div class="order-products">
        <div class="order-product" v-for="product in order.products">
          <router-link :to="{ name: 'product', params: { id: product.product.id } }">
            <div class="product-image">
              <img :src="product.product.image" alt="product.product.name" class="product-img">
            </div>
            <div class="product-name">
              {{ product.product.name }}
            </div>
          </router-link>
          <div class="product-quantity">
            Quantity: {{ product.quantity }}
          </div>
          <div class="product-price">
            Price: {{ product.price }}₴
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.orders {
  width: 80%;
  margin: 0 auto;
}

h1 {
  text-align: center;
  margin: 20px 0;
}

.order {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 20px;
  display: flex;
}

.order-info {
  margin-bottom: 10px;
}

.order-id,
.order-time,
.total-price {
  font-size: 16px;
  margin-bottom: 5px;
}

.order-products {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.order-product {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
}

.product-image {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}

.product-img {
  height: 100%;
}

.product-name {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
}

.product-quantity,
.product-price {
  font-size: 16px;
  margin-bottom: 5px;
}

a {
  text-decoration: none;
  color: black;
}

a:hover {
  color: blue;
}
</style>