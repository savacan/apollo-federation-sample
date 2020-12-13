const {
    ApolloServer,
    gql,
    ApolloError
  } = require("apollo-server")

  const { buildFederatedSchema } = require("@apollo/federation")
  
  const games = [
    { id: "0", name: "ABA", price: 0 },
    { id: "1", name: "Call and Dirty: CW", price: 8000 },
    { id: "2", name: "Call and Dirty: MW", price: 8000 },
    { id: "3", name: "Battle ground V", price: 10000 },
    { id: "4", name: "Battle ground 1", price: 9000 },
    { id: "5", name: "APEX Kings", price: 0 },
    { id: "6", name: "User Unknown Battle Fields", price: 0 },
    { id: "7", name: "DUUM", price: 6000 },
    { id: "8", name: "Counter Straight", price: 0 },
    { id: "9", name: "Counter Straight: GO", price: 0 },
  ]
  
  const fetchGameById = (id) => {
    const game = games.find(e => e.id === id);
    if (!game) throw new ApolloError("game not found", 404);
    return game
  }

  const fetchFreeGames = ({ max }) => {
      const freeGames = games.filter(e => e.price === 0);
      return freeGames.slice(0, max);
  }
  
  const typeDefs = gql`
    extend type Query {
      freeGames(max: Int = 2): [Game] 
    }
  
    type Game @key(fields: "id") {
      id: ID!
      name: String!
      price: Int!
    }
  `;
  
  const resolvers = {
    Query: {
      freeGames(_, { max }) {
        return fetchFreeGames({ max });
      }
    },
    Game: {
      __resolveReference(game) {
        return fetchGameById(game.id)
      }
    }
  }

  const server = new ApolloServer({
    schema: buildFederatedSchema([{ typeDefs, resolvers }])
  });

server.listen(3002).then(({ url }) => {
  console.log(`game serverが ${url} に立ち上がったよ！！！`);
});
