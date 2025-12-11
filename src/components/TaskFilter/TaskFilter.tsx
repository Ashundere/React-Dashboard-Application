import type { TaskFilterProps } from "../../types";




export const TaskFilter: React.FC<TaskFilterProps>=({tasks, selectedStatus, setSelectedStatus, selectedPriority, setSelectedPriority, searchTerm, setSearchTerm})=>{

      const handleStatusFilterChange = (
        event: React.ChangeEvent<HTMLSelectElement>
      ) => {
        setSelectedStatus((prevStatus)=> event.target.value)
      };

        const handlePriorityFilterChange = (
        event: React.ChangeEvent<HTMLSelectElement>
      ) => {
        setSelectedPriority((prevPriority)=> event.target.value)
      };

       const handleSearchChange =(event: React.ChangeEvent<HTMLInputElement>) =>{
        setSearchTerm(event.target.value.toLowerCase())
       }
    return(
        <div className="filters">
            <div>
                <label htmlFor="statusSelect">Filter by Status:</label>
                <select
                id="statusSelect"
                onChange={handleStatusFilterChange}
                >
                <option value="All">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="In-progress">In Progress</option>
                <option value="Completed">Completed</option>
                </select>
            </div>
            <div>
                <label htmlFor="prioritySelect">Filter by Priority:</label>
                <select
                id="prioritySelect"
                onChange={handlePriorityFilterChange}
                >
                <option value="All">All Priorities</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                </select>
            </div>
            <div>
              <label htmlFor="searchBar">Search</label>
              <input
              type="text"
              id="search"
              name="search"
              value={searchTerm}
              onChange={handleSearchChange}
              />
            </div>
        </div>
    )
}