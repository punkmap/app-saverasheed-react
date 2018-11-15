import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { questPropTypes } from '../../../fixtures/quests'
import { mapArrIndexed } from '../../../util/ramda-extra'
import Quest from '../../molecules/Quest/Quest'
import MenuPage from '../../templates/MenuPage'

const { func, arrayOf } = PropTypes

class QuestLog extends Component {
  static propTypes = {
    fetchQuests: func.isRequired,
    selectQuest: func.isRequired,
    questsWithStatus: arrayOf(questPropTypes),
  }

  componentDidMount() {
    this.props.fetchQuests()
  }

  render() {
    const { questsWithStatus, selectQuest, ...props } = this.props

    return (
      <MenuPage {...props} title="Quests">
        {mapArrIndexed(
          (quest, idx) => (
            <Quest
              selectQuest={selectQuest}
              key={quest.id}
              quest={quest}
              idx={idx + 1}
            />
          ),
          questsWithStatus,
        )}
      </MenuPage>
    )
  }
}

export default QuestLog
