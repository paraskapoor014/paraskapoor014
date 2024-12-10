const fs = require('fs');

// Load employees from file
const loadEmployees = () => {
  try {
    const data = fs.readFileSync('employees.json');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading employees.json:', error);
    return [];
  }
};

// Example function to print all employees
const printEmployees = (employees) => {
  console.log('Employee List:');
  employees.forEach(emp => {
    console.log(`ID: ${emp.id}\nName: ${emp.name}\nSalary: ${emp.salary}`);
  });
};

// Function to print employees with salary greater than 50,000
const printHighEarners = (employees) => {
  console.log('Employees with salary greater than ₹50,000:');
  employees.filter(emp => emp.salary > 50000).forEach(emp => {
    console.log(`ID: ${emp.id}\nName: ${emp.name}\nSalary: ${emp.salary}`);
  });
};

// Function to calculate total salary for employees with salary greater than 50,000
const calculateHighEarnerTotalSalary = (employees) => {
  return employees
    .filter(emp => emp.salary > 50000)
    .reduce((total, emp) => total + emp.salary, 0);
};

// Main logic
const main = () => {
  const employees = loadEmployees();
  if (employees.length === 0) {
    console.log('No employees found.');
    return;
  }

  printEmployees(employees);
  printHighEarners(employees);
  const totalSalary = calculateHighEarnerTotalSalary(employees);
  console.log(`Total Salary for employees earning more than ₹50,000: ₹${totalSalary}`);
};

main();
