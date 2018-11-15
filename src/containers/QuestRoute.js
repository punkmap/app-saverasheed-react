import { connect } from 'react-redux'

import QuestRoute from '../components/pages/QuestRoute'
import { fetchQuestRequest } from '../modules/quest/actions'
import {
  getIsLoading,
  getLocationsLeft,
  getQuestBySlug,
  getQuestSlug,
} from '../modules/quest/selectors'
import { subscribe } from '../util/reselect'

const mapStateToProps = subscribe({
  getIsLoading,
  getQuestSlug,
  getQuestBySlug,
  getLocationsLeft,
})

const actions = {
  fetchQuest: fetchQuestRequest,
}

export default connect(
  mapStateToProps,
  actions,
)(QuestRoute)
