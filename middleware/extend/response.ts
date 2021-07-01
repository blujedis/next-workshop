
import { Request, Response } from '../';
import { LogHandler } from './logger';

const NAME = process.env.NAME || 'Next App'
const VERSION = process.env.VERSION || '0.0.1';

const STATUS_MAP = {
  400: 'Bad Request',
  401: 'Unauthenticated',
  403: 'Unauthorized',
  405: 'Method Not Allowed',
  404: 'Not Found',
  500: 'Server Error'
} as { [key: number]: string };

/**
 * Creates a middlware handler extending the response object with helper methods.
 * 
 * @param log a logger to use for logging messages/errors.
 * @param statusMap an optional map for defining status messages.
 * @returns middleware handler.
 */
function responseMiddleware(log?: LogHandler, statusMap = STATUS_MAP) {

  const logger = log || console.log;

  function handleResponse(res: Response, req: Request) {

    return (data?: any, statusCode = 200, statusText = '') => {

      res.statusCode = statusCode;
      res.statusMessage = statusText || statusMap[statusCode];

      if (data instanceof Error) {
        logger(data, { rid: req.rid });
        statusCode = 500;
        res.statusMessage = statusMap[statusCode] + ': ' + data.message;
        data = '';
      }

      res.json(data);

    };

  }

  function handleError(res: Response, req: Request, statusCode: number) {
    return (err?: string | Error) => {
      if (typeof err === 'string') {
        err = new Error(err as string || statusMap[statusCode]);
        err.name = statusMap[statusCode];
      }
      handleResponse(res, req)(err, statusCode);
    };
  }

  return (req: Request, res: Response, next: (err?: any) => void) => {


    res.setHeader(`${NAME.toUpperCase() + '-NAME'}`, JSON.stringify(NAME));
    res.setHeader(`${NAME.toUpperCase() + '-VERSION'}`, JSON.stringify(VERSION));
    res.setHeader(`${NAME.toUpperCase() + '-REQUEST-ID'}`, JSON.stringify(req.rid));

    // Response helpers.
    res.badRequest = handleError(res, req, 400);
    res.unauthenticated = handleError(res, req, 401);
    res.unauthorized = handleError(res, req, 403);
    res.notFound = handleError(res, req, 404);
    res.serverError = handleError(res, req, 500);
    res.notAllowed = handleError(res, req, 405);
    res.handleJSON = handleResponse(res, req);

    next();


  };

}

export default responseMiddleware;
