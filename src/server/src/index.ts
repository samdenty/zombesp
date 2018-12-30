import * as TypeGraphQL from 'type-graphql'
import { Server as MoscaServer } from 'mosca'
import { ApolloServer } from 'apollo-server'
import { resolvers } from './allResolvers'
import { Database } from '@esprat/db'

async function bootstrap() {
  const database = new Database()

  const [schema] = await Promise.all([
    TypeGraphQL.buildSchema({ resolvers, emitSchemaFile: true }),
    database.connect({
      type: 'postgres',
      url:
        'postgres://ylrthbcyojlhev:013f2488b2691e2b2e19905f96bc44e19634a0c56c99ff1b076c102a9875998a@ec2-54-235-178-189.compute-1.amazonaws.com:5432/dd494u8q3q45k2',
      synchronize: true,
      ssl: true,
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

  const moscaServer = new MoscaServer({
    port: 1883,
    http: {
      port: 8080,
    },
  })

  // server.authorizePublish = (client, topic, payload, callback) => {}

  moscaServer.on('ready', function() {
    console.log('ready')
  })

  moscaServer.on('clientConnected', function(client: any) {
    console.log('client connected', client.id)
  })

  // fired when a message is received
  moscaServer.on('published', function(packet, client) {
    console.log(`Published ${packet.payload} to ${packet.topic}`)
  })
}

bootstrap()
