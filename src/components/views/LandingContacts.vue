<template>
  <!-- Figma: web 5043:1532 · mobile 5365:498 -->
  <section id="contactos" class="bg-white">
    <div
      class="mx-auto flex max-w-[1440px] flex-col gap-6 px-5 py-14 lg:flex-row lg:items-start lg:justify-between lg:gap-12 lg:px-12 lg:py-[72px] xl:px-24"
    >
      <!-- Info -->
      <div v-reveal class="flex flex-col gap-6 lg:gap-8">
        <div class="flex flex-col gap-4 text-ink">
          <h2 class="text-2xl leading-[1.4] font-semibold lg:text-[40px] lg:leading-[1.2]">
            Contactos
          </h2>
          <p class="text-sm leading-[1.6] tracking-[0.2px] lg:text-base lg:tracking-normal">
            Fale connosco para parcerias, informações ou participação nas nossas
            actividades.
          </p>
        </div>

        <div class="flex flex-col gap-4 lg:gap-8">
          <div class="flex flex-col gap-4">
            <h3 :class="headingCls">Os nossos contactos</h3>
            <a
              :href="`mailto:${CONTACT_EMAIL}`"
              class="group/mail flex items-center gap-2 self-start text-sm leading-[1.6] font-medium tracking-[0.2px] text-ink transition-colors hover:text-secundary-500 lg:text-base lg:leading-[1.25] lg:tracking-normal"
            >
              <img src="/assets/images/icons/mail.svg" alt="" width="24" height="24" class="size-5 transition-transform duration-300 ease-soft group-hover/mail:-rotate-12 group-hover/mail:scale-110 lg:size-6" />
              {{ CONTACT_EMAIL }}
            </a>
          </div>

          <div class="flex flex-col gap-4">
            <h3 :class="headingCls">Siga-nos nas redes</h3>
            <div class="flex flex-wrap gap-2">
              <a
                v-for="s in SOCIALS"
                :key="s.icon"
                :href="s.href"
                target="_blank"
                rel="noopener noreferrer"
                class="group/s inline-flex h-10 items-center gap-2 rounded-[32px] bg-[#fcf7fc] p-2 text-sm leading-[1.6] font-medium tracking-[0.2px] text-ink transition-[background-color,translate,box-shadow] duration-200 hover:-translate-y-0.5 hover:bg-secundary-50 hover:shadow-card-sm active:scale-95 lg:h-12 lg:p-4 lg:text-base lg:leading-[1.25] lg:tracking-normal"
              >
                <img :src="s.iconSrc" alt="" width="24" height="24" class="size-5 transition-transform duration-300 ease-soft group-hover/s:scale-125 lg:size-6" />
                {{ s.label }}
              </a>
            </div>
          </div>

          <div class="flex flex-col gap-4">
            <h3 :class="headingCls">Faça parte da comunidade</h3>
            <a
              v-magnetic="0.2"
              :href="JOIN_HREF"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-shine inline-flex h-12 items-center justify-center self-start rounded-[32px] bg-brand-gradient px-6 text-sm leading-[1.6] font-semibold tracking-[0.2px] text-light-50 transition-[filter,translate,box-shadow,scale] duration-200 hover:-translate-y-0.5 hover:shadow-card-sm hover:brightness-115 active:scale-95 lg:h-14 lg:px-8 lg:text-base lg:leading-[1.5] lg:tracking-[0.3px]"
            >
              Juntar-se à comunidade
            </a>
          </div>
        </div>
      </div>

      <!-- Formulário -->
      <form
        v-reveal="150"
        class="relative flex w-full flex-col gap-6 rounded-[32px] border border-[#e5e5e5] bg-[#f9fafa] px-4 py-6 lg:w-[500px] lg:shrink-0 lg:gap-8 lg:p-8"
        novalidate
        @submit.prevent="onSubmit"
      >
        <h3 class="text-2xl leading-[1.4] font-semibold text-ink lg:text-[32px] lg:leading-[1.2]">
          Fale connosco
        </h3>

        <div class="flex flex-col gap-4">
          <div class="flex flex-col gap-4 lg:flex-row">
            <div :class="[fieldCls, 'lg:flex-1']">
              <label for="contact-name" :class="labelCls">Nome <span class="text-red-600" aria-hidden="true">*</span></label>
              <input
                id="contact-name"
                v-model="form.name"
                type="text"
                name="name"
                autocomplete="name"
                maxlength="120"
                required
                placeholder="Insira o seu nome"
                :aria-invalid="!!visibleErrors.name"
                :aria-describedby="visibleErrors.name ? 'contact-name-error' : undefined"
                :class="[inputCls, borderCls('name')]"
                @blur="touch('name')"
              />
              <p v-if="visibleErrors.name" id="contact-name-error" :class="errorCls">
                <UIcon name="i-lucide-circle-alert" class="h-3.5 w-3.5 shrink-0" />
                {{ visibleErrors.name }}
              </p>
            </div>
            <div :class="[fieldCls, 'lg:flex-1']">
              <label for="contact-email" :class="labelCls">Email <span class="text-red-600" aria-hidden="true">*</span></label>
              <input
                id="contact-email"
                v-model="form.email"
                type="email"
                name="email"
                autocomplete="email"
                maxlength="200"
                required
                placeholder="Insira o seu email"
                :aria-invalid="!!visibleErrors.email"
                :aria-describedby="visibleErrors.email ? 'contact-email-error' : undefined"
                :class="[inputCls, borderCls('email')]"
                @blur="touch('email')"
              />
              <p v-if="visibleErrors.email" id="contact-email-error" :class="errorCls">
                <UIcon name="i-lucide-circle-alert" class="h-3.5 w-3.5 shrink-0" />
                {{ visibleErrors.email }}
              </p>
            </div>
          </div>

          <div :class="fieldCls">
            <label for="contact-subject" :class="labelCls">Assunto <span class="text-red-600" aria-hidden="true">*</span></label>
            <div class="relative">
              <select
                id="contact-subject"
                v-model="form.subject"
                name="subject"
                required
                :aria-invalid="!!visibleErrors.subject"
                :aria-describedby="visibleErrors.subject ? 'contact-subject-error' : undefined"
                :class="[inputCls, borderCls('subject'), 'appearance-none pr-12', form.subject ? '' : 'text-ink-200']"
                @blur="touch('subject')"
                @change="touch('subject')"
              >
                <option value="" disabled>Seleccione o assunto</option>
                <option v-for="s in subjects" :key="s" :value="s" class="text-ink">
                  {{ s }}
                </option>
              </select>
              <img
                src="/assets/images/icons/arrow-down.svg"
                alt=""
                width="24"
                height="24"
                class="pointer-events-none absolute top-1/2 right-4 size-5 -translate-y-1/2 lg:size-6"
              />
            </div>
            <p v-if="visibleErrors.subject" id="contact-subject-error" :class="errorCls">
              <UIcon name="i-lucide-circle-alert" class="h-3.5 w-3.5 shrink-0" />
              {{ visibleErrors.subject }}
            </p>
          </div>

          <div class="flex flex-col gap-4">
            <label for="contact-message" :class="labelCls">Mensagem <span class="text-red-600" aria-hidden="true">*</span></label>
            <textarea
              id="contact-message"
              v-model="form.message"
              name="message"
              maxlength="5000"
              required
              placeholder="Escreva a sua mensagem"
              :aria-invalid="!!visibleErrors.message"
              :aria-describedby="visibleErrors.message ? 'contact-message-error' : undefined"
              :class="[textareaCls, borderCls('message')]"
              @blur="touch('message')"
            />
            <p v-if="visibleErrors.message" id="contact-message-error" :class="errorCls">
              <UIcon name="i-lucide-circle-alert" class="h-3.5 w-3.5 shrink-0" />
              {{ visibleErrors.message }}
            </p>
          </div>
        </div>

        <!-- honeypot anti-spam (invisível para pessoas) -->
        <input
          v-model="form.website"
          type="text"
          name="website"
          tabindex="-1"
          autocomplete="off"
          aria-hidden="true"
          class="absolute -left-[9999px] h-px w-px opacity-0"
        />

        <div aria-live="polite" class="-my-2 empty:hidden lg:-my-4">
          <p v-if="sent" class="rounded-[10px] bg-green-50 px-4 py-2.5 text-xs text-green-700">
            Mensagem enviada! Vamos responder para o seu email em breve.
          </p>
          <p v-else-if="error" class="rounded-[10px] bg-red-50 px-4 py-2.5 text-xs text-red-700">
            {{ error }}
          </p>
        </div>

        <button
          v-magnetic="0.15"
          type="submit"
          :disabled="!canSubmit || sending"
          class="btn-shine ml-auto flex h-12 items-center justify-center rounded-[32px] bg-brand-gradient px-6 text-sm leading-[1.6] font-semibold tracking-[0.2px] text-light-50 transition-[filter,opacity,box-shadow,scale] duration-200 lg:h-14 lg:w-[194px] lg:px-8 lg:text-base lg:leading-[1.5] lg:tracking-[0.3px]"
          :class="
            canSubmit && !sending
              ? 'hover:shadow-card-sm hover:brightness-115 active:scale-95'
              : 'opacity-45'
          "
        >
          <UIcon v-if="sending" name="i-lucide-loader-circle" class="mr-2 h-4 w-4 animate-spin" />
          {{ sending ? "A enviar…" : "Enviar" }}
        </button>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from "vue";
