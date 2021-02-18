import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'

const graphqlEndpoint =
  process.env.REACT_APP_GRAPHQL_ENDPOINT || 'http://localhost:4444'

const httpLink = createHttpLink({
  uri: `${graphqlEndpoint}/graphql`
})

export const client = new ApolloClient({
  ssrMode: false,
  link: httpLink,
  cache: new InMemoryCache()
})
