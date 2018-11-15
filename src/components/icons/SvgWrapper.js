import styled from 'react-emotion'
import PropTypes from 'prop-types'

const { number } = PropTypes

export const SvgWrapper = styled('svg')(
  {
    fill: 'currentColor',
  },
  ({ size }) => ({
    width: size,
    height: size,
  }),
)

SvgWrapper.propTypes = {
  size: number,
}

SvgWrapper.defaultProps = { size: 24 }

export const ImgWrapper = styled('img')(({ size }) => ({
  width: size,
  height: size,
}))

ImgWrapper.propTypes = {
  size: number,
}

ImgWrapper.defaultProps = { size: 24 }
