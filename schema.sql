DROP DATABASE IF EXISTS bamazonDB;
CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE productsTB (
	item_id INTEGER(10) AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(100),
    dept_name VARCHAR(100),
    price DECIMAL(10,2),
    stock INTEGER(10),
	PRIMARY KEY (item_id)
);

SELECT * FROM productsTB;