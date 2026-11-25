// Modelo do email enviado pelo "Fale connosco".
// Clientes de email (Gmail, Outlook…) ignoram CSS externo e <style> em parte,
// por isso o layout é em tabelas com estilos inline.

const BRAND = {
  primary: "#4a1759",
  accent: "#9130a8",
  pink: "#cc44ec",
  soft: "#faecfd",
  page: "#f6f1f7",
  ink: "#1a1a1a",
  muted: "#6b6b6b",
  border: "#eadcef",
};

// imagem anexada ao email (ver contact.post.ts) e referida por cid:
export const EMAIL_LOGO_CID = "cda-girls-logo";

const escapeHtml = (s: string) =>
  s.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ]!,
  );

interface ContactEmail {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function contactEmailHtml({ name, email, subject, message }: ContactEmail) {
  const date = new Date().toLocaleString("pt-PT", {
    timeZone: "Africa/Luanda",
    dateStyle: "long",
    timeStyle: "short",
  });
  const replyHref = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(
    `Re: ${subject} — CDA Girls`,
  )}`;
  const initial = escapeHtml(name.charAt(0).toUpperCase() || "?");
  const safe = {
    name: escapeHtml(name),
    email: escapeHtml(email),
    subject: escapeHtml(subject),
    message: escapeHtml(message).replace(/\r?\n/g, "<br />"),
  };

  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:10px 12px 10px 0;border-bottom:1px solid ${BRAND.border};font-size:13px;line-height:20px;color:${BRAND.muted};width:1%;white-space:nowrap;vertical-align:middle;">${label}</td>
      <td style="padding:10px 0;border-bottom:1px solid ${BRAND.border};font-size:15px;line-height:20px;color:${BRAND.ink};font-weight:600;vertical-align:middle;">${value}</td>
    </tr>`;

  return `<!doctype html>
<html lang="pt">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="light" />
  <title>Nova mensagem do site</title>
</head>
<body style="margin:0;padding:0;background:${BRAND.page};font-family:Montserrat,'Segoe UI',Helvetica,Arial,sans-serif;">
  <!-- texto de pré-visualização na caixa de entrada -->
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
    ${safe.name} enviou uma mensagem sobre "${safe.subject}" pelo site.
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.page};padding:32px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:24px;overflow:hidden;box-shadow:0 8px 30px rgba(74,23,89,0.08);">

          <!-- cabeçalho -->
          <tr>
            <td style="background:${BRAND.primary};background-image:linear-gradient(90deg,${BRAND.primary},${BRAND.accent});padding:32px 32px 28px;">
              <img src="cid:${EMAIL_LOGO_CID}" alt="CDA Girls" width="140" height="45" style="display:block;border:0;width:140px;height:45px;" />
              <div style="font-size:24px;line-height:1.3;font-weight:700;color:#ffffff;margin-top:24px;">
                Nova mensagem do site
              </div>
              <div style="font-size:13px;color:#efc5f9;margin-top:6px;">Recebida a ${escapeHtml(date)}</div>
            </td>
          </tr>

          <!-- remetente -->
          <tr>
            <td style="padding:28px 32px 8px;">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="width:48px;height:48px;border-radius:24px;background:${BRAND.soft};color:${BRAND.accent};font-size:20px;font-weight:700;text-align:center;vertical-align:middle;">${initial}</td>
                  <td style="padding-left:14px;">
                    <div style="font-size:17px;font-weight:700;color:${BRAND.ink};">${safe.name}</div>
                    <a href="mailto:${safe.email}" style="font-size:14px;color:${BRAND.accent};text-decoration:none;">${safe.email}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- detalhes -->
          <tr>
            <td style="padding:12px 32px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                ${row("Assunto", `<span style="display:inline-block;background:${BRAND.soft};color:${BRAND.primary};border-radius:999px;padding:2px 12px;font-size:13px;line-height:20px;vertical-align:middle;">${safe.subject}</span>`)}
              </table>
            </td>
          </tr>

          <!-- mensagem -->
          <tr>
            <td style="padding:24px 32px 8px;">
              <div style="font-size:13px;color:${BRAND.muted};margin-bottom:10px;">Mensagem</div>
              <div style="background:${BRAND.soft};border-left:4px solid ${BRAND.pink};border-radius:12px;padding:18px 20px;font-size:15px;line-height:1.65;color:${BRAND.ink};">
                ${safe.message}
              </div>
            </td>
          </tr>

          <!-- botão responder -->
          <tr>
            <td align="center" style="padding:28px 32px 36px;">
              <a href="${escapeHtml(replyHref)}" style="display:inline-block;background:${BRAND.primary};background-image:linear-gradient(90deg,${BRAND.primary},${BRAND.accent});color:#ffffff;text-decoration:none;font-size:15px;font-weight:700;padding:14px 32px;border-radius:32px;">
                Responder a ${safe.name.split(" ")[0]}
              </a>
              <div style="font-size:12px;color:${BRAND.muted};margin-top:12px;">
                Ou carregue em "Responder" no seu email: a resposta vai directamente para ${safe.email}.
              </div>
            </td>
          </tr>

          <!-- rodapé -->
          <tr>
            <td style="background:${BRAND.primary};padding:18px 32px;text-align:center;font-size:12px;color:#efc5f9;">
              Enviado pelo formulário "Fale connosco" do site CDA Girls
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
