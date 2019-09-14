//dependencies
require("dotenv").config();
var mysql = require("mysql");
var inquirer = require("inquirer");

//connection config
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.PASSWORD,
    database: "bamazonDB"
});

//Start connection and run main app
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    customerApp();
});

//main app
function customerApp() {
    connection.query("SELECT * FROM productsTB", function (err, results) {
        if (err) throw err;

        //Inquirer prompt
        inquirer.prompt([

                //List of items available
                {
                    name: "choice",
                    type: "rawlist",

                    //function to grab choices from sql db
                    choices: function () {
                        var choiceArray = [];
                        for (var i = 0; i < results.length; i++) {

                            //Adding choice and item price to array as a string
                            choiceArray.push(
                                results[i].product_name +
                                " || Price: $" +
                                results[i].price
                            );
                        }
                        choiceArray.push("Exit");
                        return choiceArray;
                    },
                    message: "What item would you like to purchase?"
                },
            ])
            .then(function (answer) {

                //Stop function if user wants to exit
                if (answer.choice === "Exit") {
                    connection.end();

                //Continue on with application    
                } else {

                    // get the information of the chosen item
                    var choice = answer.choice;

                    //replace all characters after "|" with empty string and then trim spaces so that we only have the name of the item
                    choice = choice.replace(/\|.*/, '').trim();

                    //Making a chosen item variable that is set to the object grabbed from the database
                    var chosenItem;
                    for (var i = 0; i < results.length; i++) {
                        if (results[i].product_name === choice) {
                            chosenItem = results[i];
                        }
                    }
                    inquirer.prompt(
                        //determining desired quantity
                        {
                            name: "quantity",
                            type: "input",
                            message: "How much would you like to buy?"
                        }
                    ).then(function (answer) {

                        // determine if there is sufficient stock
                        if (chosenItem.stock > parseInt(answer.quantity)) {

                            var updatedQuantity = (chosenItem.stock - parseInt(answer.quantity));

                            // There was sufficient stock, update db, let the user know, and end process
                            var query = "UPDATE productsTB SET ? WHERE ?"
                            connection.query(query,
                                [{
                                        stock: updatedQuantity
                                    },
                                    {
                                        item_id: chosenItem.item_id
                                    }
                                ],
                                function (error) {
                                    if (error) throw error;
                                    console.log("Item purchased successfully!" + "\nTotal cost: $" + (parseInt(answer.quantity) * chosenItem.price).toFixed(2));
                                    connection.end();
                                }
                            );
                        } else {
                            // Insufficient stock, so end process
                            console.log("Stock: " + chosenItem.stock + "\nInsufficient stock, please try again");
                            connection.end();
                        }
                    })
                }


            })
    })
}