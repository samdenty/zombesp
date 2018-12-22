/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetZombie
// ====================================================

export interface GetZombie_zombie_mqttConnection {
  id: string
  address: string
  username: string | null
  password: string | null
}

export interface GetZombie_zombie_directConnections {
  id: string
  address: string
}

export interface GetZombie_zombie {
  id: string
  mqttConnection: GetZombie_zombie_mqttConnection | null
  directConnections: GetZombie_zombie_directConnections[]
}

export interface GetZombie {
  zombie: GetZombie_zombie | null
}

export interface GetZombieVariables {
  id: string
}
