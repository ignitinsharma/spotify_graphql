import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

export const client = new ApolloClient({
  link: createHttpLink({
    uri: "https://api.ss.dev/resource/api",
  }),
  cache: new InMemoryCache(),
});
