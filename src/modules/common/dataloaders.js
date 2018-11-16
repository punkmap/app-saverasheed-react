import { createLoader, fixedWait } from 'redux-dataloader'
import { push } from 'connected-react-router'

import { fetchUserDataRequest } from '../auth/actions'
import { getActiveQuest, getUser } from '../auth/selectors'
import {
  fetchQuestRequest,
  fetchQuestsRequest,
  selectQuestRequest,
} from '../quest/actions'
import { getQuests } from '../quest/selectors'
import {
  INIT_APP_REQUEST,
  initAppSuccess,
  initAppFailure,
  NEXT_STEP_REQUEST,
  nextStepSuccess,
  nextStepFailure,
} from './actions'

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

const nextStepLoader = createLoader(
  NEXT_STEP_REQUEST,
  {
    fetch: async ({
      getState,
      action: {
        payload: { currentStep },
      },
      dispatch,
    }) => {
      if (currentStep === 0) {
        dispatch(push('/quest-log'))
      }
      if (currentStep === 1) {
        const quests = getQuests(getState())
        await dispatch(selectQuestRequest(quests[0]))
      }
      if (currentStep === 2) {
        dispatch(push('/'))
      }
      if (currentStep === 3) {
        return 0
      }
      return currentStep + 1
    },
    success: (ctx, nextStep) => nextStepSuccess(nextStep),
    error: (context, error) => nextStepFailure(error.message),
  },
  {
    ttl: 10000,
    retryTimes: 3,
    retryWait: fixedWait(500),
  },
)

export default [initAppLoader, nextStepLoader]
