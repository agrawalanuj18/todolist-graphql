// src/apolloClient.ts
import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = new HttpLink({ uri: 'https://api.mocki.io/v2/c4d7a195/graphql' });

// Middleware: Add Authorization header
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  };
});

// Afterware: Check for x-refresh-token header
const afterwareLink = new ApolloLink((operation, forward) => {
  return forward(operation).map(response => {
    const context = operation.getContext();
    const { response: { headers } } = context;

    if (headers) {
      const refreshToken = headers.get('x-refresh-token');
      if (refreshToken) {
        localStorage.setItem('token', refreshToken);
      }
    }

    return response;
  });
});

const client = new ApolloClient({
  link: authLink.concat(afterwareLink).concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
