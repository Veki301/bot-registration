import Polyglot from "node-polyglot";

// global instance
let polyglot: Polyglot;

export default class LocaleService {
  static initLocalization(
    locale: string,
    messages: Record<string, Record<string, string>>
  ) {
    const localeMessages = locale && messages[locale] ? messages[locale] : null;

    if (localeMessages === null) throw new Error(`Missing locale: ${locale}`);

    polyglot = new Polyglot({ locale, phrases: localeMessages });
  }

  static translate(name: string, params?: Record<string, any>) {
    if (polyglot == null) {
      throw new Error("Locale has not been initialized");
    }

    return polyglot.t(name, params || {});
  }
}

export const t = (name: string, params?: Record<string, any>) =>
  LocaleService.translate(name, params);
