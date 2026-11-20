import type { Directive } from "vue";

/**
 * v-reveal — anima a entrada do elemento quando entra no viewport.
 * Uso: v-reveal  ou  v-reveal="120" (atraso em ms, útil para escalonar cards).
 * O estilo vive em main.css ([data-reveal] / .is-visible).
 */
export default defineNuxtPlugin((nuxtApp) => {
  const observer = import.meta.client
    ? new IntersectionObserver(
        (entries, obs) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        },
        { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
      )
    : null;

  const reveal: Directive<HTMLElement, number | undefined> = {
    getSSRProps: (binding) => ({
      "data-reveal": "",
      style: `--reveal-delay: ${binding.value ?? 0}ms`,
    }),
    mounted(el, binding) {
      el.setAttribute("data-reveal", "");
      // depois de entrar, larga a animação para não "prender" o transform
      // (senão bloqueia o v-tilt / v-magnetic e os hovers)
      el.addEventListener(
        "animationend",
        (e) => {
          if (e.target === el) el.classList.add("is-revealed");
        },
      );
      el.style.setProperty("--reveal-delay", `${binding.value ?? 0}ms`);
      observer?.observe(el);
    },
    unmounted(el) {
      observer?.unobserve(el);
    },
  };

  nuxtApp.vueApp.directive("reveal", reveal);
});
