const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(bodyParser.json());

let employees = [];

// Function to load employees from JSON file
const loadEmployees = () => {
  try {
    const data = fs.readFileSync('employees.json');
    employees = JSON.parse(data);
  } catch (error) {
    console.error('Error reading employees.json file:', error);
    employees = [];
  }
};

// Function to save employees to JSON file
const saveEmployees = () => {
  fs.writeFileSync('employees.json'), JSON.stringify(employees, null, 2);
};

// Load employees initially
loadEmployees();

// GET all employees
app.get('/employees', (req, res) => {
  res.json(employees);
});

// GET a specific employee by ID
app.get('/employees/:id', (req, res) => {
  const employee = employees.find(emp => emp.id === parseInt(req.params.id));
  if (!employee) {
    return res.status(404).send('Employee not found');
  }
  res.json(employee);
});

// POST a new employee
app.post('/employees', (req, res) => {
  const newEmployee = {
    id: employees.length ? employees[employees.length - 1].id + 1 : 1,
    name: req.body.name,
    salary: req.body.salary,
  };
  employees.push(newEmployee);
  saveEmployees();
  res.status(201).json(newEmployee);
});

// PUT to update an employee's salary
app.put('/employees/:id', (req, res) => {
  const employee = employees.find(emp => emp.id === parseInt(req.params.id));
  if (!employee) {
    return res.status(404).send('Employee not found');
  }

  employee.salary = req.body.salary;
  saveEmployees();
  res.json(employee);
});

// DELETE an employee by ID
app.delete('/employees/:id', (req, res) => {
  employees = employees.filter(emp => emp.id !== parseInt(req.params.id));
  saveEmployees();
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
