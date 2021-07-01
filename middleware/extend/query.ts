import { Middleware } from '../';
import { NextApiRequest } from 'next';
import qs from 'querystring';

type Query = NextApiRequest['query'];

const queryMiddleware: Middleware<void> = async (req, res, next) => {

  // next parses query just not very complete
  // as to how it parses. We can trust keys will
  // exist just may not be in correct shape which
  // we'll fix below if they exist.
  const hasQuery = Object.keys(req.query).length;

  if (!hasQuery)
    return next();
    
  const url = req.url || '';
  const query = qs.parse(url.split('?')[1]) as Query;

  req.query = query;

  next();

};

export default queryMiddleware;
