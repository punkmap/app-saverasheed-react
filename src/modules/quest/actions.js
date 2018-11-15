import { createApiActions } from 'redux-awesome-sauce'

export const { types: apiTypes, creators: apiCreators } = createApiActions(
  {
    fetchQuests: {
      success: ['quests'],
      failure: ['error'],
    },
    fetchQuest: {
      request: ['questHash'],
      success: ['quest'],
      failure: ['error'],
    },
    selectQuest: {
      request: ['quest'],
      success: ['questHash'],
      failure: ['error'],
    },
  },
  { prefix: 'quest/', useLoader: true },
)

export const {
  FETCH_QUESTS_REQUEST,
  FETCH_QUESTS_SUCCESS,
  FETCH_QUESTS_FAILURE,
  FETCH_QUEST_REQUEST,
  FETCH_QUEST_SUCCESS,
  FETCH_QUEST_FAILURE,
  SELECT_QUEST_REQUEST,
  SELECT_QUEST_SUCCESS,
  SELECT_QUEST_FAILURE,
} = apiTypes

export const {
  fetchQuestsRequest,
  fetchQuestsSuccess,
  fetchQuestsFailure,
  fetchQuestRequest,
  fetchQuestSuccess,
  fetchQuestFailure,
  selectQuestRequest,
  selectQuestSuccess,
  selectQuestFailure,
} = apiCreators
