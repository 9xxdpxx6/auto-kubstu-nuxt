// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  ssr: true,
  components: {
    dirs: [
      {
        path: '~/components',
        pathPrefix: false,
      },
    ],
  },
  plugins: [
    '~/plugins/callback-modal.client.ts',
    '~/plugins/yandex-metrika.client.ts',
  ],
  modules: [
    '@vueuse/nuxt',
    '@nuxt/fonts',
    // '@nuxt/image',
    // '@pinia/nuxt',
    'nuxt-typed-router',
    // 'yandex-metrika-module-nuxt3',
  ],
  // yandexMetrika: {
  //   id: '99609527',
  //   webvisor: true,
  //   consoleLog: true,
  //   clickmap: true,
  //   useCDN: false,
  //   trackLinks: true,
  //   accurateTrackBounce: true,
  // },
  fonts: {
    families: [
      {
        name: 'Cygre',
        provider: 'local',
        src: '/fonts/Cygre.ttf'
      },
    ]
  },
  css: [
    '@fortawesome/fontawesome-free/css/all.css',
    '~/assets/scss/_bootstrap.scss',
    '~/assets/scss/global.scss'
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "@/assets/scss/_vars" as *;
            @use "@/assets/scss/_mixins" as *;
          `
        }
      }
    }
  },
  runtimeConfig: {
    public: {
      // apiBase: 'http://localhost:8000/api'
      apiBase: 'https://auto-api.kubstu.ru/api'
    }
  },
  build: {
    transpile: ['bootstrap']
  }
})
