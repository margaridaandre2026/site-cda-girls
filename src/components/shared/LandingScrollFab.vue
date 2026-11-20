<template>
  <button
    type="button"
    class="fixed right-5 bottom-6 z-50 w-11 h-11 rounded-full bg-primary-500 text-white shadow-lg flex items-center justify-center hover:bg-primary-600 cursor-pointer"
    :aria-label="atFooter ? 'Voltar ao topo' : 'Ir para o rodapé'"
    @click="jump"
  >
    <UIcon
      :name="atFooter ? 'i-lucide-arrow-up' : 'i-lucide-arrow-down'"
      class="w-5 h-5"
    />
  </button>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

const atFooter = ref(false);

function update() {
  const footer = document.getElementById("rodape");
  if (!footer) return;
  atFooter.value = footer.getBoundingClientRect().top < window.innerHeight * 0.65;
}

function jump() {
  const target = atFooter.value ? "top" : "rodape";
  document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
}

onMounted(() => {
  update();
  window.addEventListener("scroll", update, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener("scroll", update);
});
</script>
