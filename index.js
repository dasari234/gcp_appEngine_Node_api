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

const datastore = new Datastore();
const customerKey = datastore.key(['Customer']);

app.get('/', async (req, res, next) => {
    try {
      res.json("Hello WELCOME to GCP");
    } catch (error) {
      res.status(400).json(error);
    }
  });

app.post('/addCustomer', async (req, res, next) => {
  const new_customer = {
    key: customerKey,
    data: req.body,
  };
  try {
    await datastore.save(new_customer);
    res.json("Successfully created New Customer");
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get("/getCustomers", async (req, res, next) => {
  try {
    const query = datastore.createQuery(`Customer`).order('name');
    const [customers] = await datastore.runQuery(query);
    const customersWithKey = customers.map((customer) => ({ _id: customer[datastore.KEY].id, ...customer }));
    res.json(customersWithKey);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get("/getCustomer", async (req, res, next) => {
  try {
   const query = datastore.key(['Customer', parseInt(req.query.id)]);
   const customer = await datastore.get(query);
    res.json(customer);
  } catch (error) {
    res.status(400).json(error);
  }
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
