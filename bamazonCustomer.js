//dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");
require("dotenv").config();

//connection config
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: process.env.PASSWORD,
    database: "top_songsDB"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    connection.end();
  });

  function customerApp() {
      inquirer.prompt({
          name: "storefront",
          type: "list",
          message: "Which item would you like to purchase?",
          choices: ""
      })
  }