
const employeesData = {
    "employees": [
      { "employee_id": "E001", "name": "John Doe", "role": "Developer" },
      { "employee_id": "E002", "name": "Jane Smith", "role": "Designer" },
      { "employee_id": "E003", "name": "Emily Davis", "role": "Project Manager" }
    ]
  };
  
  const projectsData = {
    "projects": [
      {
        "project_id": "P001",
        "name": "Project Alpha",
        "hours": [
          { "employee_id": "E001", "hours_worked": 120 },
          { "employee_id": "E002", "hours_worked": 80 }
        ],
        "rating": 4.5
      },
      {
        "project_id": "P002",
        "name": "Project Beta",
        "hours": [
          { "employee_id": "E001", "hours_worked": 150 },
          { "employee_id": "E003", "hours_worked": 200 }
        ],
        "rating": 4.7
      },
      {
        "project_id": "P003",
        "name": "Project Gamma",
        "hours": [
          { "employee_id": "E002", "hours_worked": 50 },
          { "employee_id": "E003", "hours_worked": 60 }
        ],
        "rating": 4.0
      }
    ]
  };
  
  // Function to generate the report
  function generateEmployeeReport(employeesData, projects) {
    const result = employeesData.employees.map(employee => {
      const employeeProjects = [];
      let totalHoursWorked = 0;
      let totalRating = 0;
      let projectCount = 0;
  
      // Loop through all projects to find where the employee has contributed
      projectsData.projects.forEach(project => {
        const foundEmployee = project.hours.find(h => h.employee_id === employee.employee_id);
        
        if (foundEmployee) {
          employeeProjects.push({
            project_id: project.project_id,
            name: project.name,
            hours_worked: contribution.hours_worked,
            rating: project.rating
          });
          totalHoursWorked += contribution.hours_worked;
          totalRating += project.rating;
          projectCount++;
        }
      });
  
      // Calculate average rating
      const averageProjectRating = projectCount > 0 ? totalRating / projectCount : 0;
  
      // Return the employee report object
      return {
        employee_id: employee.employee_id,
        name: employee.name,
        role: employee.role,
        total_hours_worked: totalHoursWorked,
        average_project_rating: averageProjectRating.toFixed(2), // Rounding to 2 decimal places
        projects: employeeProjects
      };
    });
  
    return result;
  }
  
  // Generate the report and log the output
  const employeeReport = generateEmployeeReport(employeesData, projectsData);
  console.log(JSON.stringify(employeeReport, null, 2));
  