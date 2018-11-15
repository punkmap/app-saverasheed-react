import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'react-emotion'
import { withRouter } from 'react-router-dom'
import { split } from 'ramda'

import theme from '../../../theme'
import ArrowBack from '../../icons/ArrowBack'
import GamePage from '../GamePage/GamePage'

const { bool, any, string, shape, func } = PropTypes

const {
  palette: {
    getContrastText,
    tertiary: { main },
    primary: { main: primaryMain },
  },
} = theme

const MenuPageRoot = styled('div')({
  background: main,
  color: getContrastText(main),
  zIndex: 9999999,
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: '100%',
})

const MenuPageHeader = styled('header')({
  color: primaryMain,
  fontSize: 24,
  minHeight: 55,
  // height: 55,
  textAlign: 'center',
  fontWeight: 'bold',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '10px 0',
  borderBottom: `solid 2px ${primaryMain}`,
  position: 'relative',
})

const MenuPageHeaderBody = styled('div')({
  margin: '0px 45px',
})

const MenuPageBody = styled('div')({
  padding: '20px 40px',
  overflowX: 'hidden',
  overflowY: 'scroll',
})

const arrowCx = css({
  position: 'absolute',
  left: 15,
})

const MenuPage = ({
  children,
  title,
  className = '',
  location: { pathname },
  history: { goBack, push },
  noNav,
  ...props
}) => (
  <GamePage withNav>
    <MenuPageRoot {...props}>
      <MenuPageHeader>
        {!noNav && (
          <ArrowBack
            className={arrowCx}
            onClick={() => {
              const path = split('/', pathname)
              const dest = `/${path.length === 2 ? '' : path[1]}`
              push(dest)
            }}
          />
        )}
        <MenuPageHeaderBody>{title}</MenuPageHeaderBody>
      </MenuPageHeader>
      <MenuPageBody className={className}>{children}</MenuPageBody>
    </MenuPageRoot>
  </GamePage>
)

MenuPage.propTypes = {
  title: string.isRequired,
  children: any,
  className: string,
  location: shape({
    pathname: string.isRequired,
  }).isRequired,
  history: shape({
    push: func.isRequired,
    goBack: func.isRequired,
  }).isRequired,
  noNav: bool,
}

export default withRouter(MenuPage)
