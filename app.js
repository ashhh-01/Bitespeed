const express= require("express")
const app=express()
const bodyParser=require("body-parser")
let mysql = require('mysql2');
if(process.env.NODE_ENV!=="production"){
  require("dotenv").config()
}
// let pool = mysql.createPool({
//   connectionLimit: 10,
//   host: "localhost",
//   user: "root",
//   password:"ashrithmr@2001",
//   database:"backend",
// });


let pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.AWSENDPOINT,
  user: "admin",
  password:process.env.AWSPASSWORD,
  database:"bitespeed",
  port:"3306",
  connectTimeout: 15000, 

});
// const db=mysql.createConnection({
//   connectionLimit: 10,
//   host: "bitespeed-inst.cn1pnc1h79p2.ap-south-1.rds.amazonaws.com",
//   user: "admin",
//   password:"Ashrithmr2001",
//   database:"bitespeed",
//   port:"3306"
// })

// db.connect((err)=>{
//   if(err){
//     console.log(err.message)
//     return 
//   }
//   console.log("connected")

// })

pool.getConnection(function(err, connection) {
  if (err) {
    console.error("Error connecting to MySQL:", err.message);
    process.exit(1); 
  }
  console.log("Connected!");
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
app.post("/identify",async(req,res)=>{
    const {email,phoneNumber,createdAt,updatedAt}=req.body
    
        const findSql = `SELECT * FROM bitespeed WHERE email ="${email}"`;
        pool.query(findSql, [email], (err, result) => {
            console.log(pool)
            if (err) {
            console.error('Error fetching data from MySQL:', err);
            return res.status(500).json({ error: 'Error fetching data from MySQL' });
          }
          if (result.length === 0) {
            const insertSql = `INSERT INTO bitespeed (email, phoneNumber,linkPrecedence, createdAt, updatedAt) VALUES ('${email}','${phoneNumber}',"primary" ,'${createdAt}','${updatedAt}')`;
            const insertValues=[email,phoneNumber,createdAt,updatedAt]
            pool.query(insertSql, insertValues, (err, insertedResult) => {
              if (err) {
                console.error('Error inserting data into MySQL:', err);
                return res.status(500).json({ error: 'Error inserting data into MySQL' });
              }
              pool.query(findSql, [email], (err, result) => {
                res.json(result)
              })
        })}else{
          res.json({result });
        }
        })
    });

const PORT=process.env.PORT ||3000
app.listen(PORT,()=>{
    console.log("Listening on port 3000")
})