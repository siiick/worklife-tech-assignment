// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      apiBaseUrl: 'https://www.rijksmuseum.nl/api/en/collection',
      apiKey: 'C5NmuLLq',
    },
  },
  modules: [
    '@nuxt/eslint'
  ],
  ssr: false,
  eslint: {
    config: {
      stylistic: true
    }
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },
  },
  app: {
    head: {
      title: 'worklife tech assignment',
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1,  maximum-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content:
            'worklife tech assignment',
        },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },
})
