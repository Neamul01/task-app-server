const express = require('express')
const cors = require('cors');
require('dotenv').config();
const app = express()
const port = process.env.PORT || 5000;

//midleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello task app...')
})

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://task-app:${process.env.DB_PASS}@cluster0.aeyhn.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    await client.connect();
    const todoList = client.db('to_do').collection('tasks')

    app.get('/tasks', async (req, res) => {
        const query = {};
        const result = await todoList.find(query).toArray();
        res.send(result)
    })
    app.post('/tasks', async (req, res) => {
        const doc = req.body;
        const result = await todoList.insertOne(doc);
        res.send(result)
    })
    app.put('/tasks/:id', async (req, res) => {
        const id = req.params.id;
        const filter = { _id: ObjectId(id) }
        console.log(filter)
        // options = { upsert: true };
        const updatedDoc = {
            $set: {
                'completed': true
            }
        }
        const result = await todoList.updateOne(filter, updatedDoc)
        res.send(result)
    })
}
run().catch(console.dir)

app.listen(port, () => {
    console.log(`task app running on port ${port}`)
})