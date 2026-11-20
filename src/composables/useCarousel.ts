import { onMounted, onUnmounted, ref, type Ref } from "vue";

/**
 * Carrossel horizontal com scroll-snap (usado nos cartões em mobile).
 * Acompanha o slide visível e permite saltar para um slide pelos "dots".
 */
export function useCarousel(track: Ref<HTMLElement | null>) {
  const active = ref(0);
  let frame = 0;

  const slides = () =>
    Array.from(track.value?.children ?? []) as HTMLElement[];

  const update = () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      const el = track.value;
      if (!el) return;
      const items = slides();
      let best = 0;
      let bestDist = Infinity;
      items.forEach((item, i) => {
        const dist = Math.abs(item.offsetLeft - el.offsetLeft - el.scrollLeft);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });
      active.value = best;
    });
  };

  const goTo = (i: number) => {
    const el = track.value;
    const item = slides()[i];
    if (!el || !item) return;
    el.scrollTo({ left: item.offsetLeft - el.offsetLeft, behavior: "smooth" });
  };

  onMounted(() => {
    track.value?.addEventListener("scroll", update, { passive: true });
    update();
  });

  onUnmounted(() => {
    track.value?.removeEventListener("scroll", update);
    cancelAnimationFrame(frame);
  });

  return { active, goTo };
}
