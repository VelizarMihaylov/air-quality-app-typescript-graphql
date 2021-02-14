import React from 'react'
import { ListLocations } from '..'
import { create, act } from 'react-test-renderer'

import { ThemeProvider } from 'styled-components'
import generateTheme from 'theme'

import { locations } from '../__mocks__'

import dayjs from 'dayjs'
jest.mock('dayjs')

const mockedDayJs: jest.Mock<unknown> = dayjs as never

describe('ListLocations', () => {
  it('should handle loading state', () => {
    const ListLocationsRender = create(
      <ThemeProvider theme={generateTheme()}>
        <ListLocations city="Manchester" />
      </ThemeProvider>
    ).toJSON()
    expect(ListLocationsRender).toMatchSnapshot()
  })
  it('should handle error state', () => {
    const ListLocationsRender = create(
      <ThemeProvider theme={generateTheme()}>
        <ListLocations city="Manchester" error />
      </ThemeProvider>
    ).toJSON()
    expect(ListLocationsRender).toMatchSnapshot()
  })

  it('should render locations when not in loading or error state and passed latestMeasurements', () => {
    mockedDayJs.mockImplementation(() => ({
      extend: jest.fn(),
      utc: (): { fromNow: () => string } => ({
        fromNow: (): string => '5 hours ago'
      })
    }))
    const { latestMeasurements } = locations
    const ListLocationsRender = create(
      <ThemeProvider theme={generateTheme()}>
        <ListLocations city="Manchester" locations={latestMeasurements} />
      </ThemeProvider>
    ).toJSON()
    expect(ListLocationsRender).toMatchSnapshot()
  })
})
