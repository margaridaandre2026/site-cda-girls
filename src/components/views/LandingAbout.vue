<template>
  <!-- Figma: web 5027:450 · mobile 5365:312 -->
  <section id="quem-somos" class="bg-[#fcf7fc]">
    <div
      class="mx-auto flex max-w-[1440px] flex-col gap-6 px-5 py-12 lg:gap-12 lg:px-12 lg:py-[72px] xl:px-24"
    >
      <div class="flex max-w-[760px] flex-col gap-4 text-ink">
        <h2
          v-reveal
          class="text-2xl leading-[1.2] font-semibold lg:text-[40px]"
        >
          Quem somos?
        </h2>
        <p
          v-reveal="80"
          class="text-sm leading-[1.6] tracking-[0.2px] lg:text-lg lg:tracking-normal"
        >
          A CDA Girls é uma iniciativa da Comunidade de Desenvolvedores de Angola
          (CDA), criada em 2022 para empoderar e fortalecer a participação
          feminina na tecnologia, enfrentando desafios como a falta de
          representação, mentoria e oportunidades no mercado.
        </p>
      </div>

      <div class="flex flex-col gap-2 lg:flex-row lg:gap-4">
        <!-- Foto grande + citação -->
        <div
          v-reveal
          class="relative pb-9 lg:flex-1 lg:pb-[34px]"
        >
          <div v-tilt="4" class="group h-[300px] overflow-hidden rounded-[32px] lg:h-[443px]">
            <img
              src="/assets/images/section-about/about-figma.jpg"
              alt="Membros da CDA Girls com t-shirts da comunidade"
              loading="lazy"
              class="size-full object-cover transition-transform duration-700 ease-soft group-hover:scale-105"
            />
          </div>
          <div
            class="absolute bottom-0 left-1/2 z-10 -translate-x-1/2 animate-float rounded-[32px] bg-secundary-800 shadow-card px-6 py-4 lg:left-[180px] lg:translate-x-0 lg:px-8"
          >
            <p
              class="w-48 text-center text-xl leading-[1.2] font-semibold text-light-50 lg:text-2xl"
            >
              “ Juntas somos mais fortes “
            </p>
          </div>
        </div>

        <!-- Grelha de cartões -->
        <div
          class="grid grid-cols-2 gap-2 lg:w-[616px] lg:shrink-0 lg:grid-rows-[201px_226px] lg:gap-4"
        >
          <!-- Missão -->
          <div
            v-reveal="120"
            v-tilt
            class="col-span-2 flex flex-col items-center justify-center gap-2 rounded-[32px] bg-[#f5dbfb] p-4 lg:col-span-1 lg:flex-row lg:flex-wrap"
          >
            <h3
              class="w-full text-center text-xl leading-[1.6] font-semibold text-secundary-500 lg:text-2xl lg:leading-[1.25] lg:font-bold"
            >
              MISSÃO
            </h3>
            <span
              v-for="m in missao"
              :key="m"
              class="rounded-[25px] bg-white px-4 py-2 text-center text-sm leading-[1.6] font-medium tracking-[0.2px] text-ink transition-[background-color,color,translate] duration-200 hover:-translate-y-0.5 hover:bg-primary-500 hover:text-white lg:text-base lg:leading-[1.25] lg:tracking-normal"
              :class="m === 'Promover a diversidade' ? 'lg:w-[127px]' : ''"
            >
              {{ m }}
            </span>
          </div>

          <!-- Benefícios -->
          <div
            v-reveal="180"
            v-tilt
            class="col-span-2 flex flex-col items-center justify-center gap-4 rounded-[32px] bg-white p-4 lg:col-span-1 lg:px-6"
          >
            <h3
              class="text-xl leading-[1.6] font-semibold text-primary-500 lg:text-2xl lg:leading-[1.25]"
            >
              Benefícios
            </h3>
            <ul class="flex flex-col items-center gap-2 lg:gap-4">
              <li
                v-for="b in beneficios"
                :key="b.label"
                class="group/b flex items-center gap-2 text-sm leading-[1.6] font-medium tracking-[0.2px] whitespace-nowrap text-ink transition-[translate] duration-300 ease-soft hover:translate-x-1 lg:text-base lg:leading-[1.25] lg:tracking-normal"
              >
                <img :src="b.icon" alt="" width="24" height="24" class="size-6 transition-transform duration-500 ease-soft group-hover/b:rotate-[18deg] group-hover/b:scale-125" />
                {{ b.label }}
              </li>
            </ul>
          </div>

          <!-- Foto evento -->
          <div
            v-reveal="240"
            v-tilt
            class="group h-[163px] overflow-hidden rounded-[32px] lg:h-auto"
          >
            <img
              src="/assets/images/section-about/impact-figma.jpg"
              alt="Membros da CDA Girls num evento"
              loading="lazy"
              class="size-full object-cover transition-transform duration-700 ease-soft group-hover:scale-105"
            />
          </div>

          <!-- Impacto -->
          <div
            v-reveal="300"
            v-tilt
            class="flex flex-col items-center justify-center gap-2 rounded-[32px] bg-[#f5dbfb] p-4 text-center lg:gap-4 lg:px-6"
          >
            <div class="flex items-start" aria-hidden="true">
              <img
                v-for="(src, i) in COMMUNITY_AVATARS"
                :key="src"
                :src="src"
                alt=""
                width="44"
                height="44"
                class="size-8 rounded-full ring-2 ring-[#f5dbfb] transition-transform duration-300 ease-soft hover:z-10 hover:-translate-y-1 hover:scale-110 lg:size-11"
                :class="i < COMMUNITY_AVATARS.length - 1 ? '-mr-4' : ''"
              />
            </div>
            <p class="font-semibold text-secundary-500">
              <span class="block text-base leading-[1.6] lg:text-2xl lg:leading-[1.25]">
                +300 mulheres
              </span>
              <span
                class="block text-sm leading-[1.6] font-medium tracking-[0.2px] text-ink lg:text-base lg:leading-[1.25] lg:tracking-normal"
              >
                impactadas até o momento pela CDA Girls.
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { COMMUNITY_AVATARS } from "~/data/landing";

const missao = ["Empoderar", "Promover a diversidade", "Capacitar"];

const beneficios = [
  { label: "Networking", icon: "/assets/images/section-about/icon-network.svg" },
  { label: "Estágios + Recomendações", icon: "/assets/images/section-about/icon-work.svg" },
  { label: "Eventos e formações", icon: "/assets/images/section-about/icon-calendar.svg" },
];
</script>
