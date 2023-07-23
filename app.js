const express= require("express")
const app=express()
const bodyParser=require("body-parser")

app.use(express.json())
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
 }))


app.get("/",(req,res)=>{
    res.render("index")
    // res.json(find)
})
app.post("/identify",(req,res)=>{
    console.log(req.body)
    res.json(req.body)    
})

app.listen(3000,()=>{
    console.log("Listening on port 3000")
})