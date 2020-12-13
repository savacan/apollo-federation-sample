const {
    ApolloServer,
    gql,
    ApolloError
  } = require("apollo-server")

  const { buildFederatedSchema } = require("@apollo/federation")
  
  const users = [
    { id: "0", username: "@test" },
    { id: "1", username: "@savacan" },
    { id: "2", username: "@alice" },
    { id: "3", username: "@bob" }
  ]
  
  const fetchUserById = (id) => {
    const user = users.find(e => e.id === id);
    if (!user) throw new ApolloError("user not found", 404);
    return user
  }
  
  const typeDefs = gql`
    extend type Query {
      me: User
    }
  
    type User @key(fields: "id") {
      id: ID!
      username: String
    }
  `;
  
  const resolvers = {
    Query: {
      me() {
        return { id: "1", username: "@savacan" }
      }
    },
    User: {
      __resolveReference(user) {
        return fetchUserById(user.id)
      }
    }
  }

  const server = new ApolloServer({
    schema: buildFederatedSchema([{ typeDefs, resolvers }])
  });

server.listen(3001).then(({ url }) => {
  console.log(`user serverが ${url} に立ち上がったよ！！！`);
});
