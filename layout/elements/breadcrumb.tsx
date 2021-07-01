import React, { DetailedHTMLProps, FC, OlHTMLAttributes, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export interface IBreadcrumbProps extends DetailedHTMLProps<OlHTMLAttributes<HTMLOListElement>, HTMLOListElement> {

}

export interface IBreadcrumb {
  path: string;
  href: string;
}

const normalize = (str: string) => {
  return str
    .replace(/-/g, ' ')
    .replace(/oe/g, 'ö')
    .replace(/ae/g, 'ä')
    .replace(/ue/g, 'ü')
    .toUpperCase();
};

const Breadcrumb: FC<IBreadcrumbProps> = (props = {}) => {

  const router = useRouter();
  const [breadcrumbs, setBreadcrumbs] = useState<IBreadcrumb[]>([]);

  useEffect(() => {

    if (router) {

      const link = router.asPath.split('/');
      link.shift();

      const arr = link.map((path, i) => {
        return { path, href: '/' + link.slice(0, i + 1).join('/') };
      });

      setBreadcrumbs(arr);

    }

  }, [router]);

  if (!breadcrumbs.length)
    return null;

  return (
    <ol {...props}>
      <li>
        <Link href="/">HOME</Link>
      </li>
      {breadcrumbs.map((o, i) => {
        return (
          <li key={o.href}>
            <Link href={o.href}>
              <a>
                {normalize(o.path)}
              </a>
            </Link>
          </li>
        );
      })}
    </ol>
  );

}

export default Breadcrumb;
