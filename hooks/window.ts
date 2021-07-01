import { useState } from 'react';
import { useIsomorphicLayoutEffect } from './effect';

type Width = number;
type Height = number;
type WindowSize = [Width, Height];

/**
 * Window size hook to monitor window size on resize.
 * 
 * @returns [width, height]
 */
export default function useWindowSize(): WindowSize {

  const [size, setSize] = useState([0, 0] as WindowSize);

  useIsomorphicLayoutEffect(() => {
    if (typeof window === 'undefined') 
      return;
    const update = () => setSize([window.innerWidth, window.innerHeight]);
    window.addEventListener('resize', update);
    update(); // get initial size.
    return () => window.removeEventListener('resize', update);
  }, []);

  return size;

}