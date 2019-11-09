const mysql = require("mysql");
const inquirer = require("inquirer");
const Table = require("cli-table");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "kramer",
  database: "bamazon"
})

connection.connect(err => {
    if (err) throw err;

    console.log("\n               Welcome to Bamazon!");
    console.log("\n             Your one stop, CLI shop");
    displayItems();
})

function displayItems() {
    const queryStr = "SELECT item_id, product_name, price " + 
    "FROM products ";
    let table = new Table ({
        head: ["Item ID",
                "Product Name",
                "Price"],
              colWidths: [10, 30, 10]
    });
    connection.query(queryStr,
        (err, res) => {
            if (err) throw err;
            res.forEach(result => {
                let currentItem = [result.item_id,
                                    result.product_name,
                                    result.price];
                table.push(currentItem);
            });
            console.log(`\n------------------------------------------------------\n`);
            console.log("\n                Available Products")
            console.log(table.toString());
            console.log(`\n------------------------------------------------------\n`);
            buyitem();
        }
    )
}

function buyitem() {
    inquirer.prompt([{
        type: "input",
        name: "buyId",
        message: "What is the ID of the product you wish to purchase?"
    },
    {
        type: "input",
        name: "buyAmt",
        message: "\nHow many would you like to buy?"
    }]).then(answer => {
        console.log(`\n======================================================\n`);
        checkQuantity(answer.buyId, answer.buyAmt);
    })
}

function checkQuantity(item_id, buyAmt) {
    connection.query(
        "SELECT stock_quantity " +
        "FROM products " +
        "WHERE item_id=?",
        [item_id],
        (err, res) => {
            if (err) throw err;
            if (res[0].stock_quantity < buyAmt) {
                console.log("\nSorry, we have an insufficient " + 
                "quantity to meet your request.")
                anotherPurchase();
            } else {
                updateQuantity(item_id, res[0].stock_quantity, buyAmt);
            }
        }
    )
}

function updateQuantity(item_id, oldAmt, buyAmt) {
    let newQuantity = oldAmt - buyAmt;
    connection.query(
        "UPDATE products " +
        "SET stock_quantity=? " +
        "WHERE item_id=?",
        [newQuantity, item_id],
        (err) => {
            if (err) throw err;
            console.log("\nPurchase complete!");
            console.log(`\n\n======================================================\n`);
            showCost(item_id, buyAmt);
        }
    )
}

function showCost(item_id, buyAmt) {
    connection.query(
        "SELECT price, stock_quantity " +
        "FROM products " +
        "WHERE item_id=?",
        [item_id],
        (err, res) => {
            if (err) throw err;
            let total = res[0].price * buyAmt;
            console.log(`\nThe total cost of your purchse is ${total}.`);
            if (res[0].stock_quantity === 0) {
                removeItem(item_id);
            } else {
                anotherPurchase();
            }
        }
    )
}

function removeItem(item_id) {
    connection.query(
        "DELETE FROM products " + 
        "WHERE item_id=?",
        [item_id],
        (err) => {
            if (err) throw err;
            console.log("\nLooks like you bought the last one!")
            anotherPurchase();
        }
    )
}

function anotherPurchase() {
    inquirer.prompt({
        type: "confirm",
        name: "answer",
        message: "\nWould you like to make another purchase?"
    }).then(res => {
        if (res.answer) {
            displayItems();
        } else {
            console.log("\nPlease come again!");
            connection.end();
        }
    })
}