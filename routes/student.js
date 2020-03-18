const express = require("express");
//const cronjob = require("cron-job")
const Router = express.Router();
const mysqlConnection = require("../connection");
const jwt = require("jsonwebtoken");
Router.get("/", authenticationToken, (req ,res)=>{
    mysqlConnection.query("SELECT * from students", async(err,rows,fields)=>{
        if(!err){
            await res.send(rows);
        }
        else{
            console.log(err);
        }
    })
    
})
//Get an students...
Router.get('/display/:id',authenticationToken,(req ,res)=>{
    mysqlConnection.query("SELECT * FROM students WHERE stdid =?",[req.params.id], async(err,rows,fields)=>{
        if(!err){
            await res.send(rows);
        }
        else{
            console.log(err);
        }
    })
    
})
//delete an students...
Router.delete('/:id',authenticationToken, (req ,res)=>{
    mysqlConnection.query("DELETE FROM students WHERE stdid =?",[req.params.id], async(err,rows,fields)=>{
        if(!err){
            await res.send("delete successfully");
        }
        else{
            console.log(err);
        }
    })
})
//post an student...
Router.post('/',authenticationToken,(req ,res)=>{
    let std = req.body;
    let insert = "insert into students values("+std.stdid+",'"+std.stdname+"',"+std.stdroll+",'"+std.stdaddress+"',"+std.stdph+");"
    mysqlConnection.query(insert, async(err,rows,fields)=>{
        if(!err){
            await res.send("insert successfully");
        }
        else{
            console.log(err);
        }  
    })
})
Router.post('/signin',(req,res)=>{
    const admin = {
        name : "bakya",
        password :"18764"
    }
    const userName = req.body.username
    const password = req.body.password
    if (userName == admin.name && password == admin.password){
        const user ={name:userName}

        const token = jwt.sign(user,process.env.PORT_TOKEN)
          
        res.json({
            create :1,
            port_token :token
        })
    }else{
         
        res.json({
             create :0,
             information : 'Request failed! only admin can access it'
        })
    }
})
function authenticationToken(req,res,next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split (" ")[1]
    if(token == null){
        return res.send('Please enter the valid token')
    }


    jwt.verify(token,process.env.PORT_TOKEN, (err,user)=>{
         
        if (err){
            return res.send('unauthorized user entry')
        }
        req.user = user
        next()
    })
}
Router.put('/',authenticationToken, (req ,res)=>{
    let std = req.body;
    let update = "update students set stdname='"+std.stdname+"',stdroll="+std.stdroll+",stdaddress='"+std.stdaddress+"',stdph="+std.stdph+" where stdid="+std.stdid+";"
    mysqlConnection.query(update, async(err,rows,fields)=>{
        if(!err){
            await res.send("Update successfully");
        }
        else{
            console.log(err);
        }
    })
    
})
module.exports = Router;