import { createGlobalStyle } from 'styled-components'
import normalize from './@normalize'

export const GlobalStyles = createGlobalStyle`
  ${normalize}

  body {
    font-family: ${({ theme }) => theme.typography.fontFamily};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0;
  }
`
