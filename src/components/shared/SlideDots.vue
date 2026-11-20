<template>
  <!-- Figma: "Slides" / "Dots" (Mostrado · ocult) -->
  <div class="flex items-center justify-center gap-2" role="tablist" :aria-label="label">
    <button
      v-for="i in count"
      :key="i"
      type="button"
      role="tab"
      :aria-selected="active === i - 1"
      :aria-label="`Ir para o slide ${i}`"
      class="h-3 rounded-[32px] transition-[width,background-color] duration-300 ease-soft"
      :class="active === i - 1 ? 'w-6 bg-primary-500' : 'w-3 bg-primary-50 hover:bg-primary-100'"
      @click="emit('select', i - 1)"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{ count: number; active: number; label?: string }>();
const emit = defineEmits<{ select: [index: number] }>();
</script>
