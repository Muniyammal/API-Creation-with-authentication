const mysql = require("mysql");
let mysqlConnection = mysql.createConnection({
    host :"localhost",
    user :"root",
    password : "Bakya@123",
    database : "calibraint",
    multipleStatements : true
});
mysqlConnection.connect((err)=>{
    if(!err){
        console.log("connected");
    }
    else{
        console.log("connection terminated");
    }
});
module.exports = mysqlConnection;