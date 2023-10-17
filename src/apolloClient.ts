import { ApolloClient, InMemoryCache, ApolloLink, HttpLink } from '@apollo/client';

const httpLink = new HttpLink({ uri: 'https://api.mocki.io/v2/c4d7a195/graphql' });

const middlewareLink = new ApolloLink((operation, forward) => {
  // Log the GraphQL operation to the console
  console.log(`GraphQL Request: ${operation.operationName}`);

  // Forward the operation to the next link in the chain
  return forward(operation);
});

// Use the ApolloLink.from method to join the links, with the middlewareLink first
const link = ApolloLink.from([middlewareLink, httpLink]);

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache()
});

export default client;
