const express = require("express")
const app = express()
const cors=require('cors')
require("dotenv").config()
require("../models/dbconnection/dbconnection")
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const userRoutes = require("../routes/user.routes");
const productRoutes=require('../routes/product.routes');
const categoryRoutes=require('../routes/category.routes');

app.use("/api/user",userRoutes)
app.use('/api/product',productRoutes);
app.use('/api/category',categoryRoutes);
const path=require('path');
app.get('/images/:imgPath',async(req,res)=>{
let filePath=`../images/${req.params.imgPath}`;
res.sendFile(path.join(__dirname,filePath))
})
module.exports = app