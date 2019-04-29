DROP DATABASE IF EXISTS bamazon;
create database bamazon;

USE bamazon;

CREATE TABLE products (
item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
product_name VARCHAR(40),
department_name VARCHAR (40),
price decimal (10,4),
stock_quantity int (10),
product_sales decimal (10,4),
primary key (item_id)
);

CREATE TABLE departments (
department_id INTEGER(11) AUTO_INCREMENT NOT NULL,
department_name VARCHAR(40),
over_head_costs decimal (10,4),
primary key (department_id)
);

select * from departments;

INSERT INTO products (product_name, department_name, price, stock_quantity)
values ("sleeper sofa", "home decor", 899.99, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity)
values ("floor lamp", "home decor", 149.99, 150);
INSERT INTO products (product_name, department_name, price, stock_quantity)
values ("big screen tv", "home decor", 499.99, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity)
values ("blender 9000", "kitchen", 150, 15);
INSERT INTO products (product_name, department_name, price, stock_quantity)
values ("chef's knife", "kitchen", 87.99, 35);
INSERT INTO products (product_name, department_name, price, stock_quantity)
values ("frying pan", "kitchen", 49.99, 50);
INSERT INTO products (product_name, department_name, price, stock_quantity)
values ("golf club set", "athletic", 209.99, 5);
INSERT INTO products (product_name, department_name, price, stock_quantity)
values ("baseball glove", "athletic", 49.95, 30);
INSERT INTO products (product_name, department_name, price, stock_quantity)
values ("running shoe", "athletic", 129.99, 40);
INSERT INTO departments (department_id, department_name, over_head_costs)
values (1, "health and beauty", 10000.00);

SELECT departments.department_id AS "department_id", products.department_name AS "department_name",
SUM(products.product_sales) AS "product_sales", MIN(departments.over_head_costs) AS "over_head_cost", 
(SUM(products.product_sales) - MIN(departments.over_head_costs)) as "total_profits" FROM products
inner join departments on products.department_name = departments.department_name
GROUP BY  departments.department_id, products.department_name
ORDER BY departments.department_id;
