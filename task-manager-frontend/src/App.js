import React, { useState } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = () => {
    fetch('http://localhost:3000/tasks')
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error(error));
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  const handleTaskSaved = (newTask) => {
    setEditingTask(null);
    setTasks((prevTasks) => [...prevTasks, newTask]); // Add the new task to the list
  };

  const handleDeleteTask = (id) => {
    fetch(`http://localhost:3000/tasks/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        // Remove the deleted task from state
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      })
      .catch((error) => console.error(error));
  };

  // Fetch tasks when component mounts
  React.useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="container">
      <h1>Task Manager</h1>
      <TaskForm currentTask={editingTask} onTaskSaved={handleTaskSaved} />
      <TaskList tasks={tasks} onEdit={handleEditTask} onDelete={handleDeleteTask} />
    </div>
  );
};

export default App;
