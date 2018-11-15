import { connect } from 'react-redux'

import LinkExistingAccount from '../components/molecules/LinkExistingAccount'
import { linkExistingAccountRequest } from '../modules/auth/actions'
import {
  getEmail,
  getMethod,
  getPendingCredId,
} from '../modules/auth/selectors'
import { subscribe } from '../util/reselect'

const mapStateToProps = subscribe({
  getMethod,
  getPendingCredId,
  getEmail,
})

const actions = { linkAccount: linkExistingAccountRequest }

export default connect(
  mapStateToProps,
  actions,
)(LinkExistingAccount)
