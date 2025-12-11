import type {TaskListProps } from "../../types";

import TaskItem from "./TaskItem";



export const TaskList: React.FC<TaskListProps> = ({tasks, setTasks, selectedStatus, selectedPriority, onStatusChange, onDelete}) => {

    return(
        <div className="task-list">
            <h1>My Tasks</h1>
            <div className="tasks">
                {selectedStatus != "All" &&(
                    tasks.filter((task) => task.status === selectedStatus).map(task =>(
                <TaskItem
                    key={task.id}
                    task={task}
                    onStatusChange={onStatusChange}
                    onDelete={onDelete}
                    setTasks={setTasks}
                    tasks = {tasks}
                />
                )))}
                {selectedPriority != "All" &&(
                    tasks.filter((task) => task.priority === selectedPriority).map(task =>(
                <TaskItem
                    key={task.id}
                    task={task}
                    onStatusChange={onStatusChange}
                    onDelete={onDelete}
                    setTasks={setTasks}
                    tasks = {tasks}
                />
                )))}
                {selectedStatus == "All" && selectedPriority == "All" && (
                    tasks.map(task =>(
                <TaskItem
                    key={task.id}
                    task={task}
                    onStatusChange={onStatusChange}
                    onDelete={onDelete}
                    setTasks={setTasks}
                    tasks = {tasks}
                />
                )))}
            </div>
        </div>
    )
}