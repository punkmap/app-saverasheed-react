import axios from 'axios'
import {
  groupBy,
  mapObjIndexed,
  pipe,
  prop,
  map,
  // head,
  last,
  pathOr,
  sortBy,
  assoc,
  omit,
} from 'ramda'
import { createLoader, fixedWait } from 'redux-dataloader'
import { COMPLETED } from '../../fixtures/quests'

import { getActiveQuestHash, getQuestWithStatus } from '../quest/selectors'
import {
  FETCH_USER_DATA_REQUEST,
  fetchUserDataSuccess,
  fetchUserDataFailure,
  COMPLETE_QUEST_REQUEST,
  completeQuestFailure,
  completeQuestSuccess,
} from './actions'
import { getUserAddress } from './selectors'

const fetchUserDataLoader = createLoader(
  FETCH_USER_DATA_REQUEST,
  {
    success: (context, result) => fetchUserDataSuccess(result),
    error: (context, error) => fetchUserDataFailure(error.message),
    fetch: async ({ dispatch, getState, xya, xyoIpfsUrl }) => {
      const userData = omit(['checkins'], await xya.getUserData())

      const checkinData = await xya.getCheckinData()
      const checkinHashes = pipe(
        groupBy(prop('questDataHash')),
        mapObjIndexed(
          pipe(
            sortBy(x =>
              pathOr(prop('createdAt', x), ['createdAt', 'seconds'])(x),
            ),
            // head,
            last,
            prop('checkinHash'),
          ),
        ),
      )(checkinData)

      // console.log({ userData, checkinData, checkinHashes })
      const activeQuestHash = getActiveQuestHash(getState())

      const currentCheckinHash = checkinHashes[activeQuestHash]
      const getCheckinData = async () => {
        if (currentCheckinHash) {
          const { data } = await axios.get(
            `${xyoIpfsUrl}/${currentCheckinHash}`,
          )
          const { questData, checkinChain } = data
          return { [questData]: checkinChain }
        }
        return {}
      }

      const checkins = await getCheckinData()

      const completedQuestData = await xya.getQuestCompletionData()

      const completedQuests = await Promise.all(
        map(async ({ checkinProofsHash }) => {
          const { data } = await axios.get(
            `${xyoIpfsUrl}/${checkinProofsHash}`,
          )
          return data
        }, completedQuestData),
      )

      return pipe(
        assoc('checkins', checkins),
        assoc('checkinHash', currentCheckinHash),
        assoc('completedQuests', completedQuests),
      )(userData)
    },
  },
  {
    ttl: 10000,
    retryTimes: 3,
    retryWait: fixedWait(500),
  },
)

const completeQuestDataLoader = createLoader(
  COMPLETE_QUEST_REQUEST,
  {
    success: (ctx, result) => completeQuestSuccess(result),
    error: (ctx, error) => completeQuestFailure(error.message),
    fetch: async ({
      getState,
      dispatch,
      xya,
      xyoIpfsUrl,
      action: {
        payload: { hash },
      },
    }) => {
      const state = getState()
      const hero = getUserAddress(state)
      const quest = getQuestWithStatus(state)
      const { networks, status } = quest
      if (status === COMPLETED) {
        throw new Error('You already got this token!')
      }

      const network = networks[0] // TODO: change

      const completeQuest = xya.app.functions().httpsCallable(`completeQuest`)
      const result = await completeQuest({
        hero,
        checkinProofs: hash,
        network,
      })
      const { earnedToken, checkinProofsHash } = result
      if (earnedToken) {
        /*
          checkinProofsHash: "QmYxgipnYucKe6g7DYQUMsmz5H74prYHCAh5B5PrHkZuyp"
          earnedToken: true
          transactionHash: "0x72c4d6b13d07475fca29070bbe52e5f5882cdf2169809b918caffc4a95a52125"
         */
        const { data: checkinProofs } = await axios.get(
          `${xyoIpfsUrl}/${checkinProofsHash}`,
        )
        return checkinProofs
      } else {
        throw new Error('You already got this token!')
      }
    },
  },
  {
    ttl: 10000,
    retryTimes: 3,
    retryWait: fixedWait(500),
  },
)

export default [fetchUserDataLoader, completeQuestDataLoader]
