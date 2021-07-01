import { initTheme } from './theme/provider';
import { THEMES } from './theme/configure';

const {
  Context,
  Consumer,
  Provider,
  useTheme,
  useThemeContext,
  useThemeSwitcher,
  ThemedGlobals
} = initTheme(THEMES, 'light');

export * from './theme/css';

export {
  Context,
  Consumer,
  Provider,
  useTheme,
  useThemeContext,
  useThemeSwitcher,
  ThemedGlobals
};

