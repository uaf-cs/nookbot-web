// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  modules: [
    "@hebilicious/form-actions-nuxt",
    "@formkit/nuxt",
    "@nuxtjs/tailwindcss",
    "nuxt-headlessui",
    "nuxt-auth-utils",
  ],
  formkit: {
    // Experimental support for auto loading (see note):
    autoImport: true,
  },
});
