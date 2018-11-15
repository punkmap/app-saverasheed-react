import React from 'react'
import { storiesOf } from '@storybook/react'
import { css } from 'react-emotion'

import Splash from '.'
import muiTheme from '../../../theme'

const {
  palette: {
    tertiary: { main },
  },
} = muiTheme

storiesOf('Splash', module)
  .addDecorator(s => (
    <div
      className={css({
        backgroundColor: main,
        width: '100vw',
        height: '100vh',
      })}
    >
      {s()}
    </div>
  ))
  .add('default', () => <Splash pastDelay />)
  .add('error', () => <Splash error="Error!" />)
