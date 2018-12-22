import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'

export const cache = new InMemoryCache()

export const client = new ApolloClient({
  cache,
  link: new HttpLink({
    uri: '',
  }),
})
