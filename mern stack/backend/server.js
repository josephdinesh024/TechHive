
const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const router = require('./router/userrouter');
const cors = require('cors');
const newsrouter = require('./router/newsrouter')


app.use(cors());
app.use(express.json());
app.use("/reg",router);
app.use("/news",newsrouter)
app.get('/',(req,res)=>
{
    res.send('<h4>hello</h4>')
});

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("db connected")
})
.catch((error)=>{
    console.log('error')
})

app.listen(process.env.POST,()=>{
    console.log("local run correctly")
});