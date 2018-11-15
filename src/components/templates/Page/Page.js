import React from 'react'
import PropTypes from 'prop-types'
import styled, { cx } from 'react-emotion'
import GamePage from '../GamePage/GamePage'

const { node, string } = PropTypes

const PageContent = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: '100%',
})

const Page = ({ children, className = '', ...props }) => (
  <GamePage {...props}>
    <PageContent className={cx('page', className)}>{children}</PageContent>
  </GamePage>
)

Page.propTypes = {
  children: node,
  className: string,
}

export default Page
