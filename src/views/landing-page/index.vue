<template>
  <div class="relative font-sans bg-white scroll-smooth">
    <ScrollProgress />
    <LandingHeader />
    <main>
      <LandingHero />
      <LandingPartners />
      <LandingAbout />
      <LandingStats />
      <LandingActivities />
      <LandingTestimonials />
      <LandingTeam />
      <LandingContacts />
    </main>
    <LandingFooter />
    <LandingScrollFab />
  </div>
</template>

<script setup lang="ts">
import LandingHeader from "~/components/shared/LandingHeader.vue";
import ScrollProgress from "~/components/shared/ScrollProgress.vue";
import LandingHero from "~/components/shared/LandingHero.vue";
import LandingPartners from "~/components/views/LandingPartners.vue";
import LandingAbout from "~/components/views/LandingAbout.vue";
import LandingStats from "~/components/views/LandingStats.vue";
import LandingActivities from "~/components/views/LandingActivities.vue";
import LandingTestimonials from "~/components/views/LandingTestimonials.vue";
import LandingTeam from "~/components/views/LandingTeam.vue";
import LandingContacts from "~/components/views/LandingContacts.vue";
import LandingFooter from "~/components/views/LandingFooter.vue";
import LandingScrollFab from "~/components/shared/LandingScrollFab.vue";
import { useHead, useSeoMeta } from "nuxt/app";

definePageMeta({
  alias: "/",
});

useSeoMeta({
  title: "CDA Girls — Empoderando mulheres para liderar tecnologia",
  description:
    "Na CDA Girls, ajudamos mulheres a desenvolver habilidades e oportunidades na tecnologia.",
});

// scroll suave nas âncoras
useHead({
  htmlAttrs: { class: "scroll-smooth" },
  // sem JS o v-reveal nunca dispara: mostra tudo
  noscript: [
    { innerHTML: "<style>[data-reveal]{opacity:1!important}</style>" },
  ],
});
</script>
