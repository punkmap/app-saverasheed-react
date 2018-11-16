import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import Profile from '../components/pages/Profile'
import { logoutRequest } from '../modules/auth/actions'
import { getCheckinHash, getCompletedQuests, getUser } from '../modules/auth/selectors'
import { getPendingQuests } from '../modules/quest/selectors'
import { subscribe } from '../util/reselect'

const mapStateToProps = subscribe({
  getUser,
  getPendingQuests,
  getCompletedQuests,
  getCheckinHash,
})

const actions = {
  logout: logoutRequest,
  push,
}

export default connect(
  mapStateToProps,
  actions,
)(Profile)
