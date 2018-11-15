import { connect } from 'react-redux'
import { compose } from 'recompose'

import AuthButtons from '../components/molecules/AuthButtons'
import { authenticateRequest } from '../modules/auth/actions'
import { subscribe } from '../util/reselect'

const mapStateToProps = subscribe({})

const actions = { signIn: authenticateRequest }

export default compose(
  connect(
    mapStateToProps,
    actions,
  ),
)(AuthButtons)
