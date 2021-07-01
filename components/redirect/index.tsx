import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Url } from 'url';

export interface IRedirect {
  url: string | Url;
  as?: string | Url;
  options?: {};
}

const Redirect = (props: { href: string | IRedirect; message?: string, replace?: boolean; }) => {

  const { href, message, replace } = props;

  let config = href as IRedirect;

  if (typeof href === 'string')
    config = {
      url: href as unknown as Url
    };

  const router = useRouter();
  const { url, as, options } = config;

  useEffect(() => {
    if (replace)
      router.replace(url, as, options);
    else
      router.push(url, as, options);
  }, [as, options, replace, router, url]);

  return <div>{message}</div>;

};

export const createRedirect = (props: { href: string | IRedirect; message?: string; }) => <Redirect {...props} />;

export default Redirect;