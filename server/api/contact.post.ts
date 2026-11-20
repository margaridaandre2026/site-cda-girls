import nodemailer from "nodemailer";

const SUBJECTS = ["Parceria", "Participação", "Informações", "Outro"];
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// limite simples por IP: 5 envios a cada 10 minutos
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

const escapeHtml = (s: string) =>
  s.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ]!,
  );

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
  else if (!EMAIL_REGEX.test(email)) fields.email = "Insira um email válido.";
  if (!SUBJECTS.includes(subject)) fields.subject = "Seleciona um assunto.";
  if (!message) fields.message = "Escreva a sua mensagem.";

  if (Object.keys(fields).length) {
    throw createError({
      statusCode: 400,
      message: "Preencha todos os campos correctamente.",
      data: { fields },
    });
  }

  const ip = getRequestIP(event, { xForwardedFor: true }) ?? "unknown";
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    throw createError({
      statusCode: 429,
      message: "Muitas mensagens enviadas. Tente novamente mais tarde.",
    });
  }
  hits.set(ip, [...recent, now]);

  const { mailUser, mailPass, contactTo } = useRuntimeConfig(event);
  if (!mailUser || !mailPass) {
    console.error("[contacto] NUXT_MAIL_USER / NUXT_MAIL_PASS não definidos");
    throw createError({
      statusCode: 500,
      message: "Serviço de email indisponível.",
    });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: mailUser, pass: mailPass },
  });

  try {
    await transporter.sendMail({
      from: `"Site CDA Girls" <${mailUser}>`,
      to: contactTo || mailUser,
      replyTo: `"${name.replace(/"/g, "")}" <${email}>`,
      subject: `[Site] ${subject} — ${name}`,
      text: `Nome: ${name}\nEmail: ${email}\nAssunto: ${subject}\n\n${message}`,
      html: `
        <p><strong>Nome:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Assunto:</strong> ${escapeHtml(subject)}</p>
        <hr />
        <p style="white-space:pre-line">${escapeHtml(message)}</p>
      `,
    });
  } catch (err) {
    console.error("[contacto] falha no envio", err);
    throw createError({
      statusCode: 502,
      message: "Não foi possível enviar a mensagem.",
    });
  }

  return { ok: true };
});
