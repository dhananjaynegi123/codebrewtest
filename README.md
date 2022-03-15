# Test Assignment
#Please have a look to my `QUALITY CODE` having  usable components,  all kind of validation & error handling 

# Getting Started with Test


## Initial NPM install commands

### `npm install`

1- Create a Database named 'test'

2- Change Database details in your .ENV File


Run the Migration

### `npx sequelize-cli db:migrate`

Run the Seeder to seed the roles


### `npx sequelize-cli db:seed:all`

Required Install done..

Import Postman Collection: 

### `https://www.getpostman.com/collections/bc6015e23541a6271500`


Start Node Server
### `npm start`

Node.JS server has been started on the port 3000



What is covered in this test assignment

### 1- Register customer
### 2- Register Fuel Dealer


### A.) There is a user who can create a booking for any type of filling like gas, diesel, petrol. As per the booking you have to provide the nearest pump details who is suitable for the booking.(For example, like Zomato and Uber eats they provide the nearest restaurants according to user location)
 Note** Booking can have multiple vehicles with different types of filling.

### B.) Pump can view the bookings as per the data with user and person details who did the filling. Here user details would be shown only when the user is not deleted or blocked. So make database schema accordingly to manage user statuses.

### C.) A route For file upload with a limit of 3mb.The file could be of service station where filling is happening or for a user profile pic.

### D.) You Should Have an AUTH Function/strategy which is required to authenticate. here you should have both token and API Key for Authorization.
      The API key must be placed in .eve file and accessed when required.
