const express = require("express");
const multer = require('multer');
const path = require("path");
const router = express.Router();
const { createEmployee, getAllUsers, getEmployee, updateEmployee, deleteEmployee } = require("../controllers/employeeController");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
    });

const upload = multer({ storage: storage });

const fileFilter = (req, file, cb) => {
    const filetypes = /jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    
    if (mimetype && extname) {
    return cb(null, true);
    } else {
    cb('Error: Images Only!');
    }
};

router.route("/").get(getAllUsers);

router.post("/create", upload.single("f_image"), createEmployee);

router.route("/:id")
.get(getEmployee)
.put(upload.single("f_image"), updateEmployee)
.delete(deleteEmployee);

module.exports = router;