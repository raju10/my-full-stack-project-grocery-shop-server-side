const express = require("express");
const app = express();
const port = 4000;
const pass = "ArifulIslamRaju000";
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.json());
app.use(cors());
app.use(express.static("product"));
require("dotenv").config();
console.log(process.env.DB_USER);

const MongoClient = require("mongodb").MongoClient;
const uri =
  //   "mongodb+srv://emaWatsonMyThink:ArifulIslamRaju000@cluster0.yaeov.mongodb.net/emajhonMyThink?retryWrites=true&w=majority";
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.yaeov.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  const productCollection = client.db("emajhonMyThink").collection("product");
  const admainCollection = client.db("emajhonMyThink").collection("admain");
  const orderCollection = client.db("emajhonMyThink").collection("order");
  const clientReviewsCollection = client
    .db("emajhonMyThink")
    .collection("clientReview");
  ////////////////////////
  app.post("/addProduct", (req, res) => {
    const newEvent = req.body;
    // console.log(newEvent);
    productCollection.insertOne(newEvent).then((result) => {
      // console.log("raju", result);
      res.send(result.insertedCount > 0);
    });
  });

  app.get("/ourProduct", (req, res) => {
    productCollection.find().toArray((err, items) => {
      res.send(items);
    });
  });
  //////////////
  app.post("/addAdmain", (req, res) => {
    const newEvent = req.body;
    // console.log(newEvent);
    admainCollection.insertOne(newEvent).then((result) => {
      console.log("raju", result);
      res.send(result.insertedCount > 0);
    });
  });

  app.get("/ourAdmain", (req, res) => {
    admainCollection.find().toArray((err, items) => {
      res.send(items);
    });
  });
  /////////
  app.post("/isAdmain", (req, res) => {
    const email = req.body.email;
    admainCollection.find({ email: email }).toArray((err, doctors) => {
      res.send(doctors.length > 0);
    });
  });
  ////////

  app.post("/addOrder", (req, res) => {
    const newOrder = req.body;
    // console.log(newOrder);
    orderCollection.insertOne(newOrder).then((result) => {
      console.log("raju", result);
      res.send(result.insertedCount > 0);
      ////////////
    });
  });

  app.get("/ourOrder", (req, res) => {
    orderCollection
      .find({ loginUserEmail: req.query.loginUserEmail })
      .toArray((err, items) => {
        res.send(items);
      });
  });
  ///
  app.get("/ourAllOrder", (req, res) => {
    orderCollection.find().toArray((err, items) => {
      res.send(items);
    });
  });
  ///////////
  app.post("/addOrdrReview", (req, res) => {
    const newEvent = req.body;
    // console.log("additing new event : ", newEvent);

    clientReviewsCollection.insertOne(newEvent).then((result) => {
      console.log("yo mamma", result);
      res.send(result.insertedCount > 0);
    });
  });

  app.get("/orderReviews", (req, res) => {
    clientReviewsCollection.find().toArray((err, items) => {
      res.send(items);
    });
  });
  ////
});

//////////

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT || port);
