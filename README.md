# E-Commerce-Web-App
A web application for an online store called AZ Shop. <br /><br />

<img src="/screenshots/homepage.png?raw=true" />

## Table of contents
* [Prerequisites](#Prerequisites)
* [Set up the database](#Set-up-the-database)
* [Run the application](#Run-the-application)
* [Features](#Features)

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

* [Search for products](#Search-for-products)
* [View products by department and category](#View-products-by-department-and-category)
* [Log in](#Log-in)

### Search for products
Search for products by typing keywords into the search bar and clicking on the search button. An empty search shows all the products in the store.

For example:

<img src="/screenshots/example_search.png?raw=true" />

### View products by department and category
Use the top menu to select a product department and category.

<img src="/screenshots/departments_menu_expanded.png?raw=true" />

### Log in
Click "Sign In" to get to the log in page. Currently there is only one user with the email `admin@gmail.com` and password `Admin1234&`.

<img src="/screenshots/log_in_page.png?raw=true" />

When a user is logged in, the Sign In button is replaced with the name of the user.

<img src="/screenshots/headbar_when_logged_in.png?raw=true" />

## Not implemented yet
* Select how to sort search results
* Create user
* Add items to cart
