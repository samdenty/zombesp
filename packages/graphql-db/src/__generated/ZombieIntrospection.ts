/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ZombieIntrospection
// ====================================================

export interface ZombieIntrospection_mqttConnection {
  id: string
  address: string
  username: string | null
  password: string | null
}

export interface ZombieIntrospection_directConnections {
  id: string
  address: string
}

export interface ZombieIntrospection {
  id: string
  mqttConnection: ZombieIntrospection_mqttConnection | null
  directConnections: ZombieIntrospection_directConnections[]
}
