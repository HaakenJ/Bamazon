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
        choices: ["View products for sale",
                    "View low inventory",
                    "Add to inventory",
                    "Add new product"]
    }).then(answer => {

    })
}