import dynamic from 'next/dynamic';

const ProgressBar = dynamic(() => import('./handler'), { ssr: false });

export default ProgressBar;