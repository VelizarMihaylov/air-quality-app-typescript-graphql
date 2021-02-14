import React from 'react'

import styled from 'styled-components'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import utc from 'dayjs/plugin/utc'
import customParseFormat from 'dayjs/plugin/customParseFormat'

const StyledLocationCard = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  padding-bottom: ${({ theme }) => theme.spacing(1.5)};
  background: ${({ theme }) => theme.colours.white};
  border-radius: ${({ theme }) => theme.spacing(1.5)};

  ${({ theme }) => theme.breakPoints.tablet} {
    max-width: ${({ theme }) => theme.spacing(28)};
  }

  & .card-content {
    margin: ${({ theme }) =>
      theme.spacing({
        top: 0,
        right: 1.5,
        bottom: 0,
        left: 1.5
      })};
    padding-top: ${({ theme }) => theme.spacing(3)};

    & h3 {
      color: ${({ theme }) => theme.colours.purple};
      font-weight: 600;
    }
  }
  & .updated-at {
    font-weight: 600;
    text-transform: uppercase;
  }

  & .values {
    font-weight: 600;
  }
`

export type LocationCardProps = {
  city: string
  location: string
  lastUpdated: string
  measurements: {
    parameter: string
    value: number
    unit: string
  }[]
  className?: string
}

export const LocationCard: React.FC<LocationCardProps> = ({
  city,
  location,
  lastUpdated,
  measurements,
  className
}) => {
  dayjs.extend(utc)
  dayjs.extend(relativeTime)
  dayjs.extend(customParseFormat)
  const formattedDate = dayjs(lastUpdated).utc().fromNow()
  return (
    <StyledLocationCard data-puppet="location-card" className={className}>
      <div className="card-content">
        <p className="updated-at">{`Updated ${
          process.env.REACT_APP_PUPPETEER === 'true'
            ? '5 hours ago'
            : formattedDate
        }`}</p>
        {location && <h3>{location}</h3>}
        <p>{`in ${city}, United Kingdom`}</p>
        <p className="values">{`Value: ${
          Array.isArray(measurements)
            ? measurements
                .map(
                  ({ parameter, value, unit }) =>
                    `${parameter.toUpperCase()}: ${value} ${unit}`
                )
                .join(', ')
            : 'N/A'
        }`}</p>
      </div>
    </StyledLocationCard>
  )
}
