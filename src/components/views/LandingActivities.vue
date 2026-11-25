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
          Programas e iniciativas que seguem mudando trajectórias e fortalecendo
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
          class="group/card relative h-[429px] w-full shrink-0 snap-start overflow-hidden rounded-[32px] bg-white transition-[translate,box-shadow] duration-300 ease-soft md:w-[calc(50%-8px)] lg:w-auto hover:shadow-card lg:not-data-[open]:hover:-translate-y-1.5 data-[open]:shadow-[0_0_24px_rgba(14,13,13,0.16)] data-[open]:ring-1 data-[open]:ring-secundary-500"
          :data-open="openId === a.id ? '' : undefined"
          @keydown.esc="close(a.id)"
        >
          <!-- Frente: imagem, título e resumo. O cartão inteiro abre os detalhes. -->
          <button
            :ref="(el) => setFrontRef(a.id, el)"
            type="button"
            class="flex size-full cursor-pointer flex-col gap-4 rounded-[32px] p-4 text-left focus-visible:ring-4 focus-visible:ring-secundary-200 focus-visible:outline-none focus-visible:ring-inset lg:p-6"
            :aria-expanded="openId === a.id"
            :aria-controls="`details-${a.id}`"
            :inert="openId === a.id"
            @click="open(a.id)"
          >
            <span
              v-if="a.badge"
              class="inline-flex h-8 shrink-0 items-center gap-2 self-start rounded-[32px] bg-secundary-500/10 px-4 text-xs leading-[1.6] font-semibold tracking-[0.2px] text-secundary-500 lg:h-12 lg:text-base lg:tracking-normal"
            >
              <span class="relative flex size-2" aria-hidden="true">
                <span class="absolute inset-0 animate-ping rounded-full bg-secundary-500 opacity-75" />
                <span class="relative size-2 rounded-full bg-secundary-500" />
              </span>
              {{ a.badge }}
            </span>

            <span class="flex flex-col gap-2">
              <span
                class="line-clamp-2 text-base leading-[1.6] font-semibold text-ink lg:text-xl lg:leading-[1.2]"
              >
                {{ a.title }}
              </span>
              <span
                class="line-clamp-2 text-sm leading-[1.6] tracking-[0.2px] text-ink-400 lg:text-base lg:tracking-[0.3px]"
              >
                {{ a.description }}
              </span>
            </span>

            <span class="relative block min-h-0 w-full flex-1 overflow-hidden rounded-[16px]">
              <img
                v-if="a.image"
                :src="a.image"
                alt=""
                loading="lazy"
                class="size-full object-cover transition-transform duration-500 ease-soft group-hover/card:scale-105"
              />
              <!-- sem imagem: fundo da marca -->
              <span
                v-else
                class="flex size-full items-center justify-center bg-brand-gradient transition-transform duration-500 ease-soft group-hover/card:scale-105"
              >
                <UIcon name="i-lucide-sparkles" class="size-12 text-light-50/80" aria-hidden="true" />
              </span>

              <!-- dica ao passar o rato (ou ao focar com o teclado) -->
              <span
                class="pointer-events-none absolute inset-0 hidden items-center justify-center bg-primary-500/35 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 ease-soft group-hover/card:opacity-100 group-has-[:focus-visible]/card:opacity-100 [@media(hover:hover)]:flex"
                aria-hidden="true"
              >
                <span
                  class="inline-flex translate-y-2 items-center gap-2 rounded-[32px] bg-white px-4 py-2 text-sm font-semibold text-primary-500 shadow-card-sm transition-transform duration-300 ease-soft group-hover/card:translate-y-0"
                >
                  <UIcon name="i-lucide-mouse-pointer-click" class="size-4" />
                  Clique para ver os detalhes
                </span>
              </span>

              <!-- ecrãs tácteis (sem hover): indicação sempre visível -->
              <span
                class="absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-[32px] bg-white/90 px-3 py-1.5 text-xs font-semibold text-primary-500 shadow-card-sm [@media(hover:hover)]:hidden"
                aria-hidden="true"
              >
                <UIcon name="i-lucide-plus" class="size-3.5" />
                Toque para ver detalhes
              </span>
            </span>
            <span class="sr-only">. Ver detalhes da actividade</span>
          </button>

          <!-- Detalhes: só aparecem depois do clique -->
          <Transition name="details">
            <div
              v-if="openId === a.id"
              :id="`details-${a.id}`"
              role="region"
              :aria-label="`Detalhes: ${a.title}`"
              class="absolute inset-0 flex flex-col justify-between gap-4 rounded-[32px] bg-white p-4 lg:p-6"
            >
              <div class="flex min-h-0 flex-col gap-4 text-ink">
                <span
                  v-if="a.badge"
                  class="inline-flex h-8 shrink-0 items-center self-start rounded-[32px] bg-secundary-500/10 px-4 text-xs leading-[1.6] font-semibold tracking-[0.2px] text-secundary-500"
                >
                  {{ a.badge }}
                </span>
                <h3 class="text-base leading-[1.6] font-semibold lg:text-xl lg:leading-[1.2]">
                  {{ a.title }}
                </h3>
                <p
                  class="details-scroll min-h-0 overflow-y-auto pr-1 text-sm leading-[1.6] tracking-[0.2px] whitespace-pre-line lg:text-base lg:tracking-[0.3px]"
                >
                  {{ a.description }}
                </p>
              </div>
              <div class="flex shrink-0 gap-2">
                <button
                  :ref="(el) => setCloseRef(a.id, el)"
                  type="button"
                  :aria-controls="`details-${a.id}`"
                  aria-expanded="true"
                  class="flex h-12 flex-1 items-center justify-center rounded-[32px] border border-[#e5e5e5] bg-white px-6 text-sm leading-[1.6] font-semibold tracking-[0.2px] text-primary-500 transition-[background-color,border-color,scale] hover:border-secundary-200 hover:bg-secundary-50 focus-visible:ring-4 focus-visible:ring-secundary-100 focus-visible:outline-none active:scale-95"
                  @click="close(a.id)"
                >
                  Ver menos
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
            </div>
          </Transition>
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
import { nextTick, ref } from "vue";
import { ACTIVITIES, JOIN_HREF } from "~/data/landing";
import { useCarousel } from "~/composables/useCarousel";
import SlideDots from "~/components/shared/SlideDots.vue";

