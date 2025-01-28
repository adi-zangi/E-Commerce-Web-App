# E-Commerce-Web-App
A web application for an online store called AZ Shop. 

<br />

<img width="1280" alt="homepage" src="https://github.com/user-attachments/assets/94b6eb38-1640-4637-90a2-d6a9016e23bd" />

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

* [Log in](#log-in)
* [Search for products](#search-for-products)
* [View products by department and category](#view-products-by-department-and-category)
* [A screen that adjusts when window size changes](#a-screen-that-adjusts-when-window-size-changes)
* [Working forward, back, and refresh buttons](#working-forward-and-back-buttons)

### Log in
Click "Sign In" to get to the log in page. Currently there is only one user with the email `admin@gmail.com` and password `Admin1234&`.

<img width="1280" alt="log_in_page" src="https://github.com/user-attachments/assets/7ac536d9-61b5-4e86-9963-bf4f9e8816f7" />

<br />

When a user is logged in, the Sign In button is replaced with the name of the user.

<img width="1280" alt="headbar_when_logged_in" src="https://github.com/user-attachments/assets/aaea7730-bb36-4362-873d-34722b117721" />

### Search for products
<p>
Search for products by typing keywords into the search bar and clicking on the search button. An empty search shows all the products in the store.
</p>

<p>
Relevant results show first.
</p>

<img width="1280" alt="example_search" src="https://github.com/user-attachments/assets/36c03997-c6e3-40d1-9687-07a9a1e5730f" />

#### Navigate between pages
Use the page forward and back buttons or type in a page number and then click one of the arrow buttons.

![search_example](https://github.com/user-attachments/assets/c98c040f-45d2-40b6-919a-594d232b5c01)

### View products by department and category
Use the top menu to select a product department and category.

![departments_menu](https://github.com/user-attachments/assets/d0fd16f0-e811-463c-9a87-0bdefe722d41)

### A screen that adjusts when window size changes

![screen_adjusting](https://github.com/user-attachments/assets/2cbd394e-cbd2-419a-b8d3-ae6b34ef0f7b)

### Working forward and back buttons

## Not implemented yet
* Select how to sort search results
* Create user
* Add items to cart
* Checkout
