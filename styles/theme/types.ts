import { css, Interpolation, Theme } from '@emotion/react';
import { CSSProperties, Dispatch, SetStateAction } from 'react';

export type ThemeColor = CSSProperties['backgroundColor'] | CSSProperties['color'];

export interface IThemeFont {
  family: CSSProperties['fontFamily'];
  familyMono: CSSProperties['fontFamily'];
  color: string;
  size: string;
  weight: number;
}

export interface IThemeRadius {
  sm: string;
  md: string;
  lg: string;
}

export interface IThemeColor {
  primary: ThemeColor;
  secondary: ThemeColor;
  danger: ThemeColor;
  warning: ThemeColor;
  info: ThemeColor;
  success: ThemeColor;
  white: ThemeColor;
  black: ThemeColor;
  grayDarker: ThemeColor;
  grayDark: ThemeColor;
  gray: ThemeColor;
  grayLight: ThemeColor;
  grayLighter: ThemeColor;
  grayLightest: ThemeColor;
}

export interface IThemeMargin {
  sm: string;
  md: string;
  lg: string;
}

export interface IThemePadding {
  sm: string;
  md: string;
  lg: string;
}

export interface IThemeBody {
  background: string;
}

export interface ITheme {
  body: IThemeBody;
  color: IThemeColor;
  font: IThemeFont;
  radius: IThemeRadius;
  padding: IThemePadding;
  margin: IThemeMargin;
}

export type ThemeMap = { [key: string]: ITheme };

export interface IThemeContext<T extends ThemeMap> {
  themes: T;
  active: keyof T;
  setActive: Dispatch<SetStateAction<keyof T>>;
}

export type InitGlobals = <T extends ITheme>(theme: T) => Interpolation<Theme>;
