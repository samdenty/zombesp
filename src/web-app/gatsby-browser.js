import * as React from 'react'
import { client } from './src/lib/apollo'
import { ApolloProvider } from 'react-apollo'

export const wrapRootElement = ({ element }) => {
  return <ApolloProvider client={client}>{element}</ApolloProvider>
}
