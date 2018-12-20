import { connect } from 'react-redux'
import { getCheckedPoisForQuest } from '../modules/quest/selectors'

import { subscribe } from '../util/reselect'
import {
  getSelectedEntities,
  getUserLocation,
  getViewport,
} from '../modules/map/selectors'
import {
  changeViewport,
  deselectEntity,
  entityClick,
  selectEntity,
} from '../modules/map/actions'
import { ESRIScene } from '../components/organisms/ESRIScene'
//import { ESRIMap } from '../components/organisms/ESRIMap'

const mapStateToProps = subscribe({
  getSelectedEntities,
  getViewport,
  getUserLocation,
  getPois: getCheckedPoisForQuest,
})

const actions = {
  entityClick,
  selectEntity,
  deselectEntity,
  changeViewport,
}

export default connect(
  // mapStateToProps,
  // actions,
//)(ESRIMap)
)(ESRIScene)
