import { useState, useEffect } from "react";
import { type Task, type TaskItemProps, type TaskStatus } from "../../types";


const TaskItem: React.FC<TaskItemProps> = ({ task, tasks, setTasks, onStatusChange, onDelete}) => {



  const getStatusClasses = (status: TaskStatus) => {
    switch (status) {
      case 'Completed':
        return {backgroundColor: "green"};
      case 'In-progress':
        return {backgroundColor: "gray"};
      case 'Pending':
        return {backgroundColor: "yellow"};
      default:
        return {backgroundColor: "gray"};
    }
  };
  const handleChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const {value } = event.target;
    setTasks((prevTasks) => prevTasks.map(newTask => 
      newTask.id === task.id ?{...newTask, status: value as TaskStatus}: newTask
    ))
  };


  return (
    <div style={getStatusClasses(task.status)}>
      <div>
        <div>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
        </div>
        <span style={getStatusClasses(task.status)}>
          {task.priority}
        </span>
      </div>
      <div>
        <label htmlFor="status">Status:</label>
        <select
          id="status"
          name="status"
          value={task.status}
          onChange={handleChange}
        >
          <option value="Pending">Pending</option>
          <option value="In-progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
        <button onClick={() => onDelete(task.id)}>
          Delete
        </button>
      </div>

  );
};

export default TaskItem;