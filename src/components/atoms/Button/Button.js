import PropTypes from 'prop-types'
import styled from 'react-emotion'

const { any, func } = PropTypes

const Button = styled('button')({
  color: 'inherit',
  border: 'none',
  display: 'flex',
  alignItems: 'center',
  background: 'white',
  fontSize: 14,
  padding: '0px 8px',
  borderRadius: 5,
})

Button.propTypes = {
  children: any.isRequired,
  onClick: func,
}

export default Button
