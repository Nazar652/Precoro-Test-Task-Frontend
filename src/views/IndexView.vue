<script setup>
import {fetchCategories} from "@/scripts/categories/fetchCategories.js";
import {ref} from "vue";
import CategoryProducts from "@/components/CategoryProducts.vue";

const categories = ref([])
fetchCategories().then(data => {
  categories.value = data
}).catch(error => {
  console.error(error)
})

</script>

<template>
  <main>
    <h1>Main page</h1>
    <div class="categories">
      <div v-for="category in categories" :key="category.id" class="category">
        <CategoryProducts :category="category"/>
      </div>
    </div>
  </main>
</template>

<style scoped>
.category {
  padding: 50px;
  border: 1px solid #f0f0f0;
  border-radius: 30px;
}

h1 {
  margin: 50px 0;
  text-align: center;
}

.categories {
  display: flex;
  flex-direction: column;
  gap: 50px
}
</style>