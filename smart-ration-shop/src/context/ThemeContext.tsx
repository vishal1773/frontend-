import React, { createContext, useContext, useMemo, useState } from 'react';
import { colors, darkColors, paperDarkTheme, paperTheme, ThemeColors } from '../theme/theme';

type ThemeContextValue = {
  isDark: boolean;
  themeColors: ThemeColors;
  paperThemeConfig: typeof paperTheme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  const value = useMemo(
    () => ({
      isDark,
      themeColors: isDark ? darkColors : colors,
      paperThemeConfig: isDark ? paperDarkTheme : paperTheme,
      toggleTheme: () => setIsDark((prev) => !prev),
    }),
    [isDark],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
