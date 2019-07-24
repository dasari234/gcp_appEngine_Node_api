<h1>GCP Nodejs Api with Datastore database sample project</h1>

Create api in NODEJS program to get customers information from google cloud datastore.
Solution : Created a NODEJS code to fetch data from GCP datastore for below functionalities.

1. Get data for all customers : getCustomers route : Will return all the customers in the Json format <br/>
Example : https://i-academy-243007.appspot.com/getCustomers 

<b>SAMPLE RESPONSE:</b><br/>
[
    {
        _id: "5645760532054016",
        phone_number: "000 000 0000",
        address: {
            city: "Benaglore",
            state: "KA",
            postal_code: "123456",
            country: "India",
            street: "street1"
        },
        email: "testmail-1563527898467",
        name: "customer1563527898467"
    },
    {
        _id: "5705808872472576",
        phone_number: "000 000 0000",
        address: {
            street: "street1",
            city: "Benaglore",
            state: "KA",
            postal_code: "123456",
            country: "India"
        },
        email: "testmail-1563527898467",
        name: "customer1563527898467"
    },
    {
        _id: "5629654941564928",
        phone_number: "000 000 0000",
        address: {
            city: "Benaglore",
            state: "KA",
            postal_code: "123456",
            country: "India",
            street: "street1"
        },
        email: "testmail-1563528342281",
        name: "customer1563528342281"
    },
    {
        _id: "5712837116690432",
        email: "testmail-1563528467853",
        name: "customer1563528467853",
        phone_number: "000 000 0000",
        address: {
            street: "street1",
            city: "Benaglore",
            state: "KA",
            postal_code: "123456",
            country: "India"
        }
    }
]

2. Get data for a single customer filtered by id : getCustomers/:id Route : Will fetch a result for a particular given id in Json format. <br/>
Example GET METHOD with QUERY PARAM: https://i-academy-243007.appspot.com/getCustomer?id=5681556802764800
<b>OR</b> <br/>
Example GET METHOD with PATH PARAM: https://i-academy-243007.appspot.com/getCustomers/5681556802764800 <br/>

<b>SAMPLE RESPONSE:</b><br/>
{
    "_id": "5681556802764800",
    "customer": [
        {
            "email": "testmail-1563527898467",
            "name": "customer1563527898467",
            "phone_number": "000 000 0000",
            "address": {
                "street": "street1",
                "city": "Benaglore",
                "state": "KA",
                "postal_code": "123456",
                "country": "India"
            }
        }
    ]
}


3. Add Customer POST Method : https://i-academy-243007.appspot.com/addCustomer

<b>SAMPPLE BODY to add customer:</b><br/>
{
  "name": "Srinivas",
  "email": "test1234@xyz.com",
  "phone_number": "000 000 0000",
  "address": {
    "street": "street1",
    "city": "Benaglore",
    "state": "KA",
    "country": "India",
    "postal_code": "123456"
  }
}
