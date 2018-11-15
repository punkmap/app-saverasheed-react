import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import CheckinSuccess from '../components/pages/CheckinSuccess'
import { getIsLoading, getLocationsLeft } from '../modules/quest/selectors'
import { subscribe } from '../util/reselect'

const mapStateToProps = subscribe({
  getIsLoading,
  getLocationsLeft,
})

const actions = {
  push,
}

export default connect(
  mapStateToProps,
  actions,
)(CheckinSuccess)
