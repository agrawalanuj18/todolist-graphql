// src/components/AddTodo.tsx
import React, { useState } from 'react';
import '../index.css';
interface AddTodoProps {
  onAdd: (text: string) => void;
}

const AddTodo: React.FC<AddTodoProps> = ({ onAdd }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text) {
      onAdd(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-4">
      <input 
        type="text" 
        value={text} 
        onChange={e => setText(e.target.value)}
        placeholder="Add a todo..."
        className="p-2 border rounded w-full"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
        Add
      </button>
    </form>
  );
}

export default AddTodo;
