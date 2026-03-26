import sqlite3

conn = sqlite3.connect("complaints.db")
cursor = conn.cursor()

cursor.execute("SELECT category, COUNT(*) FROM complaints GROUP BY category")
data = cursor.fetchall()

for row in data:
    print("Category:", row[0])
    print("Count:", row[1])
    print("------------------")

conn.close()