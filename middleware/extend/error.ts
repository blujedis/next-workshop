import { LogHandler } from './logger';
import { Request, Response } from '../';

export default function onErrorMiddleware(log?: LogHandler) {
  const logger = log || console.error || console.log;
  return (err: Error, req: Request, res: Response, next: any) => {
    if (!err)
      return next();
    logger(err);
    res.status(500).end(err.toString());
  };
};
