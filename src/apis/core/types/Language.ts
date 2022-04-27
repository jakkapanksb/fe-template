export interface LanguageInfo {
  code: string;
  name: string;
  shortName: string;
}

export interface LanguageConfig {
  defaultLanguage: string;
  fallbackLanguage: string;
  languages: LanguageInfo[];
}
