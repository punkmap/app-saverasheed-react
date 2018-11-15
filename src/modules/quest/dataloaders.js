import axios from 'axios'
import { paramCase } from 'change-case'
import { createLoader, fixedWait } from 'redux-dataloader'
import { map, assoc, pipe, find, whereEq } from 'ramda'
import { push } from 'connected-react-router'

import { saveState } from '../../util/localStorage'
import { fetchUserDataRequest, fetchUserDataSuccess } from '../auth/actions'
import {
  FETCH_QUEST_REQUEST,
  fetchQuestSuccess,
  fetchQuestFailure,
  FETCH_QUESTS_REQUEST,
  fetchQuestsSuccess,
  fetchQuestsFailure,
  SELECT_QUEST_REQUEST,
  selectQuestSuccess,
  selectQuestFailure,
  fetchQuestRequest,
} from './actions'
import { baseIpfsUrl } from './middleware'
import { getQuest, getQuests } from './selectors'

const questLoader = createLoader(
  FETCH_QUEST_REQUEST,
  {
    success: (context, result) => fetchQuestSuccess(result),
    error: (context, error) => fetchQuestFailure(error),
    fetch: async ({ action, getState }) => {
      const {
        payload: { questHash },
      } = action
      const quests = getQuests(getState())
      const existingQuest = find(whereEq({ hash: questHash }), quests)
      if (existingQuest) {
        return existingQuest
      }

      const ipfsUrl = `${baseIpfsUrl}/${questHash}`
      const {
        data: { quest },
      } = await axios.get(ipfsUrl)
      return pipe(
        assoc('hash', questHash),
        assoc('slug', paramCase(quest.name)),
      )(quest)
    },
    shouldFetch: ({
      getState,
      action: {
        payload: { questHash },
      },
    }) => {
      const quest = getQuest(getState())
      if (!quest) {
        return true
      }
      return quest.hash !== questHash
    },
  },
  {
    ttl: 10000,
    retryTimes: 3,
    retryWait: fixedWait(500),
  },
)

const questsLoader = createLoader(
  FETCH_QUESTS_REQUEST,
  {
    success: (context, result) => fetchQuestsSuccess(result),
    error: (context, error) => fetchQuestsFailure(error),
    fetch: async ({ xya }) => {
      const questRes = await xya.getQuests()
      return await Promise.all(
        map(async ({ hash, networks }) => {
          const ipfsUrl = `${baseIpfsUrl}/${hash}`
          const {
            data: { quest },
          } = await axios.get(ipfsUrl)
          return pipe(
            assoc('networks', networks),
            assoc('hash', hash),
            assoc('slug', paramCase(quest.name)),
          )(quest)
        }, questRes),
      )
    },
    shouldFetch: ({ getState }) => getQuests(getState()).length === 0,
  },
  {
    ttl: 10000,
    retryTimes: 3,
    retryWait: fixedWait(500),
  },
)

const selectQuestLoader = createLoader(
  SELECT_QUEST_REQUEST,
  {
    success: (context, result) => selectQuestSuccess(result),
    error: (context, error) => selectQuestFailure(error),
    fetch: async ({
      action: {
        payload: { quest },
      },
      xya,
      dispatch,
    }) => {
      const { hash, name } = quest
      await xya.updateUser({
        activeQuest: hash,
      })
      saveState('activeQuest', hash)
      dispatch(fetchUserDataSuccess({ activeQuest: hash }))
      await dispatch(fetchQuestRequest(hash))
      await dispatch(fetchUserDataRequest())
      dispatch(push(`/quest-log/${paramCase(name)}`))
      return hash
    },
  },
  {
    ttl: 10000,
    retryTimes: 3,
    retryWait: fixedWait(500),
  },
)

export default [questLoader, questsLoader, selectQuestLoader]
