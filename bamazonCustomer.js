var inquirer = require("inquirer");
var mysql = require("mysql");
var yellow = "\x1b[33m";
var magenta = "\x1b[35m";
var cyan = "\x1b[36m";
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

console.log(`\n${underscore}~~Welcome to Bamazon!~~${reset}\n`);
console.log(`The following items are for sale...\n`);

function start() {
  var table = new Table({
    head: ["Item ID", "Product Name", "Department", "Price"],
    colWidths: [10, 20, 20, 10]
  });

  connection.query("SELECT * FROM products", async function(err, res) {
    if (err) throw err;

    for (let i = 0; i < res.length; i++) {
      table.push([
        res[i].item_id,
        yellow + res[i].product_name,
        res[i].department_name,
        magenta + res[i].price + reset
      ]);
    }
    console.log(table.toString());
    var wait = await questions();
  });
}
function questions() {
  console.log("\r");
  inquirer.prompt([
      {
        message: "Using the Item # tell us what you're intersted in",
        type: "input",
        name: "itemNumber",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      {
        name: "quantity",
        message: "how many would you like?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])

    .then(function(data) {
      inventoryCheck(data.itemNumber, data.quantity);
    });
}
function inventoryCheck(itemNumber, quantity) {
  connection.query(`SELECT stock_quantity, price FROM products WHERE item_id = ${itemNumber}`,function(err, res) {
      if (err) throw err;

      for (stock in res) {
        var inStock = res[stock].stock_quantity;

        if (quantity > inStock) {
          console.log("\nInsufficent quantity!\n");

          restart(inStock);

        } else {
          var newQuant = inStock - quantity;
          var saleTotal = (res[stock].price * quantity)
          console.log(`\nThank you!`);
          total.push(res[stock].price * quantity);
          console.log(`Your total price is ${magenta}$${total.reduce((a, b) => a + b).toFixed(2)}${reset}\n`);
          connection.query("UPDATE products SET ? WHERE ?",
            [
              {
                stock_quantity: newQuant
              },
              {
                item_id: itemNumber
              }
            ],
          function(error) {
              if (error) throw error;
            connection.query(`SELECT product_name, price, stock_quantity FROM products WHERE item_id = ${itemNumber}`,async function(err, res) {
              if (err) throw err;
              for (newStock in res) {
              productSales(saleTotal, itemNumber);
              console.log(`There are now ${cyan}${res[newStock].stock_quantity} ${yellow}${res[newStock].product_name}'s${reset} left in stock\n`);
              var wait = await restart();
              }
            });
          });
        }
      }
  });
}
function restart() {
  inquirer
    .prompt([
      {
        name: "confirm",
        type: "confirm",
        message: `would you like to continue shopping?`
      }
    ])
    .then(function(data) {
      if (data.confirm) {
        start();
      } else {
        console.log(
          `\n${underscore}~~Thank you for choosing Bamazon!~~${reset}\n`
        );
        process.exit();
      }
    });
}
function productSales(price, itemNumber) {
  connection.query(
    "UPDATE products SET ? WHERE ?",
    [
      {
        product_sales: price
      },
      {
        item_id: itemNumber
      }
    ],
    function(error) {
      if (error) throw error;
    }
  );
}
start();
