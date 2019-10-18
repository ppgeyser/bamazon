# Bamazon (Bootcamp Amazon)

Bamazon is a command line node app that simulates a digital storefront. Users can either roleplay as a customer and purchase items or as a manager and view all inventory, low inventory, increase the stock of specific items, and even add new items to inventory.

## Initializing the app

To run this app, you will need to first initialize a SQL database. [Here is a guide on how to do that](https://dev.mysql.com/doc/workbench/en/). I have provided a schema as well as some seed data that you can use in order to populate the database.

Assuming that you set up your SQL database so that the host=localhost, port=3306, and user=root, you will also need to create a .env file in the root of the bamazon directory after you have cloned the repository. Inside of the .env file, you will need to write `PASSWORD=example`, where "example" is the password you have set up for your SQL Database.

From there, you can run `npm install` from your cli in the bamazon directory to grab the required dependancies, and the bamazon app should be good to go from there!

## Running the app

There are two modes that are available, customer and manager.

### Customer

To run bamazon as a customer, you will need to run `node bamazonCustomer.js` in your cli. You will then be presented with a list of items available on bamazon. You can use your arrow keys to scroll through the items.

<img width="1001" alt="Screen Shot 2019-09-13 at 9 44 50 PM" src="https://user-images.githubusercontent.com/50184318/64903767-a2a7cd80-d673-11e9-8f53-0cb1095bdd89.png">

Once you have selected an item, you will be asked how many units you would like to purchase.

<img width="1002" alt="Screen Shot 2019-09-13 at 9 45 19 PM" src="https://user-images.githubusercontent.com/50184318/64903776-d4b92f80-d673-11e9-915c-e7716663ce3b.png">

If there are enough units in stock, you will get a confirmation that the purchase was successful as well as the total cost. Then you will be taken back to the list of items available.

<img width="1002" alt="Screen Shot 2019-09-13 at 9 45 37 PM" src="https://user-images.githubusercontent.com/50184318/64903786-0e8a3600-d674-11e9-98ed-f93fbdab62c0.png">

If there are not enough units in stock, you will be given a message that tells you there is insufficient stock and to try again, along with the quantity of the item in stock.

<img width="1003" alt="Screen Shot 2019-09-13 at 9 48 29 PM" src="https://user-images.githubusercontent.com/50184318/64903797-5ad57600-d674-11e9-8f62-6229bc0e235f.png">

### Manager

To run bamazon as a manager, you will need to run `node bamazonManager.js`. You will then be presented with a list of options.

<img width="1002" alt="Screen Shot 2019-09-13 at 9 51 47 PM" src="https://user-images.githubusercontent.com/50184318/64903808-c1f32a80-d674-11e9-981e-76b4b3f9867c.png">

Selecting "View Products For Sale" brings up a list of currently available products which include the product id, name, price, and quantity.

<img width="1001" alt="Screen Shot 2019-09-13 at 9 53 52 PM" src="https://user-images.githubusercontent.com/50184318/64903819-fb2b9a80-d674-11e9-8a05-215c1aedaac9.png">

Selecting "View Low Inventory" will bring up a list of items with a quantity of 5 or less.

<img width="1000" alt="Screen Shot 2019-09-13 at 9 54 20 PM" src="https://user-images.githubusercontent.com/50184318/64903830-1f877700-d675-11e9-9269-49eb74e975c3.png">

Selecting "Add to Inventory" will bring up a list of items and their quantities. 

<img width="999" alt="Screen Shot 2019-09-13 at 9 55 11 PM" src="https://user-images.githubusercontent.com/50184318/64903837-5a89aa80-d675-11e9-8098-c457ffb6feed.png">

After selecting an item, you will be prompted for how many units you wish to add.

<img width="1000" alt="Screen Shot 2019-09-13 at 9 55 30 PM" src="https://user-images.githubusercontent.com/50184318/64903843-72612e80-d675-11e9-8a6e-8b6d839afe0f.png">

Once you have specified an amount, you will get a confirmation that the inventory has been updated successfully and the new quantity of the item. You are then returned back to the main menu.

<img width="1003" alt="Screen Shot 2019-09-13 at 9 55 57 PM" src="https://user-images.githubusercontent.com/50184318/64903859-a3416380-d675-11e9-8732-21c4828b58f9.png">

Selecting "Add A New Product" will guide you through a series of questions so that you can input the product name, department, price, and quantity available.

<img width="1000" alt="Screen Shot 2019-09-13 at 9 57 20 PM" src="https://user-images.githubusercontent.com/50184318/64903864-c23ff580-d675-11e9-8c8e-e28d9ab5d969.png">

Once you have gone through all the questions, you will get a confirmation stating that your item has been added successfully. When you run "View Products For Sale" again, you will now see the new item you have added to your inventory.

<img width="1004" alt="Screen Shot 2019-09-13 at 10 00 38 PM" src="https://user-images.githubusercontent.com/50184318/64903875-016e4680-d676-11e9-9c06-a0cea0f7faa7.png">


This is my second backend project using node.js, demonstrates my knowledge of MySQL, and my ability to perform CRUD (Create, Read, Update, Delete) operations on a database.
