import React from 'react';

const TaskList = ({ tasks, onEdit, onDelete }) => {
  return (
    <div>
      <h2>Task List</h2>
      {tasks.length === 0 ? (
        <p className="no-tasks">No tasks available</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id}>
              {task.title}
              <div>
                <button className="edit-btn" onClick={() => onEdit(task)}>Edit</button>
                <button onClick={() => onDelete(task.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;

