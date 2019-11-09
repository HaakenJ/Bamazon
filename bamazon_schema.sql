DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

DROP TABLE IF EXISTS products, departments;

CREATE TABLE products (
  item_id INT AUTO_INCREMENT,
  product_name VARCHAR(80) NOT NULL,
  department_id INT NOT NULL,
  price DECIMAL (10, 2) NOT NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (item_id)
);

CREATE TABLE departments (
  department_id INT AUTO_INCREMENT,
  department VARCHAR(80) NOT NULL,
  PRIMARY KEY (department_id)
);

INSERT INTO products (product_name, department_id, price, stock_quantity) VALUES
("T-Rex Hat", 1, 29.99, 50),
("Pikachu Hat", 1, 24.99, 25),
("Totoro Hat", 1, 34.99, 10),
("Triceratops Shoes", 2, 44.99, 60),
("Charizard Shoes", 2, 49.99, 35),
("Ponyo Shoes", 2, 39.99, 20),
("Stego Mask", 3, 15.99, 45),
("Slowpoke Mask", 3, 12.95, 22),
("Gandalf Mask", 3, 19.99, 34),
("Radagast Mask", 3, 28.95, 9);

INSERT INTO departments (department) VALUES
("Hats"),
("Shoes"),
("Masks");

SELECT * FROM products;
SELECT * FROM departments;