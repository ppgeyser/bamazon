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

INSERT INTO productsTB (product_name, dept_name, price, stock)
VALUES 
    ("SoniCare Electric Toothbrush", "Health", 79.99, 100),
    ("OnePlus 7 Pro", "Electronics", 789.99, 200),
    ("Wetbrush Hair Brush", "Beauty", 8.99, 500),
    ("Eloquent JavaScript Paperback Book", "Books", 27.99, 350),
    ("Catit Cat Tower", "Pets", 49.99, 475),
    ("Spindrift Sparkling Water", "Groceries", 350, 8.99),
    ("Right Guard Deodorant", "Cosmetics", 450, 4.99),
    ("NVIDIA RTX 2080ti", "PC Components", 1199.99, 50),
    ("KitchenAid Stand Mixer", "Kitchen", 19.99, 300),
    ("Scrubs, The Complete Series", "Movies & TV", 49.99, 250);


SELECT * FROM productsTB;