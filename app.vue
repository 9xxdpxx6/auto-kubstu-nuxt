<!-- <template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template> -->

<template>
  <NuxtLayout>
    <NuxtErrorBoundary>
      <NuxtPage />
      <template #error="{ error }">
        <NuxtLayout name="error" :error="error" />
      </template>
    </NuxtErrorBoundary>
  </NuxtLayout>
</template>


<style>
* {
  font-family: 'Cygre', sans-serif;
}
</style>