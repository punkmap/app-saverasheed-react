import React from 'react'
import PropTypes from 'prop-types'

import Button from '../Button'
import Link from '../Link'

const { any, func, string } = PropTypes

const ButtonLink = ({
  to,
  children,
  btnClassName,
  btnWrapperClassName,
  ...props
}) =>
  to ? (
    <Link className={btnWrapperClassName} to={to} {...props}>
      <Button className={btnClassName}>{children}</Button>
    </Link>
  ) : (
    <span className={btnWrapperClassName} {...props}>
      <Button className={btnClassName}>{children}</Button>
    </span>
  )

ButtonLink.propTypes = {
  children: any.isRequired,
  onClick: func,
  to: string,
}

export default ButtonLink
