import { createGlobalStyle } from 'styled-components'
import normalize from './@normalize'

export const GlobalStyles = createGlobalStyle`
  ${normalize}

  body {
    height: 100%;
    background: ${({ theme }) => theme.colours.bg[100]};
    background-repeat: no-repeat;
    background-attachment: fixed;
    font-family: ${({ theme }) => theme.typography.fontFamily};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0;
  }
`
