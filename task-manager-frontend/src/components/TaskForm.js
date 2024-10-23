import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskForm = ({ currentTask, onTaskSaved }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (currentTask) {
      setTitle(currentTask.title);
      setDescription(currentTask.description);
    }
  }, [currentTask]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const taskData = {
      task: {
        title,        // Nesting title inside task object
        description,  // Nesting description inside task object
      }
    };

    if (currentTask) {
      axios.put(`http://localhost:3000/tasks/${currentTask.id}`, taskData)
        .then(response => onTaskSaved(response.data))
        .catch(error => console.error(error));
    } else {
      axios.post('http://localhost:3000/tasks', taskData)
        .then(response => onTaskSaved(response.data))
        .catch(error => console.error(error));
    }

    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">{currentTask ? 'Update Task' : 'Add Task'}</button>
    </form>
  );
};

export default TaskForm;
