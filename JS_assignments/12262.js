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
  
  // function to perfrom various operations based on the input
  // function to remove employee  based on the input
  function remove(myData, operation, departmentName, employee) {
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
   // function to Add employee  based on the input
  function add(myData, operation, departmentName, employee) {
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

   // function to update employee  based on the input
  function update(myData, operation, departmentName, employee = {}) {
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
//    // function to Find employee  based on the input
  function find(myData, operation, departmentName) {
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
  
  
   // function to Find only one employee  based on the input
  function FindOne(myData, operation, departmentName,employee) {
    for (key in myData) {

      if (myData[key].hasOwnProperty("departments")) {

        for (let i = 0; i < myData[key].departments.length; i++) {
          const depName = myData[key].departments[i].name

          if (depName=== departmentName) {
            let employees = myData[key].departments[i].employees;
            for (let j = 0; j < employees.length; j++) {
              
                if (employees[j].id === employee.id){

                    console.log(employees[j]);
                }
            }
          }
        }
      }
    }
  }
  
// fucntion tomanage all the operations of the company

  function manageCompany(myData, operation, departmentName, employee) {
    switch (operation) {
      // to remove
      case "remove":
        remove(myData, operation, departmentName, employee);
        break;
      // to update
      case "update":
        update(myData, operation, departmentName, employee);
        break;
      case "find":
        // to find
        find(myData, operation, departmentName);
  
        break;
      case "findOne":
        // to find
        FindOne(myData, operation, departmentName,employee);
  
        break;
      // to add
      case "add":
        add(myData, operation, departmentName, employee);
        break;
    }
  }
  
  manageCompany(myData, "add", "HR", {
    id: 4,
    name: "Carol",
    role: "HRrrr Manager",
  });
  manageCompany(myData, "findOne", "HR",{"id":3});
  // console.log(myData);
  

  