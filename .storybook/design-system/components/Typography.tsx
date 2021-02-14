import React from 'react'
import styled from 'styled-components'

import generateTheme from '../../../src/theme'
import { GlobalStyles } from '../../../src/components'
const theme = generateTheme()

const Wrapper = styled.div`
  h1 {
    font-family: ${theme.typography.fontFamily};
    font-size: ${theme.spacing(42)};
    margin-bottom: ${theme.spacing(24)};
  }

  h2 {
    font-family: ${theme.typography.fontFamily};
    font-size: ${theme.spacing(38)};
    margin-bottom: ${theme.spacing(24)};
  }

  h3 {
    font-family: ${theme.typography.fontFamily};
    font-size: ${theme.spacing(34)};
    margin-bottom: ${theme.spacing(24)};
  }

  h4 {
    font-family: ${theme.typography.fontFamily};
    font-size: ${theme.spacing(28)};
    margin-bottom: ${theme.spacing(24)};
  }

  p {
    font-family: ${theme.typography.fontFamily};
    font-size: ${theme.spacing(16)};
    margin-bottom: ${theme.spacing(24)};

    &.bold {
      font-weight: 700;
    }

    &.small-text {
      font-family: ${theme.typography.fontFamily};
      font-size: ${theme.spacing(14)};
      margin-bottom: ${theme.spacing(24)};
    }

    &.side-note {
      font-family: ${theme.typography.fontFamily};
      font-size: ${theme.spacing(12)};
      margin-bottom: ${theme.spacing(24)};
    }
  }
`

const Container = styled.div`
  display: flex;
  align-items: baseline;
  margin: 30px 0 !important;

  > span {
    min-width: 30px;
    margin-right: 30px;
    color: #bdb5b5;
    font-size: 24px;
    font-family: sans-serif;
  }
`

const Typography = ({ type }) => {
  if (type === 'fontFamily') {
    return (
      <>
        <GlobalStyles theme={theme} />
        <Wrapper>
          <div>
            <h1>Montserrat</h1>
          </div>
        </Wrapper>
      </>
    )
  }
  if (type === 'heading') {
    return (
      <>
        <GlobalStyles theme={theme} />
        <Wrapper>
          <div>
            <h1>h1: 42px</h1>
            <h2>h2: 38px</h2>
            <h3>h3: 34px</h3>
            <h4>h4: 28px</h4>
          </div>
        </Wrapper>
      </>
    )
  }
  if (type === 'smallText') {
    return (
      <>
        <GlobalStyles theme={theme} />
        <Wrapper>
          <div>
            <p className="small-text">Sample small text</p>
            <p className="bold small-text">Sample bold small text</p>
          </div>
        </Wrapper>
      </>
    )
  }
  if (type === 'sideNote') {
    return (
      <>
        <GlobalStyles theme={theme} />
        <Wrapper>
          <div>
            <p className="side-note">Sample side note</p>
            <p className="bold side-note">Sample side note bold</p>
          </div>
        </Wrapper>
      </>
    )
  }
  return (
    <>
      <GlobalStyles theme={theme} />
      <Wrapper>
        <div>
          <p>Sample Text</p>
          <p className="bold">Bold Sample Text</p>
        </div>
      </Wrapper>
    </>
  )
}

export default Typography
