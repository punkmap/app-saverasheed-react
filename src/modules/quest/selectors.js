import {
  propOr,
  pathOr,
  contains,
  filter,
  prop,
  assoc,
  map,
  any,
  startsWith,
  find,
  whereEq,
  head,
  __,
  pipe,
  equals,
} from 'ramda'
import quadTools from 'quadkeytools'
import {
  COMPLETED,
  IN_PROGRESS,
  NOT_STARTED,
  PENDING,
} from '../../fixtures/quests'
import { containsBy } from '../../util/ramda-extra'

import { derive, propSelector } from '../../util/reselect'
import {
  getUserCheckinData,
  getUserCheckinIds,
  getCompletedQuests,
} from '../auth/selectors'
import { getPopupInfo, getPopupOpen, getUserQuadkey } from '../map/selectors'

const rootSelector = propOr({}, 'quest')

export const getQuests = derive(rootSelector, propOr([], 'quests'))
export const getQuest = derive(rootSelector, prop('quest'))
export const getActiveQuestSlug = derive(getQuest, prop('slug'))
export const getCheckinsForQuest = derive(getQuest, propOr([], 'checkins'))
export const getIsLoading = derive(rootSelector, propOr(false, 'loading'))
export const getQuestSlug = derive(
  propSelector,
  pathOr(null, ['match', 'params', 'questSlug']),
)

export const getQuestBySlug = derive(
  [getQuests, getQuestSlug],
  (quests, questSlug) => {
    const toReturn = find(whereEq({ slug: questSlug }), quests)
    console.log({ toReturn, quests, questSlug })

    return toReturn
  },
)

const getStatus = (questCheckins, userCheckins, completed) => {
  if (completed) {
    return COMPLETED
  }
  if (!userCheckins) {
    return NOT_STARTED
  }
  if (userCheckins.length === questCheckins.length) {
    return PENDING
  }

  return IN_PROGRESS
}

const hydrateQuestWithStatus = (quest, userCheckinData, completedQuests) => {
  if (!quest) return null
  const { hash, checkins } = quest
  const userCheckins = prop(hash, userCheckinData)
  const completed = containsBy(
    x => equals(hash, prop('questData', x)),
    completedQuests,
  )
  return assoc('status', getStatus(checkins, userCheckins, completed))(quest)
}

export const getQuestsWithStatus = derive(
  [getQuests, getUserCheckinData, getCompletedQuests],
  (quests, userCheckinData, completedQuests) =>
    map(
      quest => hydrateQuestWithStatus(quest, userCheckinData, completedQuests),
      quests,
    ),
)

export const getPendingQuests = derive(
  getQuestsWithStatus,
  filter(({ status }) => equals(PENDING, status)),
)

export const getQuestWithStatus = derive(
  [getQuest, getUserCheckinData, getCompletedQuests],
  hydrateQuestWithStatus,
)

export const getLocationsLeft = derive(
  [getQuest, getUserCheckinIds],
  (quest, userCheckinIds) => {
    if (!quest) return 0
    const checkinIds = pipe(
      propOr([], 'checkins'),
      map(prop('id')),
    )(quest)

    return (
      checkinIds.length -
      filter(contains(__, checkinIds), userCheckinIds).length
    )
  },
)

export const getActiveQuestHash = derive(rootSelector, prop('activeQuestHash'))

export const getPoisForQuest = derive(
  [getCheckinsForQuest, getUserCheckinIds],
  (checkins, userCheckinIds) =>
    map(({ name, id, description, hint, quadkeys, image }) => {
      const { lat, lng } = quadTools.origin(quadkeys[0])
      return {
        id,
        name,
        hint,
        description,
        quadkeys,
        image,
        checked: contains(id, userCheckinIds),
        geometry: {
          type: 'Point',
          coordinates: [lng, lat],
        },
        center: [lng, lat],
      }
    }, checkins),
)

export const getCheckedPoisForQuest = derive(
  [getPoisForQuest, getUserCheckinIds],
  (poisForQuest, userCheckins) =>
    map(
      poi =>
        contains(poi.id, userCheckins) ? assoc('checked', true, poi) : poi,
      poisForQuest,
    ),
)

export const getUserPois = derive(
  [getCheckedPoisForQuest, getUserQuadkey],
  (checkedPoisForQuest, userQuadkey) =>
    filter(
      ({ quadkeys }) => any(startsWith(__, userQuadkey), quadkeys),
      checkedPoisForQuest,
    ),
)

export const getUserPoi = derive(getUserPois, head)

export const getPopupStatus = derive(
  [getUserPoi, getPopupInfo, getPopupOpen],
  (userPoi, popupInfo, popupOpen) => {
    if (userPoi && !userPoi.checked) {
      return 'CHECK_IN_SCREEN'
    }
    if (userPoi && popupOpen && userPoi.name === popupInfo.name) {
      return 'CHECKED_IN_SCREEN'
    }
    if (popupInfo && popupOpen) {
      return 'POPUP'
    }
    return ''
  },
)
