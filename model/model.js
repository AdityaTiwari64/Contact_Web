const mongoose = require("mongoose")

var schema = new mongoose.Schema({
    title : {
        type:String,
        required:true
    },
    desc : {
        type:String,
        required:true
    },
    markdown : {
        type:String,
        required:true
    },
    createdAt : {
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('articleModel',schema)