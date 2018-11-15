import React from 'react'
import styled from 'react-emotion'
import PropTypes from 'prop-types'

import { SvgWrapper } from './SvgWrapper'

const { number } = PropTypes

const PortisPixelRoot = styled('g')({
  stroke: 'none',
  strokeWidth: 0,
  transform: 'translate(0px, 0px)',
})

const Blue1 = styled('g')({
  fill: '#6CB3DB',
})

const Blue2 = styled('g')({
  fill: '#509cba',
})

const Blue3 = styled('g')({
  fill: '#4A6C9B',
})

const Blue4 = styled('g')({
  fill: '#3d5578',
})

const Blue5 = styled('g')({
  fill: '#1a425a',
})

const Blue6 = styled('g')({
  fill: '#133444',
})

const PortisPixel = props => (
  <SvgWrapper viewBox="0 0 48 48" {...props}>
    <PortisPixelRoot>
      <Blue1>
        <rect x="23" y="2" width="1" height="18" />
        <rect x="22" y="4" width="1" height="18" />
        <rect x="21" y="6" width="1" height="18" />
        <rect x="20" y="8" width="1" height="18" />
        <rect x="19" y="10" width="1" height="18" />
        <rect x="18" y="12" width="1" height="10" />
        <rect x="17" y="14" width="1" height="8" />
        <rect x="16" y="16" width="1" height="6" />
        <rect x="15" y="18" width="1" height="5" />
        <rect x="14" y="20" width="1" height="5" />
        <rect x="13" y="22" width="1" height="5" />
      </Blue1>
      <Blue3>
        <rect x="24" y="2" width="1" height="18" />
        <rect x="25" y="4" width="1" height="18" />
        <rect x="26" y="6" width="1" height="18" />
        <rect x="27" y="8" width="1" height="18" />
        <rect x="28" y="10" width="1" height="18" />
        <rect x="29" y="12" width="1" height="10" />
        <rect x="30" y="14" width="1" height="8" />
        <rect x="31" y="16" width="1" height="6" />
        <rect x="32" y="18" width="1" height="5" />
        <rect x="33" y="20" width="1" height="5" />
        <rect x="34" y="22" width="1" height="5" />
      </Blue3>
      <Blue1>
        <rect x="11" y="28" width="13" height="1" />
        <rect x="10" y="29" width="14" height="1" />
        <rect x="10" y="30" width="14" height="1" />
        <rect x="10" y="31" width="14" height="1" />
        <rect x="10" y="32" width="14" height="1" />
        <rect x="10" y="33" width="14" height="1" />
        <rect x="10" y="34" width="14" height="1" />
        <rect x="10" y="35" width="14" height="1" />
        <rect x="11" y="36" width="13" height="1" />
        <rect x="11" y="37" width="13" height="1" />
        <rect x="11" y="38" width="13" height="1" />
        <rect x="12" y="39" width="12" height="1" />
        <rect x="12" y="40" width="12" height="1" />
        <rect x="13" y="41" width="11" height="1" />
        <rect x="14" y="42" width="10" height="1" />
        <rect x="15" y="43" width="9" height="1" />
        <rect x="17" y="44" width="7" height="1" />
        <rect x="19" y="45" width="5" height="1" />
      </Blue1>
      <Blue3>
        <rect x="24" y="28" width="13" height="1" />
        <rect x="24" y="29" width="14" height="1" />
        <rect x="24" y="30" width="14" height="1" />
        <rect x="24" y="31" width="14" height="1" />
        <rect x="24" y="32" width="14" height="1" />
        <rect x="24" y="33" width="14" height="1" />
        <rect x="24" y="34" width="14" height="1" />
        <rect x="24" y="35" width="14" height="1" />
        <rect x="24" y="36" width="13" height="1" />
        <rect x="24" y="37" width="13" height="1" />
        <rect x="24" y="38" width="13" height="1" />
        <rect x="24" y="39" width="12" height="1" />
        <rect x="24" y="40" width="12" height="1" />
        <rect x="24" y="41" width="11" height="1" />
        <rect x="24" y="42" width="10" height="1" />
        <rect x="24" y="43" width="9" height="1" />
        <rect x="24" y="44" width="7" height="1" />
        <rect x="24" y="45" width="5" height="1" />
      </Blue3>
      <Blue6>
        <rect x="15" y="25" width="18" height="1" />
        <rect x="13" y="26" width="22" height="1" />
        <rect x="11" y="27" width="26" height="1" />
        <rect x="12" y="28" width="24" height="1" />
        <rect x="13" y="29" width="22" height="1" />
        <rect x="14" y="30" width="20" height="1" />
        <rect x="16" y="31" width="16" height="1" />
        <rect x="17" y="32" width="14" height="1" />
        <rect x="18" y="33" width="12" height="1" />
        <rect x="19" y="34" width="10" height="1" />
        <rect x="21" y="35" width="6" height="1" />
        <rect x="23" y="36" width="2" height="1" />
      </Blue6>
      <Blue4>
        <rect x="11" y="25" width="1" height="1" />
        <rect x="12" y="24" width="1" height="2" />
        <rect x="13" y="24" width="1" height="3" />
        <rect x="14" y="23" width="1" height="5" />
        <rect x="15" y="23" width="1" height="5" />
        <rect x="16" y="22" width="1" height="7" />
        <rect x="17" y="22" width="1" height="8" />
        <rect x="18" y="22" width="1" height="9" />
        <rect x="19" y="21" width="2" height="11" />
        <rect x="21" y="20" width="2" height="13" />
        <rect x="23" y="19" width="1" height="15" />
      </Blue4>
      <Blue5>
        <rect x="36" y="25" width="1" height="1" />
        <rect x="35" y="24" width="1" height="2" />
        <rect x="34" y="24" width="1" height="3" />
        <rect x="33" y="23" width="1" height="5" />
        <rect x="32" y="23" width="1" height="5" />
        <rect x="31" y="22" width="1" height="7" />
        <rect x="30" y="22" width="1" height="8" />
        <rect x="29" y="22" width="1" height="9" />
        <rect x="27" y="21" width="2" height="11" />
        <rect x="25" y="20" width="2" height="13" />
        <rect x="24" y="19" width="1" height="15" />
      </Blue5>
      <Blue2>
        <rect x="23" y="37" width="2" height="1" />
        <rect x="23" y="38" width="2" height="1" />
        <rect x="22" y="39" width="4" height="1" />
        <rect x="22" y="40" width="4" height="1" />
        <rect x="21" y="41" width="6" height="1" />
        <rect x="20" y="42" width="8" height="1" />
        <rect x="14" y="42" width="1" height="1" />
        <rect x="33" y="42" width="1" height="1" />
        <rect x="15" y="43" width="2" height="1" />
        <rect x="31" y="43" width="2" height="1" />
        <rect x="18" y="43" width="12" height="1" />
        <rect x="17" y="44" width="14" height="1" />
        <rect x="19" y="45" width="10" height="1" />
      </Blue2>
    </PortisPixelRoot>
  </SvgWrapper>
)

PortisPixel.propTypes = { size: number }

export default PortisPixel
