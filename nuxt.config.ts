import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  srcDir: "src",
  dir: {
    pages: "views",
  },
  components: {
    dirs: [
      {
        path: "~/components/shared",
        pathPrefix: false,
        global: true,
        prefix: "C",
      },
    ],
  },
  css: ["@/assets/css/main.css"],
  runtimeConfig: {
    // só no servidor — definir via NUXT_MAIL_USER / NUXT_MAIL_PASS no .env
    mailUser: "",
    mailPass: "",
    // destino do "Fale conosco": NUXT_CONTACT_TO, ou NUXT_MAIL_USER se vazio
    contactTo: "",
    // link privado do grupo (NUXT_JOIN_URL) — só no servidor
    joinUrl: "",
  },
  modules: ["@nuxt/devtools", "@nuxt/ui"],
  // site só em modo claro: não segue o modo escuro do sistema
  ui: {
    colorMode: false,
  },
});
