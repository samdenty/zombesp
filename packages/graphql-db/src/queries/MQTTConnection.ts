import { gql } from 'apollo-boost'

const MQTT_CONNECTION_INTROSPECTION = gql`
  fragment MQTTConnectionIntrospection on MQTTConnection {
    id
    address
    username
    password
  }
`

export const CREATE_MQTT_CONNECTION = gql`
  mutation CreateMQTTConnection(
    $address: String!
    $auth: MQTTConnectionAuthInput
  ) {
    createMQTTConnection(address: $address, auth: $auth) {
      ...MQTTConnectionIntrospection
    }
  }

  ${MQTT_CONNECTION_INTROSPECTION}
`

export const DELETE_MQTT_CONNECTION = gql`
  mutation DeleteMQTTConnection($id: ID!) {
    deleteMQTTConnection(id: $id)
  }
`

export const SET_MQTT_CONNECTION = gql`
  mutation SetMQTTConnection($zombieId: ID!, $id: ID!) {
    setMQTTConnection(zombieId: $zombieId, id: $id) {
      ...MQTTConnectionIntrospection
    }
    ${MQTT_CONNECTION_INTROSPECTION}
  }
`
