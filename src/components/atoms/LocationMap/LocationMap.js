import React from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'
import { baseIpfsUrl } from '../../../fixtures/ipfs'
import { poiPropTypes } from '../../../fixtures/pois'

import muiTheme from '../../../theme'
import { mapArrIndexed } from '../../../util/ramda-extra'

const { arrayOf, func } = PropTypes

const {
  palette: {
    primary: { main: primaryMain },
    secondary: { main: secondaryMain },
    tertiary: { main: tertiaryMain },
    // blue: { main: blueMain },
  },
} = muiTheme

const LocationMapRoot = styled('svg')({
  width: 300,
  height: 250,
})

const Node = props => (
  <g {...props} stroke={primaryMain} fill="none">
    <rect
      stroke="none"
      fill={tertiaryMain}
      x="-17"
      y="-25"
      width="65"
      height="60"
    />
    <ellipse cx="15" cy="15" rx="30" ry="16" strokeWidth="4" />
    <g stroke="none" fill={secondaryMain}>
      <rect x="11" width="8" y="15" height="8" />
      <path d="M12,10 l6,0 l0,-6 l18,-12 l0,-16 l-36,0 l0,12 l6,0 l0,-6 l24,0 l0,6 l-18,12" />
    </g>
  </g>
)

const dims = [[130, 30], [210, 90], [50, 120], [240, 160], [20, 210]]

const LocationImage = styled('image')({
  width: 65,
  height: 60,
  borderRadius: '50%',
  border: `solid 1px ${primaryMain}`,
})

const LocationMap = ({
  poisForQuest,
  // locationsLeft,
  entityClick,
  push,
}) => (
  <LocationMapRoot viewBox="0 0 300 250">
    {/*<defs>*/}
    {/*{mapArrIndexed(*/}
    {/*(poi, idx) => (*/}
    {/*<clipPath id={`circle-clip-path-${idx}`}>*/}
    {/*<circle cx={dims[idx][0]} cy={dims[idx][1]} r={30} />*/}
    {/*</clipPath>*/}
    {/*),*/}
    {/*poisForQuest,*/}
    {/*)}*/}
    {/*</defs>*/}
    <g>
      {mapArrIndexed(
        (poi, idx) =>
          poi.checked ? (
            <LocationImage
              transform={`translate(${dims[idx][0] - 20}, ${dims[idx][1] -
                30})`}
              key={poi.id}
              // clipPath={`url(#circle-clip-path-${idx})`}
              xlinkHref={`${baseIpfsUrl}/${poi.image}`}
            />
          ) : (
            <Node
              key={poi.id}
              onClick={() => {
                push('/')
                entityClick({
                  object: poi,
                })
              }}
              transform={`translate(${dims[idx][0]}, ${dims[idx][1]})`}
            />
          ),
        poisForQuest,
      )}
    </g>
  </LocationMapRoot>
)

LocationMap.propTypes = {
  poisForQuest: arrayOf(poiPropTypes),
  entityClick: func,
  push: func,
}

export default LocationMap
