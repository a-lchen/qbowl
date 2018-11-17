import pymongo
from pymongo import MongoClient

client = MongoClient('mongodb://user:pass@ds153958.mlab.com:53958/qb-questions')

# Get the sampleDB database
db = client.get_default_database()
qs = db.questions
post = {"author": "Mike"}
qs.insert(post)