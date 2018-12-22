export interface Zombie {
  id: string
}
export interface MQTTConnection {
  id: string
  address: string
  username: string | null
  password: string | null
}
export interface DirectConnection {
  id: string
  address: string
}
