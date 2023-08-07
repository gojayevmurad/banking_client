import { initReactI18next } from "react-i18next";
import i18n from "i18next";

import { azTranslations } from "../constants/azLang";
import { enTranslations } from "../constants/enLang";

i18n.use(initReactI18next).init({
  lng: "",
  resources: {
    en: {
      translation: enTranslations,
    },
    az: {
      translation: azTranslations,
    },
  },
  keySeparator: true,
  interpolation: { escapeValue: false },
});

export default i18n;
