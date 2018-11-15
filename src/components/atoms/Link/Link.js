import PropTypes from 'prop-types'
import { Link as RRLink } from 'react-router-dom'
import styled from 'react-emotion'

const { string, any } = PropTypes

const Link = styled(RRLink)({
  textDecoration: 'none',
  color: 'inherit',
})

Link.propTypes = {
  children: any,
  to: string.isRequired,
}

export default Link
