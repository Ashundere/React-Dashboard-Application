import type { TaskFormProps, FormData, Task} from "../../types";

import { useState } from "react";

let objectCounter: any = localStorage.getItem('ObjectCounter');
if (objectCounter === null) {
    objectCounter = 0;
} else {
     objectCounter = parseInt(objectCounter, 10); 
}

const incObjectCounter=()=>{
    objectCounter++
    localStorage.setItem('ObjectCounter', objectCounter.toString())
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, addTask  }) => {
  const [formData, setFormData] = useState<FormData>({
      id: objectCounter,
      title: '',
      description: '',
      status: 'Pending',
      dueDate: '',
      priority: 'Medium',
    }
  );

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

    const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit?.(formData);
    setFormData({
        id: objectCounter,
        title: '',
        description: '',
        status: 'Pending',
        dueDate: '',
        priority: 'Medium',
    })
    incObjectCounter();
    addTask(formData)
    alert("Task Added Sucessfully!")
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="status">Status:</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <div>
        <label htmlFor="dueDate">Due Date:</label>
        <input
          type="date"
          id="dueDate"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="priority">Priority:</label>
        <select
          id="priority"
          name="priority"
          value={formData.priority}
          onChange={handleChange}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      <button type="submit">Save Task</button>
    </form>
  );
};

export default TaskForm;