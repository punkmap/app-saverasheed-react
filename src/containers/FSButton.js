import React from 'react'
import { connect } from 'react-redux'
import styled from 'react-emotion'

import { exitFullScreen, requestFullScreen } from '../modules/common/actions'
import { getIsFullScreen } from '../modules/common/selectors'
import { subscribe } from '../util/reselect'

const mapStateToProps = subscribe({
  getIsFullScreen,
})

const actions = {
  requestFullScreen,
  exitFullScreen,
}

const FSButtonRoot = styled('div')({ position: 'fixed', top: 40, left: 0 })

const FSButton = ({ requestFullScreen, exitFullScreen, isFullScreen }) => (
  <FSButtonRoot onClick={isFullScreen ? exitFullScreen : requestFullScreen}>
    {isFullScreen ? 'exit full screen' : 'enter full screen'}
  </FSButtonRoot>
)

export default connect(
  mapStateToProps,
  actions,
)(FSButton)
