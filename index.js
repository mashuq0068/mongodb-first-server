const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://mashuq0068:OWbRD9PBhtl5QYpN@cluster0.hxdwxas.mongodb.net/?retryWrites=true&w=majority";

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
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    const userCollection = client.db('usersDB').collection('users');
    console.log("Connected to MongoDB");

    app.get('/users', async (req, res) => {
        const cursor = userCollection.find()
        const result = await cursor.toArray()
        res.send(result)
      });
     
        
      
    app.get('/users/:id', async (req, res) => {
        const id = req.params.id
        const query = {_id: new ObjectId(id) }
        const user = await userCollection.findOne(query)
        res.send(user)
        
     
        
      
    });
    app.put('/users/:id' , async(req ,res) =>{
      const id = req.params.id
      const updatedUser = req.body
      const filter = {_id : new ObjectId(id)}
      const options = { upsert: true };
      const latestUser = {
        $set:{
          name:updatedUser.name,
          email:updatedUser.email
        }

      }
      const result = await userCollection.updateOne(filter ,latestUser , options )
      res.send(result)
      

    })
    app.post('/users', async (req, res) => {
     
        const user = req.body;
        console.log('new user', user);
        const result = await userCollection.insertOne(user);
        res.send(result);
      
    });
    app.delete('/users/:id', async(req,res)=>{
      const id = req.params.id
      const query = {_id:new ObjectId(id)}
      const result = await userCollection.deleteOne(query)
      res.send(result)

    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    
}
finally {
    // Ensures that the client will close when you finish/error
   
  }
}

run().catch(console.dir);




app.get('/' ,(req , res) => {
    res.send("successfully server created")

})
 
app.listen(port , ()=>{
    console.log(`my running port is ${port}`)
})


// OWbRD9PBhtl5QYpN
// mashuq0068
// X6yB1CJuACJeSm7z