import { connect } from 'react-redux'
import { compose } from 'recompose'

import EmailAuth from '../components/molecules/EmailAuth'
import { linkEmailRequest } from '../modules/auth/actions'
import { getEmail } from '../modules/auth/selectors'
import { subscribe } from '../util/reselect'

const mapStateToProps = subscribe({
  getEmail,
})

const actions = { submit: linkEmailRequest }

export default compose(
  connect(
    mapStateToProps,
    actions,
  ),
)(EmailAuth)
