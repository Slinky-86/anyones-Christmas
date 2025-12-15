export interface CardTemplate {
  id: string;
  name: string;
  bgClass: string; // Tailwind classes for background
  bgImage?: string; // Optional image background
  textColor: string;
  fontFamily: string;
  borderClass?: string;
  overlayClass?: string;
  accentColor: string;
}

export interface CardData {
  templateId: string;
  message: string;
  senderName: string;
}

export enum AppMode {
  CREATE = 'CREATE',
  VIEW = 'VIEW'
}
