const jwt = require("jsonwebtoken");

async function checkAuthorization(req, res, next){
    const token = req.headers["authorization"];
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