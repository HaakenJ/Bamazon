# Bamazon

  Bamazon is a CLI based app built using Node.js and MySQL.  The App uses MySQL 
tables to list products and their departments and three separate Node apps to
interact with the tables as either a customer, manager, or supervisor.  

  A customer has the ability to view what products are for sale, and purchase 
any available amount of those products.  Managers can view products for sale,
view low inventory products (inventory less than 10), add products to inventory,
or add new products.  Supervisors are able to view product sales by department 
and create new departments.

## Technologies

 - Node.js
 - MySQL

### Node Modules

 - mysql
 - inquirer
 - cli-table
