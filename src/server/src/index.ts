import mosca from 'mosca'

var settings = {
  port: 1883,
  http: {
    port: 8080,
  },
}

var server = new mosca.Server(settings)

// server.authorizePublish = (client, topic, payload, callback) => {}

server.on('ready', function() {
  console.log('ready')
})

server.on('clientConnected', function(client: any) {
  console.log('client connected', client.id)
})

// fired when a message is received
server.on('published', function(packet, client) {
  console.log(`Published ${packet.payload} to ${packet.topic}`)
})
