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
    console.log("\n         Welcome to Bamazon Supervisor Edition!");
    listOptions();
})

function listOptions() {
    console.log(`\n------------------------------------------------------\n`);
    inquirer.prompt({
        type: "list",
        name: "optionChoice",
        message: "\nWhat would you like to do?",
        choices: ["View Product Sales by Department", "Create New Department"]
    }).then(answer => {
        if (answer.optionChoice === "View Product Sales by Department") {
            displayProducts();
        } else {
            createDepartment();
        }
    })
}

function displayProducts() {
    connection.query(
        "SELECT " + 
        "d.department_id, d.department_name, " + 
        "d.over_head_costs, p.product_sales " + 
        "FROM departments d " + 
        "INNER JOIN products p " + 
        "ON d.department_name = p.department",
        (err, res) => {
            if (err) throw err;
            let table = new Table({
                head: ["Depart. ID", "Dept. Name", "OH Costs", "Total Sales"],
                colWidths: [10, 30, 10, 10]
            });
            res.forEach(record => {
                let currentItem = [record.department_id,
                    record.department_name,
                    record.over_head_costs,
                    record.product_sales
                ];
                table.push(currentItem);
            })
            console.log(`\n------------------------------------------------------\n`);
            console.log("\n                Departments")
            console.log(table.toString());
            console.log(`\n------------------------------------------------------\n`);
        }
    )
}