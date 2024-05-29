const inquirer = require("inquirer");
const mysql2 = require("mysql2");

require("dotenv").config();

let db;

try {
  db = mysql2.createConnection({
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  }).promise();

  db.connect((err) => {
    if (err) throw err;
    console.log("Connected to the database.");
  });
} catch (error) {
  console.error("Failed to connect to the database:", error);
  process.exit(1);
}

async function viewDepartments() {
  const dbm = `SELECT departments.id, departments.name AS Department FROM department;`;
  try {
    const [results] = await db.query(dbm);
    console.table(results);
    // Assuming you have a function to prompt the user for further actions
    Question();
  } catch (err) {
    console.error(err);
  }
}

async function viewRoles() {
  const dbm = `SELECT role.id, role.title AS role, role.salary, department.name AS department FROM role INNER JOIN department ON (department.id = role.department_id);`;
  try {
    const [results] = await db.query(dbm);
    console.table(results);
    // Assuming you have a function to prompt the user for further actions
    Question();
  } catch (err) {
    console.error(err);
  }
}

function viewEmployees() {
  const dbm = `SELECT employee.id, employee.first_name, employee.last_name, role.title AS role, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN employee manager on manager.id = employee.manager_id INNER JOIN role ON (role.id = employee.role_id) INNER JOIN department ON (department.id = role.department_id) ORDER BY employee.id;`;
  db.query(dbm, (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    console.table(results);
    Question();
  });
};

function Question() {
  inquirer
   .prompt([
      {
        type: "list",
        name: "nextAction",
        message: "Would you like to perform another action?",
        choices: ["Yes", "No"],
      },
    ])
   .then((answer) => {
      if (answer.nextAction === "Yes") {
        mainMenu(); // Or any other function to display the main menu again
      } else {
        process.exit(); // Exit the program if the user chooses not to perform another action
      }
    });
}

async function addDepartment() {
  const { name } = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Enter the name of the department:",
    },
  ]);

  const query = "INSERT INTO departments (name) VALUES (?)";
  await db.query(query, [name]);
  console.log(`Added ${name} to the departments.`);
}

async function addEmployee() {
  const { firstName, lastName, roleId } = await inquirer.prompt([
    {
      type: "input",
      name: "firstName",
      message: "Enter the employee's first name:",
    },
    {
      type: "input",
      name: "lastName",
      message: "Enter the employee's last name:",
    },
    {
      type: "input",
      name: "roleId",
      message: "Enter the ID of the role for this employee:",
    },
  ]);

  const query =
    "INSERT INTO employees (first_name, last_name, role_id) VALUES (?,?,?)";
  await db.query(query, [firstName, lastName, roleId]);
  console.log(
    `Added employee with first name ${firstName}, last name ${lastName}.`
  );
}

async function addRole() {
  const { title, salary, departmentId } = await inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "Enter the role title:",
    },
    {
      type: "input",
      name: "salary",
      message: "Enter the role salary:",
    },
    {
      type: "input",
      name: "departmentId",
      message: "Enter the ID of the department for this role:",
    },
  ]);

  const query =
    "INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)";
  await db.query(query, [title, salary, departmentId]);
  console.log(`Added role with title ${title} and salary ${salary}.`);
}

async function addManager() {
  console.log("Adding a manager...");
  // Implementation here
}

async function updateEmployeeRole() {
  const { currentRoleId, newRoleId } = await inquirer.prompt([
    {
      type: "input",
      name: "currentRoleId",
      message: "Enter the current role ID of the employee:",
    },
    {
      type: "input",
      name: "newRoleId",
      message: "Enter the new role ID for the employee:",
    },
  ]);

  const query = "UPDATE employees SET role_id =? WHERE role_id =?";
  await db.query(query, [newRoleId, currentRoleId]);
  console.log(`Updated employee role from ${currentRoleId} to ${newRoleId}.`);
}

async function mainMenu() {
  try {
    const answer = await inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
        ],
      },
    ])
    
      switch (answer.action) {
        case "View all departments":
          viewDepartments();
          break;
        case "View all roles":
          viewRoles();
          break;
        case "View all employees":
          viewEmployees();
          break;
        case "Add a department":
          addDepartment();
          break;
        case "Add an employee":
          addEmployee();
          break;
        case "Add a role":
          addRole();
          break;
        case "Add manager":
          addManager();
          break;
        case "Update an employee role":
          updateEmployeeRole();
          break;

        // Implement other cases similarly
        case "Exit":
          process.exit();
        }
      } catch (error) {
        console.error(error);
        mainMenu(); // Retry after catching an error
      }
    }


// function to view all departments
function viewAllDepartments() {
  const query = "SELECT * FROM departments";
  connection.query(query, (err, res) => {
      if (err) throw err;
      console.table(res);
      // restart the application
      mainMenu();
  });
}

// function to view all roles
function viewAllRoles() {
  const query = "SELECT roles.title, roles.id, departments.department_name, roles.salary from roles join departments on roles.department_id = departments.id";
  connection.query(query, (err, res) => {
      if (err) throw err;
      console.table(res);
      // restart the application
      start();
  });
}

// function to view all employees
function viewAllEmployees() {
  const query = `
  SELECT e.id, e.first_name, e.last_name, r.title, d.department_name, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager_name
  FROM employee e
  LEFT JOIN roles r ON e.role_id = r.id
  LEFT JOIN departments d ON r.department_id = d.id
  LEFT JOIN employee m ON e.manager_id = m.id;
  `;
  connection.query(query, (err, res) => {
      if (err) throw err;
      console.table(res);
      // restart the application
      start();
  });
}

mainMenu();
