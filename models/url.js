const mongoose = require("mongoose");
 
// schema
const urlSchema = new mongoose.Schema({
    shortId:{
        type:String,
        require:true,
        unique:true
    },
    redirectedUrl:{
        type:String,
        require:true
    },
    vistedHistory:[{
        timeStamp:{
            type:Number,
        }
    }]
})

// model 

const URL = mongoose.model("URL" , urlSchema);

module.exports = URL;