import React from 'react'
import { create } from 'react-test-renderer'

import { Spinner } from '../Spinner'

import { ThemeProvider } from 'styled-components'
import generateTheme from 'theme'

describe('Spinner', () => {
  it('should render without throwing an error', () => {
    const renderer = create(
      <ThemeProvider theme={generateTheme()}>
        <Spinner />
      </ThemeProvider>
    )

    expect(renderer.toJSON()).toMatchSnapshot()
  })
})
