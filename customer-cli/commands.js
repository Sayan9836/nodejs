#!/usr/bin/env node

const program = require('commander');
const { prompt } = require('inquirer');
const { addCustomer, findCustomer, updateCustomer, removeCustomer, listCustomer } = require('./index');



//customer questions
const questions = [
  {
    type: 'input',
    name: 'firstname',
    message: 'Customer first name'
  },
  {
    type: 'input',
    name: 'lastname',
    message: 'Customer last name'
  },
  {
    type: 'input',
    name: 'phone',
    message: 'Customer phone no'
  },
  {
    type: 'input',
    name: 'email',
    message: 'Customer email id'
  },
];

program
  .version('1.0.0')
  .alias('v')
  .description('Client Management System')

// program
// .help(`
// Function                  Alias        Description
// version                   v            To check the version of the customer-cli
// client-cli add            a            To add new customes in the database
// client-cli list           l            To check all the customes in the database
// client-cli update [_ID]   u            To update details for specific customes in the database
// client-cli remove [_ID]   r            To remove details for specific customes in the database
// client-cli find [NAME]    f            To find a specific customes in the database
// `)
program
  .command('add')
  .alias('a')
  .description('Add a customer')
  .action(() => {
    prompt(questions).then(answers => addCustomer(answers));
  });

program
  .command('find <name>')
  .alias('f')
  .description('find a customer')
  .action(name => findCustomer(name));

program
  .command('update <_id>')
  .alias('u')
  .description('Update a customer')
  .action(_id => {
    prompt(questions).then(answer => updateCustomer(_id, answer));
  });

program
  .command('remove <_id>')
  .alias('r')
  .description('Remove a customer')
  .action(_id => removeCustomer(_id));
  
program
.command('list')
.alias('l')
.description('List of Allcustomer')
.action(()=>listCustomer());

program.parse(process.argv);

