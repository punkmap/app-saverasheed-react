import { connect } from 'react-redux'
import { getUser } from '../modules/auth/selectors'

import { subscribe } from '../util/reselect'
import UserStats from '../components/molecules/UserStats'

const mapStateToProps = subscribe({
  getUser,
})

export default connect()(UserStats)
