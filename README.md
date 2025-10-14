# E-Commerce-Web-App
A web application for an online store called AZ Shop. 

<br />

<img src="/assets/homepage.png?raw=true" width="1280" />

## Table of contents
* [Prerequisites](#Prerequisites)
* [Set up the database](#Set-up-the-database)
* [Run the application](#Run-the-application)
* [Features (includes GIFs)](#Features)

## Prerequisites

- NodeJS
- npm
- Python 3
- PostgreSQL

## Set up the database
Run these commands in the project root folder in a terminal:

```
cd database
psql [-U <username> if your user isn't the default]
CREATE DATABASE e_commerce_shop;
\c e_commerce_shop
\i db_schema.sql
\i db_insert_departments.sql
\q
```

Create a file called ```env.json``` in ```E-Commerce-Web-App/client/src``` and paste this JSON object in the file. This file is needed to set the ports the app will use and the database connection information.

```
{
   "CLIENT_PORT": "client_port (defaults to 3000)",
   "SERVER_PORT": "server_port (defaults to 3001)",
   "DB_NAME": "e_commerce_shop",
   "DB_HOST": "localhost",
   "DB_PORT": "db_port (example: 5432)",
   "DB_USER": "your_user",
   "DB_PASS": "your_password"
}
```

Then run this command in the database folder in a terminal:
```
python addInventoryToDB.py
```

If everything ran successfully, you should have a database e_commerce_shop with 3 tables that are populated with values- Departments, Categories, and Products.

## Run the application
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

## Features

* [Create a user and log in](#create-user-and-log-in)
* [Search for products](#search-for-products)
* [View products by department and category](#view-products-by-department-and-category)
* [More Features](#more-features)

### Create user and log in

![log_in_example](/assets/log_in_example.gif)

### Search for products
The search bar can be used to search the store. Results are sorted by relevance.

![search_examples](/assets/search_examples.gif)

### View products by department and category
Use the top menu to select a department and category.

![search_by_categories](/assets/search_by_categories.gif)

### More Features
* Working forward and backward navigation
* A screen that adjusts when the window size changes

![more_features](/assets/forward_backward_buttons_and_screen_adjustment.gif)

## Not implemented yet
* Select how to sort search results
* Autocomplete search bar
* Add items to cart
* Checkout
