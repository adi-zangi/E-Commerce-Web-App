# E-Commerce-Web-App
A partially complete web application for an online store called AZ Shop.

## Required software

- Node.js
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

Create a file called ```env.json``` in ```E-Commerce-Web-App/client/src/``` and paste this JSON object in the file. This file sets the ports the app will use and the database connection information.

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

