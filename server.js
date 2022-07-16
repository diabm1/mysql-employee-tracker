const { prompt } = require("inquirer");
const db = require("./db");
require("console.table");

init();

// Display logo text, load main prompts
function init() {
  loadMainPrompts();
}

// GIVEN a command-line application that accepts user input
// WHEN I start the application
// THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
function loadMainPrompts() {
  prompt([
    {
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        {
          name: "View All Employees",
          value: "VIEW_EMPLOYEES",
        },
        {
          name: "View All Employees By Department",
          value: "VIEW_EMPLOYEES_BY_DEPARTMENT",
        },
        {
          name: "View All Employees By Manager",
          value: "VIEW_EMPLOYEES_BY_MANAGER",
        },
        {
          name: "Add Employee",
          value: "ADD_EMPLOYEE",
        },
        {
          name: "Remove Employee",
          value: "REMOVE_EMPLOYEE",
        },
        {
          name: "Update Employee Role",
          value: "UPDATE_EMPLOYEE_ROLE",
        },
        {
          name: "Update Employee Manager",
          value: "UPDATE_EMPLOYEE_MANAGER",
        },
        {
          name: "View All Roles",
          value: "VIEW_ROLES",
        },
        {
          name: "Add Role",
          value: "ADD_ROLE",
        },
        {
          name: "Remove Role",
          value: "REMOVE_ROLE",
        },
        {
          name: "View All Departments",
          value: "VIEW_DEPARTMENTS",
        },
        {
          name: "Add Department",
          value: "ADD_DEPARTMENT",
        },
        {
          name: "Remove Department",
          value: "REMOVE_DEPARTMENT",
        },
        {
          name: "View Total Utilized Budget By Department",
          value: "VIEW_UTILIZED_BUDGET_BY_DEPARTMENT",
        },
        {
          name: "Quit",
          value: "QUIT",
        },
      ],
    },
  ]).then((res) => {
    let choice = res.choice;
    switch (choice) {
      case "VIEW_EMPLOYEES":
        viewEmployees();
        break;
      case "VIEW_EMPLOYEES_BY_DEPARTMENT":
        viewEmployeesByDepartment();
        break;
      case "VIEW_EMPLOYEES_BY_MANAGER":
        viewEmployeesByManager();
        break;
      case "ADD_EMPLOYEE":
        addEmployee();
        break;
      case "REMOVE_EMPLOYEE":
        removeEmployee();
        break;
      case "UPDATE_EMPLOYEE_ROLE":
        updateEmployeeRole();
        break;
      case "UPDATE_EMPLOYEE_MANAGER":
        updateEmployeeManager();
        break;
      case "VIEW_DEPARTMENTS":
        viewDepartments();
        break;
      case "ADD_DEPARTMENT":
        addDepartment();
        break;
      case "REMOVE_DEPARTMENT":
        removeDepartment();
        break;
      case "VIEW_UTILIZED_BUDGET_BY_DEPARTMENT":
        viewBudgetByDepartment();
        break;
      case "VIEW_ROLES":
        viewRoles();
        break;
      case "ADD_ROLE":
        addRole();
        break;
      case "REMOVE_ROLE":
        removeRole();
        break;
      default:
        quit();
    }
  });
}

// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
function viewEmployees() {
  db.findAllEmployees().then(function ([response]) {
    console.log("\n");
    console.table(response);
    init();
  });
}

function viewEmployeesByDepartment() {
  db.findDepartments().then(function ([response]) {
    console.table(response);
    init();
  });
}

function viewEmployeesByManager() {
  db.findAllEmployees().then(([response]) => {
    const managerChoices = response.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id,
    }));

    prompt([
      {
        type: "list",
        name: "managerId",
        message: "Which employee do you want to see reports for?",
        choices: managerChoices,
      },
    ])
      .then((res) => db.findEmployeesByManager(res.managerId))
      .then(([rows]) => {
        let employees = rows;
        console.log("\n");
        if (employees.length === 0) {
          console.log("The selected employeehas no reports");
        }
        console.table(employees);
      })
      .then(() => init());
  });
}

function removeEmployee() {
  db.findAllEmployees().then(([response]) => {
    const employeeChoices = response.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id,
    }));
    prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Which employee do you want to remove?",
        choices: employeeChoices,
      },
    ])
      .then((res) => db.removeEmployee(res.employeeId))
      .then(() => console.log("Removed employee from the database"))
      .then(() => init());
  });
}

// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database
function updateEmployeeRole() {
  db.findAllEmployees().then(([response]) => {
    const employeeChoices = response.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id,
    }));
    prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Which employee role would you like to update?",
        choices: employeeChoices,
      },
    ]).then(() => {
      db.findRoles().then(([response]) => {
        const roleChoices = response.map(({ id, title }) => ({
          name: title,
          value: id,
        }));
        prompt([
          {
            type: "list",
            name: "roleId",
            message: "Which role do you want to assign to an employee?",
            choices: roleChoices,
          },
        ])
          .then((response) => db.updateEmployeeRole(response.roleId))
          .then(() => console.log("Updated the employee's role"))
          .then(() => init());
      });
    });
  });
}

function updateEmployeeManager(){
  db.findAllEmployees().then(([response]) => {
    const managerChoices = response.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id,
    }));
    prompt([
      {
        type: "list",
        name: "managerId",
        message: "Which employee would you like to select for the current employee?",
        choices: managerChoices,
      },
    ])
    .then((response) => db.updateEmployeeManager(response.managerId))
    .then(() => console.log("Updated the employee's manager"))
    .then(() => init());
  });
}

// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
function viewRoles() {
  db.findRoles().then(function ([response]) {
    console.table(response);
    init();
  });
}

// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
function addEmployee() {
  // const roleArray = roles.map(({ id, title }) => ({
  //   name: title,
  //   value: id,
  // }));
  prompt([
    {
      type: "input",
      name: "firstName",
      message: "What is the employees first name?",
    },
    {
      type: "input",
      name: "lastName",
      message: "What is the employees last name?",
    },
    // {
    //   type: "list",
    //   name: "role",
    //   message: "What is the employees new role?",
    //   choices: roleArray,
    // },
  ]).then((answers) => {
    let firstName = answers.firstName;
    let lastName = answers.lastName;

    db.findRoles().then(([response]) => {
      const roleChoice = response.map(({ id, title }) => ({
        name: title,
        value: id,
      }));
      prompt({
        type: "list",
        name: "roleId",
        message: "Who's the employee's role?",
        choices: roleChoice,
      }).then((res) => {
        let role = res.role;
        db.findAllEmployees().then(([res]) => {
          const managerChoices = res.map(({ id, first_name, last_name }) => ({
            name: `${first_name} ${last_name}`,
            value: id,
          }));

          managerChoices.unshift({ name: "None", value: null });

          prompt({
            type: "list",
            name: "managerId",
            message: "Who is the employee's manager?",
            choices: managerChoices,
          })
            .then((res) => {
              let employeeObj = {
                first_name: firstName,
                last_name: lastName,
                role_id: role,
                manager_id: res.managerId,
              };
              db.createEmployee(employeeObj);
            })
            .then(() =>
              console.log(`Added ${firstName} ${lastName} to the database`)
            )
            .then(() => init());
        });
      });
    });
  });
}

// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
function addRole() {
  db.findDepartments().then(([res]) => {
    const departmentChoices = res.map(({ id, name }) => ({
      name: name,
      value: id,
    }));

    prompt([
      {
        name: "title",
        message: "What is the name of role?",
      },
      {
        name: "salary",
        message: "What is the annual salary of the role?",
      },
      {
        type: "list",
        name: "department_id",
        message: "Which department does the role belong to?",
        choices: departmentChoices,
      },
    ]).then((role) => {
      db.createRole(role)
        .then(() => console.log(`Added ${role.title} to the database`))
        .then(() => init());
    });
  });
}

function removeRole() {
  db.findRoles().then(([res]) => {
    const roleChoice = res.map(({ id, title }) => ({
      name: title,
      value: id,
    }));
    prompt([
      {
        type: "list",
        name: "roleId",
        message: "Which role would you like to remove?",
        choices: roleChoice,
      },
    ])
      .then((res) => db.removeRole(res.roleId))
      .then(() => console.log("Removed from database"))
      .then(() => init());
  });
}

// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
function viewDepartments() {
  db.findDepartments()
    .then(([res]) => {
      console.log("\n");
      console.table(res);
    })
    .then(() => init());
}

// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
function addDepartment() {
  prompt([
    {
      name: "name",
      message: "What is the name of dept?",
    },
  ]).then((response) => {
    db.createDepartment(response)
      .then(() => console.log(`Added ${response.name} to the db`))
      .then(() => init());
  });
}

function removeDepartment() {
  db.findDepartments().then(([response]) => {
    const departmentChoices = response.map(({ id, name }) => ({
      name: name,
      value: id,
    }));
    prompt([
      {
        type: "list",
        name: "departmentId",
        message: "Which debt would you like to remove?",
        choices: departmentChoices,
      },
    ])
      .then((res) => db.removeDepartment(res.departmentId))
      .then(() => console.log("Removed from database"))
      .then(() => init());
  });
}

function viewBudgetByDepartment() {
  db.viewDepartmentBudget()
    .then(([res]) => {
      console.log("\n");
      console.table(res);
    })
    .then(() => init());
}

function quit() {
  process.exit();
}
