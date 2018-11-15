import React from 'react'
import { storiesOf } from '@storybook/react'
import { css } from 'react-emotion'

import Loader from '.'
import muiTheme from '../../../theme'

const {
  palette: {
    tertiary: { main },
  },
} = muiTheme

storiesOf('Loader', module)
  .addDecorator(s => (
    <div className={css({ backgroundColor: main })}>{s()}</div>
  ))
  .add('10% done', () => <Loader percentage={10} />)
  .add('50% done', () => <Loader percentage={50} />)
  .add('100% done', () => <Loader percentage={100} />)
