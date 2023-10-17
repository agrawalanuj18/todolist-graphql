// src/components/TodoList.tsx
import React from 'react';

interface Todo {
  id: number;
  text: string;
}

interface TodoListProps {
  todos: Todo[];
  onDelete: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onDelete }) => {
  return (
    <div className="mt-4 space-y-2">
      {todos.map(todo => (
        <div key={todo.id} className="flex items-center justify-between p-2 bg-gray-100 rounded shadow">
          <span>{todo.text}</span>
          <button onClick={() => onDelete(todo.id)} className="text-red-500 hover:text-red-600">
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default TodoList;
