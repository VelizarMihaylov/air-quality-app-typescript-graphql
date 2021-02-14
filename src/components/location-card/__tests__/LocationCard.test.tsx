import React from 'react'
import { create } from 'react-test-renderer'

import { LocationCard } from '..'

import { ThemeProvider } from 'styled-components'
import generateTheme from 'theme'

import dayjs from 'dayjs'
jest.mock('dayjs')
const mockedDayJs: jest.Mock<unknown> = dayjs as never

import { measurements } from '../__mocks__'

describe('LocationCard', () => {
  it('should render with city, location and measurement props', () => {
    mockedDayJs.mockImplementation(() => ({
      extend: jest.fn(),
      utc: (): { fromNow: () => string } => ({
        fromNow: (): string => '5 hours ago'
      })
    }))
    const LocationCardRender = create(
      <ThemeProvider theme={generateTheme()}>
        <LocationCard
          city="Manchester"
          location="Manchester Piccadilly"
          measurements={measurements}
          lastUpdated="2019-12-28T08:00:00.000Z"
        />
      </ThemeProvider>
    ).toJSON()
    expect(LocationCardRender).toMatchSnapshot()
  })
})