// só um cartão aberto de cada vez
const openId = ref<string | null>(null);

const frontRefs = new Map<string, HTMLElement>();
const closeRefs = new Map<string, HTMLElement>();
const setFrontRef = (id: string, el: unknown) => {
  if (el instanceof HTMLElement) frontRefs.set(id, el);
};
const setCloseRef = (id: string, el: unknown) => {
  if (el instanceof HTMLElement) closeRefs.set(id, el);
  else closeRefs.delete(id);
};

const open = async (id: string) => {
  openId.value = id;
  await nextTick();
  // leva o foco para os detalhes (teclado e leitores de ecrã)
  closeRefs.get(id)?.focus({ preventScroll: true });
};

const close = async (id: string) => {
  if (openId.value !== id) return;
  openId.value = null;
  await nextTick();
  // devolve o foco ao cartão
  frontRefs.get(id)?.focus({ preventScroll: true });
};

const track = ref<HTMLElement | null>(null);
const { active, goTo } = useCarousel(track);
</script>

<style scoped>
.details-enter-active,
.details-leave-active {
  transition:
    opacity 0.35s var(--ease-soft),
    transform 0.45s var(--ease-soft);
}
.details-enter-from,
.details-leave-to {
  opacity: 0;
  transform: translateY(24px);
}

.details-scroll {
  scrollbar-width: thin;
  scrollbar-color: var(--color-secundary-200, #e9c6f2) transparent;
}

@media (prefers-reduced-motion: reduce) {
  .details-enter-active,
  .details-leave-active {
    transition: opacity 0.15s linear;
  }
  .details-enter-from,
  .details-leave-to {
    transform: none;
  }
}
</style>
