import { ThemeProvider, useTheme as useEmotionTheme, Global, Theme, css } from '@emotion/react';
import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { IThemeContext, ThemeMap, InitGlobals, ITheme } from './types';

// Some basic defaults which will
// switch background and font color
// when switching theme mode.
const defaultGlobals = <T extends ITheme>(theme: T) => {
  return css`
    * {
      box-sizing: border-box;
    }
    html,
    body {
      padding: 0;
      margin: 0;
      background: ${theme.body.background};
      color: ${theme.font.color};
      font-size: ${theme.font.size};
      font-weight: ${theme.font.weight};
      min-height: 100%;
      font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    }
    #__next {
      min-height: 100%;
    }
    a {
      color: inherit;
      text-decoration: none;
    }
  `;
};

const initTheme = <T extends ThemeMap>(themes: T, defaultTheme: keyof T, initGlobals = defaultGlobals as InitGlobals) => {

  const Context = createContext({
    themes,
    active: defaultTheme,
    setActive: (theme) => { }
  } as IThemeContext<T>);

  const Provider = (props: { children: ReactNode, active?: keyof T }) => {

    const [active, setActive] = useState(props.active || defaultTheme);

    const value = useMemo(() => {
      return {
        themes,
        active,
        setActive
      }
    }, [active]);

    return (
      <Context.Provider value={value}>
        <ThemeProvider theme={themes[active]}>
          {props.children}
        </ThemeProvider>
      </Context.Provider>
    )

  };

  const Consumer = Context.Consumer;

  Context.displayName = 'ThemeContext';

  const useThemeContext = () => useContext(Context);

  const useTheme = () => {
    const ctx = useThemeContext();
    return ctx.themes[ctx.active];
  };

  const useThemeSwitcher = () => {
    const ctx = useThemeContext();
    return {
      toggle: ctx.setActive
    };
  }

  const ThemedGlobals = ({ handler }: { handler?: InitGlobals }) => {
    const theme = useTheme();
    initGlobals = handler ? handler : initGlobals;
    return (
      <Global styles={initGlobals(theme)} />
    );
  };

  const ThemeToggle = () => {
    const switcher = useThemeSwitcher();
    return (
      <div>

      </div>
    );
  };

  return {
    Context,
    Consumer,
    Provider,
    useTheme,
    useThemeContext,
    useThemeSwitcher,
    ThemedGlobals
  };

}

export { initTheme };

