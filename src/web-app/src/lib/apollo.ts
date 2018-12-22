import { resolvers /*defaults, typeDefs*/ } from '@esprat/graphql-db-resolver'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { withClientState } from 'apollo-link-state'

export const cache = new InMemoryCache()

export const client = new ApolloClient({
  cache,
  link: withClientState({ resolvers, cache }),
})
