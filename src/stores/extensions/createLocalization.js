import { types } from "mobx-state-tree";
import i18next from "i18next";
import Backend from "i18next-xhr-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import Cache from "i18next-localstorage-cache";

let fallbackLng = "ru";

export function createLocalization() {
  return types
    .model({
      language: types.optional(types.string, "")
    })
    .actions(self => ({
      changeLanguage(language) {
        i18next.changeLanguage(language);
        self.language = language;
      },
      initI18next() {
        i18next
          .use(Cache)
          .use(Backend)
          .use(LanguageDetector)
          .use(initReactI18next)
          .init({
            fallbackLng,
            lng: "ru",
            interpolation: {
              escapeValue: true
            },
            detection: {
              order: ["localStorage"]
            },
            react: {
              useSuspense: false,
              wait: true
            }
          });
        self.language = i18next.language;
      }
    }));
}
