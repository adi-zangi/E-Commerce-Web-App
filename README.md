# E-Commerce-Web-App
A web application for an online store called AZ Shop. 

<br />

![](/assets/overview.gif)

## Table of contents
* [Features](#Features)
* [Run the application](#Run-the-application)

## Features

* [Create a user and log in](#create-a-user-and-log-in)
* [Search for products](#search-for-products)
* [Always updating autocomplete search suggestions](#always-updating-autocomplete-search-suggestions)
* [View products by department and category](#view-products-by-department-and-category)

### Create a user and log in

![](/assets/log_in_example.gif)

The login process is secure by requiring users to have strong passwords, storing encrypted passwords, and limiting login attempts.

![](/assets/log_in_security_example.gif)

<br />

### Search for products

![](/assets/search_example.gif)

<br />

### Always updating autocomplete search suggestions

![](/assets/autocomplete_example.gif)

<br />

### View products by department and category

![search_by_categories](/assets/search_by_category_example.gif)

### Will not be implemented
* Add items to cart
* Checkout

## Run the application

### Prerequisites

- npm
- Python 3
- PostgreSQL

### Set up the database
Run these commands in the project root folder in a terminal:

```
cd database
psql [-U <username> if your user isn't the default]
CREATE DATABASE e_commerce_shop;
\c e_commerce_shop
\i db_schema.sql
\i db_insert_data.sql
\q
```

Create a file called ```env.json``` in ```E-Commerce-Web-App/client/src``` and paste this JSON object in the file. This file is needed to set the ports the app will run on and the database connection information.

```
{
   "CLIENT_PORT": client_port (defaults to 3000),
   "SERVER_PORT": server_port (defaults to 3001),
   "DB_NAME": "e_commerce_shop",
   "DB_HOST": "localhost",
   "DB_PORT": db_port (example: 5432),
   "DB_USER": "your_user",
   "DB_PASS": "your_password"
}
```

Then run this command in the database folder in a terminal:
```
python addInventoryToDB.py
```

If everything ran successfully, you should have a database e_commerce_shop with 5 tables that are populated with values.

### Run the application
In a terminal in the root folder, start the server:
```
cd server
yarn install
yarn start
```

In another terminal in the root folder, start the client:
```
cd client
yarn install
yarn start
```
