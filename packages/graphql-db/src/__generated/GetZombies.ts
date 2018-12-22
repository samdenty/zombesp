/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetZombies
// ====================================================

export interface GetZombies_zombies_mqttConnection {
  id: string
  address: string
  username: string | null
  password: string | null
}

export interface GetZombies_zombies_directConnections {
  id: string
  address: string
}

export interface GetZombies_zombies {
  id: string
  mqttConnection: GetZombies_zombies_mqttConnection | null
  directConnections: GetZombies_zombies_directConnections[]
}

export interface GetZombies {
  zombies: GetZombies_zombies[]
}
