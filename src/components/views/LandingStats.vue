<template>
  <!-- Figma: web 5029:125 · mobile 5365:363 -->
  <section id="metricas" ref="section" class="bg-white">
    <div
      class="mx-auto flex max-w-[1440px] items-start gap-4 px-5 py-14 lg:justify-between lg:gap-8 lg:px-12 lg:py-[72px] xl:px-24"
    >
      <template v-for="(s, i) in STATS" :key="s.value">
        <span
          v-if="i > 0"
          class="w-px self-stretch bg-ink-50"
          aria-hidden="true"
        />
        <div
          v-reveal="i * 120"
          class="group flex min-w-0 flex-1 flex-col gap-2 lg:max-w-[316px] lg:flex-none lg:gap-4"
          :class="i < STATS.length - 1 ? 'lg:w-[288px]' : 'lg:w-[316px]'"
        >
          <p
            class="text-[32px] leading-[1.4] font-semibold whitespace-nowrap text-secundary-500 tabular-nums transition-[scale] duration-300 origin-left group-hover:scale-105 lg:text-[64px] lg:leading-[1.25]"
          >
            {{ display[i] }}
          </p>
          <p
            class="text-xs leading-[1.6] tracking-[0.2px] text-ink lg:text-2xl lg:leading-[1.25] lg:tracking-normal"
          >
            {{ s.label }}
          </p>
        </div>
      </template>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { STATS } from "~/data/landing";

// "+320" -> { prefix: "+", target: 320 }
const parsed = STATS.map((s) => {
  const m = s.value.trim().match(/^(\D*)(\d+)(.*)$/);
  return m
    ? { prefix: m[1], target: Number(m[2]), suffix: m[3] }
    : { prefix: s.value, target: 0, suffix: "" };
});

// SSR/sem JS: mostra o valor final
const display = ref(STATS.map((s) => s.value.trim()));
const section = ref<HTMLElement | null>(null);
let observer: IntersectionObserver | null = null;
let frame = 0;

const countUp = () => {
  const duration = 1400;
  const start = performance.now();
  const tick = (now: number) => {
    const t = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    display.value = parsed.map(
      (p) => `${p.prefix}${Math.round(p.target * eased)}${p.suffix}`,
    );
    if (t < 1) frame = requestAnimationFrame(tick);
  };
  frame = requestAnimationFrame(tick);
};

onMounted(() => {
  if (!section.value) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  display.value = parsed.map((p) => `${p.prefix}0${p.suffix}`);
  observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry?.isIntersecting) return;
      observer?.disconnect();
      countUp();
    },
    { threshold: 0.4 },
  );
  observer.observe(section.value);
});

onUnmounted(() => {
  observer?.disconnect();
  cancelAnimationFrame(frame);
});
</script>
