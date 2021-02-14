import React from 'react'
import { create } from 'react-test-renderer'

import { ContentWrapper } from '../ContentWrapper'

import { ThemeProvider } from 'styled-components'
import generateTheme from 'theme'

describe('ContentWrapper', () => {
  it('should render without throwing an error', () => {
    const renderer = create(
      <ThemeProvider theme={generateTheme()}>
        <ContentWrapper />
      </ThemeProvider>
    )

    expect(renderer.toJSON()).toMatchSnapshot()
  })
})
