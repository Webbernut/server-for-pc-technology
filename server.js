const express = require("express")
const {MongoClient} = require('mongodb')
const app = express()
require('dotenv').config()
const MongoDBClient = new MongoClient(process.env.MONGO_URI)

app.get('/', (req, res) => {
    res.send('Сервер работает!');
});

app.get("/api/coveringType", async(req, res)=>{
    try{
        await MongoDBClient.connect()
        console.log("успешное подключение")
        const collection = MongoDBClient.db("catalog").collection("coveringType")
        const coveringTypeItems = await collection.find({}).toArray()
        res.status(200).json(coveringTypeItems)
    }
    catch(err){
        res.status(500).json({ error: 'Ошибка сервера' });
    }
})

app.listen(process.env.PORT, () => {
  console.log(`Сервер запущен`);
});
