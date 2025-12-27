const express = require("express");
const URL = require("./models/url");
const urlRoute = require("./routes/url");
const {connectDB} = require("./connect")

const app = express();
const PORT = 8001;
connectDB("mongodb://127.0.0.1:27017/short-url").then(() => {
    console.log(`connected to DB`);
})
 
// middleware
app.use(express.json());

app.use("/url" , urlRoute)
 
app.get("/:shortId" , async(req, res)=>{
     const shortId = req.params.shortId;
     const entry = await URL.findOneAndUpdate(
        {shortId},
        {
            $push:{
                vistedHistory: {timeStamp:Date.now()}
            }
        }
     ) ;
     res.redirect(entry.redirectedUrl);
})



app.listen(PORT , () => {console.log(`Server is live at PORT : ${PORT}`)})