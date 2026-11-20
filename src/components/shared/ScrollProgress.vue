<template>
  <!-- Barra fina no topo que acompanha o scroll da página -->
  <div class="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px]" aria-hidden="true">
    <div
      class="h-full origin-left bg-brand-gradient shadow-[0_0_12px_rgb(204_68_236/0.6)]"
      :style="{ transform: `scaleX(${progress})` }"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

const progress = ref(0);
let frame = 0;

const update = () => {
  cancelAnimationFrame(frame);
  frame = requestAnimationFrame(() => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.value = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
  });
};

onMounted(() => {
  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener("scroll", update);
  window.removeEventListener("resize", update);
  cancelAnimationFrame(frame);
});
</script>
