/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetMQTTConnection
// ====================================================

export interface GetMQTTConnection_mqttConnection_zombies {
  id: string
}

export interface GetMQTTConnection_mqttConnection {
  id: string
  address: string
  username: string | null
  password: string | null
  zombies: GetMQTTConnection_mqttConnection_zombies[]
}

export interface GetMQTTConnection {
  mqttConnection: GetMQTTConnection_mqttConnection
}

export interface GetMQTTConnectionVariables {
  id: string
}