import { CONTACT_EMAIL, SOCIALS, JOIN_HREF } from "~/data/landing";

// Figma: campo branco, borda #e5e5e5, raio 32, placeholder #909090
const inputCls =
  "w-full h-12 lg:h-[60px] px-4 rounded-[32px] border bg-white text-sm lg:text-base font-medium leading-[1.6] tracking-[0.2px] lg:tracking-[0.3px] text-ink placeholder:text-ink-200 focus:outline-none focus:ring-4 transition-[border-color,box-shadow]";
const textareaCls = inputCls.replace("h-12 lg:h-[60px]", "h-[100px] py-4 resize-y");
const labelCls =
  "text-sm leading-[1.6] font-medium tracking-[0.2px] text-ink lg:text-base lg:leading-[1.2] lg:tracking-normal";
const fieldCls = "flex flex-col gap-2 lg:gap-4";
const headingCls =
  "text-base leading-[1.6] font-medium tracking-[0.3px] text-ink lg:text-2xl lg:leading-[1.2] lg:tracking-normal";
const errorCls = "flex items-center gap-1.5 mt-0.5 pl-1 text-xs text-red-600";

const subjects = ["Parceria", "Participação", "Informações", "Outro"];

type Field = "name" | "email" | "subject" | "message";

const emptyForm = () => ({
  name: "",
  email: "",
  subject: "",
  message: "",
  website: "", // honeypot
});

