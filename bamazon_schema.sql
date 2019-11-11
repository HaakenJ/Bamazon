ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'kramer';

DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

DROP TABLE IF EXISTS products;

CREATE TABLE products (
  item_id INT AUTO_INCREMENT,
  product_name VARCHAR(80) NOT NULL,
  department VARCHAR(80) NOT NULL,
  price DECIMAL (10, 2) NOT NULL,
  stock_quantity INT NOT NULL,
  product_sales DECIMAL (10, 2) NOT NULL,
  PRIMARY KEY (item_id)
);

CREATE TABLE departments (
	department_id INT AUTO_INCREMENT,
    department_name VARCHAR(80) NOT NULL,
    over_head_costs INT NOT NULL,
    PRIMARY KEY (department_id)
);


INSERT INTO products (product_name, department, price, stock_quantity, product_sales) VALUES
("T-Rex Hat", "Hats", 29.99, 50, 0),
("Pikachu Hat", "Hats", 24.99, 25, 0),
("Totoro Hat", "Hats", 34.99, 10, 0),
("Triceratops Shoes", "Shoes", 44.99, 60, 0),
("Charizard Shoes", "Shoes", 49.99, 35, 0),
("Ponyo Shoes", "Shoes", 39.99, 20, 0),
("Stego Mask", "Masks", 15.99, 45, 0),
("Slowpoke Mask", "Masks", 12.95, 22, 0),
("Gandalf Mask", "Masks", 19.99, 34, 0),
("Radagast Mask", "Masks", 28.95, 9, 0);

INSERT INTO departments (department_name, over_head_costs) VALUES 
("Hats", 2500),
("Shoes", 3200),
("Masks", 2200);

SELECT * FROM products;
SELECT * FROM departments;

SELECT d.department_id, p.department, d.over_head_costs, SUM(p.product_sales) AS Sales, (p.product_sales - d.over_head_costs) AS total_profit
FROM products p
INNER JOIN departments d 
ON d.department_name = p.department
GROUP BY p.department;