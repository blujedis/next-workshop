import { Middleware } from '..';
// import mongo from 'db';

const databaseMiddleware: Middleware<void> = async (req, res, next) => {

  try {

    // if (!mongo.client?.isConnected())
    //   await mongo.client.connect();

    // if (!global.app) {
    //  global.app = await App.findOne({ disabled: 0 });
    // }

    // req.app = global.app;

  }
  catch (ex) {
    console.error(ex);
  }

  // Extend request with client.
  // req.mongodb = mongo.client;

  return next();

};

export default databaseMiddleware;
