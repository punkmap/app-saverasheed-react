import { connect } from 'react-redux'

import QuestLog from '../components/pages/QuestLog'
import { getIsLoading, getQuestsWithStatus } from '../modules/quest/selectors'
import { subscribe } from '../util/reselect'
import {
  fetchQuestsRequest,
  selectQuestRequest,
} from '../modules/quest/actions'

const mapStateToProps = subscribe({
  getIsLoading,
  getQuestsWithStatus,
})

const actions = {
  fetchQuests: fetchQuestsRequest,
  selectQuest: selectQuestRequest,
}

export default connect(
  mapStateToProps,
  actions,
)(QuestLog)
