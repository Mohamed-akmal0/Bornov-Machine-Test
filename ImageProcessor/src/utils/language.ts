export const countryToLanguage: Record<string, string> = {
  IN: 'hi',
  US: 'en',
  GB: 'en',
  FR: 'fr',
  DE: 'de',
  ES: 'es',
  MX: 'es',
  JP: 'ja',
  CN: 'zh',
  SA: 'ar',
  AE: 'ar',
  KR: 'ko',
  BR: 'pt',
  IT: 'it',
  RU: 'ru',
};

export const imageTitles: Record<string, string> = {
  en: 'My Image',
  hi: 'मेरी तस्वीर',
  fr: 'Mon Image',
  de: 'Mein Bild',
  es: 'Mi Imagen',
  ar: 'صورتي',
  ja: '私の画像',
  zh: '我的图片',
  ko: '내 이미지',
  pt: 'Minha Imagem',
  it: 'La Mia Immagine',
  ru: 'Моё Изображение',
};

export const getImageTitle = (countryCode: string): string => {
  const lang = countryToLanguage[countryCode] || 'en';
  return imageTitles[lang] || imageTitles['en'];
};
