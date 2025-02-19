// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/image',
  ],
  ssr: true,
  devtools: { enabled: true },
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
  css: ['~/assets/css/main.scss'],
  runtimeConfig: {
    public: {
      apiBaseUrl: 'https://www.rijksmuseum.nl/api/en/collection',
      apiKey: 'C5NmuLLq',
    },
  },
  compatibilityDate: '2024-11-01',
  nitro: {
    prerender: {
      autoSubfolderIndex: false,
    },
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
  eslint: {
    config: {
      stylistic: true,
    },
  },
})
