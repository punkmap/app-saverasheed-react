import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { shownIntroRequest } from '../modules/auth/actions'

import { getPathname } from '../modules/common/selectors'
import { getViewportHeight } from '../modules/map/selectors'
import { selectQuestRequest } from '../modules/quest/actions'
import { getQuests } from '../modules/quest/selectors'
import { subscribe } from '../util/reselect'
import Intro from '../components/molecules/Intro'

const mapStateToProps = subscribe({
  getViewportHeight,
  getPathname,
  getQuests,
})

const actions = {
  push,
  selectQuest: selectQuestRequest,
  shownIntro: shownIntroRequest,
}

export default connect(
  mapStateToProps,
  actions,
)(Intro)
