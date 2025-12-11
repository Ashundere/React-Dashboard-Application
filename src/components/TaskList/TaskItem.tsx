
import { type Task, type TaskItemProps, type TaskStatus } from "../../types";


const TaskItem: React.FC<TaskItemProps> = ({ task, tasks, setTasks, onStatusChange, onDelete}) => {



  const getStatusClasses = (status: TaskStatus) => {
    switch (status) {
      case 'Completed':
        return  "green";
      case 'In-progress':
        return "purple";
      case 'Pending':
        return "gray";
      default:
        return "gray";
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
    <div style={{ backgroundColor: `${getStatusClasses(task.status)}`, color: `"White"`}} className={"task-items"}>
      <div>
        <div>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <h4>Due: {task.dueDate}</h4>
          <h4>{task.priority}</h4>
        </div>
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
        <button onClick={() => onDelete(task.id)} className="deleteBtn">
          Delete
        </button>
      </div>

  );
};

export default TaskItem;