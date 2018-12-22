const path = require('path')

module.exports = {
  client: {
    includes: ['./src/**/*.ts'],
    service: {
      name: 'esprat',
      localSchemaFile: path.join(__dirname, '../../src/server/schema.gql'),
    },
  },
}
