export interface NavItem {
  label: string;
  href: string; // âncora #id da secção
}

export interface Stat {
  value: string;
  label: string;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  image?: string;
  badge?: string;
  /** Card expandido com botões Ver detalhes / Participar */
  featured?: boolean;
}

export interface Testimonial {
  name: string;
  role: string;
  memberSince: string;
  avatar: string;
  /** Recorte personalizado do avatar (posição absoluta, em %) */
  avatarCrop?: { width: string; height: string; left: string; top: string };
  text: string;
}

export interface TeamMember {
  name: string;
  role: string;
  photo: string;
}
