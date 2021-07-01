import { DetailedHTMLProps, ImgHTMLAttributes, useEffect, useState } from 'react';
import Image, { ImageProps } from 'next/image';
import loader from './loader.svg';

export type  LoaderProps = Omit<ImageProps, 'src'> & {
  src?: string;
  visible?: boolean;
}

const useLoader = () => {

  const [visible, setVisible] = useState(false);

  // const style: CSSProperties = {
  //   position: 'fixed',
  //   top: 0,
  //   left: 0,
  //   width: '100%',
  //   height: '100%',
  //   zIndex: 1200,
  //   backgroundColor: 'rgba(0, 0, 0, 0.3)'
  // }

  function Loader(props: LoaderProps) {

    props = {
      src: loader,
      alt: 'loading...',
      ...props
    } 

    const { visible: initVisible, ...rest } = props as Required<LoaderProps>;

    useEffect(() => {
      if (props.visible)
        setVisible(true);
    }, [props.visible]);

    if (!visible) 
      return null;

    // Cheat cause the next/image props are 
    // sort of funky ¯\_(ツ)_/¯
    const imageProps = rest as any;

    return (
      <Image alt={''} { ...imageProps} />
    );

  }

  return {
    visible,
    show: () => setVisible(true),
    hide: () => setVisible(false),
    Loader
  };

};

export default useLoader;