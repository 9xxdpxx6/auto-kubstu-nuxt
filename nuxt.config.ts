// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
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
    '~/plugins/callback-modal.client.ts'
  ],
  modules: [
    '@vueuse/nuxt',
    '@nuxt/fonts',
    // '@nuxt/image',
    // '@pinia/nuxt',
    'nuxt-typed-router'
  ],
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
      apiBase: 'http://localhost:8000/api'
    }
  },
  build: {
    transpile: ['bootstrap']
  }
})
