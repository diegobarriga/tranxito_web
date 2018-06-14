import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n.use(LanguageDetector).init({
  // we init with resources
  resources: {
    en: {
      translations: {
        'Create driver': 'Create driver',
        'Create multiple drivers': 'Create multiple drivers',

        'Create vehicle': 'Create vehicle',
        'Create multiple vehicles': 'Create multiple vehicles',
      },
    },
    es: {
      translations: {
        'Create driver': 'Crear conductor',
        'Create multiple drivers': 'Crear multiples conductores',

        'Create vehicle': 'Crear vehiculo',
        'Create multiple vehicles': 'Crear multiples vehiculos',
      },
    },
  },
  fallbackLng: 'en',
  debug: true,

  // have a common namespace used around the full app
  ns: ['translations'],
  defaultNS: 'translations',

  keySeparator: false, // we use content as keys

  interpolation: {
    escapeValue: false, // not needed for react!!
    formatSeparator: ',',
  },

  react: { wait: true },
});

export default i18n;
