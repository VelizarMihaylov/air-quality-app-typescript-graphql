import React from 'react'
import { create } from 'react-test-renderer'

import { PageSection } from '../PageSection'

import { ThemeProvider } from 'styled-components'
import generateTheme from 'theme'

describe('PageSection', () => {
  it('should render without throwing an error', () => {
    const renderer = create(
      <ThemeProvider theme={generateTheme()}>
        <PageSection />
      </ThemeProvider>
    )

    expect(renderer.toJSON()).toMatchSnapshot()
  })
})
