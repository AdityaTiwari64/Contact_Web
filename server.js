const express = require("express");
const mongoose = require("mongoose");
// const bodyParser = require('body-parser')
const methodOverride = require("method-override")
const app = express();
const articleModel = require("./model/model")
const port = 3000;
const articleRouter = require("./routes/articles")

// Mongo DB Connection
const connection=()=>{
    mongoose.connect('mongodb+srv://aditya:aditya123@blogs.m5r9f.mongodb.net/Blog_App?retryWrites=true&w=majority',{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    console.log("Connected To DB")
}

connection()

app.set("view engine","ejs")
app.use(express.urlencoded({extended:false}))

app.use(methodOverride("_method"))

// app.use(bodyParser({extended:false}))


app.get('/', async (req,res)=>{
    const articles = await articleModel.find().sort({createdAt: "desc"})
    res.render("articles/index",{articles:articles})
})

app.use("/articles",articleRouter)


app.listen(port,()=>{
    console.log(`Connected To The http://localhost:${port}`)
})

