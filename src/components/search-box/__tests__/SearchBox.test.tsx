import React from 'react'

import { create, act } from 'react-test-renderer'

import { cities } from '../__mocks__'

import { ThemeProvider } from 'styled-components'
import generateTheme from 'theme'

import { SearchBox } from '../SearchBox'

describe('SearchBox', () => {
  afterEach(() => jest.resetAllMocks())
  it('should handle loading state', () => {
    const SearchBoxRender = create(
      <ThemeProvider theme={generateTheme()}>
        <SearchBox loading />
      </ThemeProvider>
    )

    const disabledInput = SearchBoxRender.root.find(
      (element) => element.type === 'input'
    ).props.disabled

    expect(disabledInput).toBe(true)
  })
  it('should list all cities options when onFocus event is triggered and options length is bigger than 0', () => {
    const SearchBoxRender = create(
      <ThemeProvider theme={generateTheme()}>
        <SearchBox options={cities} />
      </ThemeProvider>
    )

    const input = SearchBoxRender.root.find(
      (element) => element.type === 'input'
    )

    act(() => {
      input.props.onFocus()
    })

    expect(
      SearchBoxRender.root.find((element) => element.type === 'ul').children
        .length
    ).toBe(cities.length)
  })

  it('should set the city name in the input box when an options is selected', () => {
    const SearchBoxRender = create(
      <ThemeProvider theme={generateTheme()}>
        <SearchBox options={cities} />
      </ThemeProvider>
    )

    const input = SearchBoxRender.root.find(
      (element) => element.type === 'input'
    )

    act(() => {
      input.props.onFocus()
    })

    act(() => {
      SearchBoxRender.root
        .find((element) => element.type === 'ul')
        .props.children[0].props.onMouseDown()
    })

    expect(
      SearchBoxRender.root.find((element) => element.type === 'input').props
        .value
    ).toBe(cities[0].name)
  })
})
