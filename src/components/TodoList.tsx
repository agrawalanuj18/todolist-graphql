// src/components/TodoList.tsx
import React from 'react';
import { useRecoilState } from 'recoil';
import { todoListState } from '../state';

interface Todo {
  id: number;
  description: string;
}

interface TodoListProps {
  deleteTodo: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ deleteTodo }) => {
  const [todos] = useRecoilState(todoListState);

  return (
    <div className="space-y-4">
      {todos.map((todo: Todo) => (
        <div key={todo.id} className="flex justify-between items-center bg-gray-200 p-2 rounded">
          <span>{todo.description}</span>
          <button 
            onClick={() => deleteTodo(todo.id)}
            className="bg-red-500 text-white px-2 py-1 rounded"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default TodoList;
