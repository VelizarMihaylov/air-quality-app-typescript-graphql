import React from 'react'

import { GlobalStyles } from 'components'
import { AirQuality } from 'pages'

import { ThemeProvider } from 'styled-components'
import generateTheme from 'theme'

const App: React.FC = () => {
  return (
    <ThemeProvider theme={generateTheme({ baseSize: 1 })}>
      <GlobalStyles />
      <AirQuality />
    </ThemeProvider>
  )
}

export default App
