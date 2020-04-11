const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()

//Database
const MongoClient = require('mongodb').MongoClient;
const uri =  process.env.DB_PATH
let client = new MongoClient(uri, { useNewUrlParser: true });

//MiddleWare
app.use(cors())
app.use(bodyParser.json())



//Routes
app.get('/', (req, res) => res.send('Hello World!'))


app.post('/addservices', (req, res) => {
    const items = req.body
    console.log(items)

    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
    const collection = client.db("doctor-portal").collection("services");
    collection.insert(items, (err, result) => {
        if(err){
            console.log(err);
            res.status(500).send({message:err})
            
        }
        else{
            res.send(result.ops[0])
        }
    })
    client.close();
    });
})

app.get('/getservices', (req, res) => {

    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
    const collection = client.db("doctor-portal").collection("services");
    collection.find().toArray((err, documents) => {
        if(err){
            console.log(err);
            res.status(500).send({message:err})
            
        }
        else{
            res.send(documents)
        }
    })
    client.close();
    });
})

app.post('/addappointment', (req, res) => {
    const appointment = req.body
    appointment.appointmentTime = new Date()
    console.log(appointment)

    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
    const collection = client.db("doctor-portal").collection("appointments");
    collection.insertOne(appointment, (err, result) => {
        if(err){
            console.log(err);
            res.status(500).send({message:err})
            
        }
        else{
            res.send(result.ops[0])
        }
    })
    client.close();
    });
})


app.post('/getappointments', (req, res) => {
    const query = req.body
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
    const collection = client.db("doctor-portal").collection("appointments");
    collection.find(query).toArray((err, documents) => {
        if(err){
            console.log(err);
            res.status(500).send({message:err})
        }
        else{
            res.send(documents)
        }
    })
    client.close();
    });
})

app.get('/getallappointments', (req, res) => {
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
    const collection = client.db("doctor-portal").collection("appointments");
    collection.find().toArray((err, documents) => {
        if(err){
            console.log(err);
            res.status(500).send({message:err})
        }
        else{
            res.send(documents)
        }
    })
    client.close();
    });
})


app.post('/addpatients', (req, res) => {
    const items = req.body
    console.log(items)

    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
    const collection = client.db("doctor-portal").collection("patients");
    collection.insert(items, (err, result) => {
        if(err){
            console.log(err);
            res.status(500).send({message:err})
            
        }
        else{
            res.send(result.ops[0])
        }
    })
    client.close();
    });
})


app.get('/getpatients', (req, res) => {
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
    const collection = client.db("doctor-portal").collection("patients");
    collection.find().toArray((err, documents) => {
        if(err){
            console.log(err);
            res.status(500).send({message:err})
        }
        else{
            res.send(documents)
        }
    })
    client.close();
    });
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))