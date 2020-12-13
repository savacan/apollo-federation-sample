const { ApolloServer, gql, ApolloError } = require("apollo-server");

const { buildFederatedSchema } = require("@apollo/federation");

const arr = (n) => [...Array(n)].map((_, i) => i);
const setupReviews = () => {
  const users = [
    { userId: "0", username: "@test" },
    { userId: "1", username: "@savacan" },
    { userId: "2", username: "@alice" },
    { userId: "3", username: "@bob" },
  ];
  const reviewBody = [
    "神ゲーすぎる",
    "今後のアプデに期待",
    "楽しい。",
    "あまりおすすめできない。",
    "もう起動しません。"
  ]
  // randomにreviewを100件生成
  const randomIdx = max => Math.floor(Math.random() * Math.floor(max));
  const createRandomReview = id => ({ id, body: reviewBody[randomIdx(5)], ...users[randomIdx(4)], gameId: '' + randomIdx(10) });
  const result = arr(100).map(createRandomReview);
  return result;
};

const reviewsData = setupReviews();

const fetchReviewsByUserId = (userId) => {
  const reviews = reviewsData.filter(e => e.userId === userId);
  return reviews;
};

const fetchReviewsByGameId = (gameId) => {
  const games = reviewsData.filter((e) => e.gameId === gameId);
  return games;
};

const typeDefs = gql`
  type Review {
    body: String
    author: User @provides(fields: "username")
    game: Game
  }

  extend type User @key(fields: "id") {
    id: ID! @external
    username: String @external
    reviews: [Review]
  }

  extend type Game @key(fields: "id") {
    id: ID! @external
    reviews: [Review]
  }
`;

const resolvers = {
  Review: {
    author(review) {
      return { __typename: "User", id: review.userId, username: review.username }
    },
    game(review) {
      return { __typename: "Game", id: review.gameId }
    }
  },
  User: {
    reviews(user) {
      return fetchReviewsByUserId(user.id);
    },
  },
  Game: {
    reviews(game) {
      return fetchReviewsByGameId(game.id);
    }
  }
};

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
});

server.listen(3003).then(({ url }) => {
  console.log(`review serverが ${url} に立ち上がったよ！！！`);
});
