import PropTypes from 'prop-types'
import styled from 'react-emotion'

const { string, any } = PropTypes

const A = styled('a')({
  textDecoration: 'none',
  color: 'inherit',
})

A.propTypes = {
  children: any,
  href: string.isRequired,
}

export default A
