import React, { useState } from 'react'

import styled from 'styled-components'

import { Spinner } from 'components'
import { MagnifyingGlassIcon } from './icon'

export type SearchBoxProps = {
  loading?: boolean
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void
  onSelect?: (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    name: string
  ) => void
  options?: {
    name: string
  }[]
}

const SearchBoxContainer = styled.div`
  width: 100%;
  position: relative;
  height: ${({ theme }) => theme.spacing(2.5)};

  & .input-container {
    position: absolute;
    z-index: 999;
    margin-left: 50%;
    transform: translateX(-50%);
    width: ${({ theme }) => theme.spacing(20)};
    height: ${({ theme }) => theme.spacing(2.5)};
    border: ${({ theme }) => theme.spacing(0.2)} solid grey;
    border-radius: ${({ theme }) => theme.spacing(0.75)};
    background: ${({ theme }) => theme.colours.white};

    & input {
      position: absolute;
      top: 0;
      left: ${({ theme }) => theme.spacing(3)};
      right: 0;
      font-size: ${({ theme }) => theme.spacing(1)};
      line-height: ${({ theme }) => theme.spacing(2.5)};
      background: none;
      width: ${({ theme }) => theme.spacing(16.5)};
      height: ${({ theme }) => theme.spacing(2.5)};
      border: none;
      appearance: none;
      outline: none;

      &::placeholder {
        color: ${({ theme }) => theme.colours.black};
      }
    }
  }

  & ul {
    position: absolute;
    padding: 0;
    top: ${({ theme }) => theme.spacing(2)};
    width: ${({ theme }) => theme.spacing(18.5)};
    margin-left: 50%;
    transform: translateX(-50%);
    max-height: ${({ theme }) => theme.spacing(10)};
    overflow-y: scroll;
    list-style: none;
    background: white;
    border: ${({ theme }) => theme.spacing(0.2)} solid grey;
    border-top: none;
    border-radius: 0 0 8px 8px;
    z-index: 998;

    & li {
      width: 100%;
      padding: ${({ theme }) =>
        theme.spacing({
          top: 1.5,
          right: 0,
          left: 0,
          bottom: 0.75
        })};
      text-align: center;
      cursor: pointer;
    }

    & li:hover {
      background: ${({ theme }) => theme.colours.grey};
    }
  }

  & .loading-spinner {
    border: 2px solid ${({ theme }) => theme.colours.grey};
    border-top: 2px solid ${({ theme }) => theme.colours.white};
    width: ${({ theme }) => theme.spacing(1.5)};
    height: ${({ theme }) => theme.spacing(1.5)};
    position: absolute;
    top: ${({ theme }) => theme.spacing(0.5)};
    left: ${({ theme }) => theme.spacing(0.75)};
    padding: 0;
    margin: 0;
    background: none;
    outline: none !important;
  }

  & svg {
    position: absolute;
    top: ${({ theme }) => theme.spacing(0.5)};
    left: ${({ theme }) => theme.spacing(0.75)};
    height: ${({ theme }) => theme.spacing(1.5)};
    width: ${({ theme }) => theme.spacing(1.5)};
    padding: 0;
    margin: 0;
    border: none;
    background: none;
    fill: ${({ theme }) => theme.colours.grey};
    outline: none !important;
  }
`

export const SearchBox: React.FC<SearchBoxProps> = ({
  loading,
  onChange,
  onBlur,
  onFocus,
  onSelect,
  options
}): React.ReactElement => {
  const [dataList, setDataList] = useState(options || [])
  const [showDataList, setShowDataList] = useState(false)
  const [currentValue, setCurrentValue] = useState('')
  return (
    <SearchBoxContainer>
      <div className="input-container" data-puppet="search-box-form">
        {loading ? (
          <Spinner className="loading-spinner" />
        ) : (
          <MagnifyingGlassIcon />
        )}
        <input
          data-puppet="search-box-input"
          disabled={loading}
          className="SearchBox--input"
          autoComplete="off"
          name="cities"
          placeholder={loading ? undefined : 'Enter city name...'}
          onChange={(event) => {
            if (typeof onChange === 'function') {
              onChange(event)
            }
            setCurrentValue(event.target.value)
            setDataList(
              Array.isArray(options)
                ? options.filter(({ name }) =>
                    name.match(RegExp(event.target.value, 'i'))
                  )
                : []
            )
            setShowDataList(() => dataList.length > 0)
          }}
          onBlur={(event) => {
            if (typeof onBlur === 'function') {
              onBlur(event)
            }
            setShowDataList(false)
          }}
          onFocus={(event) => {
            if (typeof onFocus === 'function') {
              onFocus(event)
            }
            if (Array.isArray(options) && options.length > 0) {
              setDataList(options)
              setShowDataList(true)
            }
          }}
          value={currentValue}
        />
      </div>
      <ul
        style={{
          display: dataList.length > 0 && showDataList ? 'block' : 'none'
        }}
      >
        {Array.isArray(dataList) &&
          dataList.map(({ name }) => (
            <li
              data-puppet="search-box-list-element"
              key={name}
              onMouseDown={(event): void => {
                if (typeof onSelect === 'function') {
                  onSelect(event, name)
                }
                setCurrentValue(name)
              }}
            >
              {name}
            </li>
          ))}
      </ul>
    </SearchBoxContainer>
  )
}
