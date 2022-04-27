import { LanguageConfig } from "../types";

export const languageConfig: LanguageConfig = {
  /** Default language for new user */
  defaultLanguage: "th",
  /** Fallback language when translation is not found */
  fallbackLanguage: "en",
  languages: [
    {
      code: "en",
      name: "English",
      shortName: "EN",
    },
    {
      code: "th",
      name: "ภาษาไทย",
      shortName: "ไทย",
    },
  ],
};

export default languageConfig;
