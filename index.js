const express = require("express");
const URL = require("./models/url");
const urlRoute = require("./routes/url");
const path = require("path");
const {connectDB} = require("./connect");

const app = express();
const PORT = 8001;
connectDB("mongodb://127.0.0.1:27017/short-url").then(() => {
    console.log(`connected to DB`);
})
 
// middleware
app.use(express.json());

app.use("/url" , urlRoute)
app.set("view engine" , "ejs")
app.set("views" , path.resolve("./views") )

app.get("/test" , async (req, res) => {
    const allUrls = await URL.find({})
    res.render("home", {

        urls : allUrls
    });
});
 
app.get("/api/:shortId" , async(req, res)=>{
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