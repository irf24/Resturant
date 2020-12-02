import express from "express";
import bodyParser from "body-parser";
import { MongoClient } from "mongodb";

const app = express();

app.use(bodyParser.json());

app.get("/api/menu", async (req, res) => {
  const foodName = req.params.name;
  try {
    const client = await MongoClient.connect("mongodb://localhost:27017", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = client.db("test");
    const foodInfo = await db.collection("items").find({}).toArray();
    res.status(200).json(foodInfo);
    client.close();
  } catch (err) {
    res.send(err);
  }
});

app.listen(8000, () => {
  console.log("server is running on port : 8000");
});
