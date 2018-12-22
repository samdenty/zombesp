import * as TypeGraphQL from 'type-graphql'
import { ApolloServer } from 'apollo-server'
import { resolvers } from './allResolvers'
import { Database } from '@esprat/db'

async function bootstrap() {
  const database = new Database()

  const [schema] = await Promise.all([
    TypeGraphQL.buildSchema({ resolvers }),
    database.connect({
      type: 'postgres',
      url:
        'postgres://gbhuzfxv:6rvsrIvra8KSqcC7xVRcoB7-8EubF8ka@baasu.db.elephantsql.com:5432/gbhuzfxv',
      synchronize: true,
    }),
  ])

  const apolloServer = new ApolloServer({
    schema,
    context: {
      database,
    },
  })

  apolloServer.listen().then(({ url }) => {
    console.log(url)
  })
}

bootstrap()
// import mosca from 'mosca'
// var settings = {
//   port: 1883,
//   http: {
//     port: 8080,
//   },
// }
// var server = new mosca.Server(settings)

// // server.authorizePublish = (client, topic, payload, callback) => {}

// server.on('ready', function() {
//   console.log('ready')
// })

// server.on('clientConnected', function(client: any) {
//   console.log('client connected', client.id)
// })

// // fired when a message is received
// server.on('published', function(packet, client) {
//   console.log(`Published ${packet.payload} to ${packet.topic}`)
// })
