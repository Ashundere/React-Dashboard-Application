import type { TaskFormProps, FormData, FormErrors, Task } from "../../types";

import { useState, useEffect, useRef, memo } from "react";

const TaskForm: React.FC<TaskFormProps> = memo(({ addTask }) => {
  const objectCounterRef = useRef<number>(0);

  useEffect(() => {
    const storedCounter = localStorage.getItem("ObjectCounter");
    if (storedCounter !== null) {
      objectCounterRef.current = parseInt(storedCounter, 10);
    }
  }, []);

  const [formData, setFormData] = useState<Task>({
    id: "0",
    title: "",
    description: "",
    status: "Pending",
    dueDate: "",
    priority: "Medium",
  });

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validationErrors: FormErrors = {};

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (formData.title == "") {
      validationErrors.title = "Title is required";
    }
    if (formData.description == "") {
      validationErrors.description = "Description is required";
    }
    if (formData.dueDate == "") {
      validationErrors.dueDate = "Due Date is required";
    }
    if (Object.keys(validationErrors).length > 0) {
      const errorMessages = Object.values(validationErrors)
        .filter((msg) => msg)
        .join("\n");

      alert(`Please fix the following errors:\n${errorMessages}`);
    } else {
      const taskWithId: Task = {
        ...formData,
        id: `${objectCounterRef.current}`,
      };

      objectCounterRef.current++;
      localStorage.setItem(
        "ObjectCounter",
        objectCounterRef.current.toString()
      );

      addTask(taskWithId);
      alert("Task Added Sucessfully!");
    }
  };

  return (
    <div className="form-div">
      <h3>Create New Task</h3>
      <form onSubmit={handleSubmit} className="task-form">
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          {validationErrors.title && (
            <span style={{ color: "red" }}>{validationErrors.title}</span>
          )}
        </div>

        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          {validationErrors.description && (
            <span style={{ color: "red" }}>{validationErrors.description}</span>
          )}
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
          {validationErrors.dueDate && (
            <span style={{ color: "red" }}>{validationErrors.dueDate}</span>
          )}
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
    </div>
  );
});

export default TaskForm;
