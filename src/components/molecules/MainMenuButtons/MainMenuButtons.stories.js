import React from 'react'
import { storiesOf } from '@storybook/react'
import MainMenuButtons from '.'

const topButtonAnimDelay = 0
const topButtonAnimDuration = 1000

const bottomButtonAnimDelay = topButtonAnimDelay + topButtonAnimDuration
const bottomButtonAnimDuration = 1000

const topAnim = {
  duration: topButtonAnimDuration,
  delay: topButtonAnimDelay,
}

const bottomAnim = {
  duration: bottomButtonAnimDuration,
  delay: bottomButtonAnimDelay,
}

const props = { topAnim, bottomAnim }

storiesOf('MainMenuButtons', module)
  .add('with anim', () => <MainMenuButtons {...props} />)
  .add('skip anim', () => <MainMenuButtons skip {...props} />)
