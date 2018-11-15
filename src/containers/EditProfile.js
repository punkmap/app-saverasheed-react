import { connect } from 'react-redux'

import EditProfile from '../components/pages/EditProfile'
import {
  linkAccountRequest,
  unlinkAccountRequest,
} from '../modules/auth/actions'
import { getLinkingProvider, getUser } from '../modules/auth/selectors'
import { subscribe } from '../util/reselect'

const mapStateToProps = subscribe({
  getUser,
  getLinkingProvider,
})

const actions = {
  unlinkAccount: unlinkAccountRequest,
  linkAccount: linkAccountRequest,
}

export default connect(
  mapStateToProps,
  actions,
)(EditProfile)
