var inquirer = require("inquirer");
var mysql = require("mysql");
var yellow = "\x1b[33m";
var magenta = "\x1b[35m";
var cyan = "\x1b[36m";
var white = "\x1b[37m";
var reset = "\x1b[0m";
var underscore = "\x1b[4m";
var Table = require("cli-table");
var total = [];
var table = require('console.table')
var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "root password",
  database: "bamazon"
});

console.log(`\n${underscore}~~Welcome to the Bamazon Supervisor tool~~${reset}\n`);
function start() {
inquirer.prompt([
    {
        type: 'list',
        name: 'commands',
        message: 'What would you like to do?',
        choices: [
            'View Product Sales by Department',
            'Create New Department'
        ]
    }
]).then(function(data) {
    switch(data.commands) {
        case 'View Product Sales by Department':
        salesByDepartment();
        break;
        case 'Create New Department':
        addDepartment();
        break;
    }
})
}
function salesByDepartment() {

    var table = new Table({
        head: ["Department ID", "Department Name", "Product Sales", "Over Head Cost", "Total Profits"],
        colWidths: [10, 20, 20, 20, 20]
      });

    connection.query('SELECT departments.department_id AS "department id", products.department_name AS "department name", SUM(products.product_sales) AS "product sales", MIN(departments.over_head_costs) AS "over head cost", (SUM(products.product_sales) - MIN(departments.over_head_costs)) as "total profits" FROM products INNER JOIN departments on products.department_name = departments.department_name GROUP BY  departments.department_id, products.department_name ORDER BY departments.department_id', async function(err, res) {
        if (err) throw err;

        console.log('\n')
        console.table(res)
        
        var wait = await restart()

    });
}

function addDepartment() {
  inquirer
  .prompt([
    {
      name: "department",
      type: "input",
      message: "What is the name of the department you'd like to add?"
    },
    {
      name: "cost",
      type: "input",
      message: "What would you like to set the over head cost as?",
      validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
    }
  ])
  .then(function(answer) {
    connection.query("INSERT INTO departments SET ?",
      {
        department_name: answer.department.toLowerCase(),
        over_head_costs: answer.cost,
      }, async function(err) {
          if (err) throw err;
          console.log(`\n${answer.department} is now a department in the Bamazon store, the over head cost is ${cyan}$${answer.cost}`);
      
      var wait = await restart();
      })
  })
}

function restart() {
    console.log("\r");
    inquirer
      .prompt([
        {
          name: "confirm",
          type: "confirm",
          message: `would you like to do anything else?`
        }
      ])
      .then(function(data) {
          if (data.confirm) {
          start();
        } else {
          console.log(`\n${underscore}~~Thank you for using Bamazon's Supervisor mode~~${reset}\n`);
          process.exit();
        }
      });
  }

start()