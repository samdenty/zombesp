/* tslint:disable */
// This file was automatically generated and should not be edited.

import { MQTTConnectionsFilterInput } from './globalTypes'

// ====================================================
// GraphQL query operation: GetMQTTConnections
// ====================================================

export interface GetMQTTConnections_mqttConnections_zombies {
  id: string
}

export interface GetMQTTConnections_mqttConnections {
  id: string
  address: string
  username: string | null
  password: string | null
  zombies: GetMQTTConnections_mqttConnections_zombies[]
}

export interface GetMQTTConnections {
  mqttConnections: GetMQTTConnections_mqttConnections[]
}

export interface GetMQTTConnectionsVariables {
  filter?: MQTTConnectionsFilterInput | null
}
