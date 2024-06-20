const jwt = require("jsonwebtoken");

async function checkAuthorization(req, res, next){
    const token = req.header("Authorization")?.split(" ")[1];
    if(!token){
        return res.status(401).json({ message: "Not authorized to access" });
    }

    try{
        const decode = jwt.verify(token, "youcantdecodethis");
        req.user = decode;
        next(); 
    }
    catch(error){
        res.status(401).json({ message: "Not authorized to access" });
    }
}

module.exports = { checkAuthorization };