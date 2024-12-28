# E-Commerce-Web-App
A partially complete web application for an online store called AZ Shop.

## Set up database
Run these commands in a terminal:

```
cd E-Commerce-Web-App/database
```
```
psql
```
```
CREATE DATABASE e_commerce_shop;
```
```
\c e_commerce_shop
```
```
\i db_schema.sql
```
```
\i db_insert_departments.sql
```
```
\q
```

Open addInventoryToDB.py and edit the database connection information to match yours. Then run:
```
python addInventoryToDB.py
```

