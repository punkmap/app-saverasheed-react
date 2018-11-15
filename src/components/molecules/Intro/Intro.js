import React, { Component, Fragment } from 'react'
import styled, { css, keyframes, cx } from 'react-emotion'
import PropTypes from 'prop-types'
import { questPropTypes } from '../../../fixtures/quests'

import { isFunction, sleep } from '../../../util/ramda-extra'
import Button from '../../atoms/Button/Button'
import Modal, { ModalP, ModalTitle } from '../Modal/Modal'

const { func, arrayOf, bool } = PropTypes

const pulse = keyframes`
  0% {
    transform: scale(1);
  }

  55% {
    background-color: rgba(255, 100, 100, 0.9);
    transform: scale(1.6);
  }
`

const Beacon = styled('span')({
  position: 'absolute',
  animation: `${pulse} 1s ease-in-out infinite`,
  backgroundColor: 'rgba(255, 27, 14, 0.6)',
  borderRadius: '50%',
  display: 'inline-block',
  height: '3rem',
  width: '3rem',
  pointerEvents: 'all',
})

const floaterCx = css({
  // marginTop: -75,
  maxHeight: '100%',
  // maxHeight: '100%',
  pointerEvents: 'all',
  padding: '20px 15px',
})

const floaterBodyCx = css({
  maxHeight: '100%',
  // overflow: 'auto',
  // position: 'absolute',
})

const screenEffectCx = css({
  maxHeight: '100%',
})

const makeScreenEffectCx = styles => css(styles)

const P = styled(ModalP)({
  marginBottom: 0,
})

const btnCx = css({
  padding: 20,
  marginTop: 10,
})

const steps = [
  {
    content: (
      <Fragment>
        <ModalTitle>Welcome to SaveRasheed</ModalTitle>
        <P>
          A few months ago, Rasheed was on a geocache hike and he was abducted
          by aliens. Rasheed escaped, but not without being tested with
          radioactive materials beforehand! Rasheed made it back to Earth
          safely, but now his beard has grown quite a bit! It glows green when
          he is sleeping, and he occasionally sleepwalks. Sometimes, he will
          sleepwalk all the way across the state of California!
        </P>
        <P>
          Whenever he sleepwalks, aliens will arrive at his last known location;
          they still need to do more tests and want to abduct him again!
        </P>
        <P>
          Click the "Quest Log" below to view your first quest to Save Rasheed.
        </P>
      </Fragment>
    ),
    to: '/quest-log',
    textAlign: 'start',
    target: '#bottom-nav-quest-log',
  },
  {
    content: (
      <P>
        The Mission Log shows you all the missions you have been assigned. Click
        a mission to see what locations you'll need to visit to save Rasheed!
      </P>
    ),
    onClick: ({ selectQuest }) => selectQuest(),
    target:
      '#quest-34300835732321530447673206707498306934859497509820544160359264568',
    top: 'calc(100% - 200px)',
  },
  {
    content: (
      <P>
        Once you select this mission, pins will appear on your map and let you
        know where to go to Save Rasheed. Click "Map" to see them!
      </P>
    ),
    to: '/',
    target: '#bottom-nav-',
    top: 'calc(100% - 200px)',
  },
  {
    content: ({ stop }) => (
      <Fragment>
        <P>
          Now you will be able to view all locations for your selected mission!
        </P>
        <P>
          If you ever need to view the tutorial again, click the "?" in the
          bottom right corner.
        </P>
        <Button className={btnCx} onClick={stop}>
          I'm ready to Save Rasheed!
        </Button>
      </Fragment>
    ),
    top: '50%',
  },
]

const Root = styled('div')({
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 75,
  left: 0,
  zIndex: 99,
  pointerEvents: 'none',
})

const Body = styled('div')({
  position: 'relative',
  width: '100%',
  height: '100%',
  pointerEvents: 'all',
})

const getTargetRect = id => {
  const el = document.querySelector(id)
  if (!el) return null
  const { left, top, width, height } = el.getBoundingClientRect()
  return { left, top, width, height }
}

const BeaconRoot = styled('div')(
  {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ({ left, top, width, height }) => ({
    left,
    top,
    width,
    height,
  }),
)

class Intro extends Component {
  state = {
    run: true,
    showBeacon: true,
    stepIndex: 0,
  }

  static propTypes = {
    push: func.isRequired,
    shownIntro: func.isRequired,
    selectQuest: func.isRequired,
    quests: arrayOf(questPropTypes),
    run: bool,
  }

  async componentDidUpdate(oldProps) {
    const { pathname: oldPathname } = oldProps
    const { pathname } = this.props
    // wait for page to load before rendering beacon
    if (pathname !== oldPathname) {
      this.setState({ showBeacon: false })
      await sleep(100)
      this.setState({ showBeacon: true })
    }
  }

  start = () => this.setState({ run: true, stepIndex: 0 })

  stop = e => {
    e.stopPropagation()
    this.props.shownIntro()
    setTimeout(() => {
      this.setState({
        // run: false,
        stepIndex: 0,
      })
    }, 1000) // just wait for shownIntro to complete
  }

  handleNext = () => {
    const { push, selectQuest, quests } = this.props
    const { stepIndex } = this.state
    if (stepIndex >= steps.length) return null
    const { to, onClick } = steps[stepIndex]
    if (to) {
      push(to)
    }
    if (onClick) {
      onClick({ push, selectQuest: () => selectQuest(quests[0]) })
    }
    this.setState({ stepIndex: stepIndex + 1 })
  }

  renderFloater = () => {
    const { stepIndex } = this.state
    if (stepIndex >= steps.length) return null
    const step = steps[stepIndex]
    const { content, textAlign = 'center', top, bottom } = step
    if (!content) return null

    return (
      <Modal
        on
        noOverlay
        className={floaterCx}
        bodyClassName={floaterBodyCx}
        screenEffectClassName={cx(
          screenEffectCx,
          makeScreenEffectCx({
            textAlign,
            top,
            bottom,
          }),
        )}
        onClick={this.handleNext}
      >
        {isFunction(content) ? content({ stop: this.stop }) : content}
      </Modal>
    )
  }

  renderBeacon = () => {
    const { stepIndex, showBeacon } = this.state
    if (!showBeacon || stepIndex >= steps.length) return null
    const { target } = steps[stepIndex]
    if (!target) return null
    const rect = getTargetRect(target)
    if (!rect) return null

    const { left, top, width, height } = rect

    return (
      <BeaconRoot
        {...{
          left,
          top,
          width,
          height,
        }}
      >
        <Beacon onClick={this.handleNext} />
      </BeaconRoot>
    )
  }

  render() {
    // const { run } = this.state
    const { run } = this.props
    if (!run) return null
    return (
      <Root className="intro">
        <Body>
          {this.renderFloater()}
          {this.renderBeacon()}
        </Body>
      </Root>
    )
  }
}

export default Intro
