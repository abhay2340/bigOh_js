// sample object
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
  
  // function to perfrom various operationa based on the input
  function manageCompanyRemove(myData, operation, departmentName, employee) {
    for (key in myData) {
      if (myData[key].hasOwnProperty("departments")) {
        for (let i = 0; i < myData[key].departments.length; i++) {
          if (myData[key].departments[i].name == departmentName) {
            let employees = myData[key].departments[i].employees;
            for (let j = 0; j < employees.length; j++) {
              if (employees[j].id === employee.id) {
                delete employees[j];
              }
            }
          }
        }
      }
    }
  }
  
  function manageCompanyAdd(myData, operation, departmentName, employee) {
    for (key in myData) {
      if (myData[key].hasOwnProperty("departments")) {
        for (var i = 0; i < myData[key].departments.length; i++) {
          if (myData[key].departments[i].name == departmentName) {
            //   console.log(myData[key].departments[i].employees);
            myData[key].departments[i].employees.push(employee);
          }
        }
      } else {
        console.log("this is not a property");
      }
    }
  }
  function manageCompanyUpdate(myData, operation, departmentName, employee = {}) {
    for (key in myData) {
      if (myData[key].hasOwnProperty("departments")) {
        for (let i = 0; i < myData[key].departments.length; i++) {
          if (myData[key].departments[i].name == departmentName) {
            let employees = myData[key].departments[i].employees;
            for (let j = 0; j < employees.length; j++) {
              if (employees[j].id === employee.id) {
                // delete employees[j]
                employees[j] = employee;
              }
            }
          }
        }
      }
    }
  }
  
  function manageCompanyFind(myData, operation, departmentName) {
    for (key in myData) {
      if (myData[key].hasOwnProperty("departments")) {
        for (let i = 0; i < myData[key].departments.length; i++) {
          if (myData[key].departments[i].name == departmentName) {
            let employees = myData[key].departments[i].employees;
            for (let j = 0; j < employees.length; j++) {
              console.log(employees[j]);
            }
          }
        }
      }
    }
  }
  
  function manageCompany(myData, operation, departmentName, employee) {
    switch (operation) {
      // to remove
      case "remove":
        manageCompanyRemove(myData, operation, departmentName, employee);
        break;
      // to update
      case "update":
        manageCompanyUpdate(myData, operation, departmentName, employee);
        break;
      case "find":
        // to find
        manageCompanyFind(myData, operation, departmentName);
  
        break;
      // to add
      case "add":
        manageCompanyAdd(myData, operation, departmentName, employee);
        break;
    }
  }
  
  manageCompany(myData, "add", "HR", {
    id: 4,
    name: "Carol",
    role: "HRrrr Manager",
  });
  manageCompany(myData, "find", "HR");
  // console.log(myData);