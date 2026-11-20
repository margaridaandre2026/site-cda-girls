import type { Directive } from "vue";

/**
 * Micro-interações guiadas pelo ponteiro (só em dispositivos com rato e
 * quando a pessoa não pediu menos movimento):
 *
 *  v-tilt        cartão inclina em 3D e ganha uma luz que segue o cursor
 *  v-tilt="4"    (graus máximos, por omissão 6)
 *  v-magnetic    o elemento é "atraído" pelo cursor (botões CTA)
 *  v-parallax="0.02"  desloca-se com o rato (formas decorativas)
 *
 * Os estilos vivem em main.css (.tilt, .tilt-glow).
 */
export default defineNuxtPlugin((nuxtApp) => {
  const canHover = () =>
    import.meta.client &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  type Cleanup = { __motionCleanup?: () => void };

  // ---------- v-tilt ----------
  const tilt: Directive<HTMLElement & Cleanup, number | undefined> = {
    mounted(el, binding) {
      if (!canHover()) return;
      const max = binding.value ?? 6;
      el.classList.add("tilt");
      if (getComputedStyle(el).position === "static") el.style.position = "relative";

      const glow = document.createElement("span");
      glow.className = "tilt-glow";
      glow.setAttribute("aria-hidden", "true");
      el.appendChild(glow);

      let frame = 0;
      const move = (e: PointerEvent) => {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          const r = el.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width;
          const y = (e.clientY - r.top) / r.height;
          el.style.setProperty("--mx", `${x * 100}%`);
          el.style.setProperty("--my", `${y * 100}%`);
          el.style.setProperty("--rx", `${(0.5 - y) * max}deg`);
          el.style.setProperty("--ry", `${(x - 0.5) * max}deg`);
        });
      };
      const leave = () => {
        cancelAnimationFrame(frame);
        el.style.setProperty("--rx", "0deg");
        el.style.setProperty("--ry", "0deg");
      };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      el.__motionCleanup = () => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
        glow.remove();
      };
    },
    unmounted(el) {
      el.__motionCleanup?.();
    },
  };

  // ---------- v-magnetic ----------
  const magnetic: Directive<HTMLElement & Cleanup, number | undefined> = {
    mounted(el, binding) {
      if (!canHover()) return;
      const strength = binding.value ?? 0.3;
      // junta "transform" às transições que o elemento já tem (classes Tailwind)
      const cs = getComputedStyle(el);
      if (!cs.transitionProperty.includes("transform")) {
        el.style.transitionProperty = `${cs.transitionProperty}, transform`;
        el.style.transitionDuration = `${cs.transitionDuration}, 0.5s`;
        el.style.transitionTimingFunction = `${cs.transitionTimingFunction}, cubic-bezier(0.22, 1, 0.36, 1)`;
      }
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        el.style.transform = `translate3d(${dx * strength}px, ${dy * strength}px, 0)`;
      };
      const leave = () => {
        el.style.transform = "";
      };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      el.__motionCleanup = () => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
      };
    },
    unmounted(el) {
      el.__motionCleanup?.();
    },
  };

  // ---------- v-parallax (um único listener global) ----------
  const layers = new Map<HTMLElement, number>();
  let listening = false;
  let pFrame = 0;
  const onPointer = (e: PointerEvent) => {
    cancelAnimationFrame(pFrame);
    pFrame = requestAnimationFrame(() => {
      const cx = e.clientX - window.innerWidth / 2;
      const cy = e.clientY - window.innerHeight / 2;
      layers.forEach((depth, el) => {
        el.style.transform = `translate3d(${cx * depth}px, ${cy * depth}px, 0)`;
      });
    });
  };

  const parallax: Directive<HTMLElement, number | undefined> = {
    mounted(el, binding) {
      if (!canHover()) return;
      el.style.transition = "transform 0.8s var(--ease-soft)";
      el.style.willChange = "transform";
      layers.set(el, binding.value ?? 0.02);
      if (!listening) {
        window.addEventListener("pointermove", onPointer, { passive: true });
        listening = true;
      }
    },
    unmounted(el) {
      layers.delete(el);
      if (!layers.size && listening) {
        window.removeEventListener("pointermove", onPointer);
        listening = false;
      }
    },
  };

  nuxtApp.vueApp.directive("tilt", tilt);
  nuxtApp.vueApp.directive("magnetic", magnetic);
  nuxtApp.vueApp.directive("parallax", parallax);
});
