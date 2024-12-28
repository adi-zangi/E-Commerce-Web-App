# Parses the inventory CSV file and inserts it into the database

import csv
import json
import psycopg2

inventory_file = "inventory.csv"
env_file = "../client/src/env.json"

# Connect to the db
try:
   env = open(env_file, 'r')
   env_obj = json.load(env)
   conn = psycopg2.connect(
      database=env_obj['DB_NAME'],
      user=env_obj['DB_USER'],
      password=env_obj['DB_PASS'],
      host=env_obj['DB_HOST'],
      port=env_obj['DB_PORT']
   )
except Exception as e:
   print("Unable to connect to the database!", e)
   quit()

# Read lines from the file and insert them into the db
with open(inventory_file, 'r') as csvfile:
   cursor = conn.cursor()
   csvreader = csv.reader(csvfile)
   col_names = next(csvfile)
   rows_inserted = 0

   for row in csvreader:
      try:
         cursor.execute(
            "INSERT into Products(product_id, department_id, category_id, product_name, price, image_link)" +
            "VALUES (%s, %s, %s, %s, %s, %s)", (row[0], row[1], row[2], row[3], row[4], row[5]))
         rows_inserted += 1
      except Exception as e:
         print("Insert into database failed!", e)
      conn.commit()
   
   print("Inserted %s rows" % rows_inserted)

cursor.close()
conn.close()
