// src/components/AddTodo.tsx
import React, { useState } from 'react';
import '../index.css';

interface Props {
  addTodo: (description: string) => void;
}

const AddTodo: React.FC<Props> = ({ addTodo }) => {
  const [description, setdescription] = useState('');

  // Inside AddTodo component
const handleSubmit = () => {
    if (description.trim()) {
      addTodo(description.trim());
      setdescription('');
    }
  };
  

 // src/components/AddTodo.tsx
return (
    <div className="flex space-x-4">
      <input
        type="description"
        value={description}
        onChange={(e) => setdescription(e.target.value)}
        className="flex-grow border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Add a new task..."
      />
      <button onClick={handleSubmit} className="bg-blue-500 description-white p-2 rounded hover:bg-blue-600 transition">
        Add
      </button>
    </div>
  );  
};

export default AddTodo;
