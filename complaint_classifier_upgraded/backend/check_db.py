import sqlite3

conn = sqlite3.connect("complaints.db")
cursor = conn.cursor()

cursor.execute("SELECT * FROM complaints")
rows = cursor.fetchall()

for row in rows:

    print("Complaint:", row[1])
    print("Category:", row[2])
    print("Time:", row[3])
    print("----------------------")

conn.close()