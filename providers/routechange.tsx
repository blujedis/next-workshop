import React, { ReactNode, useEffect } from 'react';
import Router, { useRouter } from 'next/router';

import { useStore } from './store';

const RouteChangeProvider = ({ children }: { children: ReactNode }) => {

  const [isDirty, setIsDirty] = useStore('dirty');
  const [isMobileMenu, setIsMobileMenu] = useStore('isMobileMenu');

  const router = useRouter();

  useEffect(() => {

    const warningText =
      'You have unsaved changes - are you sure you wish to leave this page?';

    const isDirtyReset = () => {
      if (!isDirty) return false;
      return router.asPath !== isDirty;
    };

    const handleWindowUnload = (e: BeforeUnloadEvent) => {
      if (isDirtyReset())
        return setIsDirty('');
      if (!isDirty) return;
      e.preventDefault();
      setIsDirty('');
      return (e.returnValue = warningText);
    };

    const handleRouteStart = () => {
      if (isMobileMenu)
        setIsMobileMenu(false);
      if (isDirtyReset())
        return setIsDirty('');
      if (!isDirty)
        return;
      if (window.confirm(warningText))
        return;
      Router.events.emit('routeChangeError');
      Router.replace(Router, Router.asPath, { shallow: true });
      throw 'routeChange aborted.';
    };

    window.addEventListener('beforeunload', handleWindowUnload);
    Router.events.on('routeChangeStart', handleRouteStart);

    return () => {
      window.removeEventListener('beforeunload', handleWindowUnload);
      Router.events.off('routeChangeStart', handleRouteStart);
    };


  });

  return (
    <>
      {children}
    </>
  );

};

export { RouteChangeProvider };