import gql from 'graphql-tag'

export type LATEST_MEASUREMENTS_RESPONSE = {
  latestMeasurements: {
    location: string
    lastUpdated: string
    measurements: {
      parameter: string
      value: number
      unit: string
    }[]
  }[]
}

export const LATEST_MEASUREMENTS = gql`
  query Location($city: String!) {
    latestMeasurements(country: "gb", city: $city) {
      location
      lastUpdated
      measurements {
        parameter
        value
        unit
      }
    }
  }
`
