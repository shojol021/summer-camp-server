const express = require('express')
const app = express()
require('dotenv').config()
const stripe = require('stripe')(process.env.PAYMENT_SECRET_KEY)
const cors = require('cors')
const port = process.env.PORT || 5000
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.6c8obk5.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const instructorCollection = client.db('school').collection('instructor')
    const classesCollection = client.db('school').collection('classes')
    const userCollection = client.db('school').collection('user')
    const selectCollection = client.db('school').collection('selected')

    app.get('/instructors', async (req, res) => {
      const result = await instructorCollection.find().toArray()
      res.send(result)
    })

    app.get('/classes', async (req, res) => {
      const result = await classesCollection.find().toArray()
      res.send(result)
    })

    app.post('/select', async (req, res) => {
      const cls = req.body;
      const result = await selectCollection.insertOne(cls)
      res.send(result)
    })


    app.get('/select', async (req, res) => {
      const email = req.query.email;
      const query = { email: email }
      const result = await selectCollection.find(query).toArray()
      res.send(result)
    })

    app.get('/user-classes', async(req, res) => {
      const email = req.query.email;
      const query = {instructorEmail: email}
      const result = await classesCollection.find(query).toArray()
      res.send(result)
    })

    app.get('/users', async (req, res) => {
      const email = req.query.email
      const query = { email: email }
      const result = await userCollection.findOne(query)
      res.send(result)
    })

    app.get('/allclasses', async (req, res) => {
      const result = await classesCollection.find().toArray()
      res.send(result)
    })

    app.post('/users', async (req, res) => {
      const user = req.body;
      const result = await userCollection.insertOne(user)
      res.send(result)
    })

    app.post('/class', async (req, res) => {
      const cls = req.body;
      const result = await classesCollection.insertOne(cls)
      res.send(result)
    })

    app.post('/instructor', async (req, res) => {
      const instructor = req.body
      console.log(instructor)
      const result = await instructorCollection.insertOne(instructor)
      res.send(result)
    })

    app.patch('/user', async (req, res) => {
      const { email } = req.body;
      const query = { email: email }
      const updatedDoc = {
        $set: {
          role: 'admin'
        }
      }
      const result = await userCollection.updateOne(query, updatedDoc)
      res.send(result)
    })

    app.patch('/make-approved/:id', async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) }
      const updatedDoc = {
        $set: {
          status: 'approved'
        }
      }
      const result = await classesCollection.updateOne(filter, updatedDoc)
      res.send(result)
    })

    app.patch('/deny/:id', async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) }
      const updatedDoc = {
        $set: {
          status: 'denied'
        }
      }
      const result = await classesCollection.updateOne(filter, updatedDoc)
      res.send(result)
    })

    app.patch('/make-instructor', async (req, res) => {
      const { email } = req.body;
      console.log(email)
      const query = { email: email }
      const updatedDoc = {
        $set: {
          role: 'instructor'
        }
      }
      const result = await userCollection.updateOne(query, updatedDoc)
      res.send(result)
    })

    app.get('/allusers', async (req, res) => {
      const result = await userCollection.find().toArray()
      res.send(result)
    })

    app.post('/payment-intent', async (req, res) => {
      const { price } = req.body;
      const amount = price * 100;
      console.log(price, amount)
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: 'usd',
        payment_method_types: ['card']
      })
      res.send(
        { clientSecret: paymentIntent.client_secret }
      )
    })

    app.delete('/instructor/:email', async (req, res) => {
      const  email = req.params.email;
      console.log('emai', email)
      const query = { email: email }
      const result = await instructorCollection.deleteOne(query)
      res.send(result)
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('server is running')
}),

  app.listen(port)