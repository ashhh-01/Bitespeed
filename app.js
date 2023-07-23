const express= require("express")
const app=express()
const bodyParser=require("body-parser")
let mysql = require('mysql2');
const path=require("path")

let pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password:process.env.MYSQLPASSWORD,
  database:process.env.MYSQLDB
});

pool.getConnection(function(err, connection) {
  if (err) {
    console.error("Error connecting to MySQL:", err.message);
    process.exit(1); // Exit the application with a non-zero code
  }
  console.log("Connected!");
  // Do database operations using the "connection" object
  // Release the connection when done: connection.release();
});
app.set('view engine', 'ejs');

app.use(express.json())
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
 }))

app.get("/",(req,res)=>{
    res.render("index")
})
app.post("/identify",(req,res)=>{
    const {email,phoneNumber,createdAt,updateAt}=req.body
    // const sql = "INSERT INTO bitespeed (email, username) VALUES ('${name}', '${username}')";
})

app.listen(3000,()=>{
    console.log("Listening on port 3000")
})