import CallbackModal from '~/components/common/CallbackModal.vue'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('CallbackModal', CallbackModal)
}) 