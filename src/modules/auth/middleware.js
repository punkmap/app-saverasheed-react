import { startsWith } from 'ramda'
import { push } from 'connected-react-router'

import { getPathname } from '../common/selectors'
import {
  FETCH_USER_DATA_SUCCESS,
} from './actions'

const middleware = xya => store => next => async action => {
  switch (action.type) {
    case FETCH_USER_DATA_SUCCESS:
      next(action)
      if (startsWith('/main', getPathname(store.getState()))) {
        store.dispatch(push('/'))
      }
      return
    default:
      return next(action)
  }
}

export default middleware