const form = reactive(emptyForm());
const sending = ref(false);
const sent = ref(false);
const error = ref("");

// campos que a pessoa já visitou: só aí mostramos o erro
const touched = reactive(new Set<Field>());
// erros devolvidos pelo servidor, por campo
const serverErrors = reactive<Partial<Record<Field, string>>>({});

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const errors = computed<Partial<Record<Field, string>>>(() => {
  const e: Partial<Record<Field, string>> = {};
  if (!form.name.trim()) e.name = "Insira o seu nome.";
  if (!form.email.trim()) e.email = "Insira o seu email.";
  else if (!EMAIL_REGEX.test(form.email.trim()))
    e.email = "Insira um email válido (ex.: nome@email.com).";
  if (!form.subject) e.subject = "Seleccione um assunto.";
  if (!form.message.trim()) e.message = "Escreva a sua mensagem.";
  return e;
});

const visibleErrors = computed(() => {
  const v: Partial<Record<Field, string>> = {};
  for (const f of ["name", "email", "subject", "message"] as Field[]) {
    const msg = serverErrors[f] ?? (touched.has(f) ? errors.value[f] : "");
    if (msg) v[f] = msg;
  }
  return v;
});

// só fica habilitado com todos os campos preenchidos (e email válido)
const canSubmit = computed(() => Object.keys(errors.value).length === 0);

const touch = (f: Field) => touched.add(f);

const borderCls = (f: Field) =>
  visibleErrors.value[f]
    ? "border-red-400 focus:border-red-500 focus:ring-red-100"
    : "border-[#e5e5e5] focus:border-primary-500 focus:ring-secundary-100";

// ao voltar a escrever, limpa avisos anteriores
watch(
  () => [form.name, form.email, form.subject, form.message],
  (fields, prev) => {
    // ignora o reset feito após envio com sucesso
    if (sending.value || fields.every((f) => !f)) return;
    (["name", "email", "subject", "message"] as Field[]).forEach((f, i) => {
      if (fields[i] !== prev?.[i]) delete serverErrors[f];
    });
    sent.value = false;
    error.value = "";
  },
);

const onSubmit = async () => {
  if (!canSubmit.value || sending.value) return;
  sending.value = true;
  error.value = "";
  try {
    await $fetch("/api/contact", { method: "POST", body: { ...form } });
    Object.assign(form, emptyForm());
    touched.clear();
    sent.value = true;
  } catch (e: any) {
    const fields = e?.data?.data?.fields as
      | Partial<Record<Field, string>>
      | undefined;
    if (fields && Object.keys(fields).length) {
      Object.assign(serverErrors, fields);
    } else {
      error.value =
        e?.data?.message ??
        "Não foi possível enviar a mensagem. Tente novamente.";
    }
  } finally {
    sending.value = false;
  }
};
</script>
