-- The e-commerce shop database schema

-- Table for users
CREATE TABLE Users (
   user_email VARCHAR PRIMARY KEY,
   first_name VARCHAR NOT NULL,
   last_name VARCHAR NOT NULL,
   user_password VARCHAR NOT NULL
);

-- Table for the departments in the shop
CREATE TABLE Departments (
   department_id INTEGER PRIMARY KEY,
   department_name VARCHAR(30) NOT NULL
);

-- Table for the categories of products in each department
CREATE TABLE Categories (
   category_id INTEGER PRIMARY KEY,
   category_name VARCHAR(30) NOT NULL,
   department_id INTEGER NOT NULL,
   FOREIGN KEY (department_id) REFERENCES Departments(department_id)
);

-- Table for the products in the shop
CREATE TABLE Products (
   product_id INTEGER PRIMARY KEY,
   department_id INTEGER NOT NULL,
   category_id INTEGER NOT NULL,
   product_name VARCHAR(88) NOT NULL,
   price DECIMAL(4,2) NOT NULL,
   image_link VARCHAR NOT NULL,
   FOREIGN KEY (department_id) REFERENCES Departments(department_id),
   FOREIGN KEY (category_id) REFERENCES Categories(category_id)
);