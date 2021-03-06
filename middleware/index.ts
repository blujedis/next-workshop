import nextConnect, { NextConnect } from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import onErrorMiddleware from './extend/error';
import loggerMiddleware from './extend/logger';
import queryMiddleware from './extend/query';
import reqIdMiddleware from './extend/reqid';
import responseMiddleware from './extend/response';
import databaseMiddleware from './extend/db';
// import { IApp } from 'db/models/app';
// import { MongoClient } from 'mongodb';

export * from './auth';

export type ResponseHandler = (data: any, statusCode?: number, statusMessage?: string) => void;
export type ResponseErrorHandler = (err?: string | Error) => void;

export type Request = NextApiRequest & {
  rid: string;
  user: any;
  // mongodb: MongoClient;
  // app: IApp;
};

export type Response = NextApiResponse & {
  badRequest: ResponseErrorHandler;
  unauthenticated: ResponseErrorHandler;
  unauthorized: ResponseErrorHandler;
  notFound: ResponseErrorHandler;
  serverError: ResponseErrorHandler;
  notAllowed: ResponseErrorHandler;
  handleJSON: ResponseHandler;
};



export type MiddlewareError<R = void> = (err: Error, req: Request, res: Response, next: (err?: any) => void) => R;

export type Middleware<R = void> = (req: Request, res: Response, next: (err?: any) => void) => R;

/**
 * Creates a new handler stack for Api.
 * 
 * @param middleware additional middleware to include before handler.
 */
export function createHandler(...middleware: Middleware[]):  NextConnect<Request, Response> {

  const connectMiddleware = nextConnect<Request, Response>({ onError: onErrorMiddleware });

  // Order is IMPORTANT here do NOT change
  // unless you know what you're doing.
  return connectMiddleware.use(databaseMiddleware, reqIdMiddleware(), responseMiddleware(), queryMiddleware, loggerMiddleware(), ...middleware);

}

export default createHandler;
