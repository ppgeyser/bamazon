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
        message: "What would you like to do?",
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
                results[i].item_id + 
                ") " + results[i].product_name +
                " | Price: " + results[i].price + 
                " | Quantity: " + results[i].stock
                )
        }
        connection.end();
    })
};

function productViewLow() {
    connection.query("SELECT * FROM productsTB WHERE stock < 6", function (err, results) {
        if (err) throw err;

        for (var i = 0; i < results.length; i++) {
            console.log(
                results[i].item_id + 
                ") " + results[i].product_name +
                " | Price: " + results[i].price + 
                " | Quantity: " + results[i].stock
                )
        }
        connection.end();
    })   
}