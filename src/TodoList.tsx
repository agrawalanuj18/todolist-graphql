import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useRecoilState } from 'recoil';
import { todoListState } from './state';

const GET_TODOS = gql`
  query GetTodos {
    todos {
      id
      description
    }
  }
`;

const TodoList: React.FC = () => {
  const { loading, error, data } = useQuery(GET_TODOS);
  const [todos, setTodos] = useRecoilState(todoListState);
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    if (data) {
      setTodos(data.todos);
    }
  }, [data]);

  const handleAddTodo = () => {
    if (inputValue.trim()) {
      setTodos((oldTodos) => [...oldTodos, { id: Date.now().toString(), description: inputValue }]);
      setInputValue('');
    }
  };

  const handleDeleteTodo = (id: string) => {
    setTodos((oldTodos) => oldTodos.filter(todo => todo.id !== id));
  };

  return (
    <div className="p-4 max-w-md mx-auto mt-10 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl mb-4 text-center">Todo List</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <div className="mb-4">
        <input 
          type="text" 
          placeholder="Add a todo..." 
          className="w-full p-2 border rounded-md"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button 
          onClick={handleAddTodo}
          className="w-full mt-2 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Add Todo
        </button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={`${todo.id}-${todo.description}`} className="mb-2 p-2 border rounded-md flex justify-between items-center">
            {todo.description}
            <button 
              onClick={() => handleDeleteTodo(todo.id)}
              className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
