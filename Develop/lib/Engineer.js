// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require('./Employee')

class Engineer extends Employee{
    constructor(name, id, email, role, GitHubUser){
    super(name, id, role, email)
    this.GitHubUser = GitHubUser
}

getGithub(){
    return this.GitHubUser
};

getRole(){
    return "Engineer"
};
}

module.exports = Engineer