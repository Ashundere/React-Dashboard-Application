import type { Dispatch, SetStateAction } from "react";

export type TaskStatus = 'Pending' | 'In-progress' | 'Completed';

export interface Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    dueDate: string;
    priority: "Low" | "Medium" | "High"
}

export interface FormData{
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    dueDate: string;
    priority: "Low" | "Medium" | "High"
}

export interface TaskFormProps {
  initialData?: FormData; 
  onSubmit?: (data: FormData) => void;
  addTask: (newTask: Task) => void
}

export interface TaskFilterProps{
    tasks: Task[];
    selectedStatus: string;
    setSelectedStatus: Dispatch<SetStateAction<string>>;
    selectedPriority: string;
    setSelectedPriority: Dispatch<SetStateAction<string>>;
    onStatusChange?: (taskId: string, newStatus: TaskStatus) => void;
    onPriorityChange?: (taskId: string, newPriority: string) => void;
}

export interface TaskItemProps{
    task: Task;
    tasks: Task[]
    setTasks: Dispatch<SetStateAction<Task[]>>
    onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
    onDelete: (taskId: string) => void;

}

export interface TaskListProps{
    tasks: Task[];
    setTasks: Dispatch<SetStateAction<Task[]>>
    selectedStatus: string;
    selectedPriority: string;
    onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
    onDelete: (taskId: string) => void;
}