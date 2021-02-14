import React, { useState } from 'react'
import { PageSection, SearchBox, ListLocations } from 'components'

import { useQuery, useLazyQuery } from '@apollo/react-hooks'
import { GET_CITIES, GET_CITIES_RESPONSE } from '@apollo-client'
import {
  LATEST_MEASUREMENTS,
  LATEST_MEASUREMENTS_RESPONSE
} from '@apollo-client'

import styled from 'styled-components'

const PageComponent = styled.div`
  height: calc(100vh - ${({ theme }) => theme.spacing(1.5)});
  padding-top: ${({ theme }) => theme.spacing(1.5)};
  background: ${({ theme }) => theme.colours.bg[100]};

  & h1 {
    color: ${({ theme }) => theme.colours.white};
    line-height: ${({ theme }) => theme.spacing(1.5)};
    text-align: center;
  }

  & .page-intro {
    color: ${({ theme }) => theme.colours.white};
    font-size: $subHeading;
    text-align: center;
    padding: ${({ theme }) => theme.spacing(1.5)};
    line-height: ${({ theme }) => theme.spacing(1.5)};
  }
`

export const AirQuality = (): React.ReactElement => {
  const { data, loading, error } = useQuery<GET_CITIES_RESPONSE>(GET_CITIES)
  const [
    getLatestMeasurements,
    { loading: loadingLatestMeasurements, data: latestMeasurementsData }
  ] = useLazyQuery<LATEST_MEASUREMENTS_RESPONSE>(LATEST_MEASUREMENTS)
  const [currentCity, setCurrentCity] = useState('')

  if (error) return <h1>Oops something went wrong!</h1>

  const { cities } = data || { cities: [] }

  return (
    <PageComponent>
      <h1>Compare Your Air</h1>
      <p className="page-intro">
        Compare the air quality between cities in the UK.
        <br />
        Select cities to compare using the search tool below.
      </p>
      <SearchBox
        options={cities}
        loading={loading}
        onSelect={(event, name) => {
          setCurrentCity(name)
          getLatestMeasurements({
            variables: { city: name }
          })
        }}
      />
      <PageSection>
        {currentCity.length > 0 && (
          <ListLocations
            city={currentCity}
            loading={loadingLatestMeasurements}
            locations={latestMeasurementsData?.latestMeasurements}
          />
        )}
      </PageSection>
    </PageComponent>
  )
}
