const express = require("express")
const {MongoClient} = require('mongodb')
const cors = require("cors")
const app = express()
const { ObjectId } = require('mongodb');
require('dotenv').config()
const MongoDBClient = new MongoClient(process.env.MONGO_URI)
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(cors())

app.get('/', (req, res) => {
    res.send('Сервер работает!');
});

app.get("/api/item-active", async(req, res)=>{
    try{
        await MongoDBClient.connect()
        const collection = MongoDBClient.db("itemsData").collection("items-active")
        const items = await collection.find({}).toArray()
        res.status(200).json(items)
    }
    catch(err){
        res.status(500).json({ error: 'Ошибка сервера' });
    }
})

app.put("/api/item-active/:id", async (req, res)=>{
    try{
        await MongoDBClient.connect()
        const collection = MongoDBClient.db("itemsData").collection("items-active")
        const items = await collection.replaceOne({_id: new ObjectId(req.params.id)}, req.body)
    }
    catch(err){
        res.status(500).json({ error: 'Ошибка сервера' });
    }
})

app.post("/api/item-disabled", async(req, res)=>{
    try{
        await MongoDBClient.connect()
        const collection = MongoDBClient.db("itemsData").collection("items-disabled")
        const itemsValue = req.body;
        await collection.insertOne({id: itemsValue.id,
  name: itemsValue.name,
  power: itemsValue.power,
  categoryDefence: itemsValue.categoryDefence,
  electricalEquipmentClass: itemsValue.electricalEquipmentClass,
  voltage: itemsValue.voltage,
  thermostat: itemsValue.thermostat,
  fastening: itemsValue.fastening,
  climaticVersion: itemsValue.climaticVersion,
  materialOfManufacture: itemsValue.materialOfManufacture,
  restrictionMAXT: itemsValue.restrictionMAXT,
  technicalConditions: itemsValue.technicalConditions,
  barcodeRegister: itemsValue.barcodeRegister,
  date: itemsValue.date,
  note: itemsValue.note})
        res.send("confirm result")
    }
    catch(err){
        console.error(err)
    }
    
  
})

app.delete("/api/item-active/:id", async(req, res)=>{
    try{
        await MongoDBClient.connect()
        const collection = MongoDBClient.db("itemsData").collection("items-active")
        await collection.deleteOne({_id: new ObjectId(req.params.id)})
        res.send("confirm result")
    }
    catch(err){
        console.error(err)
    }
    
  
})

app.post("/api/item-active", async(req, res)=>{
    try{
        await MongoDBClient.connect()
        const collection = MongoDBClient.db("itemsData").collection("items-active")
        const itemsValue = req.body;
        await collection.insertOne({id: itemsValue.id,
  name: itemsValue.name,
  power: itemsValue.power,
  categoryDefence: itemsValue.categoryDefence,
  electricalEquipmentClass: itemsValue.electricalEquipmentClass,
  voltage: itemsValue.voltage,
  thermostat: itemsValue.thermostat,
  fastening: itemsValue.fastening,
  climaticVersion: itemsValue.climaticVersion,
  materialOfManufacture: itemsValue.materialOfManufacture,
  restrictionMAXT: itemsValue.restrictionMAXT,
  technicalConditions: itemsValue.technicalConditions,
  barcodeRegister: itemsValue.barcodeRegister,
  date: itemsValue.date,
  note: itemsValue.note})
        res.send("confirm result")
    }
    catch(err){
        console.error(err)
    }
    
  
})

app.listen(process.env.PORT, () => {
  console.log(`Сервер запущен`);
});
