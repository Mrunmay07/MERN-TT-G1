import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://127.0.0.1:27017/")

await client.connect()

const db = client.db()

const expenseCollection = db.collection("expenses")

// Read
const cursor = await expenseCollection.find().batchSize(10)

/* while(await cursor.hasNext()){
    console.log(await cursor.next())
} */

const page = 2
const lm = 5

const cursor = await expenseCollection.find().skip((page - 1) * lm).limit(lm)

while(await cursor.hasNext()){
    console.log(await cursor.next())
}