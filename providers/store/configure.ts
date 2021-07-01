import { createRestash, logger, applyMiddleware } from 'restash';

const _initialState = {
  dirty: '',
  isMobileMenu: false
};

export type StoreState = typeof _initialState;

const initialState = _initialState as Partial<StoreState>;
const middleware = applyMiddleware(logger());

const { Context, Consumer, Provider, useStore } = createRestash({
  initialState,
  middleware,
  persistent: '__PERSISTENT_APP_STATE__',
  statuses: ['start', 'progress', 'error', 'complete'],
  ssrKey: true
});

export {
  Context,
  Consumer,
  Provider,
  useStore
};

