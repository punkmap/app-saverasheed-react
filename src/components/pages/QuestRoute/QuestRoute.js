import React, { Component } from 'react'
import styled, { css } from 'react-emotion'
import PropTypes from 'prop-types'
import { titleCase } from 'change-case'
import LocationMap from '../../../containers/LocationMap'

import { questPropTypes } from '../../../fixtures/quests'
import MenuPage from '../../templates/MenuPage'
import muiTheme from '../../../theme'

const { string, bool, func } = PropTypes

const {
  palette: {
    primary: { main: primaryMain },
    blue: { main: blueMain },
  },
} = muiTheme

const QuestDetail = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
})

class QuestRoute extends Component {
  static propTypes = {
    questSlug: string,
    loading: bool,
    questBySlug: questPropTypes,
    fetchQuest: func.isRequired,
  }

  componentDidMount() {}

  render() {
    const {
      questBySlug: quest,
      questSlug,
      loading,
      locationsLeft,
      ...props
    } = this.props
    return (
      <MenuPage {...props} title={quest ? quest.name : titleCase(questSlug)}>
        {loading ? (
          <div>Loading...</div>
        ) : !quest ? (
          <div>Invalid quest</div>
        ) : (
          <QuestDetail>
            <div>{quest.description}</div>
            <div
              className={css({
                color: blueMain,
                textAlign: 'center',
                fontSize: 28,
                marginTop: 20,
                marginBottom: 10,
              })}
            >
              LOCATIONS LEFT:
            </div>
            <div
              className={css({
                color: primaryMain,
                textAlign: 'center',
                fontSize: 36,
                marginBottom: 25,
              })}
            >
              {locationsLeft}
            </div>
            <LocationMap />
          </QuestDetail>
        )}
      </MenuPage>
    )
  }
}

export default QuestRoute
