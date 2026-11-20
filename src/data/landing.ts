import type {
  NavItem,
  Stat,
  Activity,
  Testimonial,
  TeamMember,
} from "~/types/landing";

export const NAV_ITEMS: NavItem[] = [
  { label: "Quem somos", href: "#quem-somos" },
  { label: "Actividades", href: "#actividades" },
  { label: "Testemunhos", href: "#testemunhos" },
  { label: "Nossa equipa", href: "#equipa" },
  { label: "Contactos", href: "#contactos" },
];

// Navegação do rodapé (Figma): inclui Métricas e Parceiros
export const FOOTER_NAV_ITEMS: NavItem[] = [
  { label: "Quem Somos", href: "#quem-somos" },
  { label: "Actividades", href: "#actividades" },
  { label: "Métricas", href: "#metricas" },
  { label: "Testemunhos", href: "#testemunhos" },
  { label: "Nossa Equipa", href: "#equipa" },
  { label: "Parceiros", href: "#parceiros" },
  { label: "Contactos", href: "#contactos" },
];

export const STATS: Stat[] = [
  { value: "+320", label: "Membros construindo o futuro da tecnologia." },
  { value: "+25", label: "Formações, workshops, encontros." },
  { value: "+12", label: "Províncias com membros na comunidade." },
];

// Logos dos parceiros (Figma: "Nossos principais parceiros na jornada")
// TODO: confirmar os links oficiais de cada parceiro
export const PARTNERS: { name: string; logo: string; width: number; height: number }[] = [
  { name: "Match", logo: "/assets/images/partners/match.svg", width: 77, height: 23 },
  { name: "Facebook", logo: "/assets/images/partners/facebook.svg", width: 119, height: 32 },
  { name: "Instagram", logo: "/assets/images/partners/instagram.svg", width: 91, height: 32 },
  { name: "Eduon", logo: "/assets/images/partners/eduon.svg", width: 83, height: 22 },
  { name: "LinkedIn", logo: "/assets/images/partners/linkedin.svg", width: 120, height: 32 },
  { name: "Google", logo: "/assets/images/partners/google.svg", width: 81, height: 32 },
  { name: "Discover", logo: "/assets/images/partners/discover.svg", width: 72, height: 12 },
  { name: "Framer", logo: "/assets/images/partners/framer.svg", width: 97, height: 32 },
  { name: "Reddit", logo: "/assets/images/partners/reddit.svg", width: 93, height: 32 },
  { name: "Airbnb", logo: "/assets/images/partners/airbnb.svg", width: 100, height: 32 },
  { name: "Microsoft", logo: "/assets/images/partners/microsoft.svg", width: 114, height: 32 },
];

