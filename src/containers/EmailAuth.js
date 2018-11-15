import { connect } from 'react-redux'
import { compose } from 'recompose'

import EmailAuth from '../components/molecules/EmailAuth'
import { authenticateRequest } from '../modules/auth/actions'
import { subscribe } from '../util/reselect'

const mapStateToProps = subscribe({})

const actions = { submit: authenticateRequest }

export default compose(
  connect(
    mapStateToProps,
    actions,
  ),
)(EmailAuth)
