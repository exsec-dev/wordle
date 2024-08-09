import React, { createContext, useState } from 'react';

enum LangOptions {
  english = 'en',
  russian = 'ru',
}

interface ILangContext {
  lang: LangOptions,
  switchLang: () => void,
}

const LangContext = createContext<ILangContext>({ lang: LangOptions.english, switchLang: () => {} });

const LangProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentLang, setCurrentLang] = useState<LangOptions>(LangOptions.english);

  const switchLang = () => {
    setCurrentLang(
      currentLang === LangOptions.english ?
      LangOptions.russian : LangOptions.english
    );
  }

  return (
    <LangContext.Provider value={{ lang: currentLang, switchLang }}>
      {children}
    </LangContext.Provider>
  );
};

export { LangContext, LangProvider, LangOptions };
