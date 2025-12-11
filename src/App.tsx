

import { useState, useEffect} from 'react'
import './App.css'
import TaskForm from './components/TaskForm/TaskForm'
import type { Task, TaskStatus } from './types'
import { TaskList } from './components/TaskList/TaskList'
import { TaskFilter } from './components/TaskFilter/TaskFilter'


const initialTasks: Task[] = [
  {
    id: "1",
    title: "Task 1",
    description: "Description for Task 1",
    status: "in-progress" as TaskStatus,
    priority: "Low",
    dueDate: "1/1/2024",
  },
  {
    id: "2",
    title: "Task 2",
    description: "Description for Task 2",
    status: "completed" as TaskStatus,
    priority: "Low",
    dueDate: "1/1/2024",
  },
  {
    id: "3",
    title: "Task 3",
    description: "Description for Task 3",
    status: "pending" as TaskStatus,
    priority: "Low",
    dueDate: "1/1/2024",
  },
];


function App() {
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [selectedPriority, setSelectedPriority] = useState<string>("All")

  const [tasks, setTasks] =useState<Task[]>(() =>{
      const savedTasks = localStorage.getItem('savedTasks')
      return savedTasks ? JSON.parse(savedTasks) as Task[] : []
  }
  )
  useEffect(() => {
    localStorage.setItem("savedTasks", JSON.stringify(tasks))
  }, [tasks])

    useEffect(() => {
    console.log("UseEffectStatus:",selectedStatus)
  }, [selectedStatus])

    useEffect(() => {
    console.log("UseEffectPriority:",selectedPriority)
  }, [selectedStatus])

  const addTask =(newTask: Task) =>{
    setTasks((prevTasks) => [...prevTasks, newTask])
  }

  
  const handleStatusChange = (taskId: string, newStatus: TaskStatus) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };


  const handleDelete = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };
  return (
    <>
      <TaskForm
      addTask={addTask}/>
      <TaskFilter
      tasks= {tasks}
      selectedStatus={selectedStatus}
      setSelectedStatus={setSelectedStatus}
      selectedPriority={selectedPriority}
      setSelectedPriority={setSelectedPriority}/>
      <TaskList
      tasks={tasks}
      setTasks={setTasks}
      selectedStatus={selectedStatus}
      selectedPriority={selectedPriority}
      onStatusChange={handleStatusChange}
      onDelete={handleDelete}
      />
    </>
  )
}

export default App
