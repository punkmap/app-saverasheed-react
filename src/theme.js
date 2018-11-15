import { createMuiTheme } from '@material-ui/core'
import { map, join, multiply } from 'ramda'
import Color from 'color'

// const { indigo, blueGrey } = colors

const lighten = (color, coefficient = 0.2) => {
  const [h, s, l] = Color(color).hsl().color
  const newL = l + (100 - l) * coefficient
  return Color({ h, s, l: newL }).rgb()
}

const darken = (color, coefficient = 0.3) => {
  const { color: col } = Color(color).rgb()
  return Color(map(multiply(1 - coefficient), col)).rgb()
}

const primaryMain = '#B8FF2D'
const secondaryMain = '#FF5E5B'
const tertiaryMain = '#052930'
const blue = '#2c8c99'
// const primaryMain = '#252a42'
// const secondaryMain = '#b8f92e'

export const theme = {
  palette: {
    primary: { main: primaryMain },
    secondary: { main: secondaryMain },
    tertiary: {
      light: lighten(tertiaryMain).hex(),
      main: tertiaryMain,
      dark: darken(tertiaryMain).hex(),
      contrastText: primaryMain,
    },
    blue: {
      light: lighten(blue).hex(),
      main: blue,
      dark: darken(blue).hex(),
      contrastText: secondaryMain,
    },
  },
  typography: {
    fontFamily: join(', ', [
      'Aldrich',
      'Roboto',
      'Helvetica',
      'Arial',
      'sans-serif',
    ]),
  },
}

export const muiTheme = createMuiTheme(theme)

console.log({ muiTheme })

export default muiTheme
