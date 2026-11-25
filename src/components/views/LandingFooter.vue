<template>
  <!-- Figma: "Rodapé-desktop" 5390:882 (a versão mobile 5390:929 segue o mesmo conteúdo empilhado) -->
  <footer id="rodape" class="bg-primary-600 text-light-50">
    <div
      class="mx-auto flex max-w-[1440px] flex-col gap-8 px-5 py-14 lg:px-12 lg:py-[72px] xl:px-24"
    >
      <div class="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
        <a href="#top" class="shrink-0 self-start" aria-label="CDA Girls — voltar ao topo">
          <img
            src="/assets/images/logo-white.png"
            alt="CDA Girls"
            width="200"
            height="64"
            class="h-12 w-auto lg:h-16"
          />
        </a>

        <div class="flex flex-col gap-10 sm:flex-row sm:flex-wrap sm:gap-16">
          <!-- Navegação -->
          <nav class="flex flex-col gap-4" aria-label="Rodapé">
            <h4 :class="headingCls">Navegação</h4>
            <a
              v-for="item in FOOTER_NAV_ITEMS"
              :key="item.href"
              :href="item.href"
              :class="linkCls"
            >
              {{ item.label }}
            </a>
          </nav>

          <!-- Contactos -->
          <div class="flex flex-col gap-4">
            <h4 :class="headingCls">Os nossos contactos</h4>
            <a :href="`mailto:${CONTACT_EMAIL}`" :class="[linkCls, 'flex items-center gap-2']">
              <img src="/assets/images/icons/mail.svg" alt="" width="24" height="24" class="size-5 lg:size-6" />
              {{ CONTACT_EMAIL }}
            </a>
            <a
              v-for="s in SOCIALS"
              :key="s.icon"
              :href="s.href"
              target="_blank"
              rel="noopener noreferrer"
              :class="[linkCls, 'flex items-center gap-2']"
            >
              <img :src="s.iconSrc" alt="" width="24" height="24" class="size-5 lg:size-6" />
              {{ s.label }}
            </a>
          </div>

          <!-- Juntar-se -->
          <div class="flex flex-col items-start gap-4 lg:w-[288px]">
            <h4 :class="[headingCls, 'lg:leading-[1.4]']">Faça parte da CDA Girls</h4>
            <a
              v-magnetic="0.2"
              :href="JOIN_HREF"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-shine inline-flex h-12 items-center justify-center rounded-[32px] border border-[#e5e5e5] bg-white px-6 text-sm leading-[1.6] font-semibold tracking-[0.2px] text-primary-500 transition-[background-color,translate,scale] duration-200 hover:-translate-y-0.5 hover:bg-secundary-50 active:scale-95 lg:h-14 lg:px-8 lg:text-base lg:leading-[1.5] lg:tracking-[0.3px]"
            >
              Juntar-se à comunidade
            </a>
          </div>
        </div>
      </div>

      <hr class="border-0 border-t border-primary-400" />

      <div
        class="flex flex-col gap-2 text-sm leading-[1.6] tracking-[0.2px] sm:flex-row sm:justify-between lg:text-base lg:tracking-[0.3px]"
      >
        <p>© 2026 CDA Girls – Woman Tech. Todos os direitos reservados.</p>
        <p>
          Desenvolvido por
          <a
            :href="LINKEDIN_URL"
            target="_blank"
            rel="noopener noreferrer"
            class="underline-offset-2 hover:underline"
          >CDA Girls</a>
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import {
  FOOTER_NAV_ITEMS,
  CONTACT_EMAIL,
  SOCIALS,
  LINKEDIN_URL,
  JOIN_HREF,
} from "~/data/landing";

const headingCls =
  "text-lg leading-[1.2] font-medium lg:text-2xl";
const linkCls =
  "self-start text-sm leading-[1.25] text-light-50 transition-[color,translate] duration-300 ease-soft hover:translate-x-1 hover:text-secundary-300 lg:text-base";
</script>
