import React, { useState } from 'react';
import './AddTask.css';

interface AddTaskProps {
  onAddTask: (name: string, startDate: string, endDate: string) => void;
}

const AddTask: React.FC<AddTaskProps> = ({ onAddTask }) => {
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskStartDate, setNewTaskStartDate] = useState('');
  const [newTaskEndDate, setNewTaskEndDate] = useState('');

  const handleAddTask = () => {
    if (newTaskName && newTaskStartDate && newTaskEndDate) {
      onAddTask(newTaskName, newTaskStartDate, newTaskEndDate);
      setNewTaskName('');
      setNewTaskStartDate('');
      setNewTaskEndDate('');
    }
  };

  return (
    <div className="add-task">
      <input
        type="text"
        placeholder="Task Name"
        value={newTaskName}
        onChange={(e) => setNewTaskName(e.target.value)}
      />
      <input
        type="date"
        value={newTaskStartDate}
        min="2023-01-01"
        max="2023-12-31"
        onChange={(e) => setNewTaskStartDate(e.target.value)}
      />
      <input
        type="date"
        value={newTaskEndDate}
        min="2023-01-01"
        max="2023-12-31"
        onChange={(e) => setNewTaskEndDate(e.target.value)}
      />
      <button className="button" onClick={handleAddTask}>Add Task</button>
    </div>
  );
};

export default AddTask;
