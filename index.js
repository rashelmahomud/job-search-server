const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lftebgy.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {

    try {
        await client.connect();
        const db = client.db("findJob");
        const userCollection = client.db('findJob').collection('user');
        const jobCollection = client.db('findJob').collection('job');
        // const jobCollection = db.collection("job");
        console.log('Hello')

        app.post('/user', async (req, res) => {
            const user = req.body;
            const result = await userCollection.insertOne(user);
            res.send(result);
        });

        app.get("/user/:email", async (req, res) => {
            const email = req.params.email;

            const result = await userCollection.findOne({ email });

            if (result?.email) {
                return res.send({ status: true, data: result });
            }
            res.send({ status: false });
        });

        app.post("/job", async (req, res) => {
            const job = req.body;
            const result = await jobCollection.insertOne(job);

            res.send({ status: true, data: result });
        });

        app.get('/jobs', async (req, res) => {
            const cursor = jobCollection.find({});
            const result = await cursor.toArray();
            res.send({ status: true, data: result })
        })

        app.get('/job/:id', async (req, res) => {
            const id = req.params.id;
            const result = await jobCollection.findOne({ _id: ObjectId(id) });
            res.send({ status: true, data: result });
        });

    }


    finally {

    }

}
run().catch((err) => console.log(err));

app.get('/', (req, res) => {
    res.send('site is runing');
});

app.listen(port, () => {
    console.log('lisining the site', port);
});