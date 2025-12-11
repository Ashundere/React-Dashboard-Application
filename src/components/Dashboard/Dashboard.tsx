import type { DashboardProps } from "../../types"
import { TaskFilter } from "../TaskFilter/TaskFilter"


export const Dashboard: React.FC<DashboardProps> = ({darkMode, setDarkMode, tasks, selectedStatus, setSelectedStatus, selectedPriority, setSelectedPriority}) => {

        const handleDarkMode =()=>{
            setDarkMode((prevMode) => prevMode? false : true)
        }
    return(
        <header className="dashboard-header">
            <button onClick={handleDarkMode}>
                {darkMode? "Dark Mode" : "Light Mode"}
            </button>
            <TaskFilter
              tasks= {tasks}
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
              selectedPriority={selectedPriority}
              setSelectedPriority={setSelectedPriority}/>
        </header>
        
    )

}