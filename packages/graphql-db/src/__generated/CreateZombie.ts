/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateZombie
// ====================================================

export interface CreateZombie_createZombie_mqttConnection {
  id: string
  address: string
  username: string | null
  password: string | null
}

export interface CreateZombie_createZombie_directConnections {
  id: string
  address: string
}

export interface CreateZombie_createZombie {
  id: string
  mqttConnection: CreateZombie_createZombie_mqttConnection | null
  directConnections: CreateZombie_createZombie_directConnections[]
}

export interface CreateZombie {
  createZombie: CreateZombie_createZombie
}

export interface CreateZombieVariables {
  id: string
}
