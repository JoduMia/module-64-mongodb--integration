const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

const port = process.env.PORT || 5000;
const app = express();


app.use(cors());
app.use(express.json());




const uri = "mongodb+srv://userdb64:RNnNrNtNF2aTlDi8@cluster0.mdehnif.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const run = async () => {
    try {
        const userCollection = client.db('module64').collection('users');

        app.get('/datas', async (req,res) => {
            const cursor = userCollection.find({});
            const user = await cursor.toArray();
            res.send(user);
        })

        app.post('/datas', async (req,res) => {
            const user = req.body;
            console.log(user);
            const result = await userCollection.insertOne(user);
            console.log(result);
            res.send(user);
        })
    }
    finally{

    }
};

run().catch(error => {
    console.log(error.message)
})


app.get('/', (req,res) => {
    res.send('api is running');
})

// app.get('/datas', (req,res) => {
//     res.send(datas);
// })



app.listen(port, () => {
    console.log(`server is running on port: ${port}`);
});