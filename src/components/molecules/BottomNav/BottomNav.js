import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { css, cx } from 'react-emotion'
import { map, startsWith } from 'ramda'

import theme from '../../../theme'
import { noop } from '../../../util/ramda-extra'
import ButtonLink from '../../atoms/ButtonLink'
import BackToMap from './../../icons/ButtonBackToMap'
import CenterMap from './../../icons/ButtonCenterMap'
import CurrentQuest from './../../icons/ButtonCurrentQuest'
import NextObjective from './../../icons/ButtonNextObjective'
import QuestLog from './../../icons/ButtonQuestLog'
import Select from './../../icons/ButtonSelect'
import Profile from './../../icons/ButtonProfile'

const { object, string } = PropTypes

noop(BackToMap, CurrentQuest, NextObjective, Select, CenterMap)

const {
  palette: {
    tertiary: { main, contrastText },
    secondary: { main: secondary },
  },
} = theme

const BottomNavRoot = styled('div')({
  width: '100%',
  position: 'fixed',
  bottom: 0,
  backgroundColor: main,
  color: contrastText,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
  height: 75,
  zIndex: 2,
})

const getNavItems = ({ activeQuestSlug }) => {
  const left = {
    label: 'Profile',
    Icon: Profile,
    key: 'profile',
    to: '/profile',
  }
  const middle = {
    label: 'Map',
    Icon: BackToMap,
    key: '',
    to: '/',
  }
  const right = {
    label: 'Quest Log',
    Icon: QuestLog,
    key: 'quest-log',
    to: activeQuestSlug ? `/quest-log/${activeQuestSlug}` : '/quest-log',
  }
  return [left, middle, right]
}

const btnWrapperCx = css({ backgroundColor: 'inherit' })
const selectedBtnWrapperCx = css({ color: secondary })
const btnCx = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  flex: 1,
  backgroundColor: 'inherit',
})

class BottomNav extends Component {
  static propTypes = {
    location: object.isRequired,
    activeQuestSlug: string,
  }

  state = { selected: null }

  handleChange = selected => this.setState({ selected })

  render() {
    const {
      location: { pathname },
      activeQuestSlug,
    } = this.props

    const navItems = getNavItems({ activeQuestSlug })

    return (
      <BottomNavRoot>
        {map(
          ({ label, Icon, key, to, onClick }) => (
            <ButtonLink
              id={`bottom-nav-${key}`}
              to={to}
              key={key}
              onClick={onClick}
              btnWrapperClassName={cx(btnWrapperCx, {
                [selectedBtnWrapperCx]:
                  key === ''
                    ? pathname === '/'
                    : startsWith(`/${key}`, pathname),
              })}
              btnClassName={btnCx}
            >
              <Icon size={48} />
              {label}
            </ButtonLink>
          ),
          navItems,
        )}
      </BottomNavRoot>
    )
  }
}

export default BottomNav
