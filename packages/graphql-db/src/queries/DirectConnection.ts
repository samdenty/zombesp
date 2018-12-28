import gql from 'graphql-tag'

const DIRECT_CONNECTION_INTROSPECTION = gql`
  fragment DirectConnectionIntrospection on DirectConnection {
    id
    address
    zombie {
      id
    }
  }
`

export const GET_DIRECT_CONNECTION = gql`
  query GetDirectConnection($id: ID!) {
    directConnection(id: $id) {
      ...DirectConnectionIntrospection
    }
  }

  ${DIRECT_CONNECTION_INTROSPECTION}
`

export const GET_DIRECT_CONNECTIONS = gql`
  query GetDirectConnections($filter: DirectConnectionsFilterInput) {
    directConnections(filter: $filter) {
      ...DirectConnectionIntrospection
    }
  }

  ${DIRECT_CONNECTION_INTROSPECTION}
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
