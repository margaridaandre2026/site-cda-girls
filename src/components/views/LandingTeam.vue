<template>
  <!-- Figma: web 5097:163 · mobile 5365:467 -->
  <section id="equipa" class="bg-[#fcf7fc]">
    <div
      class="mx-auto flex max-w-[1440px] flex-col gap-6 px-5 py-12 lg:gap-8 lg:px-12 lg:py-[72px] xl:px-24"
    >
      <div class="flex flex-col gap-4 text-ink">
        <h2
          v-reveal
          class="text-2xl leading-[1.4] font-semibold lg:text-[40px] lg:leading-[1.2]"
        >
          Conheça a Equipe
        </h2>
        <p
          v-reveal="80"
          class="max-w-[760px] text-sm leading-[1.6] tracking-[0.2px] lg:text-base"
        >
          Profissionais apaixonadas por tecnologia e pelo empoderamento feminino.
        </p>
      </div>

      <!-- mobile: 2 por página em carrossel · desktop: 4 lado a lado -->
      <div
        ref="track"
        class="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 lg:mx-0 lg:gap-6 lg:overflow-visible lg:px-0"
      >
        <figure
          v-for="(m, i) in TEAM"
          :key="m.name"
          v-reveal="(i % 4) * 100"
          v-tilt
          class="group relative w-[calc(50%-8px)] shrink-0 pb-3.5 lg:w-auto lg:flex-1 lg:pb-[34px]"
          :class="i % 2 === 0 ? 'snap-start' : ''"
        >
          <div class="h-[200px] overflow-hidden rounded-[32px] lg:h-[366px]">
            <img
              :src="m.photo"
              :alt="m.name"
              loading="lazy"
              class="size-full object-cover transition-transform duration-700 ease-soft group-hover:scale-105"
            />
          </div>
          <figcaption
            class="absolute bottom-0 left-1/2 z-10 flex w-[95%] -translate-x-1/2 flex-col items-center gap-0.5 rounded-[32px] px-4 py-2 text-center whitespace-nowrap transition-[background-color,translate] duration-500 ease-soft group-hover:-translate-y-1.5 group-hover:bg-brand-gradient lg:w-[86.66%] lg:gap-2 lg:p-4"
            :class="i === 0 ? 'bg-brand-gradient' : 'bg-primary-500'"
          >
            <span
              class="text-sm leading-[1.6] font-semibold tracking-[0.2px] text-secundary-50 lg:text-xl lg:leading-[1.2] lg:tracking-normal"
            >
              {{ m.name }}
            </span>
            <span
              class="text-xs leading-[1.6] tracking-[0.2px] text-light-600 lg:text-base lg:tracking-[0.3px]"
            >
              {{ m.role }}
            </span>
          </figcaption>
        </figure>
      </div>

      <SlideDots
        class="lg:hidden"
        label="Equipa"
        :count="pages"
        :active="Math.floor(active / 2)"
        @select="(p) => goTo(p * 2)"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { TEAM } from "~/data/landing";
import { useCarousel } from "~/composables/useCarousel";
import SlideDots from "~/components/shared/SlideDots.vue";

const pages = Math.ceil(TEAM.length / 2);
const track = ref<HTMLElement | null>(null);
const { active, goTo } = useCarousel(track);
</script>
