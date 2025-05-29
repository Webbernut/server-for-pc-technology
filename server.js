const express = require("express")
const {MongoClient} = require('mongodb')
const app = express()
require('dotenv').config()
const MongoDBClient = new MongoClient(process.env.MONGO_URI)

app.get('/', (req, res) => {
    res.send('Сервер работает!');
});

app.get("/api/users", async(req, res)=>{
    try{
        await MongoDBClient.connect()
        console.log("успешное подключение")
        const collection = MongoDBClient.db("itemsData").collection("items")
        const items = await collection.find({}).toArray()
        res.status(200).json(items)
    }
    catch(err){
        res.status(500).json({ error: 'Ошибка сервера' });
    }
})

app.listen(process.env.PORT, () => {
  console.log(`Сервер запущен`);
});
