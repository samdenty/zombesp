/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: MQTTConnectionIntrospection
// ====================================================

export interface MQTTConnectionIntrospection_zombies {
  id: string
}

export interface MQTTConnectionIntrospection {
  id: string
  address: string
  username: string | null
  password: string | null
  zombies: MQTTConnectionIntrospection_zombies[]
}
