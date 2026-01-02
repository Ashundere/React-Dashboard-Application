

import { useState, useEffect} from 'react'
import './App.css'
import TaskForm from './components/TaskForm/TaskForm'
import type { Task, TaskStatus } from './types'
import { TaskList } from './components/TaskList/TaskList'

import { Dashboard } from './components/Dashboard/Dashboard'




function App() {
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [selectedPriority, setSelectedPriority] = useState<string>("All")

  const [searchTerm, setSearchTerm] = useState<string>("")

  const [darkMode, setDarkMode] = useState<boolean>(() =>{
      const mode = localStorage.getItem('darkMode')
      return mode ? JSON.parse(mode) : false
  })

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

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode))
    darkMode? document.body.classList.add('dark-mode'): document.body.classList.remove('dark-mode')
  }, [darkMode])

  useEffect(() => {
    console.log("UseEffectSearch:", searchTerm)
  }, [searchTerm])

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
    <div>
      <Dashboard
      darkMode={darkMode}
      setDarkMode={setDarkMode}
      tasks={tasks}
      selectedStatus={selectedStatus}
      setSelectedStatus={setSelectedStatus}
      selectedPriority={selectedPriority}
      setSelectedPriority={setSelectedPriority}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}/>
      <TaskForm
      addTask={addTask}/>
      <TaskList
      tasks={tasks}
      setTasks={setTasks}
      selectedStatus={selectedStatus}
      selectedPriority={selectedPriority}
      onStatusChange={handleStatusChange}
      onDelete={handleDelete}
      searchTerm={searchTerm}
      />
    </div>
    </>
  )
}

export default App
