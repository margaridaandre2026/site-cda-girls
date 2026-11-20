<template>
  <!-- Figma: web 5086:126 · mobile 5365:277 -->
  <section id="parceiros" class="bg-white">
    <div
      class="mx-auto flex max-w-[1440px] flex-col gap-6 py-12 lg:h-[140px] lg:flex-row lg:items-center lg:gap-[21px] lg:py-0 lg:pl-12 xl:pl-24"
    >
      <p
        class="px-5 text-lg leading-[1.4] font-semibold text-ink lg:w-[256px] lg:shrink-0 lg:px-0 lg:text-2xl"
      >
        Nossos principais parceiros na jornada
      </p>

      <!-- Faixa de logos em loop, com desvanecimento nas pontas -->
      <div
        class="partners-mask group relative flex-1 overflow-hidden"
        aria-label="Parceiros"
        role="list"
      >
        <div
          class="flex w-max animate-marquee items-center group-hover:[animation-play-state:paused]"
        >
          <template v-for="copy in 2" :key="copy">
            <div
              v-for="p in PARTNERS"
              :key="`${copy}-${p.name}`"
              role="listitem"
              :aria-hidden="copy === 2 ? 'true' : undefined"
              class="flex h-8 shrink-0 items-center px-5"
            >
              <img
                :src="p.logo"
                :alt="copy === 1 ? p.name : ''"
                :width="p.width"
                :height="p.height"
                loading="lazy"
                class="opacity-80 transition-opacity duration-300 hover:opacity-100"
              />
            </div>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { PARTNERS } from "~/data/landing";
</script>

<style scoped>
/* Figma "Rectangle 645": branco → transparente → branco por cima dos logos */
.partners-mask {
  mask-image: linear-gradient(90deg, transparent 0%, #000 25%, #000 75%, transparent 100%);
}
</style>
