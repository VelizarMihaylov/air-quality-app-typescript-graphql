import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'

const httpLink = createHttpLink({
  uri: 'http://localhost:4444/graphql'
})

export const client = new ApolloClient({
  ssrMode: false,
  link: httpLink,
  cache: new InMemoryCache()
})
