import { gql } from 'apollo-boost'

const DIRECT_CONNECTION_INTROSPECTION = gql`
  fragment DirectConnectionIntrospection on DirectConnection {
    id
    address
  }
`

export const ADD_DIRECT_CONNECTION = gql`
  mutation AddDirectConnection($zombieId: ID!, $address: String!) {
    addDirectConnection(zombieId: $zombieId, address: $address) {
      ...DirectConnectionIntrospection
    }
  }

  ${DIRECT_CONNECTION_INTROSPECTION}
`

export const REMOVE_DIRECT_CONNECTION = gql`
  mutation RemoveDirectConnection($zombieId: ID!, $id: ID!) {
    removeDirectConnection(zombieId: $zombieId, id: $id)
  }
`
