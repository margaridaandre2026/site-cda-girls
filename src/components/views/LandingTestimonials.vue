<template>
  <!-- Figma: web 5097:195 · mobile 5365:393 -->
  <section id="testemunhos" class="relative overflow-hidden bg-white">
    <!-- formas decorativas (mesmo grupo do hero) -->
    <img
      src="/assets/images/section-hero/shapes-mobile.svg"
      alt=""
      aria-hidden="true"
      width="1610.61"
      height="659.001"
      class="pointer-events-none absolute top-0 left-[-170.61px] max-w-none lg:hidden"
    />
    <img
      src="/assets/images/section-hero/shapes-desktop.svg"
      alt=""
      aria-hidden="true"
      width="1440"
      height="659"
      class="pointer-events-none absolute top-0 left-1/2 hidden max-w-none -translate-x-1/2 lg:block"
    />

    <div
      class="relative mx-auto flex max-w-[1440px] flex-col gap-6 px-5 py-14 lg:gap-8 lg:px-12 lg:py-[72px] xl:px-24"
    >
      <div class="flex flex-col gap-4 text-ink">
        <h2
          v-reveal
          class="text-2xl leading-[1.4] font-semibold lg:text-[40px] lg:leading-[1.2]"
        >
          O que elas dizem
        </h2>
        <p
          v-reveal="80"
          class="text-sm leading-[1.6] tracking-[0.2px] lg:text-lg lg:tracking-normal"
        >
          Histórias reais de mulheres que estão fazendo a diferença.
        </p>
      </div>

      <div
        ref="track"
        class="no-scrollbar -mx-5 flex snap-x snap-mandatory items-stretch gap-4 overflow-x-auto scroll-px-5 px-5 lg:mx-0 lg:grid lg:grid-cols-3 lg:items-start lg:gap-6 lg:overflow-visible lg:px-0"
      >
        <article
          v-for="(t, i) in TESTIMONIALS"
          :key="t.name"
          v-reveal="i * 120"
          v-tilt="4"
          class="group flex w-full shrink-0 snap-start flex-col gap-4 rounded-[20px] border border-secundary-50 bg-[#fcf7fc] p-4 transition-[translate,box-shadow] duration-300 ease-soft md:w-[calc(50%-8px)] lg:w-auto lg:gap-6 lg:self-stretch lg:p-6 lg:hover:-translate-y-1.5 lg:hover:shadow-card"
        >
          <span
            class="inline-flex h-8 items-center self-start rounded-[32px] bg-secundary-500/10 px-4 text-xs leading-[1.6] font-semibold tracking-[0.2px] text-secundary-500 lg:h-10 lg:text-base lg:tracking-normal"
          >
            {{ t.memberSince }}
          </span>

          <div class="flex items-start gap-4">
            <div class="relative size-10 shrink-0 overflow-hidden rounded-[20px] ring-2 ring-transparent ring-offset-2 ring-offset-[#fcf7fc] transition-[box-shadow] duration-300 group-hover:ring-secundary-300 lg:size-14">
              <img
                :src="t.avatar"
                :alt="t.name"
                loading="lazy"
                :class="t.avatarCrop ? 'absolute max-w-none' : 'size-full object-cover'"
                :style="t.avatarCrop"
              />
            </div>
            <div class="flex flex-col gap-1">
              <p
                class="text-base leading-[1.5] font-semibold tracking-[0.3px] text-[#100f10] lg:font-inter lg:text-lg lg:font-bold lg:tracking-normal"
              >
                {{ t.name }}
              </p>
              <p
                class="text-sm leading-[1.6] tracking-[0.2px] text-[#5f5e5f] lg:font-inter lg:text-lg lg:leading-[1.5] lg:tracking-normal"
              >
                {{ t.role }}
              </p>
            </div>
          </div>

          <p
            class="text-sm leading-[1.6] tracking-[0.2px] text-[#100f10] lg:text-xl lg:tracking-normal"
          >
            {{ t.text }}
          </p>
        </article>
      </div>

      <SlideDots
        class="lg:hidden"
        label="Testemunhos"
        :count="TESTIMONIALS.length"
        :active="active"
        @select="goTo"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { TESTIMONIALS } from "~/data/landing";
import { useCarousel } from "~/composables/useCarousel";
import SlideDots from "~/components/shared/SlideDots.vue";

const track = ref<HTMLElement | null>(null);
const { active, goTo } = useCarousel(track);
</script>
