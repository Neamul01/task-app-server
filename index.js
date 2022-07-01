const express = require('express')
const cors = require('cors');
require('dotenv').config();
const app = express()
const port = process.env.PORT || 5000;

//midleware
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://task-app:${process.env.DB_PASS}@cluster0.aeyhn.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    await client.connect();
    const todoList = client.db('to_do').collection('tasks')
}
run().catch(console.dir)

app.get('/', (req, res) => {
    res.send('Hello task app...')
})

app.listen(port, () => {
    console.log(`task app running on port ${port}`)
})