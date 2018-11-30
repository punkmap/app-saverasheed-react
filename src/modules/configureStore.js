import * as Sentry from '@sentry/browser'
import { filter, pipe, map, endsWith, propOr, pathOr } from 'ramda'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createBrowserHistory } from 'history'
import { connectRouter, push, routerMiddleware } from 'connected-react-router'
import { createDataLoaderMiddleware } from 'redux-dataloader'
import { toast } from 'react-toastify'

import XYAccount from '../lib/xy-account'
import { injectWeb3 } from '../util/web3'
import { authenticateUser } from './auth/dataloaders'
import { initAppRequest } from './common/actions'
import reducers from './reducers'
import middlewares from './middlewares'
import dataloaders from './dataloaders'
import { isArray, noop } from '../util/ramda-extra'

// allows for compound actions, like [{ type: 'FOO' }]
const multi = ({ dispatch }) => next => action =>
  isArray(action)
    ? pipe(
    filter(Boolean),
    map(dispatch),
    )(action)
    : next(action)

const logger = store => next => action => {
  console.log('dispatching', action.type)
  let result = next(action)
  console.log('next state', store.getState())
  return result
}

let errorToastId

const errorHandler = (action, state, error) => {
  if (!error) return
  if (errorToastId) toast.dismiss(errorToastId)
  const errMsg = pathOr(propOr('', 'error', error), ['error', 'message'], error)

  errorToastId = toast.error(errMsg)
  Sentry.withScope(scope => {
    scope.setExtra('action', action)
    scope.setExtra('state', state)
    Sentry.captureException(error)
  })
}

const crashReporter = store => next => action => {
  try {
    if (endsWith('FAILURE', action.type)) {
      errorHandler(action, store.getState(), action.payload)
    }
    return next(action)
  } catch (err) {
    console.error('Caught an exception!', err)
    errorHandler(action, store.getState(), err)
    throw err
  }
}

noop(logger)

const composeEnhancers =
  process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose
// const composeEnhancers = compose

export const history = createBrowserHistory()

const createRootReducer = history =>
  combineReducers({
    ...reducers,
    router: connectRouter(history),
  })

const xyoIpfsUrl = 'https://ipfs.xyo.network/ipfs'
const ipfsUrl = 'https://ipfs.infura.io'

const configureStore = (initialState = {}, options) => {
  injectWeb3()
  const preloadedState = {
    ...initialState,
  }

  const xya = new XYAccount()

  console.log('XY ACCOUNT', xya)
  const middleware = applyMiddleware(
    createDataLoaderMiddleware(dataloaders, { xya, xyoIpfsUrl, ipfsUrl }),
    multi,
    thunkMiddleware,
    routerMiddleware(history),
    // logger,
    crashReporter,
    ...map(x => x(xya), middlewares),
  )
  const store = createStore(
    createRootReducer(history),
    preloadedState,
    composeEnhancers(middleware),
  )
  xya.addOnStateChange(user => {
    if (user) {
      // user is signed in
      console.log('signed in!')
      authenticateUser(user, store.dispatch)
    } else {
      // user is signed out
      store.dispatch(push('/main'))
    }
    store.dispatch(initAppRequest())
  })
  return store
}

export default configureStore
