const cron = require("node-cron");
const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const mysqlConnection = require("./connection");
const StudentRoutes = require("./routes/student");
require('dotenv').config();
const http = require('http');
const hostname = process.env.HOST;
const port = process.env.PORT; 
let app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use("/student",StudentRoutes);
cron.schedule("* 1 * * *", function() {
    console.log("running a task every minute");
    mysqldump({
        connection: {
            host: 'localhost',
            user: 'root',
            password: 'Bakya@123',
            database: 'calibraint',
        },
        dumpToFile: './dump.sql',
    });
    console.log("connected successfully");
  });

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
