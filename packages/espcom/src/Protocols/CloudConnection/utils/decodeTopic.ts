import escapeRegex from 'escape-string-regexp'
import { STATUS, joinPaths } from './encodeTopic'

export const decodeStatusTopic = (
  mqttTopic: string,
  deviceId: string,
  clientRef: string
) => {
  const regex = new RegExp(`^${escapeRegex(deviceId)}\\/${STATUS}\\/(.+)$`)
  const match = mqttTopic.match(regex)
  if (!match) return null

  const [, topic] = match

  switch (topic) {
    case joinPaths('ack', clientRef): {
      return 'ack'
    }
  }

  return topic
}
