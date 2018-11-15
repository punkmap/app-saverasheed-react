import React from 'react'
import { storiesOf } from '@storybook/react'
import styled from 'react-emotion'
import { map, assoc, reduce, init, join, forEach, toPairs, pipe } from 'ramda'

import { words } from '../../util/ramda-extra'
import muiTheme from '../../theme'

const {
  palette: {
    tertiary: { main },
  },
} = muiTheme

const req = require.context('./', true, /.js$/)

const stories = reduce(
  (acc, key) => {
    const storyName = join('', init(words(key)))
    const story = req(key).default
    return story ? assoc(storyName, story, acc) : acc
  },
  {},
  req.keys(),
)

const StoryWrapper = styled('div')(
  {
    padding: 20,
    display: 'flex',
    flexWrap: 'wrap',
  },
  ({ dark }) => dark && { backgroundColor: main },
)

const IconWrapper = styled('div')(
  {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  ({ dark }) => dark && { backgroundColor: main },
)

const s = storiesOf('Iconography', module)
  .add('All', () => (
    <StoryWrapper>
      {pipe(
        toPairs,
        map(([id, Icon]) => (
          <IconWrapper key={id}>
            <Icon />
          </IconWrapper>
        )),
      )(stories)}
    </StoryWrapper>
  ))
  .add('All, dark', () => (
    <StoryWrapper dark>
      {pipe(
        toPairs,
        map(([id, Icon]) => (
          <IconWrapper key={`dark-${id}`}>
            <Icon />
          </IconWrapper>
        )),
      )(stories)}
    </StoryWrapper>
  ))

pipe(
  toPairs,
  forEach(([id, Icon]) =>
    s
      .add(id, () => (
        <IconWrapper>
          <Icon />
        </IconWrapper>
      ))
      .add(`${id}, dark`, () => (
        <IconWrapper dark>
          <Icon />
        </IconWrapper>
      )),
  ),
)(stories)
