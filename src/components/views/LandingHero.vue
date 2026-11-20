<template>
  <section id="top" class="bg-hero-gradient pt-16">
    <div
      class="max-w-7xl mx-auto px-5 lg:px-8 py-12 lg:py-20 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 items-center"
    >
      <!-- Texto -->
      <div>
        <h1
          class="text-4xl sm:text-5xl lg:text-[56px] font-bold leading-tight text-ink"
        >
          Empoderando
          <span class="text-secundary-500">mulheres</span> para<br
            class="hidden sm:block"
          />
          liderar <span class="text-primary-500">tecnologia.</span>
        </h1>
        <p class="text-base text-ink/70 mt-5 max-w-md">
          Na CDA Girls, ajudamos mulheres a desenvolver habilidades e
          oportunidades na tecnologia.
        </p>

        <a
          href="#contactos"
          class="inline-flex items-center h-12 px-6 rounded-full bg-primary-500 text-sm font-semibold text-white mt-7 hover:bg-primary-400 transition-colors cursor-pointer"
        >
          Juntar-se a comunidade
        </a>
      </div>

      <!-- Colagem de imagens + chips -->
      <div class="grid grid-cols-2 gap-4">
        <img
          src="/hero/mulher-laptop.jpg"
          alt="Mulher com laptop"
          class="rounded-[20px] w-full h-56 lg:h-64 object-cover row-span-2"
        />
        <div
          class="rounded-[20px] bg-secundary-100 p-5 flex flex-col justify-center"
        >
          <p class="text-sm font-semibold text-ink">
            <span class="text-secundary-500">+300 mulheres</span> estão na
            comunidade
          </p>
        </div>
        <img
          src="/hero/grupo.jpg"
          alt="Comunidade CDA Girls"
          class="rounded-[20px] w-full h-32 lg:h-36 object-cover"
        />
        <div
          class="rounded-[20px] bg-secundary-50 border border-secundary-200 p-5 flex items-center col-span-2 sm:col-span-1"
        >
          <p class="text-sm font-semibold text-ink">
            <span class="text-secundary-500">+20 Projetos</span> que Geraram Impacto
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
