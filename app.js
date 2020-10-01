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

// array to push the created employees to
const employees = [];

// questions to build employee class
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

// inquirer questions to extend the employee class to either manager, engineer or intern
const engineerQuestion = [
    {
        type: 'input',
        message: 'Enter Github Username',
        name: 'GitHubUser'
    }
]

const managerQuestion = [
    {
        type: 'number',
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

// option to add another employee
const addAnother = [
    {
        type: 'list',
        message: 'Would you like to add another employee?',
        name: 'addPerson',
        choices: ['Yes', 'No']

    }
]

// function to ask the questions to build the employee class and determine which subclass to be added
function addEmployee() {
    inquirer
        .prompt(questions)
        .then(answers => {
            const employee = new Employee(answers.name, answers.id, answers.email)

            // conditional to switch between the subclasses and push the result to the employees array
            if (answers.role === 'Engineer') {
                inquirer.prompt(engineerQuestion)
                    .then(response => {
                        const engineer = new Engineer(employee.name, employee.id, employee.email, response.GitHubUser);
                        console.log(engineer);
                        console.log(employee);
                        employees.push(engineer);
                        console.log(employees);
                        init();

                        return engineer;
                        
                    }) 
            } else if (answers.role === 'Manager') {
                inquirer.prompt(managerQuestion)
                    .then(response => {
                        const manager = new Manager(answers.name, answers.id, answers.email, response.officeNumber);
                        console.log(manager);
                        console.log(employee);
                        employees.push(manager);
                        console.log(employees);
                        init();
                        return manager;
                    })
            } else {
                inquirer.prompt(internQuestion)
                    .then(response => {
                        const intern = new Intern(employee.name, employee.id, employee.email, response.school);
                        console.log(intern);
                        console.log(employee);
                        employees.push(intern);
                        console.log(employees);
                        init();
                        return intern;
                    })

            }
        })
}

// function to ask if another employee should be added
function init(){
    inquirer
    .prompt(addAnother)
    .then(res => {
        if(res.addPerson === 'Yes'){
            addEmployee();
        }else{
            // attempt at setting up writing the files to new directory, it writes the file and creates the team.html but i couldnt get the output folder to be created
            const html = render(employees);
            if(!fs.existsSync(outputPath)){
                fs.mkdir(outputPath, function(err){
                    if(err){
                        console.log(err);
                    }
                })
            }
            fs.writeFile('team.html', html, function(err){
                if(err){
                    return console.log(err);
                }
                console.log('woop');
            });
        }
    })
}

addEmployee();
