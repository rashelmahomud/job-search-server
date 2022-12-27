const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lftebgy.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });


async function run() {

    try {
        await client.connect();
        const db = client.db("findJob");
        const userCollection = client.db('findJob').collection('user');


        // app.get('/products', async (req, res) => {
        //     const query = {};
        //     const cursor = productCollection.find(query);
        //     const products = await cursor.toArray();
        //     res.send(products);
        // });


        app.post('/user', async (req, res) => {
            const user = req.body;
            const result = await userCollection.insertOne(user);
            res.send(result);
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