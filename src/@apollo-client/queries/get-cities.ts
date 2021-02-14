import gql from 'graphql-tag'

export type GET_CITIES_RESPONSE = {
  cities: {
    name: string
  }[]
}

export const GET_CITIES = gql`
  {
    cities(country: "gb") {
      name
    }
  }
`
