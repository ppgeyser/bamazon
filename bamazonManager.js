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
    managerApp();
});

//main app
function managerApp() {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "\nWhat would you like to do?",
        choices: [
            "View Products For Sale",
            "View Low Inventory",
            "Add to Inventory",
            "Add New Product",
            "Exit"
        ]
    }).then(function (answer) {
        switch (answer.action) {
            case "View Products For Sale":
                productView();
                break;

            case "View Low Inventory":
                productViewLow();
                break;

            case "Add to Inventory":
                inventoryAdd();
                break;

            case "Add New Product":
                productAdd();
                break;

            case "Exit":
                connection.end();
                break;
        }
    })
}

function productView() {
    connection.query("SELECT * FROM productsTB", function (err, results) {
        if (err) throw err;

        for (var i = 0; i < results.length; i++) {
            console.log(
                "ID: " + results[i].item_id +
                " | Name: " + results[i].product_name +
                " | Price: " + results[i].price +
                " | Quantity: " + results[i].stock
            )
        }
        managerApp();
    })
};

function productViewLow() {
    connection.query("SELECT * FROM productsTB WHERE stock < 6", function (err, results) {
        if (err) throw err;

        for (var i = 0; i < results.length; i++) {
            console.log(
                "ID: " + results[i].item_id +
                " | Name: " + results[i].product_name +
                " | Price: " + results[i].price +
                " | Quantity: " + results[i].stock
            )
        }
        managerApp();
    })
};

function inventoryAdd() {
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
                                " | Quantity: " +
                                results[i].stock
                            );
                        }
                        choiceArray.push("Back");
                        return choiceArray;
                    },
                    message: "Which item needs more inventory?"
                },
            ])
            .then(function (answer) {

                //Stop function if user wants to exit
                if (answer.choice === "Back") {
                    managerApp();

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
                            message: "How much would you like to add?"
                        }
                    ).then(function (answer) {

                        var updatedQuantity = (chosenItem.stock + parseInt(answer.quantity));

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
                                console.log("Inventory updated successfully!" + "\nUpdated quantity: " + updatedQuantity);
                                managerApp();
                            }
                        );

                    })
                }
            })
    })
}