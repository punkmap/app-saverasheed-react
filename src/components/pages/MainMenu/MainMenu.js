import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import styled, { css, keyframes } from 'react-emotion'
import PropTypes from 'prop-types'

import { noop } from '../../../util/ramda-extra'
import logo from '../../../assets/SaveRasheedLogo.svg'
import AuthButtons from '../../../containers/AuthButtons'
import EmailAuth from '../../../containers/EmailAuth'
import LinkAccount from '../../../containers/LinkExistingAccount'
import LinkEmailAccount from '../../../containers/LinkEmailAccount'
import MainMenuButtons from '../../molecules/MainMenuButtons'
import Page from '../../templates/Page'
import muiTheme from '../../../theme'

const { shape, bool } = PropTypes

const {
  palette: {
    tertiary: { contrastText },
  },
} = muiTheme

const menuCx = css({
  color: contrastText,
  padding: 25,
  position: 'relative',
  overflow: 'hidden',
  justifyContent: 'flex-end',
  alignItems: 'center',
})

const logoAnim = keyframes`
0% {
  transform: translate(0, -50%);
}
100% {
  transform: translate(0, -80%) scale(0.8);
}
`

const logoAnimInstant = keyframes`
0%, 100% {
  transform: translate(0, -80%) scale(0.8);
}
`

const logoAnimDelay = 1000
const logoAnimDuration = 3000

const Logo = styled('img')(
  {
    width: 'calc(100% - 50px)',
    position: 'absolute',
    transform: 'translate(0, -50%)',
    transformOrigin: 'center',
    top: '50%',
    animation: `${logoAnim} ${logoAnimDuration}ms cubic-bezier(0.22, 0.61, 0.36, 1) forwards ${logoAnimDelay}ms`,
  },
  ({ skip }) => skip && { animation: `${logoAnimInstant} 1ms forwards` },
)

const topButtonAnimDelay = logoAnimDuration + logoAnimDelay
const topButtonAnimDuration = 1000

const bottomButtonAnimDelay = topButtonAnimDelay + topButtonAnimDuration
const bottomButtonAnimDuration = 1000

const topAnim = {
  duration: topButtonAnimDuration,
  delay: topButtonAnimDelay,
}

const bottomAnim = {
  duration: bottomButtonAnimDuration,
  delay: bottomButtonAnimDelay,
}

class MainMenu extends Component {
  static propTypes = {
    match: shape({
      isExact: bool,
    }),
  }
  state = { skip: !this.props.match.isExact } // skip for sub-pages

  componentDidMount() {
    this.timeout = setTimeout(
      () => this.setState({ skip: true }),
      bottomButtonAnimDelay + bottomButtonAnimDuration,
    )
  }

  componentWillUnmount() {
    clearTimeout(this.timeout)
  }

  handleClick = () => this.setState({ skip: true })

  render() {
    const { skip } = this.state

    return (
      <Page onClick={skip ? noop : this.handleClick} className={menuCx}>
        <Logo src={logo} alt="Save Rasheed Logo" skip={skip} />
        <Switch>
          <Route
            path="/main"
            exact
            render={() => (
              <MainMenuButtons {...{ skip, topAnim, bottomAnim }} />
            )}
          />
          <Route path="/main/link" exact component={LinkAccount} />
          <Route path="/main/link/email" exact component={LinkEmailAccount} />
          <Route path="/main/:authType" exact component={AuthButtons} />
          <Route path="/main/:authType/email" component={EmailAuth} />
        </Switch>
      </Page>
    )
  }
}

export default MainMenu
