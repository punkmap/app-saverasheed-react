import { connect } from 'react-redux'
import { getLocation } from '../modules/common/selectors'
import { getActiveQuestSlug } from '../modules/quest/selectors'

import { subscribe } from '../util/reselect'
import BottomNav from '../components/molecules/BottomNav'

const mapStateToProps = subscribe({
  getLocation,
  getActiveQuestSlug,
})

const actions = {}

export default connect(
  mapStateToProps,
  actions,
)(BottomNav)
