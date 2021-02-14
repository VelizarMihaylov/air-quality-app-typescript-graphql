import React from 'react'
import { ThemeProvider } from 'styled-components'
import generateTheme from 'theme'
import { GlobalStyles } from 'components'

const theme = generateTheme({ baseSize: 1})

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Story />
    </ThemeProvider>
  ),
];
