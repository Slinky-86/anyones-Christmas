import { CardTemplate } from './types';

export const CARD_TEMPLATES: CardTemplate[] = [
  {
    id: 'snowy-forest',
    name: 'Snowy Forest',
    bgClass: 'bg-emerald-900',
    bgImage: 'https://images.unsplash.com/photo-1482685945432-29a7abf2f466?q=80&w=1200&auto=format&fit=crop',
    textColor: 'text-white',
    fontFamily: 'font-mountains',
    overlayClass: 'bg-black/30',
    accentColor: 'text-emerald-200'
  },
  {
    id: 'glowing-tree',
    name: 'Glowing Tree',
    bgClass: 'bg-slate-900',
    bgImage: 'https://images.unsplash.com/photo-1574626156942-1e9c20a455a1?q=80&w=1200&auto=format&fit=crop',
    textColor: 'text-amber-50',
    fontFamily: 'font-great-vibes',
    overlayClass: 'bg-black/50',
    accentColor: 'text-amber-200'
  },
  {
    id: 'cozy-fireplace',
    name: 'Cozy Fireplace',
    bgClass: 'bg-orange-900',
    bgImage: 'https://images.unsplash.com/photo-1543258103-a62bdc069871?q=80&w=1200&auto=format&fit=crop',
    textColor: 'text-orange-50',
    fontFamily: 'font-playfair',
    overlayClass: 'bg-black/50',
    accentColor: 'text-orange-200'
  },
  {
    id: 'winter-village',
    name: 'Winter Village',
    bgClass: 'bg-blue-900',
    bgImage: 'https://images.unsplash.com/photo-1514733670139-4d87a1941d55?q=80&w=1200&auto=format&fit=crop',
    textColor: 'text-blue-50',
    fontFamily: 'font-mountains',
    overlayClass: 'bg-slate-900/50',
    accentColor: 'text-blue-200'
  },
  {
    id: 'reindeer-snow',
    name: 'Reindeer in Snow',
    bgClass: 'bg-stone-800',
    bgImage: 'https://images.unsplash.com/photo-1534234828563-025c2763329d?q=80&w=1200&auto=format&fit=crop',
    textColor: 'text-white',
    fontFamily: 'font-playfair',
    overlayClass: 'bg-black/40',
    accentColor: 'text-stone-200'
  },
  {
    id: 'snowman-fun',
    name: 'Frosty Friend',
    bgClass: 'bg-cyan-900',
    bgImage: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=1200&auto=format&fit=crop',
    textColor: 'text-cyan-50',
    fontFamily: 'font-mountains',
    overlayClass: 'bg-black/30',
    accentColor: 'text-cyan-200'
  },
  {
    id: 'holiday-cookies',
    name: 'Holiday Treats',
    bgClass: 'bg-red-950',
    bgImage: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcf8?q=80&w=1200&auto=format&fit=crop',
    textColor: 'text-red-50',
    fontFamily: 'font-great-vibes',
    overlayClass: 'bg-black/50',
    accentColor: 'text-red-200'
  },
  {
    id: 'winter-cabin',
    name: 'Winter Cabin',
    bgClass: 'bg-indigo-950',
    bgImage: 'https://images.unsplash.com/photo-1478265409131-1f65c88f965c?q=80&w=1200&auto=format&fit=crop',
    textColor: 'text-indigo-50',
    fontFamily: 'font-playfair',
    overlayClass: 'bg-black/50',
    accentColor: 'text-indigo-200'
  },
  {
    id: 'city-lights',
    name: 'City Lights',
    bgClass: 'bg-slate-900',
    bgImage: 'https://images.unsplash.com/photo-1543831861-1d7d0a7933f2?q=80&w=1200&auto=format&fit=crop',
    textColor: 'text-amber-100',
    fontFamily: 'font-great-vibes',
    overlayClass: 'bg-black/60',
    accentColor: 'text-amber-300'
  },
  {
    id: 'snowy-path',
    name: 'Peaceful Path',
    bgClass: 'bg-slate-800',
    bgImage: 'https://images.unsplash.com/photo-1485594050903-8e8ee5322318?q=80&w=1200&auto=format&fit=crop',
    textColor: 'text-white',
    fontFamily: 'font-mountains',
    overlayClass: 'bg-black/30',
    accentColor: 'text-blue-200'
  }
];

export const PREMADE_GREETINGS = [
    "Wishing you a season full of light and laughter for you and your family.",
    "May your days be merry and bright, and your new year full of hope.",
    "Sending you festive vibes and warm holiday hugs!",
    "Have a holly, jolly Christmas and a fantastic New Year!",
    "Warmest thoughts and best wishes for a wonderful holiday season.",
    "Peace, love, and joy to you this Christmas.",
    "Cheers to warm holiday memories and a bright new year!",
    "May the magic of Christmas fill every corner of your heart and home.",
    "Wishing you peace, love, and joy this holiday season and throughout 2024.",
    "Hope your stocking is stuffed full of joy this year!"
];

export const DEFAULT_MESSAGE = PREMADE_GREETINGS[0];
export const DEFAULT_SENDER = "";