export const ACTIVITIES: Activity[] = [
  {
    id: "primeira-actividade",
    title: "Primeira actividade",
    description:
      "A CDA organizou a sua primeira actividade entre membros da comunidade…",
    image: "/assets/images/activities/1-figma.jpg",
    badge: "Hoje, as 18h ao VIVO.",
  },
  {
    id: "sou-mulher-ti",
    title: "Primeira edição do projecto Sou Mulher e TI É para mim",
    description:
      "A WTA organiza um programa dedicado a apoiar mulheres no desenvolvimento de habilidades técnicas e de liderança.\n\nO programa oferece mentorias, workshops, networking e recursos práticos para capacitar participantes a assumir posições de destaque no setor tecnológico e transformar oportunidades em impacto real.",
    featured: true,
  },
  {
    id: "elasnocode",
    title: "Lançamento ElasNoCode",
    description:
      "ElasNoCode, uma iniciativa de capacitação feminina em soluções digitais para enco…",
    image: "/assets/images/activities/2-figma.jpg",
  },
  {
    id: "angotic-2023",
    title: "ANGOTIC 2023",
    description:
      "A CDA participou do maior evento de TI em Angola, o ANGOTIC, que contou com…",
    image: "/assets/images/activities/3-figma.jpg",
  },
  {
    id: "empreendedorismo",
    title: "Semana do empreendedorismo",
    description:
      "Na semana do empreendedorismo várias mulheres que promoveram a inclusão fe…",
    image: "/assets/images/activities/4-figma.jpg",
  },
  {
    id: "devfest-2023",
    title: "DEVFEST 2023",
    description:
      "O DevFest do GDG Luanda contou com Margarida, Goureth e Creuma, líderes da…",
    image: "/assets/images/activities/5-figma.jpg",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Lucinda Gaio",
    role: "UI/UX Designer",
    memberSince: "Membro há 3 anos",
    avatar: "/assets/images/what-they-say/1-figma.jpg",
    text: "Participar da CDA Girl mudou minha visão sobre tecnologia. Aprendi habilidades valiosas e ganhei confiança para seguir minha carreira no setor tecnológico e conheci pessoas novas e talentosas.",
  },
  {
    name: "Marta Luís",
    role: "Técn.Informática",
    memberSince: "Membro há 1 anos",
    avatar: "/assets/images/what-they-say/2-figma.jpg",
    text: "A experiência na CDA Girl transformou minha visão da tecnologia. Aprendi competências essenciais, fortaleci minha confiança profissional e conectei-me com pessoas motivadas.",
  },
  {
    name: "Nzinga Manuel",
    role: "Frontend",
    memberSince: "Membro há 6 meses",
    avatar: "/assets/images/what-they-say/3-figma.jpg",
    // recorte do Figma (foto horizontal)
    avatarCrop: { width: "196.38%", height: "130.93%", left: "-16.04%", top: "-8.3%" },
    text: "A CDA Girl mudou minha visão sobre tecnologia. Aprendi habilidades essenciais, ganhei confiança para minha carreira e conheci pessoas incríveis e cheias de talento e inspiração.",
  },
];

export const TEAM: TeamMember[] = [
  {
    name: "Margarida André",
    role: "Embaixadora Líder",
    photo: "/assets/images/meet-the-team/1-figma.jpg",
  },
  { name: "Goreth Manuel", role: "Embaixadora", photo: "/assets/images/meet-the-team/2-figma.jpg" },
  { name: "Joice Freitas", role: "Membro", photo: "/assets/images/meet-the-team/3-figma.jpg" },
  { name: "Nazareth Manuel", role: "Membro", photo: "/assets/images/meet-the-team/4-figma.jpg" },
];

export const CONTACT_EMAIL = "cdagirls.ti@gmail.com";

export const LINKEDIN_URL = "https://www.linkedin.com/company/cda-girls/";
export const INSTAGRAM_URL = "https://www.instagram.com/cda__girls/";
export const FACEBOOK_URL =
  "https://www.facebook.com/profile.php?id=100090679090860";

export const SOCIALS = [
  { label: "CDA Girls", icon: "i-lucide-facebook", iconSrc: "/assets/images/icons/facebook.svg", href: FACEBOOK_URL },
  { label: "cda__girls", icon: "i-lucide-instagram", iconSrc: "/assets/images/icons/instagram.svg", href: INSTAGRAM_URL },
  { label: "CDA Girls", icon: "i-lucide-linkedin", iconSrc: "/assets/images/icons/linkedin.svg", href: LINKEDIN_URL },
];

// Avatares do card "+300 mulheres estão na comunidade" (hero)
export const COMMUNITY_AVATARS: string[] = [
  "/assets/images/section-hero/avatar-1.png",
  "/assets/images/section-hero/avatar-2.png",
  "/assets/images/section-hero/avatar-3.png",
  "/assets/images/section-hero/avatar-4.png",
];

// Botões "Juntar-se": rota do servidor que redireciona para o grupo privado
// (o link real fica em NUXT_JOIN_URL, nunca no código do site)
export const JOIN_HREF = "/juntar-se";
