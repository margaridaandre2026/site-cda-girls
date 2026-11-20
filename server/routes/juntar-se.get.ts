// Redireciona para o grupo privado da comunidade (WhatsApp).
// O link vive só no servidor (NUXT_JOIN_URL no .env) e nunca é enviado
// no HTML/JS do site — só é revelado a quem clica no botão.
export default defineEventHandler((event) => {
  const { joinUrl } = useRuntimeConfig(event);

  setResponseHeaders(event, {
    "Cache-Control": "no-store",
    "X-Robots-Tag": "noindex, nofollow",
    "Referrer-Policy": "no-referrer",
  });

  if (!joinUrl) {
    console.error("[juntar-se] NUXT_JOIN_URL não definido");
    return sendRedirect(event, "/#contactos", 302);
  }

  return sendRedirect(event, joinUrl, 302);
});
