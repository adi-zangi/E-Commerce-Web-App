# Parses the inventory CSV file and inserts it into the database

import csv
import psycopg2

filename = "inventory.csv"

# connect to the db
try:
   conn = psycopg2.connect(
      database='e_commerce_shop',
      user='postgres',
      password='admin',
      host='localhost',
      port='5432'
   )
except:
   print("Unable to connect to the database!")
cursor = conn.cursor()

# read lines from the csv file and insert them into the db
with open(filename, 'r') as csvfile:
   csvreader = csv.reader(csvfile)
   col_names = next(csvfile)

   for row in csvreader:
      try:
         cursor.execute(
            "INSERT into Products(product_id, department_id, category_id, product_name, price, image_link)" +
            "VALUES (%s, %s, %s, %s, %s, %s)", (row[0], row[1], row[2], row[3], row[4], row[5]))
      except Exception as e:
         print("Insert into database failed!", e)
      conn.commit()

cursor.close()
conn.close()
