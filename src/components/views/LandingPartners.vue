<template>
  <!-- Figma: web 5086:126 · mobile 5365:277 -->
  <section id="parceiros" class="bg-white">
    <div
      class="mx-auto flex max-w-[1440px] flex-col gap-6 py-12 lg:h-[140px] lg:flex-row lg:items-center lg:gap-[21px] lg:py-0 lg:pl-12 xl:pl-24"
    >
      <p
        class="px-5 text-lg leading-[1.4] font-semibold text-ink lg:w-[310px] lg:shrink-0 lg:px-0 lg:text-2xl"
      >
        Veja quem já foram nossos parceiros
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
          <!-- só 4 logos: 4 cópias (2 por metade) para a faixa encher o ecrã sem saltos -->
          <template v-for="copy in 4" :key="copy">
            <div
              v-for="p in PARTNERS"
              :key="`${copy}-${p.name}`"
              role="listitem"
              :aria-hidden="copy > 1 ? 'true' : undefined"
              class="flex h-14 shrink-0 items-center px-6 lg:h-16 lg:px-10"
            >
              <img
                :src="p.logo"
                :alt="copy === 1 ? p.name : ''"
                :width="p.width"
                :height="p.height"
                loading="lazy"
                class="w-auto opacity-90 grayscale-[30%] transition duration-300 hover:scale-105 hover:opacity-100 hover:grayscale-0"
                :class="p.round ? 'h-14 rounded-full lg:h-16' : 'h-10 lg:h-12'"
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
