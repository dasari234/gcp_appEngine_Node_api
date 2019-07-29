const PORT = Number(process.env.PORT) || 8080;
const express = require('express');
const bodyParser = require ('body-parser');
const {Datastore} = require('@google-cloud/datastore');

const app = express();
app.enable('trust proxy');

app.use(express.json());
app.use(bodyParser.json());

const router = express.Router();
app.use(router);


/* 
Create a Customer Entity to GCP Datastore database
*/
const datastore = new Datastore();
const customerKey = datastore.key(['Customer']);

/* 
staring Route
*/
app.get('/', async (req, res, next) => {
    try {
      res.status(200).json("Hello WELCOME to GCP");
    } catch (error) {
      res.status(400).json(error);
    }
  });

/*
Add new customer to GCP Datastore database
*/
app.post('/addCustomer', async (req, res, next) => {
  const new_customer = {
    key: customerKey,
    data: req.body,
  };
  try {
    await datastore.save(new_customer);
    res.status(200).json("Successfully created New Customer");
  } catch (error) {
    res.status(400).json(error);
  }
});

/*
Get list of all customers from GCP Datastore database
*/
router.get("/getCustomers", async (req, res, next) => {
  try {
    const query = datastore.createQuery(`Customer`).order('name');
    const [customers] = await datastore.runQuery(query);
    const _newCustomers = customers.map((customer) => ({ _id: customer[datastore.KEY].id, ...customer }));

    res.status(200).json(_newCustomers);
  } catch (error) {
    res.status(400).json(error);
  }
});

/*
Get single customer data from GCP Datastore database
getCustomer?id
*/

router.get("/getCustomer", async (req, res, next) => {
  try {
   const key = datastore.key(['Customer', parseInt(req.query.id)]);
    const customer = await datastore.get(key);
    res.status(200).json(customer);
  } catch (error) {
    res.status(400).json(error);
  }
});



app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
