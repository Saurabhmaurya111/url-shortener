const jwt = require("jsonwebtoken");    
const secretKey = "Saurabh7398@#"
function setUser(user){
   return jwt.sign({
    _id : user._id,
    email: user.email,
   }, secretKey )
}

function getUser(token){
    if(!token) return null;
    try{

        jwt.verify(token , secretKey);
    }
    catch(err){
        return null;
    }
}

module.exports = {
    setUser,
    getUser
}