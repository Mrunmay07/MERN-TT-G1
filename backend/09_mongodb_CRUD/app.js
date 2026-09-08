import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://127.0.0.1:27017/")

await client.connect()

const db = client.db()

// list collections
/* console.log(await db.listCollections().toArray()) */

const expenseCollection = db.collection("expenses")


// Create/ insert
/* 
console.log( await expenseCollection.insertOne({title : "Hello" }))

// Update
console.log(await expenseCollection.updateOne({title : "Hello"} , {$set : {title : "Hello world"}}))
 */

// Delete 
console.log(await expenseCollection.deleteOne({title : "Hello"}))

// Read
console.log(await expenseCollection.find({}).toArray())

db.close()