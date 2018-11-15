import React from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'
import Color from 'color'

import {
  COMPLETED,
  IN_PROGRESS,
  questPropTypes,
} from '../../../fixtures/quests'
import topSecret from '../../../assets/top-secret.png'
import { baseIpfsUrl } from '../../../modules/quest/middleware'
import muiTheme from '../../../theme'
import { noop } from '../../../util/ramda-extra'

const { number, func } = PropTypes

const {
  palette: {
    primary: { main: primaryMain },
    tertiary: { main },
  },
} = muiTheme

const QuestRoot = styled('div')({
  display: 'flex',
  marginBottom: 15,
  position: 'relative',
  color: 'inherit',
  textDecoration: 'inherit',
})

const QuestImage = styled('img')({
  width: 50,
  minWidth: 50,
  maxWidth: 50,
  height: 100,
  marginRight: 10,
})

const QuestBody = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
})

const QuestTitle = styled('div')({
  fontSize: 24,
  textDecoration: 'underline',
  marginBottom: 15,
})

const QuestDescription = styled('div')({})

const QuestArrowBody = styled('div')({
  color: primaryMain,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  fontSize: 14,
})

const QuestArrowText = styled('span')({ marginRight: 5 })

const QuestArrowRoot = styled('svg')({
  width: 100,
  height: 20,
  fill: 'currentColor',
})

const QuestOverlay = styled('div')({
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  // TODO: placeholder
  backgroundColor: Color(main)
    .fade(0.5)
    .rgb(),
  backgroundImage: `url(${topSecret})`,
  backgroundSize: 'contain',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
})

noop(QuestOverlay)

const QuestArrow = () => (
  <QuestArrowRoot viewBox="0 0 100 20">
    <polygon points="0,8 80,8 80,0 100,10 80,20 80,12 0,12 0,9" />
  </QuestArrowRoot>
)

const getQuestText = status => {
  if (status === IN_PROGRESS) {
    return 'Continue Quest'
  }
  if (status === COMPLETED) {
    return 'Completed!'
  }
  return 'Start Quest'
}

const Quest = ({
  quest,
  quest: { id, description, name, status, image },
  selectQuest,
  idx,
}) => (
  <QuestRoot id={`quest-${id}`} onClick={() => selectQuest(quest)}>
    <QuestImage
      src={
        image ? `${baseIpfsUrl}/${image}` : 'https://placekitten.com/g/300/600'
      }
      alt={name}
    />
    <QuestBody>
      <QuestTitle>
        Quest {idx}: {name}
      </QuestTitle>
      <QuestDescription>
        {description.substring(0, 58)}
        ...
      </QuestDescription>
      <QuestArrowBody>
        <QuestArrowText>{getQuestText(status)}</QuestArrowText>
        {status !== 'COMPLETED' && <QuestArrow />}
      </QuestArrowBody>
    </QuestBody>
  </QuestRoot>
)

Quest.propTypes = {
  quest: questPropTypes,
  idx: number.isRequired,
  selectQuest: func.isRequired,
}

export default Quest
