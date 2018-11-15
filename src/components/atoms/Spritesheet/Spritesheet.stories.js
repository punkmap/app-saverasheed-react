import React from 'react'
import { storiesOf } from '@storybook/react'
import Spritesheet from '.'
import sleepwalkerData from '../../../assets/sleepwalk'
import sleepwalkerImg from '../../../assets/sleepwalk.png'
import ufoData from '../../../assets/UFO_mapPin'
import ufoImg from '../../../assets/UFO_mapPin.png'
import ufoCheckedData from '../../../assets/UFO_mapPin_checked'
import ufoCheckedImg from '../../../assets/UFO_mapPin_checked.png'
import loadingData from '../../../assets/Loading'
import loadingImg from '../../../assets/Loading.png'
import ufoData2 from '../../../assets/UFO_mapPin_color2'
import ufoImg2 from '../../../assets/UFO_mapPin_color2.png'

storiesOf('Spritesheet', module)
  .add('sleepwalker', () => (
    <Spritesheet src={sleepwalkerImg} data={sleepwalkerData} />
  ))
  .add('ufo', () => <Spritesheet src={ufoImg} data={ufoData} />)
  .add('ufo checked', () => (
    <Spritesheet src={ufoCheckedImg} data={ufoCheckedData} />
  ))
  .add('ufo color 2', () => <Spritesheet src={ufoImg2} data={ufoData2} />)
  .add('loading', () => <Spritesheet src={loadingImg} data={loadingData} />)
  .add('loading with custom width', () => (
    <Spritesheet src={loadingImg} data={loadingData} stageWidth={400} />
  ))
  .add('loading with autoheight', () => (
    <Spritesheet src={loadingImg} data={loadingData} autoheight />
  ))
