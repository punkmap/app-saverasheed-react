import React from 'react'
// import PropTypes from 'prop-types'
import styled from 'react-emotion'

// const { any } = PropTypes
const UserStatsRoot = styled('div')({
  padding: 24,
})

const Title = styled('div')({
  fontWeight: 600,
})

const UserStats = () => (
  <UserStatsRoot>
    <Title>Locations Visited:</Title>
    <Title>Quests Completed:</Title>
  </UserStatsRoot>
)

UserStats.propTypes = {}

export default UserStats
