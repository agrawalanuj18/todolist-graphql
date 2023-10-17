import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { RecoilRoot } from 'recoil';
import client from './apolloClient';
import TodoList from './TodoList';

function App() {
  return (
    <RecoilRoot>
      <ApolloProvider client={client}>
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <TodoList />
        </div>
      </ApolloProvider>
    </RecoilRoot>
  );
}

export default App;
