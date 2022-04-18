import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translation from "../locales/th/translation.json";

const resources = {
  th: {
    translation,
  },
};

i18n
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources,
    lng: "th",
    debug: process.env.NODE_ENV === "development",
  });

export { resources };
export default i18n;
