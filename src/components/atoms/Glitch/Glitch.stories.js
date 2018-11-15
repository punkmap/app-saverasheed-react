import React from 'react'
import { storiesOf } from '@storybook/react'
import Glitch from '.'

storiesOf('Glitch', module)
  .add('with text', () => <Glitch>Save Rasheed</Glitch>)
  .add('with image', () => (
    <Glitch>
      <img src="https://s3.amazonaws.com/uifaces/faces/twitter/millinet/128.jpg" />
    </Glitch>
  ))
