import { FC } from 'react';
import { DetailedAttributes } from '../base';

const Footer: FC<DetailedAttributes> = (props) => {
  const { children, ...rest } = props;
  return (
    <footer {...rest} >
      {children}
    </footer>
  );
};

export default Footer;