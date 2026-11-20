<template>
  <!-- Figma: "Cabeçalho" (web 5027:391) · "Cabecalho-Mobile" (5365:783)
       No topo fica transparente como no design; ao fazer scroll fixa-se
       com efeito de vidro fosco e destaca a secção em que estamos. -->
  <header
    class="fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500 ease-soft"
    :class="
      scrolled
        ? 'bg-white/70 shadow-[0_8px_32px_-12px_rgb(74_23_89/0.25)] backdrop-blur-xl backdrop-saturate-150'
        : 'bg-transparent'
    "
  >
    <div
      class="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-5 transition-[padding] duration-500 ease-soft lg:px-12 xl:px-24"
      :class="scrolled ? 'py-3 lg:py-4' : 'py-5 lg:py-8'"
    >
      <!-- Logo -->
      <a href="#top" class="rise-in shrink-0" aria-label="CDA Girls — início">
        <img
          src="/assets/images/section-hero/logo-figma.png"
          alt="CDA Girls"
          width="140"
          height="45"
          class="h-8 w-[99px] object-cover transition-transform duration-300 ease-soft hover:scale-105 lg:h-[45px] lg:w-[140px]"
        />
      </a>

      <!-- Nav desktop -->
      <nav class="hidden items-center gap-6 lg:flex xl:gap-8">
        <a
          v-for="(item, i) in NAV_ITEMS"
          :key="item.href"
          :href="item.href"
          :aria-current="active === item.href ? 'true' : undefined"
          class="nav-link rise-in text-base leading-[1.6] font-medium tracking-[0.3px] whitespace-nowrap transition-colors hover:text-secundary-500"
          :class="active === item.href ? 'text-secundary-500' : 'text-ink'"
          :style="{ '--d': `${100 + i * 60}ms` }"
        >
          {{ item.label }}
        </a>
      </nav>

      <span class="rise-in block shrink-0" style="--d: 400ms">
      <a
        v-magnetic="0.2"
        :href="JOIN_HREF"
        target="_blank"
        rel="noopener noreferrer"
        class="btn-shine pulse-ring inline-flex h-10 shrink-0 items-center justify-center rounded-[32px] bg-brand-gradient px-6 text-xs leading-[1.6] font-semibold tracking-[0.2px] text-light-50 transition-[filter,box-shadow,scale] duration-200 hover:shadow-card-sm hover:brightness-115 active:scale-95 lg:h-14 lg:px-8 lg:text-base lg:leading-[1.5] lg:tracking-[0.3px]"
      >
        Juntar-se
      </a>
      </span>
    </div>
  </header>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { NAV_ITEMS, JOIN_HREF } from "~/data/landing";

const scrolled = ref(false);
const active = ref("");

const onScroll = () => {
  scrolled.value = window.scrollY > 24;
};

// destaca no menu a secção visível
let spy: IntersectionObserver | null = null;
let topSpy: IntersectionObserver | null = null;

onMounted(() => {
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  spy = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) active.value = `#${e.target.id}`;
      }
    },
    { rootMargin: "-45% 0px -50% 0px" },
  );
  for (const item of NAV_ITEMS) {
    const el = document.querySelector(item.href);
    if (el) spy.observe(el);
  }
  // no hero não há item ativo
  const top = document.getElementById("top");
  if (top) {
    topSpy = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) active.value = "";
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    topSpy.observe(top);
  }
});

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
  spy?.disconnect();
  topSpy?.disconnect();
});
</script>
