import { MongoClient } from 'mongodb'

let uri = process.env.MONGODB_URI || ""
let dbName = process.env.MONGODB_DB

const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}

if (!uri) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  )
}

if (!dbName) {
  throw new Error(
    'Please define the MONGODB_DB environment variable inside .env.local'
  )
}


const client = new MongoClient(uri, options);

const clientPromise = client.connect();
const db = client.db(dbName)

export { clientPromise, db }