import React from 'react'
import { configure, addDecorator } from '@storybook/react'
import { forEach } from 'ramda'
import { MuiThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import 'typeface-aldrich'

import theme from '../src/theme'
import './storybook.css'

const componentStories = require.context(
  './../src/components',
  true,
  /.stories.js$/,
)

const loadStories = () => {
  forEach(componentStories, componentStories.keys())
}

addDecorator(s => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    {s()}
  </MuiThemeProvider>
))

configure(loadStories, module)