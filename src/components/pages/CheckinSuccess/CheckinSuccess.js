import React, { Component } from 'react'
import styled, { css, keyframes } from 'react-emotion'
import PropTypes from 'prop-types'

import muiTheme from '../../../theme'
import { Spritesheet } from '../../atoms/Spritesheet'
import MenuPage from '../../templates/MenuPage'
import sleepwalkerData from '../../../assets/sleepwalk'
import sleepwalkerImg from '../../../assets/sleepwalk.png'
import ufoData from '../../../assets/UFO_mapPin'
import ufoImg from '../../../assets/UFO_mapPin.png'

const { number, bool, func } = PropTypes

const {
  palette: {
    primary: { main: primaryMain },
  },
} = muiTheme

const mainPageCx = css({
  display: 'flex',
  flex: 1,
})

const QuestDetail = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  flex: 1,
  position: 'relative',
})

const LocationsLeft = styled('div')({
  color: primaryMain,
  textAlign: 'center',
  fontSize: 28,
  marginTop: 20,
  zIndex: 1,
})

const ufoAnimation1 = keyframes`
0% {
  transform: translate(0px, 0px);
}

10% {
  transform: translate(-100px, -10px) scale(0.7);
}

20% {
  transform: translate(100px, -10px) scale(0.7);
}

30% {
  transform: translate(50px, 10px) scale(1.3);
}

40% {
  transform: translate(-100px, 10px) scale(1.3);
}

50% {
  transform: translate(75px, -20px) scale(0.5);
}

60% {
  transform: translate(-75px, -20px) scale(0.5);
}

70% {
  transform: translate(25px, 20px) scale(1.5);
}

80% {
  transform: translate(-25px, -10px) scale(0.7);
}

90% {
  transform: translate(50px, 10px) scale(1.3);
}

100% {
  transform: translate(0px, 0px) scale(1);
}
`

const AnimRoot = styled('div')({
  // display: 'flex',
  // position: 'absolute',
  // flex: 1,
  // alignItems: 'center',
  // justifyContent: 'center',
})

const UFO = styled(AnimRoot)({
  animation: `${ufoAnimation1} 10s infinite`,
})

const sleepwalkAnimation = keyframes`
0% {
  transform: translateX(-300px);
}

50% {
  transform: translateX(300px);
}
51% {
  transform: translateX(300px) scaleX(-1);
}

100% {
  transform: translateX(-300px) scaleX(-1);
}
`

const SleepWalker = styled(AnimRoot)({
  top: 100,
  animation: `${sleepwalkAnimation} 10s infinite linear`,
})

class CheckinSuccess extends Component {
  static propTypes = {
    loading: bool,
    locationsLeft: number,
    push: func.isRequired,
  }

  render() {
    const { loading, locationsLeft, push, ...props } = this.props

    return (
      <MenuPage {...props} noNav title="NOT AGAIN!!" className={mainPageCx}>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <QuestDetail onClick={() => push('/')}>
            <LocationsLeft>
              {locationsLeft} LOCATION
              {locationsLeft === 1 ? '' : 'S'} LEFT
            </LocationsLeft>
            <UFO>
              <Spritesheet src={ufoImg} data={ufoData} />
            </UFO>
            <SleepWalker>
              <Spritesheet src={sleepwalkerImg} data={sleepwalkerData} />
            </SleepWalker>
            <div>Tap anywhere to continue</div>
          </QuestDetail>
        )}
      </MenuPage>
    )
  }
}

export default CheckinSuccess
