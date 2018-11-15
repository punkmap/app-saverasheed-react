import { createReducer } from 'redux-awesome-sauce'
import { assoc, pipe, dissoc } from 'ramda'
import { loadState } from '../../util/localStorage'

import {
  FETCH_QUEST_FAILURE,
  FETCH_QUEST_REQUEST,
  FETCH_QUEST_SUCCESS,
  FETCH_QUESTS_FAILURE,
  FETCH_QUESTS_REQUEST,
  FETCH_QUESTS_SUCCESS,
  SELECT_QUEST_FAILURE,
  SELECT_QUEST_REQUEST,
  SELECT_QUEST_SUCCESS,
} from './actions'

const initialState = {
  quests: [],
  quest: null,
  activeQuestHash: loadState('activeQuest') || null,
  loading: false,
}

export const handleFetchQuestsRequest = assoc('loading', true)
export const handleFetchQuestsSuccess = (state, { payload: { quests } }) =>
  pipe(
    dissoc('error'),
    assoc('quests', quests),
    assoc('loading', false),
  )(state)

export const handleFetchQuestRequest = assoc('loading', true)
export const handleFetchQuestSuccess = (state, { payload: { quest } }) =>
  pipe(
    dissoc('error'),
    assoc('quest', quest),
    assoc('loading', false),
  )(state)

export const handleSelectQuestSuccess = (state, { payload: { questHash } }) =>
  pipe(
    assoc('activeQuestHash', questHash),
    assoc('loading', false),
  )(state)

export const handleLoading = assoc('loading', true)
export const handleError = (state, { payload: { error } }) =>
  assoc('error', error)

const handlers = {
  [FETCH_QUESTS_REQUEST]: handleFetchQuestsRequest,
  [FETCH_QUESTS_SUCCESS]: handleFetchQuestsSuccess,
  [FETCH_QUESTS_FAILURE]: handleError,
  [FETCH_QUEST_REQUEST]: handleFetchQuestRequest,
  [FETCH_QUEST_SUCCESS]: handleFetchQuestSuccess,
  [FETCH_QUEST_FAILURE]: handleError,
  [SELECT_QUEST_REQUEST]: handleLoading,
  [SELECT_QUEST_SUCCESS]: handleSelectQuestSuccess,
  [SELECT_QUEST_FAILURE]: handleError,
}

export default createReducer(initialState, handlers)
