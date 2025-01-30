<template>
  <div>
    <Slider />
    <Categories />
    <Discounts />
    <WhyChooseUs />
    <Advantages />
    <Blog />
  </div>
</template>

<script setup lang="ts">
import { usePageSeo } from '~/composables/useSeo'

const { homeSeo } = usePageSeo()
homeSeo()
</script>

<style lang="scss">
@import '@/assets/scss/pages/index.scss';
</style>