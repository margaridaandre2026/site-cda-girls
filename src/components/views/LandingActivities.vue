<template>
  <!-- Figma: web 5097:91 · mobile 5365:376 -->
  <section id="actividades" class="bg-[#fcf7fc]">
    <div
      class="mx-auto flex max-w-[1440px] flex-col gap-6 px-5 py-12 lg:gap-12 lg:px-12 lg:py-[72px] xl:px-24"
    >
      <div class="flex flex-col gap-4 text-ink">
        <h2
          v-reveal
          class="text-2xl leading-[1.4] font-semibold lg:text-[40px] lg:leading-[1.2]"
        >
          Nossas actividades
        </h2>
        <p
          v-reveal="80"
          class="max-w-[760px] text-sm leading-[1.6] tracking-[0.2px] lg:text-lg lg:tracking-normal"
        >
          Programas e iniciativas que seguem mudando trajetórias e fortalecendo
          mulheres.
        </p>
      </div>

      <!-- mobile: carrossel · desktop: grelha 3 colunas -->
      <div
        ref="track"
        class="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:px-0"
      >
        <article
          v-for="(a, i) in ACTIVITIES"
          :key="a.id"
          v-reveal="(i % 3) * 120"
          v-tilt="4"
          class="flex h-[429px] w-full shrink-0 snap-start flex-col gap-4 rounded-[32px] bg-white p-4 transition-[translate,box-shadow] duration-300 ease-soft md:w-[calc(50%-8px)] lg:w-auto lg:p-6 lg:hover:-translate-y-1.5"
          :class="
            a.featured
              ? 'justify-between border border-secundary-500 shadow-[0_0_24px_rgba(14,13,13,0.16)]'
              : 'hover:shadow-card'
          "
        >
          <template v-if="!a.featured">
            <span
              v-if="a.badge"
              class="inline-flex h-8 items-center gap-2 self-start rounded-[32px] bg-secundary-500/10 px-4 text-xs leading-[1.6] font-semibold tracking-[0.2px] text-secundary-500 lg:h-12 lg:text-base lg:tracking-normal"
            >
              <span class="relative flex size-2" aria-hidden="true">
                <span class="absolute inset-0 animate-ping rounded-full bg-secundary-500 opacity-75" />
                <span class="relative size-2 rounded-full bg-secundary-500" />
              </span>
              {{ a.badge }}
            </span>
            <div class="flex flex-col gap-2">
              <h3
                class="text-base leading-[1.6] font-semibold text-ink lg:text-xl lg:leading-[1.2]"
              >
                {{ a.title }}
              </h3>
              <p
                class="line-clamp-2 text-sm leading-[1.6] tracking-[0.2px] text-ink-400 lg:text-base lg:tracking-[0.3px]"
              >
                {{ a.description }}
              </p>
            </div>
            <div v-if="a.image" class="group min-h-0 flex-1 overflow-hidden rounded-[16px]">
              <img
                :src="a.image"
                :alt="a.title"
                loading="lazy"
                class="size-full object-cover transition-transform duration-500 ease-soft group-hover:scale-105"
              />
            </div>
          </template>

          <!-- Cartão em destaque -->
          <template v-else>
            <div class="flex min-h-0 flex-col gap-4 text-ink">
              <h3 class="text-base leading-[1.6] font-semibold lg:text-xl lg:leading-[1.2]">
                {{ a.title }}
              </h3>
              <p
                :id="`desc-${a.id}`"
                class="overflow-y-auto text-sm leading-[1.6] tracking-[0.2px] whitespace-pre-line lg:text-base lg:tracking-[0.3px]"
                :class="expanded.has(a.id) ? '' : 'line-clamp-[10] lg:line-clamp-[9]'"
              >
                {{ a.description }}
              </p>
            </div>
            <div class="flex gap-2">
              <button
                type="button"
                :aria-expanded="expanded.has(a.id)"
                :aria-controls="`desc-${a.id}`"
                class="flex h-12 flex-1 items-center justify-center rounded-[32px] border border-[#e5e5e5] bg-white px-6 text-sm leading-[1.6] font-semibold tracking-[0.2px] text-primary-500 transition-[background-color,border-color,scale] hover:border-secundary-200 hover:bg-secundary-50 focus-visible:ring-4 focus-visible:ring-secundary-100 focus-visible:outline-none active:scale-95"
                @click="toggle(a.id)"
              >
                {{ expanded.has(a.id) ? "Ver menos" : "Ver detalhes" }}
              </button>
              <a
                v-magnetic="0.15"
                :href="JOIN_HREF"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-shine flex h-12 flex-1 items-center justify-center rounded-[32px] bg-brand-gradient px-6 text-sm leading-[1.6] font-semibold tracking-[0.2px] text-light-50 transition-[filter,box-shadow,scale] hover:shadow-card-sm hover:brightness-115 focus-visible:ring-4 focus-visible:ring-secundary-200 focus-visible:outline-none active:scale-95"
              >
                Participar
              </a>
            </div>
          </template>
        </article>
      </div>

      <SlideDots
        class="lg:hidden"
        label="Actividades"
        :count="ACTIVITIES.length"
        :active="active"
        @select="goTo"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { ACTIVITIES, JOIN_HREF } from "~/data/landing";
import { useCarousel } from "~/composables/useCarousel";
import SlideDots from "~/components/shared/SlideDots.vue";

const expanded = reactive(new Set<string>());
const toggle = (id: string) => {
  if (expanded.has(id)) expanded.delete(id);
  else expanded.add(id);
};

const track = ref<HTMLElement | null>(null);
const { active, goTo } = useCarousel(track);
</script>
