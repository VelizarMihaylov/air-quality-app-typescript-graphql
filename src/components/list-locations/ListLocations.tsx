import React from 'react'

import styled from 'styled-components'

import { LocationCard, Spinner } from 'components'

const StyledListLocations = styled.div`
  min-height: ${({ theme }) => theme.spacing(30)};
  margin: 0 auto;
  position: relative;
  display: flex;
  justify-content: space-between;
  flex-flow: column wrap;

  ${({ theme }) => theme.breakPoints.tablet} {
    flex-flow: row wrap;
  }

  padding: ${({ theme }) => theme.spacing(1.5)};

  & .locations-list-spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    padding: 0;
    margin-top: ${({ theme }) => theme.spacing(-1.5)};
    margin-left: ${({ theme }) => theme.spacing(-1.5)};
  }

  & > .location-card {
    flex: 0 0 45%;
    margin: ${({ theme }) =>
      theme.spacing({
        top: 1.5,
        right: 0,
        bottom: 1.5,
        left: 0
      })};
  }
`

export type ListLocationsProps = {
  loading?: boolean
  city: string
  locations?: {
    location: string
    lastUpdated: string
    measurements: {
      parameter: string
      value: number
      unit: string
    }[]
  }[]
  error?: boolean
}
export const ListLocations: React.FC<ListLocationsProps> = ({
  loading,
  locations,
  city,
  error
}): React.ReactElement => {
  if (error) return <h1>Oops something went wrong!</h1>
  return (
    <StyledListLocations>
      {loading ? (
        <Spinner className="locations-list-spinner" />
      ) : Array.isArray(locations) ? (
        locations.map(({ location, lastUpdated, measurements }, i) => (
          <LocationCard
            key={`${i}-location`}
            city={city}
            location={location}
            measurements={measurements}
            lastUpdated={lastUpdated}
            className="location-card"
          />
        ))
      ) : null}
    </StyledListLocations>
  )
}
