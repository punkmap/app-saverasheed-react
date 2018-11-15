import { connect } from 'react-redux'

import Profile from '../components/pages/Profile'
import { logoutRequest } from '../modules/auth/actions'
import { getCompletedQuests, getUser } from '../modules/auth/selectors'
import { getPendingQuests } from '../modules/quest/selectors'
import { subscribe } from '../util/reselect'

const mapStateToProps = subscribe({
  getUser,
  getPendingQuests,
  getCompletedQuests,
})

const actions = {
  logout: logoutRequest,
}

export default connect(
  mapStateToProps,
  actions,
)(Profile)
