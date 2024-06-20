const Employee = require("../models/employee");

async function createEmployee(req, res){
    const { f_name, f_email, f_mobile, f_designation, f_gender, f_course } = req.body;

    const existingEmailCheck = await Employee.findOne({ f_email });
    if(existingEmailCheck){
        return res.status(400).json({ message: "Email already exists" });
    }

    if(!req.file || !["image/jpg", "image/png"].includes(req.file.mimetype)){
        return res.status(400).json({ message: "Please upload a JPG/ PNG file" });
    }

    const f_image = req.file ? req.file.filename : ''; 
    try{
        const employee = new Employee({ f_name, f_email, f_mobile, f_designation, f_gender, f_course, f_image});
        const image = req.file.originalname;
        await employee.save();
        console.log("New Employee created")
        res.status(201).json({ message: "New Employee created" });
    }
    catch(error){
        return res.status(500).json({ message: error.message });
    }
}

async function getAllUsers(req, res){
    try {
        const employees = await Employee.find({});
        return res.status(200).json(employees);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

async function getEmployee(req, res){
    try {
        const employee = await Employee.findById(req.params.id);
        res.status(200).json(employee);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function updateEmployee(req, res){
    const { f_name, f_email, f_mobile, f_designation, f_gender, f_course } = req.body;
    const f_image = req.file?req.file.path : req.body.f_image;

    const existingEmailCheck = await Employee.findOne({ f_email });
    if(existingEmailCheck){
        return res.status(400).json({ message: "Email already exists" });
    }
    
    try{
        const employee = await Employee.findByIdAndUpdate(req.params.id, { f_name, f_email, f_mobile, f_designation, f_gender, f_course, f_image}, { new: true });
        res.status(201).json({ message: "Employee details updated" });
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
}

async function deleteEmployee(req, res){
    try {
        const { id } = req.params;
        const employee = await Employee.findByIdAndDelete(id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

module.exports = { createEmployee, getAllUsers, getEmployee, updateEmployee, deleteEmployee };