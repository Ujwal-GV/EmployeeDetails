const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");

async function signup(req, res){
    // const { userName, password } = req.body;
    // try{
    //     const adminExists = await Admin.findOne({ userName });
    //     if(adminExists){
    //         return res.status(400).json({ message: "Admin already exists" });
    //     }

    //     const hashedPassword = await bcrypt.hash(password, 10);
    //     const user = new Admin({ userName, password: hashedPassword });
    //     await user.save();
    //     res.status(201).json({ message: "Admin created" });
    // }
    // catch(error){
    //     res.status(500).json({ message: "Error in creating user" });
    // }


    const { userName, password } = req.body;
    const adminExists = await Admin.findOne({ userName });
    
    try{
        if(adminExists){
            res.status(400).json({ message: "Admin already exists" });
        }
    } catch(error){
        console.log(error.message);
    }

    const admin = await Admin.create({ userName, password });

    if(admin){
        console.log("Admin created");
        res.status(201).json({ message: "Admin created" });
    }
    else{
        res.status(400).json({ message: "Invalild admin data" });
    }
}

async function login(req, res){
    const { userName, password } = req.body;
    const admin = await Admin.findOne({ userName });

    if(admin && (await admin.matchPassword(password))){
        const token = jwt.sign({ name: admin._id }, "youcantdecodethis", { expiresIn: "2h" });
        res.cookie( 'name', admin.userName );
        console.log(admin.userName);
        console.log("Admin logged in");
        res.json({ token });
    }
    else{
        res.status(401).json({ message: "Invalid credentials" });
    }
}

module.exports = { signup, login };