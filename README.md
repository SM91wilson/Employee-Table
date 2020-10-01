# Employee Table

This project was to produce a template engine that shows an employee summary of an entire team.

The summary is created by the user through the comman line using prompts from inquirer. The prompts build the classes used to store the information of each employee.

Constructors were used to build the classes and extend them depending on the role of the employee which is set by the user from the inquirer.

Jest was used to to run tests with the command npm run test to ensure the information for each employee can be reached through the classes made with constructors.

After the information has been gathered and the user selects no to adding any more employees, the render function is run that creates the team.html file populated by the classes.
