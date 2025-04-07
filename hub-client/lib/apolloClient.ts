import { ApolloClient, InMemoryCache } from "@apollo/client";

const apolloClient = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  credentials: "same-origin",
  cache: new InMemoryCache(),
  //   headers: {
  //     "Content-Type": "application/json", // optional, usually handled automatically
  //   },
});

export default apolloClient;
