import React from 'react'
import PropTypes from 'prop-types'
import styled, { cx } from 'react-emotion'
import BottomNav from '../../../containers/BottomNav'
import ScreenEffect from '../ScreenEffect'

const { bool, node, string } = PropTypes

const PageRoot = styled('div')(
  {
    width: '100vw',
    height: '100%',
    zIndex: 0,
    display: 'flex',
    flexDirection: 'column',
  },
  ({ withNav }) => withNav && { height: 'calc(100% - 75px)' },
)

const PageContent = styled('div')({ height: '100%' })

const GamePage = ({
  children,
  screenEffectClassName,
  className = '',
  withNav,
  ...props
}) => (
  <ScreenEffect className={screenEffectClassName} on>
    <PageRoot className="page-root" withNav={withNav}>
      <PageContent
        className={cx('page-content', className)}
        withNav={withNav}
        {...props}
      >
        {children}
      </PageContent>
    </PageRoot>
    {withNav && <BottomNav />}
  </ScreenEffect>
)

GamePage.propTypes = {
  children: node,
  screenEffectClassName: string,
  className: string,
  withNav: bool,
}

export default GamePage
