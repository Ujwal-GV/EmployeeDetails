const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    f_name: {
        type: String,
        required: true
    },
    f_email: {
        type: String,
        required: true
    },
    f_mobile: {
        type: String,
        required: true
    },
    f_designation: {
        type: String,
        required: true
    },
    f_gender: {
        type: String,
        required: true
    },
    f_course: {
        type: [String],
        required: true
    },
    f_image: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Employee = mongoose.model("Employee",employeeSchema);

module.exports = Employee;