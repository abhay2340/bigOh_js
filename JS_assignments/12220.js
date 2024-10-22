let myData = {
  company: {
    departments: [
      {
        name: "Engineering",
        employees: [
          { id: 1, name: "Alice", role: "Engineer" },
          { id: 2, name: "Bob", role: "Senior Engineer" },
        ],
      },
      {
        name: "HR",
        employees: [{ id: 3, name: "Carol", role: "HR Manager" }],
      },
    ],
  },
};

// funtion--> edgeHCSssehNalder

// Helper function to find a department by name
function findDepartment(myData, departmentName) {
  if (!myData || !myData.company || !Array.isArray(myData.company.departments)) {
    throw new Error("Invalid company data structure.");
  }
  return myData.company.departments.find(
    (department) => department.name === departmentName
  );
}

// Remove employee
function manageCompanyRemove(myData, departmentName, employeeId) {
  try {
    if (!departmentName || !employeeId) {
      throw new Error("Department name and employee ID are required.");
    }

    const department = findDepartment(myData, departmentName);
    if (!department) {
      throw new Error(`Department "${departmentName}" not found.`);
    }

    const employeeIndex = department.employees.findIndex(
      (emp) => emp.id === employeeId
    );
    if (employeeIndex !== -1) {
      department.employees.splice(employeeIndex, 1);
      console.log(`Employee with ID ${employeeId} removed.`);
    } else {
      throw new Error(`Employee with ID ${employeeId} not found.`);
    }
  } catch (error) {
    console.error(error.message);
  }
}

// Add employee
function manageCompanyAdd(myData, departmentName, employee) {
  try {
    if (!departmentName || !employee || !employee.id || !employee.name || !employee.role) {
      throw new Error("Department name and valid employee object are required.");
    }

    const department = findDepartment(myData, departmentName);
    if (!department) {
      throw new Error(`Department "${departmentName}" not found.`);
    }

    const employeeExists = department.employees.some(
      (emp) => emp.id === employee.id
    );
    
    if (!employeeExists) {
      department.employees.push(employee);
      console.log(`Employee ${employee.name} added to ${departmentName}.`);
    } else {
      throw new Error(`Employee with ID ${employee.id} already exists.`);
    }
  } catch (error) {
    console.error(error.message);
  }
}

// Update employee
function manageCompanyUpdate(myData, departmentName, employee) {
  try {
    if (!departmentName || !employee || !employee.id) {
      throw new Error("Department name and valid employee object are required.");
    }

    const department = findDepartment(myData, departmentName);
    if (!department) {
      throw new Error(`Department "${departmentName}" not found.`);
    }

    const employeeIndex = department.employees.findIndex(
      (emp) => emp.id === employee.id
    );
    if (employeeIndex !== -1) {
      department.employees[employeeIndex] = employee;
      console.log(`Employee with ID ${employee.id} updated.`);
    } else {
      throw new Error(`Employee with ID ${employee.id} not found.`);
    }
  } catch (error) {
    console.error(error.message);
  }
}

// Find and display all employees in a department
function manageCompanyFind(myData, departmentName) {
  try {
    if (!departmentName) {
      throw new Error("Department name is required.");
    }

    const department = findDepartment(myData, departmentName);
    if (!department) {
      throw new Error(`Department "${departmentName}" not found.`);
    }

    if (department.employees.length === 0) {
      console.log(`No employees in department "${departmentName}".`);
    } else {
      console.log(`Employees in ${departmentName}:`);
      department.employees.forEach((emp) => console.log(emp));
    }
  } catch (error) {
    console.error(error.message);
  }
}

// Main function to handle various operations
function manageCompany(myData, operation, departmentName, employeeOrId) {
  try {
    if (!operation || !departmentName) {
      throw new Error("Operation and department name are required.");
    }

    switch (operation.toLowerCase()) {
      case "remove":
        manageCompanyRemove(myData, departmentName, employeeOrId);
        break;
      case "update":
        manageCompanyUpdate(myData, departmentName, employeeOrId);
        break;
      case "find":
        manageCompanyFind(myData, departmentName);
        break;
      case "add":
        manageCompanyAdd(myData, departmentName, employeeOrId);
        break;
      default:
        throw new Error(`Invalid operation "${operation}". Supported operations are: add, update, remove, find.`);
    }
  } catch (error) {
    console.error(error.message);
  }
}

// Test cases
manageCompany(myData, "add", "HR", { id: 4, name: "David", role: "HR Assistant" });
manageCompany(myData, "update", "HR", { id: 4, name: "David", role: "HR Manager" });
manageCompany(myData, "find", "HR");
manageCompany(myData, "remove", "HR", 4);
manageCompany(myData, "find", "HR");

// Edge case: Invalid department
manageCompany(myData, "add", "Marketing", { id: 5, name: "Emma", role: "Marketing Manager" });

// Edge case: Invalid employee object
manageCompany(myData, "add", "HR", { id: 6, name: "", role: "HR Intern" });

// Edge case: Invalid operation
manageCompany(myData, "delete", "HR", 3);
