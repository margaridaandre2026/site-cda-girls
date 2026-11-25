const SUBJECTS = ["Parceria", "Participação", "Informações", "Outro"];
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// limite simples por IP: 5 envios a cada 10 minutos
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

// logo do cabeçalho do email (server/assets/email-logo.png), em base64, lido uma vez
let logoBase64: string | null = null;
async function getLogoBase64() {
  if (logoBase64 === null) {
    const raw = await useStorage("assets:server").getItemRaw("email-logo.png");
    logoBase64 = raw ? Buffer.from(raw as ArrayBuffer).toString("base64") : "";
  }
  return logoBase64;
}

export default defineEventHandler(async (event) => {
  const body = await readBody<Record<string, unknown>>(event);

  // honeypot: bots preenchem o campo escondido
  if (typeof body?.website === "string" && body.website.length > 0) {
    return { ok: true };
  }

  const name = String(body?.name ?? "").trim().slice(0, 120);
  const email = String(body?.email ?? "").trim().slice(0, 200);
  const subject = String(body?.subject ?? "").trim();
  const message = String(body?.message ?? "").trim().slice(0, 5000);

  // erros por campo, para o formulário mostrar abaixo de cada input
  const fields: Record<string, string> = {};
  if (!name) fields.name = "Insira o seu nome.";
  if (!email) fields.email = "Insira o seu email.";
  else if (!EMAIL_REGEX.test(email)) fields.email = "Insira um email válido (ex.: nome@email.com).";
  if (!SUBJECTS.includes(subject)) fields.subject = "Seleccione um assunto.";
  if (!message) fields.message = "Escreva a sua mensagem.";

  if (Object.keys(fields).length) {
    throw createError({
      statusCode: 400,
      message: "Verifique os campos assinalados e tente novamente.",
      data: { fields },
    });
  }

  const ip = getRequestIP(event, { xForwardedFor: true }) ?? "unknown";
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    throw createError({
      statusCode: 429,
      message: "Já enviou várias mensagens seguidas. Aguarde 10 minutos e tente novamente.",
    });
  }
  hits.set(ip, [...recent, now]);

  const { mailUser, mailPass, mailFrom, contactTo } =
    useRuntimeConfig(event);
  const to = contactTo || mailUser;
  if (!mailPass || !to) {
    console.error("[contacto] NUXT_MAIL_PASS / NUXT_MAIL_USER não definidos");
    throw createError({
      statusCode: 500,
      message: "O envio não está disponível neste momento. Tente mais tarde ou escreva-nos por email.",
    });
  }

  const logo = await getLogoBase64();

  try {
    // envio via API do Resend (https://resend.com/docs/api-reference/emails/send-email)
    await $fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${mailPass}` },
      body: {
        from: mailFrom,
        to: [to],
        reply_to: `${name.replace(/["<>]/g, "")} <${email}>`,
        subject: `[Site] ${subject} — ${name}`,
        text: `Nome: ${name}\nEmail: ${email}\nAssunto: ${subject}\n\n${message}`,
        html: contactEmailHtml({ name, email, subject, message }),
        // logo embutido no email (aparece no lugar de cid:EMAIL_LOGO_CID)
        attachments: logo
          ? [
              {
                filename: "cda-girls.png",
                content: logo,
                content_type: "image/png",
                content_id: EMAIL_LOGO_CID,
              },
            ]
          : undefined,
      },
    });
  } catch (err) {
    console.error("[contacto] falha no envio", err);
    throw createError({
      statusCode: 502,
      message: "Não foi possível enviar a mensagem. Tente novamente dentro de alguns minutos.",
    });
  }

  return { ok: true };
});
