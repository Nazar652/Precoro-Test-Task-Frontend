<script setup>
import { RouterView } from 'vue-router'
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
</script>

<template>
  <Suspense>
    <HeaderComponent />
  </Suspense>
  <div class="main-content">
    <div class="wrapper">
      <Suspense>
        <RouterView />
      </Suspense>
    </div>
  </div>
  <FooterComponent />
</template>

<style scoped>
  .wrapper {
    max-width: 1200px;
    margin: 0 auto;
  }

  .main-content {
    padding-bottom: 50px;
  }
</style>
