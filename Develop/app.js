const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Employee = require("./lib/Employee");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];

const questions = [
    {
        type: 'input',
        message: 'Enter Name',
        name: 'name'
    },
    {
        type: 'input',
        message: 'Enter Email',
        name: 'email'
    },
    {
        type: 'number',
        message: 'Enter ID Number',
        name: 'id'
    },
    {
        type: 'list',
        message: 'Enter Job Role',
        name: 'role',
        choices: ['Manager', 'Engineer', 'Intern']
    }
]

const engineerQuestion = [
    {
        type: 'input',
        message: 'Enter Github Username',
        name: 'GitHubUser'
    }
]

const managerQuestion = [
    {
        type: 'input',
        message: 'Enter Office Number',
        name: 'officeNumber'
    }
]

const internQuestion = [
    {
        type: 'input',
        message: 'Enter Name of your School',
        name: 'school'
    }
]

const addAnother = [
    {
        type: 'list',
        message: 'Would you like to add another employee?',
        name: 'addPerson',
        choices: ['Yes', 'No']

    }
]
function init() {
    inquirer
        .prompt(questions)
        .then(answers => {
            const employee = new Employee(answers.name, answers.id, answers.email, answers.role)

            console.log(employee.role);
            if (employee.role === 'Engineer') {
                inquirer.prompt(engineerQuestion)
                    .then(response => {
                        const engineer = new Engineer(employee.name, employee.id, employee.email, employee.role, response.GitHubUser);
                        console.log(engineer);
                        employees.push(engineer);
                        console.log(employees);
                        addEmployee();

                        return engineer;
                        
                    }) 
            } else if (employee.role === 'Manager') {
                inquirer.prompt(managerQuestion)
                    .then(response => {
                        const manager = new Manager(employee.name, employee.id, employee.email, employee.role, response.officeNumber);
                        console.log(manager);
                        employees.push(manager);
                        console.log(employees);
                        addEmployee();
                        return manager;
                    })
            } else {
                inquirer.prompt(internQuestion)
                    .then(response => {
                        const intern = new Intern(employee.name, employee.id, employee.email, employee.role, response.school);
                        console.log(intern);
                        employees.push(intern);
                        console.log(employees);
                        addEmployee();
                        return intern;
                    })

            }
        })
}

function addEmployee(){
    inquirer
    .prompt(addAnother)
    .then(res => {
        if(res.addPerson === 'Yes'){
            init();
        }else{
            render();
        }
    })
}

init();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```
