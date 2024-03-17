const inquirer = require('inquirer');
const db = require('./db');

function mainMenu() {
 inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit'
      ]
    }
 ]).then(answer => {
    switch (answer.action) {
      case 'View all departments':
        db.viewDepartments();
        break;
      // Implement other cases similarly
      case 'Exit':
        process.exit();
    }
 });
}

mainMenu();