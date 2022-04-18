import languageConfig from '../config/languageConfig';

export function getNormalizedLanguageCode(language: string): string {
  if (!language) return languageConfig.fallbackLanguage;

  const acceptedLanguage = languageConfig.languages.map((language) => language.code);
  const [languageSplit] = language.split('-');
  const selectedLanguage = languageSplit.toLowerCase();

  if (!acceptedLanguage.includes(selectedLanguage)) return languageConfig.fallbackLanguage;

  return selectedLanguage;
}

export default getNormalizedLanguageCode;
