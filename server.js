const express = require("express")
const {MongoClient} = require('mongodb')
const app = express()
require('dotenv').config()
const MongoDBClient = new MongoClient(process.env.MONGO_URI)
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Сервер работает!');
});

app.get("/api/users", async(req, res)=>{
    try{
        await MongoDBClient.connect()
        const collection = MongoDBClient.db("itemsData").collection("items")
        const items = await collection.find({}).toArray()
        res.status(200).json(items)
    }
    catch(err){
        res.status(500).json({ error: 'Ошибка сервера' });
    }
})

app.post("/api/users", async(req, res)=>{
    try{
        await MongoDBClient.connect()
        const collection = MongoDBClient.db("itemsData").collection("items")
        const itemsValue = req.body;
        await collection.insertOne({id: String(itemsValue.id),
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
