
const basePath = process.env.NODE_ENV === 'production' ? `https://next-workshop.vercel.app` : 'http://localhost:3000';

export default function fetcher(path: string, options?: RequestInit) {
  path = basePath + '/' + path.replace(/^\//, '');
  return fetch(path, options)
    .then(res => res.json())
    .then(res => {
      // do other things with response.
      return res;
    }).catch(err => {
      console.error(err);
    });
}