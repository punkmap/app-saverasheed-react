import React from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'

const { any } = PropTypes
const UserBadgesRoot = styled('div')({
  padding: 24,
})

const UserBadges = props => <UserBadgesRoot>{props.children}</UserBadgesRoot>

UserBadges.propTypes = {
  children: any,
}

export default UserBadges
