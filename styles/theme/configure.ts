
export const LIGHT_THEME = {
  body: {
    background: '#fff',
  },
  color: {
    primary: '#005cb9',
    secondary: '#999',
    danger: '#e4415f',
    warning: '#f59851',
    info: '#18c586',
    success: '#18c586',
    white: '#fff',
    black: '#000',
    grayDarker: '#2e2e2e',
    grayDark: '#3e3e3e',
    gray: '#737e86',
    grayLight: '#d1d1d1',
    grayLighter: '#e1e1e1',
    grayLightest: '#f4f5f6'
  },
  font: {
    family: '-apple-system, system-ui, BlinkMacSystemFont, Roboto, Helvetica Neue, Segoe UI, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol',
    familyMono: 'SF Mono, Segoe UI Mono, Roboto Mono, Menlo, Courier, monospace',
    color: '#333',
    size: '1rem',
    weight: 300
  },
  radius: {
    sm: '0.125rem',
    md: '0.25rem',
    lg: '0.35rem'
  },
  margin: {
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem'
  },
  padding: {
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem'
  }
}

export const THEMES = {
  light: LIGHT_THEME,
  dark: {
    ...LIGHT_THEME,
    body: {
      ...LIGHT_THEME.body,
      background: '#2d2d2d'
    },
    font: {
      ...LIGHT_THEME.font,
      color: '#fefefe'
    }
  }
};