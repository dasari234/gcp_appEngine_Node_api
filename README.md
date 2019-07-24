<h1>GCP Nodejs Api with Datastore database sample project</h1>

Create api in NODEJS program to get customers information from google cloud datastore.
Solution : Created a NODEJS code to fetch data from GCP datastore for below functionalities.

1. Get data for all customers : getCustomers route : Will return all the customers in the Json format <br/>
Example : https://i-academy-243007.appspot.com/getCustomers 

<b>SAMPLE RESPONSE:</b><br/>
[{"_id":"5676228493180928","email":"test1234@xyz.com","name":"Srinivas","phone_number":"000 000 0000","address":{"city":"Benaglore","state":"KA","postal_code":"123456","country":"India","street":"street1"}},{"_id":"5671636300726272","address":{"city":"Benaglore","state":"KA","postal_code":"123456","country":"India","street":"street1"},"email":"test1234@xyz.com","name":"Srinivas 2","phone_number":"000 000 0000"},{"_id":"5681556802764800","email":"test98765@xyz.com","name":"Srinivas Dasari","phone_number":"123 456 7890","address":{"city":"Benaglore","state":"KA","postal_code":"123456","country":"India","street":"Ejipura"}},{"_id":"5707651547660288","address":{"city":"Benaglore","state":"KA","postal_code":"123456","country":"India","street":"street1"},"email":"test1234@xyz.com","name":"customer 1","phone_number":"000 000 0000"}]


2. Get data for a single customer filtered by id : getCustomers/:id Route : Will fetch a result for a particular given id in Json format. <br/>
Example GET METHOD with QUERY PARAM: https://i-academy-243007.appspot.com/getCustomer?id=5681556802764800 <br/>
<b>OR</b> <br/>
Example GET METHOD with PATH PARAM: https://i-academy-243007.appspot.com/getCustomers/5681556802764800 <br/>

<b>SAMPLE RESPONSE:</b><br/>
{"_id":"5676228493180928","customer":[{"email":"test1234@xyz.com","name":"Srinivas","phone_number":"000 000 0000","address":{"city":"Benaglore","state":"KA","postal_code":"123456","country":"India","street":"street1"}}]}


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
