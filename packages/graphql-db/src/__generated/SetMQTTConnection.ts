/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SetMQTTConnection
// ====================================================

export interface SetMQTTConnection_setMQTTConnection {
  id: string
  address: string
  username: string | null
  password: string | null
}

export interface SetMQTTConnection {
  setMQTTConnection: SetMQTTConnection_setMQTTConnection
}

export interface SetMQTTConnectionVariables {
  zombieId: string
  id: string
}
