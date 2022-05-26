import { ApolloServer } from 'apollo-server-express'
import resolvers from './resolvers/resolvers'
import typeDefs from './typeDefs/typeDefs'

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers
})

export default apolloServer
