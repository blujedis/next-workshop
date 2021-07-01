import React, { FC, ReactNode, useEffect, useState } from 'react';
import LayoutBase from './base';
import Header from './elements/header';
import Footer from './elements/footer';
import Breadcrumb from './elements/breadcrumb';
import Nav from './elements/nav';

import { useRouter } from 'next/router';
import { ILayoutBaseProps, ILayoutProps } from './base';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../public/img/akveo.svg';
import { content } from 'styles';
import styles from './styles.module.scss';

const DEFAULTS: Partial<ILayoutBaseProps> = {
  links: [
    { rel: 'icon', href: '/favicon.ico' }
  ]
};

const LayoutDefault: FC<Partial<ILayoutProps>> = (props) => {

  const options = {
    ...DEFAULTS,
    ...props
  } as ILayoutBaseProps & { children: ReactNode; };

  const { children, ...rest } = options;

  const NavExtend = () => {

    const router = useRouter();
    const [selected, setSelected] = useState('');

    useEffect(() => {
      setSelected(router.asPath)
    }, [router]);

    const isSelected = (path: string) => {
      if (selected === path)
        return styles.selected;
      return '';
    };

    return (
      <Nav className={styles.nav}>
        <div><Link href="/"><a className={isSelected('/')}>Home</a></Link></div>
        <div><Link href="/api"><a className={isSelected('/api')}>Api</a></Link></div>
        <div><Link href="/signin"><a className={isSelected('/signin')}>Sign In</a></Link></div>
        <div><Link href="/bad/route" ><a>404</a></Link></div>
      </Nav>
    );
  };

  const HeaderExt = (
    <Header className={styles.header}>
      <div style={{ display: 'flex', backgroundColor: '#181c35', color: '#fff', alignItems: 'center', width: '100%' }}>
        <Image src={logo} alt="Akveo Logo" />
        <h1 style={{ paddingLeft: '1rem' }}>Next.js Workshop</h1>
        <span style={{ paddingLeft: '1rem' }}> & Server Side Rendering</span>
      </div>
      {NavExtend()}
    </Header>
  );

  const FooterExt = (
    <Footer className={styles.footer}>
      Footer
    </Footer>
  );

  return (
    <LayoutBase {...rest} header={HeaderExt} footer={FooterExt}>
      <main css={content}>
        {children}
      </main>
    </LayoutBase>
  );

};

export default LayoutDefault;

