// src/App.tsx
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { todoListState } from './state';
import { useQuery, useMutation, gql } from '@apollo/client';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';
import './index.css';

const GET_TODOS = gql`
  query GetTodos {
    todos {
      id
      description
    }
  }
`;

const ADD_TODO = gql`
  mutation AddTodo($description: String!) {
    addTodo(description: $description) {
      id
      description
    }
  }
`;

const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id) {
      id
    }
  }
`;

function App() {
  const [todos, setTodos] = useRecoilState(todoListState);
  const { loading, error, data } = useQuery(GET_TODOS);
  const [addTodoMutation] = useMutation(ADD_TODO, {
    refetchQueries: [{ query: GET_TODOS }],
  });
  const [deleteTodoMutation] = useMutation(DELETE_TODO, {
    refetchQueries: [{ query: GET_TODOS }],
  });

  useEffect(() => {
    if (data && data.todos) {
      setTodos(data.todos);
    }
  }, [data, setTodos]);

  const handleAddTodo = async (description: string) => {
    try {
      await addTodoMutation({ variables: { description } });
    } catch (err) {
      console.error("Error adding todo:", err);
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      await deleteTodoMutation({ variables: { id } });
    } catch (err) {
      console.error("Error deleting todo:", err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 space-y-6">
        <h1 className="text-2xl font-bold text-center text-gray-700">Todo List</h1>
        <AddTodo addTodo={handleAddTodo} />
        <TodoList todos={todos} deleteTodo={handleDeleteTodo} />
      </div>
    </div>
  );
}

export default App;
