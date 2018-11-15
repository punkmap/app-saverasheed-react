import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import LocationMap from '../components/atoms/LocationMap'
import { entityClick } from '../modules/map/actions'
import { getLocationsLeft, getPoisForQuest } from '../modules/quest/selectors'
import { subscribe } from '../util/reselect'

const mapStateToProps = subscribe({
  getLocationsLeft,
  getPoisForQuest,
})

const actions = {
  entityClick,
  push,
}

export default connect(
  mapStateToProps,
  actions,
)(LocationMap)
