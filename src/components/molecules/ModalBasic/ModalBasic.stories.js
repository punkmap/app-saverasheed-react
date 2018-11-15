import React from 'react'
import { storiesOf } from '@storybook/react'
import ModalBasic from '.'

storiesOf('ModalBasic', module).add('off', () => (
  <ModalBasic>Children</ModalBasic>
))
