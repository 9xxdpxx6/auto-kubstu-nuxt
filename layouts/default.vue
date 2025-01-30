<template>
  <div class="d-flex flex-column min-vh-100">
    <CommonHeader />
    
    <main class="flex-grow-1 mt-5 pt-4">
      <slot />
    </main>
    
    <CommonFooter />
  </div>
</template>

<script setup>
import CommonHeader from '~/components/common/Header.vue'
import CommonFooter from '~/components/common/Footer.vue'
</script>

<style lang="scss" scoped>
.min-vh-100 {
  min-height: 100vh;
}

main {
  background-color: var(--bs-body-bg);
}
</style>