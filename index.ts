const PORT = Number(process.env.PORT) || 8080;
import * as express from "express";
import * as bodyParser from 'body-parser';
import { Datastore } from '@google-cloud/datastore';

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
    res
      .status(200)
      .set('Content-Type', 'application/json')
      .send(`🎉 Hello WELCOME! 🎉`)
      .end();
  } catch (error) {
    res
      .status(400)
      .set('Content-Type', 'application/json')
      .send(`${error}`)
      .end();
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
    res
      .status(200)
      .set('Content-Type', 'application/json')
      .send(`🎉 Successfully created New Customer! 🎉`)
      .end();
  } catch (error) {
    res
      .status(400)
      .set('Content-Type', 'application/json')
      .send(`${error}`)
      .end();
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

    res
      .status(200)
      .set('Content-Type', 'application/json')
      .send(_newCustomers)
      .end();
  } catch (error) {
    res
      .status(400)
      .set('Content-Type', 'application/json')
      .send(`${error}`)
      .end();
  }
});
/*
Get single customer data from GCP Datastore database
/getCustomer?id
*/

router.get("/getCustomer", async (req, res, next) => {
  try {
   const key = datastore.key(['Customer', parseInt(req.query.id)]);
    const customer = await datastore.get(key);
    res
      .status(200)
      .set('Content-Type', 'application/json')
      .send({ _id: req.query.id, customer })
      .end();
  } catch (error) {
    res
      .status(400)
      .set('Content-Type', 'application/json')
      .send(`${error}`)
      .end();
  }
});

/*
Get single customer data from GCP Datastore database
/getCustomers/:id
*/
router.get("/getCustomers/:id", async (req, res, next) => {
  try {
    const key = datastore.key(['Customer', parseInt(req.params.id)]);
    const customer = await datastore.get(key);
    res
      .status(200)
      .set('Content-Type', 'application/json')
      .send({ _id: req.params.id, customer })
      .end();
  } catch (error) {
    res
      .status(400)
      .set('Content-Type', 'application/json')
      .send(`${error}`)
      .end();
  }
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
