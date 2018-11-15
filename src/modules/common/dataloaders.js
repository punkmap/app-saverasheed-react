import { createLoader, fixedWait } from 'redux-dataloader'
import { fetchUserDataRequest } from '../auth/actions'
import { getActiveQuest, getUser } from '../auth/selectors'
import { fetchQuestRequest, fetchQuestsRequest } from '../quest/actions'

import { INIT_APP_REQUEST, initAppSuccess, initAppFailure } from './actions'

const initAppLoader = createLoader(
  INIT_APP_REQUEST,
  {
    success: initAppSuccess,
    error: (context, error) => initAppFailure(error.message),
    fetch: async ({ dispatch, getState }) => {
      await dispatch(fetchQuestsRequest())
      const user = getUser(getState())
      if (!user) {
        return
      }
      await dispatch(fetchUserDataRequest())
      const activeQuestHash = getActiveQuest(getState())
      if (activeQuestHash) {
        await dispatch(fetchQuestRequest(activeQuestHash))
      }
    },
  },
  {
    ttl: 10000,
    retryTimes: 3,
    retryWait: fixedWait(500),
  },
)

export default [initAppLoader]
