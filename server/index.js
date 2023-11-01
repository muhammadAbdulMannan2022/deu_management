const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;
// middelwer
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cazjtjr.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    client.connect();
    // Send a ping to confirm a successful connection
    const database = client.db("due_manage");
    const usersCullectionDB = database.collection("stores");
    app.post("/addStore", async (req, res) => {
      const store = req.body;
      const resault = await usersCullectionDB.insertOne(store);
      res.send(resault);
      console.log(store, "\n", resault);
    });
    app.get("/stores", async (req, res) => {
      const current_stack = 0;
      const skipCount = (current_stack - 1) * 50;
      const stores = await usersCullectionDB
        .find()
        .sort({ amount: -1 })
        .limit(50)
        .toArray();

      res.status(200).send(stores);
    });
    app.get("/store/:id", async (req, res) => {
      const id = req.params.id;
      const store = await usersCullectionDB.findOne({
        _id: new ObjectId(id),
      });
      res.status(200).send(store);
    });
    app.post("/:id/pay", async (req, res) => {
      const id = req.params.id;
      const amount = req.body.amount;
      const queire = { _id: new ObjectId(id) };
      const projection = { projection: { _id: 1, amount: 1 } };
      const resault = await usersCullectionDB.findOne(queire, projection);
      const update = await usersCullectionDB.updateOne(queire, {
        $set: { amount: Number(resault?.amount) - Number(amount) },
      });
      res.send(update);
    });
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);
// ------------------------
app.get("/", (req, res) => {
  res.send(`summer is running ....`);
});
app.listen(port, () => {
  console.log(`the server is running on port ${port}`);
});
