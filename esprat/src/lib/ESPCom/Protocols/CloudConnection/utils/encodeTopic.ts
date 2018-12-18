export const COMMAND = 'command'
export const STATUS = 'status'
export const SEPARATOR = '/'

export const joinPaths = (...paths: string[]) => paths.join(SEPARATOR)

export const encodeCommandTopic = (topic: string, deviceId: string) =>
  joinPaths(deviceId, COMMAND, topic)

export const encodeStatusTopic = (
  topic: string,
  deviceId: string,
  clientRef: string
) => {
  const paths = [deviceId, STATUS, topic]

  switch (topic) {
    case 'ack': {
      paths.push(clientRef)
      break
    }
  }

  return joinPaths(...paths)
}
