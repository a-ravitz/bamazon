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
var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "root password",
  database: "bamazon"
});

console.log(`\n${underscore}~~Welcome to the Bamazon Management tool~~${reset}\n`);

function start() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "command",
        message: "What would you like to do?",
        choices: [
          "View Products for Sale",
          "View Low Inventory",
          "Add to Inventory",
          "Add New Product"
        ]
      }
    ])
    .then(function(data) {
      switch (data.command) {
        case "View Products for Sale":
          forSale();
          break;
        case "View Low Inventory":
          lowInventory();
          break;
        case "Add to Inventory":
          addInventory();
          break;
        case "Add New Product":
          addProduct();
          break;
      }
    });
}
function forSale() {
  console.log("\nThese are the available items\n");

  var table = new Table({
    head: ["Item ID", "Product Name", "Department", "Price", "Stock"],
    colWidths: [10, 26, 20, 10, 8]
  });

  connection.query("SELECT * FROM products", async function(err, res) {
    if (err) throw err;

    for (let i = 0; i < res.length; i++) {
      table.push([
        res[i].item_id,
        yellow + res[i].product_name,
        res[i].department_name,
        magenta + res[i].price,
        cyan + res[i].stock_quantity + reset
      ]);
    }
    console.log(table.toString());
    var wait = await restart();
  });
}
function lowInventory() {
  console.log("\n The following Items have an inventory less than five\n  ");
  
  connection.query("SELECT item_id, stock_quantity, product_name FROM products",
    async function(err, res) {
      if (err) throw err;

      for (var i = 0; i < res.length; i++) {
        
        if (res[i].stock_quantity <= 5) {
          console.log(`Item #${res[i].item_id}: ${yellow}${res[i].product_name}${white} In Stock: ${cyan}${res[i].stock_quantity}${reset}`);
        }
      }
      var wait = await restart();
});
}
function addInventory() {
  inquirer
    .prompt([
      {
        message:
          "Using the Item # select the item you'd like to add more inventory to",
        type: "input",
        name: "itemNumber",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          if (value > 11) {
            return false;
          }
          return false;
        }
      },
      {
        name: "quantity",
        message: "how many would you like to add?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function(data) {
      update(data.itemNumber, data.quantity);
    });
}
function update(itemNumber, quantity) {
  connection.query(`SELECT stock_quantity, price FROM products WHERE item_id = ${itemNumber}`, function(err, res) {
      if (err) throw err;

      var currentStock = res[0].stock_quantity;
      var newStock = parseInt(quantity) + parseInt(currentStock);

      connection.query("UPDATE products SET ? WHERE ?",
        [
          {
            stock_quantity: newStock
          },
          {
            item_id: itemNumber
          }
        ],
        function(error) {
          if (error) throw error;

          connection.query(`SELECT product_name, stock_quantity FROM products WHERE item_id = ${itemNumber}`,async function(err, res) {
              if (err) throw err;

              console.log(`\nThere are now ${cyan}${res[0].stock_quantity} ${yellow}${res[0].product_name}'s${reset} in stock`);
              var wait = await restart();
            });
        });
    });
}
function addProduct() {
    inquirer
    .prompt([
      {
        name: "item",
        type: "input",
        message: "What item would you like to add?"
      },
      {
        name: 'department',
        type: 'input',
        message: 'What department would you like to place this in?'
      },
      {
        name: "price",
        type: "input",
        message: "How much would you like to sell it for?",
        validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
      },
      {
        name: "inventory",
        type: "input",
        message: "How many are you adding to inventory?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function(answer) {
      connection.query("INSERT INTO products SET ?",
        {
          product_name: answer.item.toLowerCase(),
          department_name: answer.department.toLowerCase(),
          price: answer.price,
          stock_quantity: answer.inventory 
        }, async function(err) {
            if (err) throw err;
            console.log(`\n${answer.item} is now available on Bamazon`);
        
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
        console.log(`\n${underscore}~~Thank you for using Bamazon's manager mode~~${reset}\n`);
        process.exit();
      }
    });
}
start();
