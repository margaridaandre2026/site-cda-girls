<template>
  <!-- Figma: "Desktop - 18" (web 5027:323 · mobile 5365:253) -->
  <section
    id="top"
    class="relative overflow-hidden bg-hero-gradient pt-[112px] pb-14 lg:pt-[144px]"
  >
    <!-- Fundo: grelha + formas decorativas -->
    <img
      src="/assets/images/section-hero/grid.png"
      alt=""
      aria-hidden="true"
      class="pointer-events-none absolute inset-x-0 -bottom-6 h-[707px] w-full object-cover lg:bottom-[11px] lg:h-[659px]"
    />
    <div v-parallax="-0.015" class="pointer-events-none absolute inset-0" aria-hidden="true">
      <img
        src="/assets/images/section-hero/shapes-mobile.svg"
        alt=""
        width="1610.61"
        height="659.001"
        class="drift absolute top-0 left-[-170.61px] max-w-none lg:hidden"
      />
      <div class="absolute top-0 left-1/2 hidden -translate-x-1/2 lg:block">
        <img
          src="/assets/images/section-hero/shapes-desktop.svg"
          alt=""
          width="1440"
          height="659"
          class="drift max-w-none"
        />
      </div>
    </div>

    <div
      class="relative mx-auto flex max-w-[1440px] flex-col gap-8 px-5 lg:flex-row lg:items-center lg:gap-12 lg:px-12 xl:px-24"
    >
      <!-- Texto -->
      <div class="flex flex-1 flex-col items-start gap-4 lg:gap-8">
        <div class="flex flex-col gap-2 text-ink lg:gap-4">
          <h1
            class="text-[32px] leading-[1.4] font-semibold lg:text-5xl lg:leading-[1.2] xl:text-[64px]"
            aria-label="Empoderando mulheres para liderar tecnologia."
          >
            <template v-for="(w, i) in headline" :key="i">
              <span class="word-mask" aria-hidden="true"
                ><span class="word" :style="{ '--i': i }"
                  ><span :class="w.accent ? 'text-shimmer' : ''">{{ w.text }}</span></span></span
              >{{ i < headline.length - 1 ? " " : "" }}<span
                v-if="i === headline.length - 1"
                class="caret"
                aria-hidden="true"
              />
            </template>
          </h1>
          <p
            class="rise-in text-base leading-[1.6] tracking-[0.3px] lg:text-2xl lg:leading-[1.4] lg:tracking-normal"
            style="--d: 650ms"
          >
            Na CDA Girls, ajudamos mulheres a desenvolver habilidades e
            oportunidades na tecnologia.
          </p>
        </div>
        <div class="rise-in" style="--d: 800ms">
          <a
            v-magnetic
            :href="JOIN_HREF"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-shine group inline-flex h-12 items-center justify-center gap-2 rounded-[32px] bg-brand-gradient px-6 text-sm leading-[1.6] font-semibold tracking-[0.2px] text-light-50 transition-[filter,box-shadow,translate,scale] duration-200 hover:-translate-y-0.5 hover:shadow-card-sm hover:brightness-115 focus-visible:ring-4 focus-visible:ring-secundary-200 focus-visible:outline-none active:scale-95 lg:h-14 lg:px-8 lg:text-base lg:leading-[1.5] lg:tracking-[0.3px]"
          >
            Juntar-se a comunidade
            <UIcon
              name="i-lucide-arrow-right"
              class="size-0 opacity-0 transition-[width,height,opacity,translate] duration-300 ease-soft group-hover:size-4 group-hover:translate-x-0.5 group-hover:opacity-100"
            />
          </a>
        </div>
      </div>

      <!-- Colagem de imagens + cartões -->
      <div
        class="flex h-[298px] w-full gap-2 lg:h-[470px] lg:w-[520px] lg:shrink-0 lg:gap-4 xl:w-[600px]"
      >
        <!-- Coluna 1: foto + projetos -->
        <div class="flex flex-1 flex-col gap-2 lg:w-[252px] lg:flex-none lg:gap-4 xl:w-[296px]">
          <div
            v-reveal="300"
            v-tilt
            class="group h-[204px] overflow-hidden rounded-[32px] lg:h-auto lg:flex-1"
          >
            <img
              src="/assets/images/section-hero/woman-laptop.jpg"
              alt="Mulher sorridente a usar um portátil"
              class="size-full object-cover transition-transform duration-700 ease-soft group-hover:scale-105"
            />
          </div>
          <div
            v-reveal="600"
            v-tilt
            class="flex flex-1 items-center justify-center rounded-[32px] bg-[#f5dbfb] px-4 py-6 text-center lg:flex-none lg:p-6"
          >
            <p
              class="max-w-[149px] text-base leading-[1.2] font-medium text-ink lg:max-w-[264px] lg:text-2xl"
            >
              <span class="font-semibold text-secundary-500">+20 Projectos</span>
              que Geraram Impacto
            </p>
          </div>
        </div>

        <!-- Coluna 2: comunidade + foto de grupo -->
        <div class="flex flex-1 flex-col gap-2 lg:gap-4">
          <div
            v-reveal="400"
            v-tilt
            class="flex flex-1 flex-col items-center justify-center gap-2 rounded-[32px] border border-secundary-100 bg-[#f5dbfb] p-4 text-center lg:gap-4 lg:p-6"
          >
            <div class="flex items-start" aria-hidden="true">
              <img
                v-for="(src, i) in COMMUNITY_AVATARS"
                :key="src"
                :src="src"
                alt=""
                width="44"
                height="44"
                class="pop-in size-8 rounded-full ring-2 ring-[#f5dbfb] transition-transform duration-300 ease-soft hover:z-10 hover:-translate-y-1 hover:scale-110 lg:size-11"
                :class="i < COMMUNITY_AVATARS.length - 1 ? '-mr-4' : ''"
                :style="{ '--i': i }"
              />
            </div>
            <p
              class="text-base leading-[1.25] font-medium text-ink lg:max-w-[270px] lg:text-2xl"
            >
              <span class="font-semibold text-secundary-500">+300 mulheres</span>
              estão na comunidade
            </p>
          </div>
          <div
            v-reveal="500"
            v-tilt
            class="group flex-1 overflow-hidden rounded-[32px]"
          >
            <img
              src="/assets/images/section-hero/group.jpg"
              alt="Membros da comunidade CDA Girls"
              class="size-full object-cover transition-transform duration-700 ease-soft group-hover:scale-105"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { COMMUNITY_AVATARS, JOIN_HREF } from "~/data/landing";

// título do hero, palavra a palavra (as em destaque levam o gradiente animado)
const headline = [
  { text: "Empoderando" },
  { text: "mulheres", accent: true },
  { text: "para" },
  { text: "liderar" },
  { text: "tecnologia.", accent: true },
];
</script>
