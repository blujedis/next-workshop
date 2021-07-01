import React, { FC } from 'react';
import Head from 'next/head';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export type DetailedAttributes<T extends HTMLElement = HTMLElement, A extends HTMLAttributes<T> = HTMLAttributes<T>> = DetailedHTMLProps<A, T>;

export interface ILayoutOpenGraph {
  title: string;
  description: string;
  image: string;
  url: string;
}

export interface ILayoutTwitterCard extends Omit<ILayoutOpenGraph, 'url'> {
  card: string;
}

export interface ILayoutProps {
  title: string;
  description: string;
  socialGraph: ILayoutOpenGraph;
  socialCard: ILayoutTwitterCard;
}

export interface ILayoutBaseProps extends ILayoutProps {
  metas: Record<string, any>[];
  links: Record<string, any>[];
  header: JSX.Element;
  breadcrumb: JSX.Element;
  footer: JSX.Element;
}

const DEFAULTS: Partial<ILayoutBaseProps> = {
  title: 'NextJS',
  description: 'NextJS Web Application',
  links: [],
  metas: [],
  socialGraph: {} as ILayoutOpenGraph,
  socialCard: {} as ILayoutTwitterCard
};

const getKey = () => Math.random().toString(16);

const LayoutBase: FC<ILayoutBaseProps> = (props) => {

  props = {
    ...DEFAULTS,
    ...props
  };

  const {
    title, description, metas, links, header, breadcrumb,
    footer, children, socialGraph: openGraph, socialCard: twitterCard
  } = props;

  const getTitle = () => {
    return (
      <title>{title}</title>
    );
  };

  const getOpenGraph = () => {
    if (!openGraph) return null;
    return Object.keys(openGraph).map(key => <meta key={getKey()} property={'og:' + key} content={openGraph[key as keyof typeof openGraph]} />);
  };

  const getTwitterCard = () => {
    if (!twitterCard) return null;
    return Object.keys(twitterCard).map(key => <meta key={getKey()} name={'twitter:' + key} content={twitterCard[key as keyof typeof twitterCard]} />);
  };

  const getMetas = () => {
    const _metas = metas.map(v => <meta key={getKey()} {...v} />);
    const desc = <meta key={getKey()} name="description" content={description} />;
    const og = getOpenGraph() || [];
    const twitter = getTwitterCard() || [];
    return [desc, ..._metas, ...og, ...twitter];
  };

  const getLinks = () => {
    return links.map(v => <link key={getKey()} {...v} />);
  };

  const getHeader = () => {
    if (!header) return null;
    return header as JSX.Element;
  };

  const getFooter = () => {
    if (!footer) return null;
    return footer as JSX.Element;
  };

  const getBreadcrumb = () => {
    if (!breadcrumb) return null;
    return breadcrumb as JSX.Element;
  };

  return (
    <>
      <Head>
        {getTitle()}
        {getMetas()}
        {getLinks()}
      </Head>
      {getHeader()}
      {getBreadcrumb()}
      {children}
      {getFooter()}
    </>
  );

};

export default LayoutBase;