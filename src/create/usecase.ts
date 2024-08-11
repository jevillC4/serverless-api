import { Personaje, englishToSpanishMap } from './character';

export const isEnglishData = (data: any): boolean => {
  return Object.keys(data).some((key) =>
    englishToSpanishMap.hasOwnProperty(key)
  );
};

export const convertToSpanish = (data: any): Personaje => {
  const result: any = {};
  for (const key in data) {
    const spanishKey = englishToSpanishMap[key] || key;
    result[spanishKey] = data[key];
  }
  return result as Personaje;
};
