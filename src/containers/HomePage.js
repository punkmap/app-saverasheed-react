import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import HomePage from '../components/pages/HomePage'
import { confirmCheckinRequest, toggleIntro } from '../modules/auth/actions'
import {
  getCheckingIn,
  getCheckinHash,
  getUserCheckins,
} from '../modules/auth/selectors'
import { allowLocation, centerMap, closePopup } from '../modules/map/actions'
import {
  getIsCentered,
  getIsLocationAllowed,
  getPopupInfo,
  getUserQuadkey,
} from '../modules/map/selectors'
import {
  getPopupStatus,
  getQuestWithStatus,
  getUserPoi,
} from '../modules/quest/selectors'
import { subscribe } from '../util/reselect'

const mapStateToProps = subscribe({
  getIsLocationAllowed,
  getIsCentered,
  getUserPoi,
  getUserCheckins,
  getCheckinHash,
  getUserQuadkey,
  getCheckingIn,
  getPopupInfo,
  getPopupStatus,
  quest: getQuestWithStatus,
})

const actions = {
  allowLocation,
  centerMap,
  confirmCheckin: confirmCheckinRequest,
  toggleIntro,
  closePopup,
  push,
}

export default connect(
  mapStateToProps,
  actions,
)(HomePage)
