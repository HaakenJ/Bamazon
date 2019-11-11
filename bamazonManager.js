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
    console.log("\n         Welcome to Bamazon Manager Edition!");
    listMenu();
})

function listMenu() {
    console.log(`\n------------------------------------------------------\n`);
    inquirer.prompt({
        type: "list",
        name: "menuChoice",
        message: "\nWhat would you like to do?",
        choices: ["View Products for Sale",
            "View Low Inventory",
            "Add to Inventory",
            "Add New Product",
            "Exit"
        ]
    }).then(answer => {
        switch (answer.menuChoice) {
            case "View Products for Sale":
                displayProducts();
                break;
            case "View Low Inventory":
                displayLowInv();
                break;
            case "Add to Inventory":
                addInventory();
                break;
            case "Add New Product":
                addNewProd();
                break;
            default:
                console.log("\nWe appreciate your continuing service!");
                connection.end();
        }
    })
}

function displayProducts() {
    connection.query(
        "SELECT item_id, product_name, price, stock_quantity, product_sales " +
        "FROM products",
        (err, res) => {
            if (err) throw err;
            let table = new Table({
                head: ["ID", "Name", "Price", "Quantity", "Total Sales"],
                colWidths: [10, 30, 10, 10, 10]
            });
            res.forEach(record => {
                let currentItem = [record.item_id,
                    record.product_name,
                    record.price,
                    record.stock_quantity,
                    record.product_sales
                ];
                table.push(currentItem);
            })
            console.log(`\n------------------------------------------------------\n`);
            console.log("\n                Available Products")
            console.log(table.toString());
            console.log(`\n------------------------------------------------------\n`);
            listMenu();
        }
    )
}

function displayLowInv() {
    connection.query(
        "SELECT item_id, product_name, stock_quantity " +
        "FROM products " + 
        "WHERE stock_quantity < 10",
        (err, res) => {
            if (err) throw err;
            let table = new Table({
                head: ["ID", "Name", "Quantity"],
                colWidths: [10, 30, 10]
            });
            res.forEach(record => {
                let currentItem = [record.item_id,
                    record.product_name,
                    record.stock_quantity
                ];
                table.push(currentItem);
            })
            console.log(`\n------------------------------------------------------\n`);
            console.log("\n                  Low Inventory")
            console.log(table.toString());
            console.log(`\n------------------------------------------------------\n`);
            listMenu();
        }
    )
}

function addInventory() {
    connection.query(
        "SELECT item_id, product_name " +
        "FROM products ",
        (err, res) => {
            if (err) throw err;
            let itemList = [];
            res.forEach(record => {
                itemList.push(record.product_name);
            })
            inquirer.prompt({
                type: "list",
                name: "itemChoice",
                message: "\nWhich item would you like to add inventory to?",
                choices: itemList
            }).then(itemAnswer => {
                inquirer.prompt({
                    type: "input",
                    name: "itemAmt",
                    message: "\nHow much inventory would you like to add?"
                }).then(amtAnswer => {
                    connection.query(
                        "UPDATE products " + 
                        "SET stock_quantity=stock_quantity + ? " + 
                        "WHERE product_name=?",
                        [amtAnswer.itemAmt, itemAnswer.itemChoice],
                        (err) => {
                            if (err) throw err;
                            console.log("\nInventory successfully updated.");
                            listMenu();
                        }
                    )
                })
            })
        }
    )
}

function addNewProd() {
    inquirer.prompt([{
        type: "input",
        name: "newName",
        message: "\nWhat is the name of the product you would like to add?"
    },
    {
        type: "list",
        name: "newDept",
        message: "\nWhat department would you like to add this product into?",
        choices: ["Hats", "Masks", "Shoes"]
    },
    {
        type: "input",
        name: "newPrice",
        message: "\nWhat is the price of the new item?"
    },
    {
        type: "input",
        name: "newQuan",
        message: "\nWhat is the inital quantity of this item?"
    }]).then(answer => {
        connection.query(
            "INSERT INTO products " + 
            "(product_name, department, price, stock_quantity, product_sales) " + 
            "VALUES (?, ?, ?, ?, ?)",
            [answer.newName, answer.newDept, answer.newPrice, answer.newQuan, 0],
            (err) => {
                if (err) throw err;
                console.log("\nItem successfully added to database.");
                listMenu();
            }
        )
    })
}