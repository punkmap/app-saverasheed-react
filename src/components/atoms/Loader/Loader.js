import React from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'

import logo from '../../../assets/SaveRasheedLogo.svg'

const { number } = PropTypes

const LoaderRoot = styled('div')({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
})

const LoaderImgBase = styled('div')({
  width: '100vw',
  backgroundImage: `url(${logo})`,
  backgroundSize: '100vw auto',
  backgroundRepeat: 'no-repeat',
})

const LoaderImg = styled('img')({
  width: '100vw',
})

const LoaderImgOverlay = styled(LoaderImgBase)(
  {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    filter: 'grayscale(100%)',
    height: '100%',
  },
  ({ percentage }) => ({ height: `${100 - percentage}%` }),
)

const Loader = ({ percentage }) => (
  <LoaderRoot>
    <LoaderImg src={logo} />
    <LoaderImgOverlay percentage={percentage} />
  </LoaderRoot>
)

Loader.propTypes = {
  percentage: number.isRequired,
}

export default Loader
