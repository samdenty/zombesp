/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetZombie
// ====================================================

export interface GetZombie_getZombie_mqttConnection {
  id: string
  address: string
  username: string | null
  password: string | null
}

export interface GetZombie_getZombie_directConnections {
  id: string
  address: string
}

export interface GetZombie_getZombie {
  id: string
  mqttConnection: GetZombie_getZombie_mqttConnection | null
  directConnections: GetZombie_getZombie_directConnections[]
}

export interface GetZombie {
  getZombie: GetZombie_getZombie | null
}

export interface GetZombieVariables {
  id: string
}
