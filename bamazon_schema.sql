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
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department, price, stock_quantity) VALUES
("T-Rex Hat", "Hats", 29.99, 50),
("Pikachu Hat", "Hats", 24.99, 25),
("Totoro Hat", "Hats", 34.99, 10),
("Triceratops Shoes", "Shoes", 44.99, 60),
("Charizard Shoes", "Shoes", 49.99, 35),
("Ponyo Shoes", "Shoes", 39.99, 20),
("Stego Mask", "Masks", 15.99, 45),
("Slowpoke Mask", "Masks", 12.95, 22),
("Gandalf Mask", "Masks", 19.99, 34),
("Radagast Mask", "Masks", 28.95, 9);

SELECT * FROM products;
SELECT * FROM departments;