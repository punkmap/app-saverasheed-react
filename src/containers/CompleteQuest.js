import { connect } from 'react-redux'

import CompleteQuest from '../components/pages/CompleteQuest'
import {
  completeQuestRequest,
  linkAccountRequest,
} from '../modules/auth/actions'
import {
  getLinkingProvider,
  getPendingCompletion,
  getUserAddress,
} from '../modules/auth/selectors'
import { getQuery } from '../modules/common/selectors'
import { getIsLoading, getQuestWithStatus } from '../modules/quest/selectors'
import { subscribe } from '../util/reselect'

const mapStateToProps = subscribe({
  getIsLoading,
  getQuery,
  getQuestWithStatus,
  getUserAddress,
  getLinkingProvider,
  getPendingCompletion,
})

const actions = {
  completeQuest: completeQuestRequest,
  linkAccount: linkAccountRequest,
}

export default connect(
  mapStateToProps,
  actions,
)(CompleteQuest)
